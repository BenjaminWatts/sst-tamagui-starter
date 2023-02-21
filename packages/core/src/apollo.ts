import {Resolvers, typeDefs} from './g'
import * as db from './db'

export const resolvers: Resolvers = {
    Author: {
        id: x => x.id,
        name: x => x.name,
        thumbnail: x => x.thumbnail,
        posts: (x) => db.post.byAuthor(x.id)
    },
    Post: {
        id: (x) => x.id,
        title: (x) => x.title,
        category: (x) => x.category,
        author: (x) => db.author.id(x.authorId),
        authorId: x => x.authorId,
        text: x => x.text
    },
    Query: {
        authorId: (_, args) => db.author.id(args.authorId),
        recentPosts: db.post.recentPosts,
    }
}

export {typeDefs}

