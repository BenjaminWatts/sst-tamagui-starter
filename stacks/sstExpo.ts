import { StackContext, Api, NextjsSite } from "sst/constructs";

export function SSTExpoStarterStack({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    cors: false,
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "ANY /graphql": "packages/functions/src/apollo.handler",
    },
  });

  const nextSite = new NextjsSite(stack, 'WebApp', {
    path: 'apps/next'
  })

  stack.addOutputs({
    ApiEndpoint: `${api.url}/graphql`,
    NextSite: nextSite.url ? nextSite.toString() : 'http://localhost:3000/'
  });

}
