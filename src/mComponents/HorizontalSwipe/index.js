/* eslint no-mixed-operators: 0  */
import raf from 'raf';
import * as Animated from 'animated/lib/targets/react-dom';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
const toRad = a => a * Math.PI / 180;
// const toDeg = a => a * 180 / Math.PI;

const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';

class HorizontalSwipe {
  constructor(anim, target, actions) {
    this.anim = anim;
    this.actual = target;
    this.actions = actions;
    this.reset();
  }

  reset = () => {
    this.updating = false;
    this.dx = null;
    this.dt = 1;
    this.pendingUpdates = true;
    this.starts = { cardStart: 0 };
    this.velocityX = 0;
    this.velocityY = 0;
    this.direction = null;
  };

  updateVelocity = ({ clientX, clientY }) => {
    const now = Date.now();
    const x = this.lastX;
    const y = this.lastY;
    const dt = now - this.lastT;
    if (now <= 0) return;
    if (x === clientX && y === clientY) return;

    this.velocityX = (clientX - x) / dt;
    this.velocityY = (clientY - y) / dt;
    this.lastT = now;
    this.dt = this.lastT - this.startT;
    this.lastX = clientX;
    this.lastY = clientY;
  };

  handleStart = ({ clientX, clientY }) => {
    if (this.updating) return console.log('HorizontalSwipe: invalid start.');
    console.log('HorizontalSwipe: start.', this.actual);
    this.reset();
    this.updating = true;
    this.pendingUpdates = true;
    this.startX = clientX;
    this.startY = clientY;
    this.startT = Date.now();
    this.lastX = clientX;
    this.lastY = clientY;
    this.lastT = this.startT;
    this.velocityX = 0;
    this.velocityY = 0;

    const { card } = this.anim;
    card.stopAnimation(cardStart => {
      this.starts.cardStart = cardStart || 0;
      // this.addGlobalListeners();
    });
    return true;
  };

  handleMove = ({ clientX, clientY }) => {
    if (!this.updating) return console.log('HorizontalSwipe: invalid move.');
    console.log(`HorizontalSwipe: move ${this.direction || 'na'}`);
    const startX = this.startX;
    const startY = this.startY;
    this.updateVelocity({ clientX, clientY });
    this.dx = clientX - startX;
    this.dy = clientY - startY;
    this.pendingUpdates = true;
    this.af = raf(this.tick);
    return true;
  };

  handleStop = () => {
    if (!this.updating) return console.log('HorizontalSwipe: invalid stop.');
    console.log('HorizontalSwipe: stop.');
    // this.removeGloabalListeners();
    this.fireGesture();
    this.reset();
    return true;
  };

  decideDirection = () => {
    const { dx, dy } = this;
    const vx = this.velocityX;
    const vy = this.velocityY;
    const velocityAngle = Math.atan(vy / vx);

    const THRESHOLD_ANGLE = toRad(20);

    // Angle of the velocity vector
    this.direction = Math.abs(velocityAngle) <= THRESHOLD_ANGLE ? HORIZONTAL : VERTICAL;

    // Swipe speed or change in displacement between two touch events
    if (Math.abs(dx) >= 64) this.direction = HORIZONTAL;
    else if (Math.abs(dy) >= 64) this.direction = VERTICAL;

    // Special condition for scrolling
    if (Math.abs(vy) >= 0.5) this.direction = VERTICAL;

    const { card } = this.anim;
    const { cardStart } = this.starts;
    if (this.direction === VERTICAL) card.setValue(cardStart);
  };

  tick = () => {
    if (!this.pendingUpdates) return;
    this.pendingUpdates = false;
    if (!this.updating) return;
    const { w, minCard, maxCard } = this.actual;
    const { dx, dy, dt } = this;
    const stillDeciding = Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 150;
    if (!this.direction && !stillDeciding) this.decideDirection();
    const { card } = this.anim;
    const { cardStart } = this.starts;
    const position = cardStart * w - dx;
    const cardTarget = clamp(position / w, minCard, maxCard);
    if (this.direction !== VERTICAL) card.setValue(cardTarget);
  };

  fireGesture = ({ duration = 100, momentum: forcedMomentum = 0 } = {}) => {
    const { card } = this.anim;
    const momentumDuration = 250;

    card.stopAnimation(cardFinal => {
      const vx = this.velocityX;
      const { maxCard, w } = this.actual;
      const momentum = forcedMomentum || clamp(-vx * momentumDuration * 2, -w / 2, w / 2);
      const final = this.direction === VERTICAL ? this.starts.cardStart : cardFinal + momentum / w;
      const cardTarget = clamp(Math.round(final), 0, Math.floor(maxCard));

      Animated.timing(card, { toValue: cardTarget, duration }).start();

      this.actions.onCardChange(cardTarget);
    });
    return null;
  };

  // type GestureType = 'swipe-right' | 'swipe-left'
  // gesture :: (GestureType, Object) -> ()
  gesture = (type, options) => {
    const { w } = this.actual;
    switch (type) {
      case 'swipe-left':
        return this.fireGesture({ momentum: w, ...options });
      case 'swipe-right':
        return this.fireGesture({ momentum: -w, ...options });
      default:
        return null;
    }
  };

  onGlobalTouchMove = event => {
    this.handleMove(event.touches[0]);
    // event.preventDefault();
  };

  onGlobalMouseMove = event => {
    this.handleMove(event);
    // event.preventDefault();
  };

  onGlobalMouseUp = event => {
    this.handleStop();
    // event.preventDefault();
  };

  onGlobalTouchEnd = event => {
    this.handleStop();
    // event.preventDefault();
  };

  addGlobalListeners = onlyTick => {
    window.addEventListener('mousemove', this.onGlobalMouseMove);
    window.addEventListener('mouseup', this.onGlobalMouseUp);
    window.addEventListener('touchstart', this.onGlobalTouchMove);
    window.addEventListener('touchmove', this.onGlobalTouchMove);
    window.addEventListener('touchend', this.onGlobalTouchEnd);
    window.addEventListener('touchcancel', this.onGlobalTouchEnd);
    this.af = raf(this.tick);
  };

  removeGloabalListeners = onlyTick => {
    window.removeEventListener('mousemove', this.onGlobalMouseMove);
    window.removeEventListener('mouseup', this.onGlobalMouseUp);
    window.removeEventListener('touchstart', this.onGlobalTouchMove);
    window.removeEventListener('touchmove', this.onGlobalTouchMove);
    window.removeEventListener('touchend', this.onGlobalTouchEnd);
    window.removeEventListener('touchcancel', this.onGlobalTouchEnd);
    if (this.af) raf.cancel(this.af);
    this.af = null;
  };

  onTouchStart = event => {
    if (event.touches[0].target.getAttribute('no-pan')) return;
    this.handleStart(event.touches[0]);
    // event.preventDefault();
  };

  onMouseDown = event => {
    this.handleStart(event);
    // event.preventDefault();
  };

  listeners = {
    onMouseDown: this.onMouseDown,
    onTouchStart: this.onTouchStart,
  };
}

export default HorizontalSwipe;
