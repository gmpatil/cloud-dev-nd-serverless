import * as AWSb from 'aws-sdk';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';
import { deleteAttachement } from './attachementS3';

import { createLogger } from '../utils/logger' ;

const logger = createLogger("todoDb");

const AWSXRay = require('aws-xray-sdk');

const AWS = AWSXRay.captureAWS(AWSb)

const dbDocClient = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
const tbl = process.env.TODOS_TABLE
const idx = process.env.TODOS_USR_INDEX

export async function createTodo(todoDb: TodoItem): Promise<TodoItem> {
    logger.debug("todoDb.createTodo - in");    

    await dbDocClient.put({
        TableName: tbl,
        Item: todoDb
    }).promise();

    logger.debug("todoDb.createTodo - out");    
    return todoDb;
}

export async function getTodo(userId: string, todoId: string): Promise<TodoItem> {
    logger.debug("todoDb.getTodo - in");    

    const result = await dbDocClient.get({
        TableName: tbl,
        Key: {
            userId: userId,
            todoId: todoId
        }
    }).promise();

    logger.debug("todoDb.getTodo - out");        
    return result.Item as TodoItem;
}

export async function getTodoByUser(userId: string): Promise<TodoItem[]> {
    logger.debug("todoDb.getTodoByUser - in");    

    const result = await dbDocClient.get({
        TableName: tbl,
        IndexName: idx,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
        Key: { userId: userId }
    }).promise();

    logger.debug("todoDb.getTodoByUser - out");        
    return result.Items as TodoItem[];
}

export async function updateTodo(userId: string, todoId: string, upd: TodoUpdate): Promise<TodoUpdate> {
    logger.debug("todoDb.updateTodo - in");    

    // Name is reserved word in DynamoDB.
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
    const res = await dbDocClient.update({
        TableName: tbl,
        Key: { userId: userId, todoId: todoId },
        UpdateExpression: "set #name=:nm, dueDate=:dd, done=:dn",
        ExpressionAttributeValues: {
            ":nm": upd.name,
            ":dd": upd.dueDate,
            ":dn": upd.done
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();

    logger.debug("todoDb.updateTodo - out");        
    return res.Attributes;
}

export async function deleteTodo(userId: string, todoId: string): Promise<void> {
    logger.debug("todoDb.deleteTodo - in");            
    // Delete attachement from S3 bucket
    const todo :TodoItem = await getTodo(userId, todoId);
    if (todo) {
        if (todo.attachmentUrl) {
            await deleteAttachement(todoId);
        }
    }

    await dbDocClient.delete( {TableName: tbl, Key: { userId, todoId } }).promise();

    logger.debug("todoDb.deleteTodo - out");            
  }