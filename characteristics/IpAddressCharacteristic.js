var bleno = require('bleno');
var util = require('util');
var os = require('os');

var BlenoCharacteristic = bleno.Characteristic;

var IpAddressCharacteristic = function () {
  IpAddressCharacteristic.super_.call(this, {
    uuid: 'bb02',
    properties: ['read'],
    value: null
  });

  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(IpAddressCharacteristic, BlenoCharacteristic);

IpAddressCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var interfaces = JSON.stringify(os.networkInterfaces());
  if(interfaces.hasOwnProperty("wlan0")){
    callback(this.RESULT_SUCCESS, new Buffer(os.networkInterfaces().wlan0[0].address));
  }
  else{
    callback(this.RESULT_SUCCESS, new Buffer(0));
  }
};

module.exports = IpAddressCharacteristic;