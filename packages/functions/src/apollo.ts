import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import {resolvers, typeDefs} from '@sst-tamagui-starter/core/apollo'

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
});

export const handler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
);