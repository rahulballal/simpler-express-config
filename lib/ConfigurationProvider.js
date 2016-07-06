'use strict'
const path = require('path');
const fs = require('fs');

class ConfigurationProvider {
    constructor(configRoot, configOverrideFileName){
        this._configRoot = configRoot;
        this._override = path.join(configRoot, 'configOverrideFileName');
        this._default = path.join(configRoot, `${process.env.NODE_ENV}.json`);
        this._configuration =  null;
    }

    init(){
        if(fs.existsSync(this._override)){
            fs.readFile(this._override, 'utf8', (error, data)=>{
                if(error){ throw error; }
                this._configuration = JSON.parse(data);
            });
        }else{
            fs.readFile(this._default, 'utf8', (err, data) =>{
                if(err){ throw err; }
                this._configuration = JSON.parse(data);
            });
        }
    }

    get Configuration(){
        return this._configuration;
    }
}

exports = module.exports = ConfigurationProvider;
