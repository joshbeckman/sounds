window.soundsLike = window.soundsLike || { urlParams: null };
(function(window, document) {
    // ref: https://github.com/0xfe/vexflow/wiki/Animation-with-VexFlow-&-CSS
    var VF = window.Vex.Flow;
    var renderer = new VF.Renderer(document.querySelector('.vf-inner'),
        VF.Renderer.Backends.SVG);
    var vfWidth = window.innerWidth / 2;
    renderer.resize(vfWidth, 500);
    var context = renderer.getContext();
    var tickContext = new VF.TickContext();
    var stave = new VF.Stave(10, 10, 10000)
        .addClef('treble');
    stave.setContext(context).draw();

    var visibleNoteGroups = [];
    var tempo = 120

    window.soundsLike.addNote = function(freq, sec) {
        var fnote = window.Tone.Frequency(freq).toNote().toLowerCase();
        var acc = fnote.match(/[a-z](.*)[0-9+]/)[1];
        fnote = fnote.replace(/([0-9]+)/, '/$1');
        var note = new VF.StaveNote({
            clef: 'treble',
            keys: [fnote],
            duration: window.Tone.Time(sec).toNotation().match(/[0-9]+/)[0],
        }).setContext(context).setStave(stave);
        if (acc) {
            note.addAccidental(0, new VF.Accidental(acc));
        }
        tickContext.addTickable(note);
        tickContext.preFormat().setX(vfWidth - 100);
        var group = context.openGroup();
        visibleNoteGroups.push(group);
        note.draw();
        context.closeGroup();
        group.classList.add('scroll');
        var box = group.getBoundingClientRect();
        group.classList.add('scrolling');

        window.setTimeout(function() {
            var index = visibleNoteGroups.indexOf(group);
            if (index === -1) return;
            group.classList.add('correct');
            visibleNoteGroups.shift();
        }, 5000);
    };
})(this, this.document);
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

    function onload() {
        window.soundsLike.socket = window.io('/' + (urlParams.id || '').toLowerCase());
        window.soundsLike.socket.on('sound', record);
        if (urlParams.id) {
            h1.innerHTML = urlParams.id + '<br>' + h1.innerText;
            document.title = urlParams.id + ' Sounds';
        }
    }
    onload();

    function record(data) {
        var tone = data.tone || randomEncounter();
        var sec = (data.msec || 500) / 1000;
        var synth;

        window.clearTimeout(window.soundsLike.bgTimeout);
        if (data.src) {
            new window.Tone.Player({
                url : '/file?src=' + data.src, autostart: true
            }).toMaster();
        } else {
            synth = new window.Tone.Synth().toMaster();
            synth.triggerAttackRelease(tone, sec);
            window.soundsLike.addNote(tone, sec);
        }
        document.body.style.background =
            'hsl(' + (data.hue || tone % 360) + ',100%,50%)';
        window.soundsLike.bgTimeout = setTimeout(function() {
            document.body.style.background = 'white';
        }, sec * 1000);
        if (data.msg) p.textContent = data.msg;
    }

    function randomEncounter() {
        return encounters[
            Math.floor(Math.random() * encounters.length)
        ];
    }
})(this, this.document);
