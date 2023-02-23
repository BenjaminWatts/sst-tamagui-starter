import { StackContext, Api, NextjsSite, Cognito } from "sst/constructs";

export function SSTExpoStarterStack({ stack }: StackContext) {

  require('dotenv').config({ path: '.env' })

  const cognito = new Cognito(stack, "CognitoPool", {
    login: ["email"],
  })

  const api = new Api(stack, "api", {
    cors: false,
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "ANY /graphql": "packages/functions/src/apollo.handler",
    },
  });

  const {SECRET_COOKIE_PASSWORD} = process.env
  if(!SECRET_COOKIE_PASSWORD) throw new Error('SECRET_COOKIE_PASSWORD not set in .env file')

  const nextSite = new NextjsSite(stack, 'WebApp', {
    path: 'apps/next',
    buildCommand: "yarn run open-next@latest build", // default
    cdk: {
      server: {

      }
    },
    environment: {
      SECRET_COOKIE_PASSWORD, // note must be > 32 chars
    }
  })

  stack.addOutputs({
    ApiEndpoint: `${api.url}/graphql`,
    NextSite: nextSite.url ? nextSite.url : 'http://localhost:3000/'
  });

}
