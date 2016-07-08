'use strict';
const test = require('tape');
const request = require('supertest');
const server = require('./mockserver/app');

test('Should be able to read default configuration file', testing => {
  const expectedConfig = require('./mockserver/config/ci.json');

  request(server)
      .get('/')
      .expect(200)
      .end((err, resp) => {
        testing.error(err, 'No Error');
        testing.same(resp.body, expectedConfig, 'Configuration as expected');
        testing.end();
      });
});
