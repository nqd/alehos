'use strict';

let Alehos = require('../index');
let sinon = require('sinon');
let expect = require('chai').expect;
let events = require('./events.json');

let app;

describe('Alehos', () => {
  beforeEach(() => {
    app = new Alehos();
  });
  it('should return not supported for not register service yet', () => {
    const event = events.reqHealthCheck;
    const context = {};

    app.handler(event, context, (err, payload) => {
      expect(err).to.be.null;
      expect(payload).to.be.instanceof(Object)
        .and.has.property('header')
        .that.has.property('name', 'UnsupportedOperationError');
    });
  });

  it('should call the equivalent fuc with provided request type', () => {
    // given
    const event = events.reqHealthCheck;
    const context = {};
    app.healthCheck = sinon.spy();
    // when
    app.handler(event, context, (_err, _payload) => {});
    // then
    sinon.assert.calledWith(app.healthCheck, sinon.match.has('event', event));
  });
});
