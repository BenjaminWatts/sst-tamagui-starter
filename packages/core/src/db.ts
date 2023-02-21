import * as g from './g'

export const author = {
    id: (id: string): g.Author => ({
        id: '123',
        name: 'Ms Author',
        thumbnail: 'image.png',
        posts: null
    })
}

export const post = {
    recentPosts: (): g.Post[] => [{
        id: '3',
        title: "My Post",
        text: "Post Text",
        category: 'New',
        author: null,
        authorId: '123'
    }],
    byAuthor: (authorId: string) => 
        [{
            id: '3',
            title: "My Post",
            text: "Post Text",
            category: 'New',
            author: null,
            authorId: authorId
        }]
}