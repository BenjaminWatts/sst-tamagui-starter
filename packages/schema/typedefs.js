const { printSchema } = require('graphql');

// module.exports = {
//     plugin: (schema, documents, config) => {
//         return [
//             'import gql from "graphql-tag";',
//             '',
//             'export const typeDefs = gql`',
//             printSchema(schema),
//             '`;',
//             '',
//         ].join('\n');
//     },
// };


module.exports = {
    plugin: (schema, documents, config) => {
        return [
            'export const typeDefs = `#graphql',
            printSchema(schema),
            '`'
        ].join('\n');
    },
};