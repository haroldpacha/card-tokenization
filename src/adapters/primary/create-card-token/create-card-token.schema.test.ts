import { schema } from './create-card-token.schema';
import { schemaValidator } from '@packages/schema-validator';

describe('create-card-token-schema', () => {
  it('should validate successfully a valid object', () => {
    // arrange
    const payload = {
      email:"jose@hotmail.com",
      card_number:"4111111111111111",
      cvv:"123",
      expiration_year:"2025",
      expiration_month:"09"
    };
    // act / assert
    expect(() => schemaValidator(schema, payload)).not.toThrow();
  });

  it('should not validate if the email is null', () => {
    // arrange
    const payload = {
      email: null,//invalid
      card_number: "4111111111111111",
      cvv: "123",
      expiration_year: "2025",
      expiration_month: "09"
    };
    // act / assert
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{"instancePath":"/email","schemaPath":"#/properties/email/type","keyword":"type","params":{"type":"string"},"message":"must be string"}]"`
    );
  });

  it('should not validate if the email is invalid', () => {
    const payload = {
      email: 'jose@microsoft.com',//invalid
      card_number: "4111111111111111",
      cvv: "123",
      expiration_year: "2025",
      expiration_month: "09"
    };
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\"instancePath\":\"/email\",\"schemaPath\":\"#/properties/email/pattern\",\"keyword\":\"pattern\",\"params\":{\"pattern\":\"^[\\\\w]+@(hotmail\\\\.com|gmail\\\\.com|yahoo\\\\.es)$\"},\"message\":\"must match pattern \\\"^[\\\\w]+@(hotmail\\\\.com|gmail\\\\.com|yahoo\\\\.es)$\\\"\"}]"`
    );
  });

  it('should not validate if the card number is invalid', () => {
    // arrange
    const payload = {
      email:"jose@hotmail.com",
      card_number:"4111111111111112",//invalid
      cvv:"123",
      expiration_year:"2025",
      expiration_month:"09"
    };
    // act / assert
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\"instancePath\":\"/card_number\",\"schemaPath\":\"#/properties/card_number/format\",\"keyword\":\"format\",\"params\":{\"format\":\"card_number\"},\"message\":\"must match format \\\"card_number\\\"\"}]"`
    );
  });
});
