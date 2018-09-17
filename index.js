var Koa         = require('koa');
var IO          = require('koa-socket');
var route       = require('koa-route');
var path        = require('path');
var koaStatic   = require('koa-static');
var request     = require('request');
var req         = require('util').promisify(request);
var app         = new Koa();
var io          = new IO();
var pkg         = require('./package');
var port        = process.env.PORT || process.env.NODE_PORT || 3001;
var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" title="sounds.andjosh.com"></svg>';

app.use(koaStatic(path.join(__dirname, 'public')));
io.attach(app);

app.use(route.get('/record', (ctx) => {
    ctx.status = 102;

    app._io.of('/' + (ctx.query.id || '').toLowerCase())
        .emit('sound', ctx.query);

    ctx.type = 'image/svg+xml';
    ctx.body = svg;
    ctx.status = 200;
}));

app.use(route.get('/file', async (ctx) => {
    ctx.body = await req.get(ctx.request.query.src);
}));

app.listen(port);
console.info('%s listening on %s', pkg.name, port);
