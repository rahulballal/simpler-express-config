# Simpler Express Config
Simpler Node Config is a singleton style implementation of a Configuration Provider.

### Conventions

- If `process.env.NODE_ENV` is present, say it is set to `develop` the configuration provider will look for `develop.json`.
- If `process.env.NODE_ENV` is not set, the configuration provider will look for `default.json`.
- If an override configuration file is passed the first time when configuration provider is initialized, this override file will be loaded. 

### Usage

An example `app.js` file.

```javascript
'use strict';
const configRoot = process.cwd() + '/config/' ;
const overrideConfigFileName = null;
const ConfigProvider = require('simpler-node-config')(configRoot, overrideConfigFileName);
const Express = require('express');

const App = Express();

App.get('/', function(req, res) {
    return res.json(ConfigProvider.Configuration);
});

exports = module.exports = App;
```

An example `test.js` file

```javascript
'use strict';
const ConfigProvider = require('simpler-node-config')(process.cwd() + '/test/mockserver/config/', 'override.json');
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
```