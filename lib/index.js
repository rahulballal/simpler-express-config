'use strict';
const ConfigurationProvider = require('./ConfigurationProvider');
let instance = null;

exports = module.exports = function(configurationRootPath, overrideConfig){
    if(instance){
        return instance;
    }else{
        instance = new ConfigurationProvider(configurationRootPath, overrideConfig);
        instance.init();
        return instance;
    }
}
