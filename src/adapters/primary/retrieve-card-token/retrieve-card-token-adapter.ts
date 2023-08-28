import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { PublicCardTokenDto } from '@dto/card-token';
import { ValidationError } from '@errors/validation-error';
import { errorHandler } from '@packages/apigw-error-handler';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { authMiddleware} from '@shared/auth';
import { logger } from '@packages/logger';
import middy from '@middy/core';
import { retrieveCardTokenUseCase } from '@use-cases/retrieve-card-token';

export const retrieveCardTokenAdapter = async ({
  pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!pathParameters || !pathParameters?.id)
      throw new ValidationError('no id in the path parameters of the event');

    if (pathParameters.id.length != 16)
      throw new ValidationError('token length is invalid');

    const { id } = pathParameters;
    logger.info(`card token: ${id}`);

    const cardToken: PublicCardTokenDto =
      await retrieveCardTokenUseCase(id);

    logger.info(`card token: ${JSON.stringify(cardToken)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(cardToken),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const handler = middy(retrieveCardTokenAdapter)
  .use(injectLambdaContext(logger))
  .use(authMiddleware());
