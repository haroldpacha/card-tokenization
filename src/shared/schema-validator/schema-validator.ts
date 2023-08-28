import Ajv from 'ajv';
import { ValidationError } from '@errors/validation-error';
import addFormats from 'ajv-formats';

export function schemaValidator(schema: Record<string, any>, body: any) {
  const ajv = new Ajv({
    allErrors: true,
  });

  ajv.addFormat('card_number', cardNumberFormat);
  ajv.addFormat('expiration_year', expirationYearFormat);
  ajv.addFormat('expiration_month', expirationMonthFormat);

  addFormats(ajv);
  ajv.addSchema(schema);

  const valid = ajv.validate(schema, body);

  if (!valid) {
    const errorMessage = JSON.stringify(ajv.errors);
    throw new ValidationError(errorMessage);
  }
}

export function cardNumberFormat(cardNumber: any) {
  const cardNumberPase = Number(cardNumber);
  
  return !Number.isNaN(cardNumberPase) && isLuhn(cardNumber);
}

export function isLuhn(cardNumber: any) {
  const digits = cardNumber.toString().split('').map(Number);

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function expirationYearFormat(expirationYear: any) {
  const year = new Date().getFullYear();
  const maxAllowedYear = year + 5;

  return expirationYear < maxAllowedYear;
}

export function expirationMonthFormat(expirationMonth: any) {
  const expirationMonthNumber = Number(expirationMonth);

  if(Number.isNaN(expirationMonthNumber)) return false;

  return expirationMonthNumber >=1 && expirationMonthNumber <= 12;
}