var globals = require('../globals');

module.exports = function (app){

// middleware for scoket.io's connect and disconnect
app.io.use(function* (next) {
  // on connect
    console.log('connect');
  yield* next;
    console.log('disconnect');
  // on disconnect
});

};
