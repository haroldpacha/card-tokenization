import * as createToken from '@adapters/secondary/database-adapter/database-adapter';
import * as publishEvent from '@adapters/secondary/event-adapter/event-adapter';

import {
  CardTokenDto,
  NewCardTokenDto,
} from '@dto/card-token';

import { createCardTokenUseCase } from '@use-cases/create-card-token/create-card-token';

let cardTokenDto: CardTokenDto;
let newCardTokenDto: NewCardTokenDto;
let publishEventSpy: jest.SpyInstance;

describe('create-card-token-case', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    newCardTokenDto = {
      card_number: "4111111111111111",
      cvv: "123",
      expiration_year: "2025",
      expiration_month: "09",
      email: "aaaaaaaaa@hotmail.com"
    };

    cardTokenDto = {
      token: "EKZhHwuJEZuSnvWU",
      card_number: "4111111111111111",
      cvv: "123",
      expiration_year: "2025",
      expiration_month: "09",
      email: "aaaaaaaaa@hotmail.com"
    };

    jest
      .spyOn(createToken, 'createToken')
      .mockResolvedValue(cardTokenDto);

    publishEventSpy = jest
      .spyOn(publishEvent, 'publishEvent')
      .mockResolvedValue();
  });

  it('should throw an error when the new card_number dto is invalid', async () => {
    expect.assertions(1);

    // arrange
    newCardTokenDto.card_number = 'xxxxx';

    // act / assert
    await expect(
      createCardTokenUseCase(newCardTokenDto)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[{\"instancePath\":\"/card_number\",\"schemaPath\":\"#/properties/card_number/minLength\",\"keyword\":\"minLength\",\"params\":{\"limit\":13},\"message\":\"must NOT have fewer than 13 characters\"},{\"instancePath\":\"/card_number\",\"schemaPath\":\"#/properties/card_number/format\",\"keyword\":\"format\",\"params\":{\"format\":\"card_number\"},\"message\":\"must match format \\\"card_number\\\"\"}]"`
    );
  });

  it('should return the correct dto on success', async () => {
    // act
    const response = await createCardTokenUseCase(newCardTokenDto);
    // arrange / assert
    expect(response).toMatchInlineSnapshot(`
{
  "card_number": "4111111111111111",
  "cvv": "123",
  "email": "aaaaaaaaa@hotmail.com",
  "expiration_month": "09",
  "expiration_year": "2025",
  "token": "EKZhHwuJEZuSnvWU",
}
`);
  });
});
