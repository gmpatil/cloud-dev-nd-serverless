import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { TodoItem } from '../models/TodoItem';
import * as uuid from 'uuid' ;
import { createLogger } from '../utils/logger' ;
import * as ddb from '../dataLayer/todoDb' ;
import { TodoUpdate } from '../models/TodoUpdate';


const logger = createLogger("todoDb");

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.debug("todoBl.getTodosForUser - in");    
    const items :TodoItem[] = await ddb.getTodoByUser(userId);
    logger.debug("todoBl.getTodosForUser - out");        
    return items;
}

export async function createTodoItem(userId: string, todoBus: CreateTodoRequest) : Promise<TodoItem> {
    logger.debug("todoBl.createTodoItem - in");    

    const todoId = uuid.v4();
    const todoDb: TodoItem = {
        todoId: todoId,
        userId: userId,
        createdAt: new Date().toISOString(),
        name: todoBus.name,
        done: false,
        ...todoBus
    }

    const item :TodoItem = await ddb.createTodo(todoDb);
    logger.debug("todoBl.createTodoItem - out");        
    return item;
}

export async function updateTodoItem(userId: string, todoId: string, todoBus: UpdateTodoRequest)
    : Promise<TodoUpdate> {
        
    logger.debug("todoBl.updateTodoItem - in");
    logger.debug("todoBl.updateTodoItem - out");        
    return await ddb.updateTodo(userId, todoId, todoBus);    
}