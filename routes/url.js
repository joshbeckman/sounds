
var globals = require('../globals');

module.exports = function (app, route){

    app.use(route.get('/', function* () {
        yield this.render('index', {
            title: 'Sounds',
            globals: globals
        });
    }));

    app.use(route.get('/record', function* () {
        this.status = 102;

        app.io('/' + (this.query.id || ''))
        .emit('sound', this.query);

        this.type = 'image/svg+xml';
        this.body = globals.message
        this.status = 200;
    }));

};
