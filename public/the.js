window.soundsLike = window.soundsLike || { urlParams: null };
(window.onpopstate = function() {
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        query  = window.location.search.substring(1),
        decode = function(s) {
            return decodeURIComponent(s.replace(pl, ' '));
        };

    window.soundsLike.urlParams = {};
    while (match = search.exec(query))
        window.soundsLike.urlParams[decode(match[1])] = decode(match[2]);
})();
(function(window, document) {
    var h1 = document.querySelector('h1'),
        p = document.querySelector('p'),
        encounters = [293.66, 329.63, 261.63, 130.81, 196],
        urlParams = window.soundsLike.urlParams;
    var synth = new window.Tone.Synth().toMaster();

    document.querySelector('#socketScript')
        .addEventListener('load', onload, false);

    function onload() {
        window.soundsLike.socket = window.io('/' + (urlParams.id || '').toLowerCase());
        window.soundsLike.socket.on('sound', record);
        if (urlParams.id) {
            h1.innerHTML = urlParams.id + '<br>' + h1.innerText;
            document.title = urlParams.id + ' Sounds';
        }
    }

    function record(data) {
        var tone = data.tone || randomEncounter();
        var sec = (data.msec || 500) / 1000;

        synth.triggerAttackRelease(tone, sec);
        document.body.style.background =
            'hsl(' + (data.hue || tone % 360) + ',100%,50%)';
        if (data.msg) p.textContent = data.msg;
    }

    function randomEncounter() {
        return encounters[
            Math.floor(Math.random() * encounters.length)
        ];
    }
})(this, this.document);
