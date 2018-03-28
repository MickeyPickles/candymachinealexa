var alexa = require("alexa-app");
var candyMachine = require('./candymachine.js');


var app = new alexa.app();


app.intent("dispenceCandy",
  function(request, response) {
    var resolutions = request.data.request.intent.slots.amountOfCandy.resolutions

    var amountOfCandy = "medium"
    if(resolutions && resolutions.resolutionsPerAuthority[0].values) {
      amountOfCandy = resolutions.resolutionsPerAuthority[0].values[0].value.id
    }


    candyMachine.dispenceCandy(amountOfCandy, function(success) {
      if(success) {
        response.say("Here is the candy, don't feed it to the cat").send();
      } else {
        response.say("Mama mia, please try something else. ").send();
      }
      console.log("success = " + success);
    });
    return false;
  }
);

app.intent("lightLedOn",
  function(request, response) {

    var ledColor;
    try {
      ledColor = request.data.request.intent.slots.ledColor.resolutions.resolutionsPerAuthority[0].values[0].value.name
    } catch(exception) {
      console.log(exception.toString());
    }

    if(ledColor) {
      console.log(" WE HAVE A COLOR");
      candyMachine.lightLed(ledColor, function(success) {
        if(success) {
          response.shouldEndSession(true);
          response.say("Ok I'll do it").send();
        } else {
          response.shouldEndSession(true);
          response.say("Mama mia, there was a problem ").send();
        }
      }
    );
    } else {
      console.log("No color at all!!!");
      var dialogDirective = {
        type: 'Dialog.Delegate'
      };
      response.shouldEndSession(false).directive(dialogDirective).send();
      //response.say("Oh boy, I love to sparkle").send();
    }
    return false;
  }
);

// app.intent("lightLedOn",
//   function(request, response) {
//       console.log("Dialog state = " + request.dialogState)
//       if(request.data.request.dialogState == "STARTED") {
//         //we still need the color
//         var dialogDirective = {
//             type: 'Dialog.Delegate'
//           };
//           response.shouldEndSession(false).directive(dialogDirective).send();
//           // response.say("Oh boy, I love to sparkle").send();
//
//       } else {
//         var ledColor;
//         try {
//           ledColor = request.data.request.intent.slots.ledColor.resolutions.resolutionsPerAuthority[0].values[0].value.name
//         } catch(exception) {
//           console.log(exception.toString());
//         }
//         candyMachine.lightLed(ledColor, function(success) {
//           if(success) {
//             response.shouldEndSession(true);
//             response.say("Ok I'll do it").send();
//           } else {
//             response.shouldEndSession(true);
//             response.say("Mama mia, there was a problem ").send();
//           }
//           //console.log("success = " + success);
//         });
//
//     }
//     return false;
//   }
// );
app.launch(function(request, response) {
  console.log("launch event")
  candyMachine.dispenceCandy("medium", function(success) {
    if(success) {
      response.say("Here is the candy, don't feed it to the cat").send();
    } else {
      response.say("Mama mia, there is a problem. ").send();
    }
  });

  // because this is an async handler
  return false;
});

// connect to lambda
exports.handler = app.lambda();
