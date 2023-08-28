import * as retrieveCardTokenUseCase from '@use-cases/retrieve-card-token/retrieve-card-token';

import {
  CardTokenDto,
  PublicCardTokenDto
} from '@dto/card-token';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { retrieveCardTokenAdapter } from '@adapters/primary/retrieve-card-token/retrieve-card-token-adapter';

let event: Partial<APIGatewayProxyEvent>;
let cardToken: PublicCardTokenDto;

describe('retrieve-card-token-handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    cardToken = {
      token:"60npTHTPUk03eAOq",
      email:"jose@hotmail.com",
      card_number:"4111111111111111",
      expiration_year:"2025",
      expiration_month:"09"
    };

    jest
      .spyOn(retrieveCardTokenUseCase, 'retrieveCardTokenUseCase')
      .mockResolvedValue(cardToken);

    event = {
      pathParameters: {
        id: '60npTHTPUk03eAOq',
      },
    };
  });

  it('should return the correct response on success', async () => {
    // act & assert
    await expect(retrieveCardTokenAdapter((event as any))).resolves.
toMatchInlineSnapshot(`
{
  "body": "{"token":"60npTHTPUk03eAOq","email":"jose@hotmail.com","card_number":"4111111111111111","expiration_year":"2025","expiration_month":"09"}",
  "statusCode": 200,
}
`);
  });

  it('should return the correct response on error', async () => {
    // arrange
    event = {} as any;

    // act & assert
    await expect(retrieveCardTokenAdapter((event as any))).resolves.
toMatchInlineSnapshot(`
{
  "body": ""no id in the path parameters of the event"",
  "statusCode": 400,
}
`);
  });
});
