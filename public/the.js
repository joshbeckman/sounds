(function(window, document, soundsLike){
    window.addEventListener('load', onload, false);
    window.soundsLike = soundsLike || {};
    window.soundsLike.query = parseQuery(window.location.href);

    function onload(){
        window.soundsLike.socket = io();
        window.soundsLike.socket.on(
            urlParams.id || 'record',
            record
        );
    }
    function record(data){
        window.soundsLike.startTone(
            data.tone || 432
        );
        setTimeout(
            window.soundsLike.stopTone,
            data.msec || 500
        );
        document.body.style.background = 
            'hsl(' + (data.tone || 432) % 360 + ',100%,50%)';
    }

    function parseQuery(qstr) {
        var query = {};
        var a = qstr.split('&');
        for (var i in a){
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
        }
        return query;
    }
})(this, this.document, this.soundsLike);

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
