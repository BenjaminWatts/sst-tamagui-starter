import { StackContext, Api, NextjsSite, Cognito, Table } from "sst/constructs";

export function SSTExpoStarterStack({ stack }: StackContext) {

  const todos_table = new Table(stack, 'todos', {
    primaryIndex: {
      partitionKey: 'user_id',
      sortKey: 'todo_id'
    },
    fields: {
      user_id: 'string',
      todo_id: 'string'
    }
  })

  require('dotenv').config({ path: '.env' })

  const cognito = new Cognito(stack, "CognitoPool", {
    login: ["email"],
    cdk: {
      userPoolClient: {
        authFlows: {
          userPassword: true,
        }
      }
    }
    
  })

  const api = new Api(stack, "api", {
    cors: false,
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "ANY /graphql": "packages/functions/src/apollo.handler",
    },
    defaults: {
      function: {
        environment: {
          TODOS_TABLE: todos_table.tableName
        }
      }
    }
  });

  api.attachPermissions([todos_table])

  const {SECRET_COOKIE_PASSWORD} = process.env
  if(!SECRET_COOKIE_PASSWORD) throw new Error('SECRET_COOKIE_PASSWORD not set in .env file')

  const nextSite = new NextjsSite(stack, 'WebApp', {
    path: 'apps/next',
    buildCommand: "yarn run build", // default
    cdk: {
      server: {

      }
    },
    environment: {
      SECRET_COOKIE_PASSWORD, // note must be > 32 chars
      // COGNITO_CLIENT_ID: cognito.userPoolClientId,
      // COGNITO_USER_POOL_ID: cognito.userPoolId,
      NEXT_PUBLIC_AWS_REGION: stack.region,
      NEXT_PUBLIC_COGNITO_CLIENT_ID: cognito.userPoolClientId,
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: cognito.userPoolId,
    }
  })

  stack.addOutputs({
    ApiEndpoint: `${api.url}/graphql`,
    NextSite: nextSite.url ? nextSite.url : 'http://localhost:3000/',
    region: stack.region,
    CognitoPoolId: cognito.userPoolClientId
  });

}
