'use strict';

const ConfigProvider = require('../index')(process.cwd() + '/test/mockserver/config/', 'override.json');
const test = require('tape');
const request =  require('supertest');
const server = require('./mockserver/overridenApp');

test('Should be able to read default configuration file', (testing) => {
    const expectedConfig = require('./mockserver/config/override.json');

    request(server)
        .get('/')
        .expect(200)
        .end((err, resp) => {
            testing.error(err, 'No Error');
            testing.same(resp.body, expectedConfig, 'Configuration as expected');
            testing.end();
        });
});
