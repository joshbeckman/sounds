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

    app.io.sockets.emit(
        this.query.id || 'record',
        this.query
    );

    this.body = globals.message
    this.status = 200;
}));


};
