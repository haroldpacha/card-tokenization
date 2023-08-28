import { CardTokenDto, PublicCardTokenDto } from '@dto/card-token';
import { config } from '@config/config';
import { logger } from '@packages/logger';
import {createClient} from 'redis';

export async function createToken(
  cardToken: CardTokenDto
): Promise<CardTokenDto> {
  const redisHost = config.get('redisHost');
  const redisPort = config.get('redisPort');

  const redisClient = createClient({
    socket: {
      host: redisHost,
      port: redisPort,
    }
  });

  await redisClient.connect();

  await redisClient.set(cardToken.token, JSON.stringify(cardToken), {
    EX: 60 * 15
  });

  await redisClient.quit();

  logger.info(`Card token ${cardToken.token} stored`);

  return cardToken;
}

export async function retrieveToken(token: string): Promise<PublicCardTokenDto> {
  const redisHost = config.get('redisHost');
  const redisPort = config.get('redisPort');

  const redisClient = createClient({
    socket: {
      host: redisHost,
      port: redisPort,
    }
  });

  await redisClient.connect();

  const item = await redisClient.get(token);
  
  const card: CardTokenDto = JSON.parse(item ?? '{}');

  const cardToken: PublicCardTokenDto = {
    token: card.token,
    card_number: card.card_number,
    expiration_year: card.expiration_year,
    expiration_month: card.expiration_month,
    email: card.email,
  };
  
  logger.info(`Card token ${cardToken.token} retrieved`);

  return cardToken;
}
