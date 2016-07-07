'use strict';
const ConfigProvider = require('../../index')(process.cwd() + '/test/mockserver/config/', null);
const Express = require('express');

const App = Express();

App.get('/', function(req, res) {
    return res.json(ConfigProvider.Configuration);
});

exports = module.exports = App;