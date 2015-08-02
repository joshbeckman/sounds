(function(window, document, soundsLike) {
    var h1 = document.querySelector('h1'),
        p = document.querySelector('p'),
        encounters = [293.66, 329.63, 261.63, 130.81, 196];

    window.addEventListener('load', onload, false);
    window.soundsLike = soundsLike || {};

    function onload() {
        window.soundsLike.socket = io();
        window.soundsLike.socket.on(
            urlParams.id || 'record',
            record
        );
        if (urlParams.id) {
            h1.innerHTML =
                "<a href='" + window.location.href + "'>" + urlParams.id + "</a><br>" +
                h1.innerText;
            document.title = urlParams.id + ' Sounds';
        }
    }

    function record(data) {
        var i = window.soundsLike.startTone(
            data.tone ||
            encounters[
                Math.floor(Math.random() * encounters.length)
            ]
        );

        setTimeout(
            window.soundsLike.stopTone,
            data.msec || 500,
            i
        );
        document.body.style.background =
            'hsl(' + (data.tone || 432) % 360 + ',100%,50%)';
        if (data.msg)
            p.textContent = data.msg;
    }
})(this, this.document, this.soundsLike);

var urlParams;

(window.onpopstate = function() {
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        query  = window.location.search.substring(1),
        decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        };

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
