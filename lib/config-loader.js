/**
 * Author: Tymoteusz Paszun
 * Date: 14.06.2013
 * Time: 00:21
 */

var fs = require('fs');

/**
 * Loads and parses config specification object
 *
 * @param {Object} spec
 * @returns {Object}
 * @api private
 */

function loadSpec(spec) {

  function iterateProps(obj) {
    var i
      , prop
      , envVarVal;

    for(i in obj) {
      if (obj.hasOwnProperty(i)) {
        prop = obj[i];

        if (typeof prop !== 'object' || obj instanceof Array) // property or group property should be an object
          throw new Error('Invalid config specification format.');

        if (prop.hasOwnProperty('default')) { // if has `default` property it is config property
          if (prop.hasOwnProperty('envVar') && process.env.hasOwnProperty(prop.envVar)) { // if has `envVar` property try to load value from env
            envVarVal = process.env[prop.envVar];
            switch (typeof prop.default) {
              case 'string':
                break;
              case 'number':
                envVarVal = Number(envVarVal);
                break;
              case 'boolean':
                envVarVal = envVarVal.toLowerCase();
                if (envVarVal === 'true') envVarVal = true;
                else if (envVarVal === 'false') envVarVal = false;
                else throw new Error('Invalid config specification format. Invalid boolean value: ' + process.env[prop.envVar]);
                break;
              default:
                throw new Error('Invalid config specification format. Unsupported type: ' + typeof obj.default);
            }
            obj[i] = envVarVal;
          } else {
            obj[i] = prop.default;
          }
        } else iterateProps(prop); // elsewhere it is a properties group
      }
    }
  }

  iterateProps(spec);

  return spec;
}

exports = module.exports = function load(spec) {
  if (typeof spec !== 'object')
    throw new Error('Invalid argument type (' + typeof spec + ')! Only objects allowed');
  else
    return loadSpec(spec);
};
