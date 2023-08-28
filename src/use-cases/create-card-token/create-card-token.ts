import * as cardTokenCreatedEvent from '@events/card-token-created';

import {
  CardTokenDto,
  NewCardTokenDto,
} from '@dto/card-token';

import { createToken } from '@adapters/secondary/database-adapter';
import { getISOString, generateToken } from '@shared/date-utils';
import { logger } from '@packages/logger';
import { publishEvent } from '@adapters/secondary/event-adapter';
import { schema } from '@schemas/card-token.schema';
import { schemaValidator } from '@packages/schema-validator';

export async function createCardTokenUseCase(
  newCard: NewCardTokenDto
): Promise<CardTokenDto> {
  const createdDate = getISOString();

  const newCardToken: CardTokenDto = {
    token: generateToken(16),
    card_number: newCard.card_number,
    cvv: newCard.cvv,
    expiration_year: newCard.expiration_year,
    expiration_month: newCard.expiration_month,
    email: newCard.email,
  };

  schemaValidator(schema, newCardToken);
  logger.debug(`card token validated for ${newCardToken.token}`);

  const createdToken = await createToken(newCardToken);
  logger.info(`card token created for ${createdToken.token}`);

  await publishEvent(
    createdToken,
    cardTokenCreatedEvent.eventName,
    cardTokenCreatedEvent.eventSource,
    cardTokenCreatedEvent.eventVersion,
    createdDate
  );

  logger.info(
    `card token created event published for ${createdToken.token}`
  );

  return createdToken;
}
