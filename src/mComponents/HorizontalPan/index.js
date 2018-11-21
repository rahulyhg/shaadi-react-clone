import raf from 'raf';

const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';

const clamp = (m, min, max) => Math.max(Math.min(m, max), min);

let globalDisablers = [];

class HorizontalPan {
  constructor(options, id, config = {}) {
    this.id = id;
    this.config = config;
    this.animX = options.animX;
    this.overlayOpacity = options.overlayOpacity;
    this.reset();
  }

  reset = () => {
    this.updating = false;
    this.dx = null;
    this.dy = null;
    this.w = null;
    this.h = null;
    this.rect = {};
    this.direction = null;
  };

  updateVelocity = ({ clientX, clientY }) => {
    const now = Date.now();
    const [x, y] = this.lastXY;
    const dt = now - this.lastT;
    if (now <= 0) return;
    if (x === clientX && y === clientY) return;

    this.velocityXY = [(clientX - x) / dt, (clientY - y) / dt];
    this.lastT = now;
    this.lastXY = [clientX, clientY];
  };

  tick = () => {
    this.af = raf(this.tick);
    if (this.dx === null || this.dy === null) return;
    const dt = this.lastT - this.startT;
    const { dx, dy } = this;
    const [vx, vy] = this.velocityXY;
    const [valX] = this.startValueXY;
    const stillDeciding = Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 150;
    if (!stillDeciding && !this.direction) {
      if (Math.abs(vy) > Math.max(Math.abs(vx), 0.1) && Math.abs(dx) < 64) this.direction = VERTICAL;
      if (Math.abs(vx) >= Math.max(Math.abs(vy), 0.1) && Math.abs(dy) < 64) this.direction = HORIZONTAL;
      if (Math.abs(dy) >= 64 || Math.abs(dx) >= 64) this.direction = Math.abs(dx) >= Math.abs(dy) ? HORIZONTAL : VERTICAL;
    }
    if (this.direction === HORIZONTAL || !this.direction) {
      this.animX.setValue(dx + valX);
      if (this.overlayOpacity) this.overlayOpacity.setValue(clamp(dx > 0 ? Math.abs(dx * 4) / this.w : 0, 0, 1));
    }
  };

  handleStart = event => {
    if (this.updating) return console.log('HorizontalPan: invalid start.');
    this.reset();
    this.updating = true;
    const target = document.getElementById(this.id) || event.target;
    this.w = target.clientWidth;
    this.h = target.clientHeight;
    this.rect = target.getBoundingClientRect();
    this.startXY = [event.clientX, event.clientY];
    this.startT = Date.now();
    this.lastXY = [event.clientX, event.clientY];
    this.lastT = this.startT;
    this.velocityXY = [0, 0];

    const { animX, overlayOpacity } = this;
    if (overlayOpacity) {
      return overlayOpacity.stopAnimation(startValueOfOverlayOpacity => {
        animX.stopAnimation(startValueOfX => {
          this.startValueXY = [startValueOfX, 0];
          this.startOpacity = startValueOfOverlayOpacity;
          this.addGlobalListeners();
        });
      });
    }
    return animX.stopAnimation(startValueOfX => {
      this.startValueXY = [startValueOfX, 0];
      this.startOpacity = 0;
      this.addGlobalListeners();
    });
  };

  handleMove = ({ clientX, clientY }) => {
    if (!this.updating) return console.log('HorizontalPan: invalid move.');
    const [startX, startY] = this.startXY;
    this.updateVelocity({ clientX, clientY });
    this.dx = clientX - startX;
    this.dy = clientY - startY;
    return true;
  };

  handleStop = () => {
    if (!this.updating) return console.log('HorizontalPan: invalid stop.');
    this.removeGlobalListeners();
    this.fireGesture();
    this.reset();
    return true;
  };

