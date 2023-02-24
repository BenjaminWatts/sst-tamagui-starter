// import type { NextApiRequest, NextApiResponse } from 'next'
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
// import {resolvers, typeDefs} from '@sst-tamagui-starter/core/src/apollo'
import { resolvers, typeDefs } from "@sst-tamagui-starter/core/src/apollo";

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
});

export default startServerAndCreateNextHandler(server);
