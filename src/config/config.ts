const convict = require('convict');

export const config = convict({
  redisHost: {
    doc: 'The database where we store card tokens',
    format: String,
    default: 'redisHost',
    env: 'REDIS_HOST',
  },
  redisPort: {
    doc: 'Port of Redis',
    format: Number,
    default: 6379,
    env: 'REDIS_PORT',
  },
  eventBus: {
    doc: 'The event bus that we publish events to',
    format: String,
    default: 'eventBus',
    env: 'EVENT_BUS',
  },
}).validate({ allowed: 'strict' });
