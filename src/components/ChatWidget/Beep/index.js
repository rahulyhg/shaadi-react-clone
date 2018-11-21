import React from 'react';

const Beep = () => (
  <audio autoPlay>
    <source src="/assets/sound.ogg" type="audio/ogg" />
    <source src="/assets/sound.mp3" type="audio/mpeg" />
    <track kind="captions" src="" srcLang="en" />
  </audio>
);

export default Beep;
