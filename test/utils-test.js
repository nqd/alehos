'use strict';
let Alehos = require('../index');
let events = require('./events.json');

describe('Utils', () => {
  let app;
  beforeEach(() => {
    app = new Alehos();
  });
  describe('getHlrFn', () => {
    beforeEach(() => {
      app.discover = function(_req, _cb) {};
      app.onoff = function(_req, _cb) {};
      app.temperature = function(_req, _cb) {};
      app.percentage = function(_req, _cb) {};
      app.healthCheck = function(_req, _cb) {};
    });
    let expect = require('chai').expect;
    it('should call discovery fnc from discovery event', () => {
      const event = events.reqDiscovery;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.discover);
    });
    it('should call on/off fnc from turnOn event', () => {
      const event = events.reqTurnOn;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.onoff);
    });
    it('should call on/off fnc from turnOff event', () => {
      const event = events.reqTurnOff;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.onoff);
    });
    it('should call temperature fnc from set target temperature event', () => {
      const event = events.reqSetTargetTemperature;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.temperature);
    });
    it('should call temperature fnc from inc target temperature event', () => {
      const event = events.reqIncTargetTemperature;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.temperature);
    });
    it('should call temperature fnc from dec target temperature event', () => {
      const event = events.reqDecTargetTemperature;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.temperature);
    });
    it('should call percentage fnc from set percentage event', () => {
      const event = events.reqSetPercentage;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.percentage);
    });
    it('should call percentage fnc from inc percentage event', () => {
      const event = events.reqIncPercentage;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.percentage);
    });
    it('should call percentage fnc from dec percentage event', () => {
      const event = events.reqDecPercentage;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.percentage);
    });
    it('should call health check fnc from health check event', () => {
      const event = events.reqHealthCheck;

      let hlrFn = app.getHlrFn(event.header.name);

      expect(hlrFn).to.eq(app.healthCheck);
    });
  });
});
