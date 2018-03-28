var candyMachine = require('./candymachine.js');

candyMachine.dispenceCandy("medium", function(success) {
  console.log("success = " + success);
});


// candyMachine.lightLed("off", function(success) {
//   console.log("success = " + success);
// });
