import {Resolvers, typeDefs} from './g'
import * as db from './db'

const user_id = 'user_id'

export const resolvers: Resolvers = {
    TodosResponse: {
        last_id: x => x.last_id,
        todos: x => x.todos
    },

    Todo: {
        user_id: x => x.user_id,
        todo_id: x => x.todo_id,
        text: x => x.text,
        title: x => x.title,
        completed: x => x.completed
    },

    Query: {
        todos: (i, {last_id}) => db.todo.todos({
            user_id,
            last_id
        }),
    },

    Mutation: {
        todoComplete: (_, args) => {
            const {todo_id} = args
            return db.todo.complete({user_id, todo_id}) as any
        },
        todoCreate: async (_, args) => {
            const {text, title} = args.input
            return db.todo.create({user_id, text, title}) as any
        },
        todoDelete: (_, args) => {
            console.log(args)
            const {todo_id} = args
            return db.todo.delete({user_id, todo_id}) as any
        }
    }
}

export {typeDefs}

