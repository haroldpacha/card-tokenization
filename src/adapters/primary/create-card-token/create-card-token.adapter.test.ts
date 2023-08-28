import * as createCardTokenUseCase from '@use-cases/create-card-token/create-card-token';

import {
  CreateCardTokenDto,
  CardTokenDto,
  NewCardTokenDto,
  PublicCardTokenDto,
} from '@dto/card-token';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { createCardTokenAdapter } from '@adapters/primary/create-card-token/create-card-token-adapter';

let event: Partial<APIGatewayProxyEvent>;
let cardTokenDto: CardTokenDto;

describe('create-card-token-handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    cardTokenDto = {
      token:"EyOax6cWo0ZodxpI",
      email:"jose@hotmail.com",
      card_number:"4111111111111111",
      cvv:"123",
      expiration_year:"2025",
      expiration_month:"09"
    };

    jest
      .spyOn(createCardTokenUseCase, 'createCardTokenUseCase')
      .mockResolvedValue(cardTokenDto);

    const payload: NewCardTokenDto = {
      email:"jose@hotmail.com",
      card_number:"4111111111111111",
      cvv:"123",
      expiration_year:"2025",
      expiration_month:"09"
    };

    event = {
      body: JSON.stringify(payload),
    };
  });

  it('should return the correct response on success', async () => {
    // act & assert
    await expect(createCardTokenAdapter(event as any)).resolves
      .toMatchInlineSnapshot(`
{
  "body": "{"token":"EyOax6cWo0ZodxpI","email":"jose@hotmail.com","card_number":"4111111111111111","cvv":"123","expiration_year":"2025","expiration_month":"09"}",
  "statusCode": 201,
}
`);
  });

  it('should return the correct response on error', async () => {
    // arrange
    event = {} as any;

    // act & assert
    await expect(createCardTokenAdapter(event as any)).resolves
      .toMatchInlineSnapshot(`
{
  "body": ""no card body"",
  "statusCode": 400,
}
`);
  });
});
