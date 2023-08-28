const OLD_ENV = process.env;

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('redis-host', () => {
    /* it('should return the default value', () => {
      // arrange
      const { config } = require('./config');
      // act / assert
      expect(config.get('redisHost')).toEqual('');
    }); */

    it('should return the value from enviornment variable', () => {
      // arrange
      process.env.REDIS_HOST = 'redisHostFromEnv';
      const { config } = require('./config');

      // act / assert
      expect(config.get('redisHost')).toEqual('redisHostFromEnv');
    });
  });
  describe('event-bus', () => {
    it('should return the default value', () => {
      // arrange
      const { config } = require('./config');
      // act / assert
      expect(config.get('eventBus')).toEqual('eventBus');
    });

    it('should return the value from enviornment variable', () => {
      // arrange
      process.env.EVENT_BUS = 'eventBusFromEnv';
      const { config } = require('./config');

      // act / assert
      expect(config.get('eventBus')).toEqual('eventBusFromEnv');
    });
  });
});