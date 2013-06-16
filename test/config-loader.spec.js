/**
 * Author: Tymoteusz Paszun
 * Date: 14.06.2013
 * Time: 01:20
 */

var expect = require('chai').expect
  , assert = require('chai').assert
  , path = require('path')
  , configLoader = require('../lib/config-loader');

describe('config-loader', function() {
  it('should be a function', function() {
    expect(configLoader).to.be.a('function');
  });

  it('should load correct JSON file', function() {
    var config = configLoader(require('./fixtures/config-spec.json'));

    expect(config).to.deep.equal({
      firstLevelGroup: {
        secondLevelGroup : {
          thirdLevelGroup: {
            fourthLevelProp: 'test'
          },
          thirdLevelProp: 123
        },
        secondLevelProp: true
      },
      firstLevelProp: 'someValue',
      anotherFirstLevelProp: 456
    });
  });

  it('should load correct specification object', function() {
    var config
      , configSpec = {
      prop: {
        'default': 1,
        envVar: 'CONFIG_PROP'
      }
    };

    config = configLoader(configSpec);

    expect(config).to.be.an('object');
  });

  it('when envVar not defined should load default value', function() {
    var config = configLoader({
        intProp: {
          "default": 1
        }
      });

    expect(config).to.deep.equal({
      intProp: 1
    });
  });

  it('when envVar not found in process.env should load default value', function() {
    var config = configLoader({
      intProp: {
        "default": 1,
        envVar: 'TEST_INT_PROP'
      }
    });

    expect(config).to.deep.equal({
      intProp: 1
    });
  });

  it('when envVar defined should load value from process.env[envVal]', function() {
    var config;

    process.env.TEST_INT_PROP = 2;

    config = configLoader({
      intProp: {
        "default": 1,
        envVar: 'TEST_INT_PROP'
      }
    });

    expect(config).to.deep.equal({
      intProp: 2
    });

    delete process.env.TEST_INT_PROP;
  });

  it('should properly parse int property from process.env', function() {
    var config;

    process.env.TEST_INT_PROP = 5;

    config = configLoader({
      intProp: {
        'default': 1,
        envVar: 'TEST_INT_PROP'
      }
    });

    expect(config).to.deep.equal({
      intProp: 5
    });

    delete process.env.TEST_INT_PROP;
  });

  it('should properly parse string property from process.env', function() {
    var config;

    process.env.TEST_STRING_PROP = 'TEST VALUE';

    config = configLoader({
      stringProp: {
        'default': 'SOME VALUE',
        envVar: 'TEST_STRING_PROP'
      }
    });

    expect(config).to.deep.equal({
      stringProp: 'TEST VALUE'
    });

    delete process.env.TEST_STRING_PROP;
  });

  it('should properly parse bool property from process.env', function() {
    var config;

    process.env.TEST_BOOL_PROP = false;

    config = configLoader({
      boolProp: {
        'default': true,
        envVar: 'TEST_BOOL_PROP'
      }
    });

    expect(config).to.deep.equal({
      boolProp: false
    });

    delete process.env.TEST_BOOL_PROP;
  });

  describe('nested properties', function() {
    it('should load second-level property', function() {
      var config = configLoader({
        group: {
          prop: {
            'default': 'test'
          },
          another: {
            'default': 1,
            envVar: 'TEST_SOME_ENV_VAR'
          }
        },
        firstLvlProp: {
          'default': true
        }
      });

      expect(config).to.deep.equal({
        group: {
          prop: 'test',
          another: 1
        },
        firstLvlProp: true
      });
    });
  });

});
