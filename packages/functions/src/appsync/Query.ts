import { QueryTodosArgs, TodosResponse } from "@sst-tamagui-starter/core/g";
import * as db from '@sst-tamagui-starter/core/db'

const user_id = 'user_id'

export const todos = async (event: {
    arguments: QueryTodosArgs
}, context: any):Promise<TodosResponse> => {
    console.log(event)
    const {last_id} = event.arguments
    return db.todo.todos({last_id, user_id})
}