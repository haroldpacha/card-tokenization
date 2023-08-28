import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  CardTokenDto,
  NewCardTokenDto,
} from '@dto/card-token';

import { ValidationError } from '@errors/validation-error';
import { createCardTokenUseCase } from '@use-cases/create-card-token';
import { errorHandler } from '@packages/apigw-error-handler';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { authMiddleware} from '@shared/auth';
import { logger } from '@packages/logger';
import middy from '@middy/core';
import { schema } from './create-card-token.schema';
import { schemaValidator } from '@packages/schema-validator';

export const createCardTokenAdapter = async ({
  body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!body) throw new ValidationError('no card body');

    const cardToken: NewCardTokenDto = JSON.parse(body);

    schemaValidator(schema, cardToken);
    logger.info(`Card: ${JSON.stringify(cardToken)}`);

    const createdToken: CardTokenDto =
      await createCardTokenUseCase(cardToken);
    
    logger.info(`Card token created: ${JSON.stringify(createdToken)}`);

    return {
      statusCode: 201,
      body: JSON.stringify(createdToken),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const handler = middy(createCardTokenAdapter)
  .use(injectLambdaContext(logger))
  .use(authMiddleware());
