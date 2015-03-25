(function(window, document, soundsLike){
    window.addEventListener('load', onload, false);
    window.soundsLike = soundsLike || {};

    function onload(){
        window.soundsLike.socket = io();
        window.soundsLike.socket.on(
            urlParams.id || 'record',
            record
        );
        if (urlParams.id) {
            document.querySelector('div').innerHTML = 
                "<a href='" + window.location.href + "'>" + urlParams.id + "</a>";
        }
    }
    function record(data){
        var i = window.soundsLike.startTone(
            data.tone || 432
        );
        setTimeout(
            window.soundsLike.stopTone,
            data.msec || 500,
            i
        );
        document.body.style.background = 
            'hsl(' + (data.tone || 432) % 360 + ',100%,50%)';
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
