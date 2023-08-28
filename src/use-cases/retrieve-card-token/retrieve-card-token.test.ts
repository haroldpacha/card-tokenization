import * as retrieveToken from '@adapters/secondary/database-adapter/database-adapter';

import {
  PublicCardTokenDto
} from '@dto/card-token';

import { retrieveCardTokenUseCase } from '@use-cases/retrieve-card-token/retrieve-card-token';

let cardTokenDto: PublicCardTokenDto;
let retrieveCardTokenSpy: jest.SpyInstance;

describe('retrieve-customer-use-case', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-08-28'));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    cardTokenDto = {
      token: "EKZhHwuJEZuSnvWU",
      card_number: "4111111111111111",
      expiration_year: "2025",
      expiration_month: "09",
      email: "aaaaaaaaa@hotmail.com"
    };

    retrieveCardTokenSpy = jest
      .spyOn(retrieveToken, 'retrieveToken')
      .mockResolvedValue(cardTokenDto);
  });

  it('should return an error if the card token is not valid', async () => {
    expect.assertions(1);

    // arrange
    cardTokenDto.token = '5645';
    retrieveCardTokenSpy.mockResolvedValueOnce(cardTokenDto);

    // act / assert
    await expect(
retrieveCardTokenUseCase('111')).
rejects.toThrowErrorMatchingInlineSnapshot(`"[{"instancePath":"/token","schemaPath":"#/properties/token/minLength","keyword":"minLength","params":{"limit":16},"message":"must NOT have fewer than 16 characters"}]"`);
  });

});
