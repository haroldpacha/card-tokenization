import {
  CardTokenDto,
} from '@dto/card-token';

import { schema } from './card-token.schema';
import { schemaValidator } from '../shared/schema-validator';

let body: CardTokenDto = {
  token: 'Fg5WMWEJdSB7cAgK',
  email:"jose@hotmail.com",
  card_number:"4111111111111111",
  cvv:"123",
  expiration_year:"2025",
  expiration_month:"09"
};

describe('card-token-schema', () => {
  it('should validate correctly with the correct payload', () => {
    expect(() => schemaValidator(schema, body)).not.toThrow();
  });

  it('should throw an error when there are more than 9 properties', () => {
    const badBody = {
      ...body,
      additionalProp: 'tree',
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{"instancePath":"","schemaPath":"#/maxProperties","keyword":"maxProperties","params":{"limit":6},"message":"must NOT have more than 6 properties"}]"`
    );
  });

  it('should throw an error when there are less than 9 properties', () => {
    const badBody = {};
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{"instancePath":"","schemaPath":"#/minProperties","keyword":"minProperties","params":{"limit":6},"message":"must NOT have fewer than 6 properties"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"token"},"message":"must have required property 'token'"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"card_number"},"message":"must have required property 'card_number'"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"cvv"},"message":"must have required property 'cvv'"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"expiration_year"},"message":"must have required property 'expiration_year'"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"expiration_month"},"message":"must have required property 'expiration_month'"},{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"email"},"message":"must have required property 'email'"}]"`
    );
  });

  it('should throw an error if token is not a string', () => {
    const badBody = {
      ...body,
      token: 1111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{"instancePath":"/token","schemaPath":"#/properties/token/type","keyword":"type","params":{"type":"string"},"message":"must be string"}]"`
    );
  });

  it('should throw an error if token is not valid', () => {
    const badBody = {
      ...body,
      firstName: 'MWEJdS', // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{"instancePath":"","schemaPath":"#/maxProperties","keyword":"maxProperties","params":{"limit":6},"message":"must NOT have more than 6 properties"}]"`
    );
  });
});
