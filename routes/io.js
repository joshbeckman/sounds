
module.exports = function (app){
    app.io.use(function* (next) {
        console.log('connect');
        yield* next;
        console.log('disconnect');
    });
};
