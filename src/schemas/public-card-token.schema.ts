export const schema = {
  type: 'object',
  required: [
    'token',
    'card_number',
    'expiration_year',
    'expiration_month',
    'email',
  ],
  maxProperties: 5,
  minProperties: 5,
  properties: {
    token: {
      type: 'string',
      minLength: 16,
      maxLength: 16,
    },
    card_number: {
      type: 'string',
      format: 'card_number',
      minLength: 13,
      maxLength: 16,
    },
    expiration_year: {
      type: 'string',
      format: 'expiration_year',
      minLength: 4,
      maxLength: 4,
    },
    expiration_month: {
      type: 'string',
      format: 'expiration_month',
      minLength: 1,
      maxLength: 2,
    },
    email: {
      type: 'string',
      pattern: "^[\\w]+@(hotmail\\.com|gmail\\.com|yahoo\\.es)$",
      minLength: 5,
      maxLength: 100,
    },
  },
};
