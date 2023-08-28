import { PublicCardTokenDto } from '@dto/card-token';
import { logger } from '@packages/logger';
import { retrieveToken } from '@adapters/secondary/database-adapter';
import { schema } from '@schemas/public-card-token.schema';
import { schemaValidator } from '@packages/schema-validator';
import { CardTokenNotFoundOrExpiredError } from '@errors/card-token-not-found-or-expired-error';

export async function retrieveCardTokenUseCase(
  token: string
): Promise<PublicCardTokenDto> {
  const cardToken: PublicCardTokenDto = await retrieveToken(token);

  if (!cardToken.token) {
    throw new CardTokenNotFoundOrExpiredError(`Token ${token} not found or has expired`);
  }

  logger.info(`retrieved card token for ${token}`);

  schemaValidator(schema, cardToken);
  logger.debug(`card token validated for ${cardToken.token}`);

  return cardToken;
}
