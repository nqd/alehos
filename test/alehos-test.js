'use strict';

let Alehos = require('../index');
let expect = require('chai').expect;

let app = new Alehos();
describe('Alehos', () => {
  it('should return not supported for not register service yet', () => {
    const event = {
      'header': {
        'messageId': '243550dc-5f95-4ae4-ad43-4e1e7cb037fd',
        'name': 'HealthCheckRequest',
        'namespace': 'Alexa.ConnectedHome.System',
        'payloadVersion': '2'
      },
      'payload': {
        'initiationTimestamp': '1435302567000'
      }
    };
    const context = {};
    console.log(app);

    app.handler(event, context, (err, payload) => {
      expect(err).to.be.null;
      expect(payload).to.be.instanceof(Object);
    });
  });
});
