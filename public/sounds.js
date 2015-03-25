(function(window, document, soundsLike){
// Example showing how to produce a tone using Web Audio API.
// Load the file webaudio_tools.js before loading this file.
// Create an oscillator and an amplifier.
function initAudio()
{
    
}

// Set the frequency of the oscillator and start it running.
soundsLike.startTone = function ( frequency ){
    var oscillator;
    var amp;
    var now = audioContext.currentTime;
    // Use audioContext from webaudio_tools.js
    if( audioContext )
    {
        oscillator = audioContext.createOscillator();
        fixOscillator(oscillator);
        oscillator.frequency.value = 440;
        amp = audioContext.createGain();
        amp.gain.value = 0;
        // Connect oscillator to amp and amp to the mixer of the audioContext.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(audioContext.destination);
        oscillator.start(0);
    }
    oscillator.frequency.setValueAtTime(frequency, now);
    
    // Ramp up the gain so we can hear the sound.
    // We can ramp smoothly to the desired value.
    // First we should cancel any previous scheduled events that might interfere.
    amp.gain.cancelScheduledValues(now);
    // Anchor beginning of ramp at current value.
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    soundsLike.a = soundsLike.a || {};
    var name = Math.random().toString(36).substring(2,5);
    soundsLike.a[name] = amp;
    return name;
};

soundsLike.stopTone = function (position){
    var now = audioContext.currentTime;
    window.soundsLike.a[position]
        .gain.cancelScheduledValues(now);
    window.soundsLike.a[position]
        .gain.setValueAtTime(
            window.soundsLike.a[position].gain.value,
            now
        );
    window.soundsLike.a[position]
        .gain.linearRampToValueAtTime(0.0, audioContext.currentTime + 0.2);
    soundsLike.a[position] = null;
};

// init once the page has finished loading.
window.onload = initAudio;
})(this, this.document, this.soundsLike);
