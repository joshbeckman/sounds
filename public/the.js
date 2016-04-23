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

    document.querySelector('#socketScript')
        .addEventListener('load', onload, false);

    function onload() {
        window.soundsLike.socket = window.io('/' + (urlParams.id || ''));
        window.soundsLike.socket.on('sound', record);
        if (urlParams.id) {
            h1.innerHTML =
                '<a href="' + window.location.href + '>' +
                    urlParams.id +
                '</a><br>' +
                h1.innerText;
            document.title = urlParams.id + ' Sounds';
        }
    }

    function record(data) {
        var tone = data.tone || randomEncounter();

        setTimeout(window.soundsLike.stopTone, data.msec || 500,
            window.soundsLike.startTone(tone)
        );
        document.body.style.background =
            'hsl(' + tone % 360 + ',100%,50%)';
        if (data.msg) p.textContent = data.msg;
    }

    function randomEncounter() {
        return encounters[
            Math.floor(Math.random() * encounters.length)
        ];
    }
})(this, this.document);
