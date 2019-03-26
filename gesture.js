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
      led2: { driver: "led", pin: 2, connection: "arduino" },
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
                    brightness = 0;
                    my.led2.turnOn();
                    break;
                case "stop":
                    console.log("Turning led2 Off for Circle stop");
                    my.led2.turnOff();
                    my.led2.brightness(0);
                    break;
              }
              break;
        }
      });
    });
  }
    
}).start();