import { randomUUID } from 'crypto'
import * as g from './g'
import {DynamoDBClient, UpdateItemCommand, PutItemCommand, DeleteItemCommand, QueryCommand} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const TableName = process.env.TODOS_TABLE
if(!TableName) {throw Error(`missing env TODOS_TABLE`)}

const client = new DynamoDBClient({region: process.env.AWS_REGION})

type TodoQuery = {user_id: string; last_id : string | null}

type UpdateTodoOptions = g.MutationTodoCompleteArgs & {user_id: string}
export const todo = {
    todos: ({last_id, user_id}: TodoQuery): Promise<g.TodosResponse> => client.send(new QueryCommand({
        TableName,
        KeyConditionExpression: 'user_id = :user_id',
        ExclusiveStartKey: last_id ? marshall({user_id, todo_id: last_id}): undefined,
        ExpressionAttributeValues: marshall({':user_id': user_id})
    })).then(({Items, LastEvaluatedKey}) => ({
        todos: Items ? Items.map((x: any) => unmarshall(x)) as any[] : [],
        last_id: LastEvaluatedKey?.todo_id.S as any
    })),
    create: async ({user_id, text, title}: {
        user_id: string;
        text: string;
        title: string;
    }): Promise<g.Todo> => {
        const Item = {
            user_id,
            todo_id: randomUUID(),
            completed: false,
            text, 
            title, 
        } as any

        await client.send(new PutItemCommand({
            TableName,
            Item: marshall(Item)
        }))

        return {
            ...Item,
            __typename: 'Todo'
        } as g.Todo
    },
    complete: ({user_id, todo_id}: UpdateTodoOptions):Promise<{
        todo_id: string;
        user_id: string;
        completed: true;
    }> => client.send(new UpdateItemCommand(
        {TableName, Key: marshall({user_id, todo_id})}
    )).then(r => ({todo_id, user_id, completed: true})),
    delete: ({user_id, todo_id}: UpdateTodoOptions): Promise<{todo_id: string}> => client.send(
        new DeleteItemCommand({
            TableName,
            Key: marshall({user_id, todo_id})
        })
    ).then(() => ({todo_id}))
}