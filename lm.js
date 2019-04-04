"use strict";

var Cylon = require("cylon");

var fade = 1;
var brightness = 0;

Cylon.robot({

  connections: {
      leapmotion: { adaptor: "leapmotion" },
      arduino: { adaptor: "firmata", port: "//dev/ttyACM0" } //dev/ttyACM0
  },
    //assign devices pinouts
    devices: {
      led2: { driver: "led", pin: 2, connection: "arduino" },//circle  motion
      led4: { driver: "led", pin: 4, connection: "arduino" },// key tap motion
      led6: { driver: "led", pin: 6, connection: "arduino" },// screen tap motion
      led8: { driver: "led", pin: 8, connection: "arduino" },// swipe motion
      leapmotion: { driver: 'leapmotion' }
    },

  work: function(my) {
    my.leapmotion.on('frame', function(frame) {
      // if (frame.hands.length > 0) {
      var gest = frame.data.gestures;
      gest.forEach(function (gesture) {
        switch(gesture.type) {
          case "circle":
              //console.log("Circle Gesture");
              switch (gesture.state){
                case "start":
                    console.log("Turning led2 On for Circle start");
                    my.led2.turnOn();
                    break;
                case "stop":
                    console.log("Turning led2 Off for Circle stop");
                    my.led2.turnOff();
                    break;
              }

              break; 
                    // key tap motion
                case "keyTap":
                    console.log('Turning led4 on for keyTap Gesture');
                    my.led4.toggle();
                break;
                    // screen tap motion
                case "screenTap":
                console.log('Turning led6 on for screenTap Gesture');
                my.led6.toggle();
                break;
                //swipe motion
            case "Swipe":
              switch (gesture.state){
                case "start":
                  console.log("turining led8 on for Swipe start");
                  my.led8.turnOn();
                  break;
              }
          break;
        }
      });
    });
  }
    
}).start();