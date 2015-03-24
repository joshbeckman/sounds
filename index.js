var koa       = require('koa.io'),
    compress  = require('koa-compress'),
    jade      = require('koa-jade'),
    route     = require('koa-route'),
    koaBody   = require('koa-better-body'),
    path      = require('path'),
    staticCache = require('koa-static-cache'),
    globals   = require('./globals'),
    app       = koa();

app.use(compress());
app.use(staticCache(path.join(__dirname, 'public')));
app.use(koaBody({
    formLimit: (15 * 10e7),
    jsonLimit: (15 * 10e7)
}));

app.use(jade.middleware({
  viewPath: __dirname + '/views',
  debug: false,
  pretty: false,
  compileDebug: false
}));

// logger
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %sms', this.method, this.url, ms);
});

require('./routes/io')(app);
require('./routes/url')(app, route);

app.listen(process.env.PORT || process.env.NODE_PORT || 3001);
