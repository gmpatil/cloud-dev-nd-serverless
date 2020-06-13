import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/utils';
import { TodoItem } from '../../models/TodoItem'

import * as bl from '../../businessLogic/todoBl';

const logger = createLogger("createTodo");

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent)
  : Promise<APIGatewayProxyResult> => {
  logger.debug("In crateTodo - in");
  const newTodoItm: CreateTodoRequest = JSON.parse(event.body)
  const uid = getUserId(event);
  const ret: TodoItem = await bl.createTodoItem(uid, newTodoItm);
  logger.debug("In crateTodo - out");
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(ret)
  };
}
