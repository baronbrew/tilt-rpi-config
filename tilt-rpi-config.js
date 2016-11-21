#!/usr/bin/env node
var bleno = require('bleno');
var util = require('util');

var SsidCharacteristic = require('./characteristics/SsidCharacteristic.js');
var PasswordCharacteristic = require('./characteristics/PasswordCharacteristic.js');
var IpAddressCharacteristic = require('./characteristics/IpAddressCharacteristic.js');

var BlenoPrimaryService = bleno.PrimaryService;

console.log('Starting Tilt Config');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('Tilt Hub', ['bbbb']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'bbbb',
        characteristics: [
          new SsidCharacteristic(),
          new PasswordCharacteristic(),
          new IpAddressCharacteristic()
        ]
      })
    ]);
  }
});
