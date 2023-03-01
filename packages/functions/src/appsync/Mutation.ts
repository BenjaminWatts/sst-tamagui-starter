import * as g from "@sst-tamagui-starter/core/g";
import * as db from '@sst-tamagui-starter/core/db'

const user_id = 'user_id'

export const todoCreate = async (event: {
    arguments: g.MutationTodoCreateArgs
}, context: any):Promise<g.Todo> => {
    console.log(event)
    return db.todo.create({user_id, ...event.arguments.input})
}

export const todoComplete = async (event: {
    arguments: g.MutationTodoCompleteArgs
}, context: any):Promise<g.Todo> => {
    const {todo_id} = event.arguments
    return db.todo.complete({user_id, todo_id}) as any
}

export const todoDelete = async (event: {
    arguments: g.MutationTodoDeleteArgs
}, context: any):Promise<g.Todo> => {
    console.log(event)
    const {todo_id} = event.arguments
    return db.todo.delete({user_id, todo_id}) as any
}