  fireGesture = () => {
    const { dx, dy, direction } = this;
    const [vx, vy] = this.velocityXY;
    const [startX, startY] = this.startValueXY;
    const dt = this.lastT - this.startT;
    const veloX = dx / dt;
    const veloY = dy / dt;
    const thresholdX = Math.max(this.w, 0.8 * window.innerWidth) * 0.2;
    const params = {
      dx,
      dy,
      vx,
      vy,
      veloX,
      veloY,
      startX,
      startY,
      thresholdX,
      dt,
      direction,
      deltaX: dx,
      deltaY: dy,
    };
    const gesture = this.detectGesture(params);
    console.log(
      `gesture: ${gesture}`,
      `dxy: ${dx}, ${dy}`,
      `veloXY: ${veloX}, ${veloY}`,
      `vxy: ${vx}, ${vy}`,
      `dt: ${dt}`,
      `startXY: ${startX}, ${startY}`,
      `thresholdX: ${thresholdX}`,
    );
    this.config[`on${gesture}`] ? this.config[`on${gesture}`](params) : console.log(`Please provide a on${gesture} to HorizontalPan`);
  };

  detectGesture = ({ dx, dy, vx, vy, veloX, veloY, thresholdX, dt }) => {
    if (!dx && !dy) return 'Tap';
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 300) return 'Tap';
    if (this.direction === HORIZONTAL && Math.abs(dx) >= 64 && dt >= 100) {
      if (vx <= -0.42 && dx < 0) return 'SwipeLeft';
      if (vx > 0.42 && dx > 0) return 'SwipeRight';
      if (veloX <= -0.63 && vx < 0 && dx < 0) return 'SwipeLeft';
      if (veloX > 0.63 && vx > 0 && dx > 0) return 'SwipeRight';
      if (dx < -thresholdX && vx < 0 && veloX < 0) return 'SwipeLeft';
      if (dx > thresholdX && vx > 0 && veloX > 0) return 'SwipeRight';
    }
    return 'SwipeCancel';
  };

  haltEvent = event => {
    if (!this.direction || this.direction === VERTICAL) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  onGlobalTouchMove = event => {
    this.handleMove(event.touches[0]);
    this.haltEvent(event);
  };

  onGlobalMouseMove = event => {
    this.handleMove(event);
    this.haltEvent(event);
  };

  onGlobalMouseUp = event => {
    this.haltEvent(event);
    this.handleStop();
  };

  onGlobalTouchEnd = event => {
    this.haltEvent(event);
    this.handleStop();
  };

  addGlobalListeners = () => {
    window.addEventListener('mousemove', this.onGlobalMouseMove, { passive: false });
    window.addEventListener('mouseup', this.onGlobalMouseUp, { passive: false });
    window.addEventListener('touchstart', this.onGlobalTouchMove, { passive: false });
    window.addEventListener('touchmove', this.onGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', this.onGlobalTouchEnd, { passive: false });
    window.addEventListener('touchcancel', this.onGlobalTouchEnd, { passive: false });
    this.af = raf(this.tick);
  };

  removeGlobalListeners = () => {
    window.removeEventListener('mousemove', this.onGlobalMouseMove);
    window.removeEventListener('mouseup', this.onGlobalMouseUp);
    window.removeEventListener('touchstart', this.onGlobalTouchMove);
    window.removeEventListener('touchmove', this.onGlobalTouchMove);
    window.removeEventListener('touchend', this.onGlobalTouchEnd);
    window.removeEventListener('touchcancel', this.onGlobalTouchEnd);
    raf.cancel(this.af);
  };

  onTouchStart = event => {
    if (globalDisablers.length) {
      console.log('HorizontalPan is currently disabled', globalDisablers);
      return;
    }
    console.log('ts', event.touches[0].target);
    if (event.touches[0].target.getAttribute('no-pan')) return;
    this.haltEvent(event);
    this.handleStart(event.touches[0]);
  };

  onMouseDown = event => {
    if (globalDisablers.length) {
      console.log('HorizontalPan is currently disabled', globalDisablers);
      return;
    }
    console.log('md', event.target);
    if (event.target.getAttribute('no-pan')) return;
    this.haltEvent(event);
    this.handleStart(event);
  };

  getLocalListeners = () => ({
    onMouseDown: this.onMouseDown,
    onTouchStart: this.onTouchStart,
  });
}

HorizontalPan.enable = id => {
  globalDisablers = globalDisablers.filter(item => item !== id);
};

HorizontalPan.disable = id => {
  globalDisablers = [...globalDisablers, id];
};

export default HorizontalPan;
