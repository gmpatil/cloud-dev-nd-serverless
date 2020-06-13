import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from "../../utils/utils";
import { createLogger } from '../../utils/logger' ;
import * as bld from '../../businessLogic/todoBl' ;

const logger = createLogger("generateUploadUrl");

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent)
  :Promise<APIGatewayProxyResult> => {
  logger.debug("generateUploadUrl.handler - in"); 

  const todoId = event.pathParameters.todoId

  logger.debug("generateUploadUrl.handler - out");   
  return undefined
}
