import { StackContext, Api, NextjsSite, Cognito, Table, AppSyncApi } from "sst/constructs";

export function SSTExpoStarterStack({ stack }: StackContext) {

  const appsyncDir = 'packages/functions/src/appsync'





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

  const defaults = {
    function: {
      environment: {
        TODOS_TABLE: todos_table.tableName
      },

    }
  }

  const appSync = new AppSyncApi(stack, 'appsync', {
    schema: 'packages/schema/schema/main.graphql',
    resolvers: {
      "Query todos": `${appsyncDir}/Query.todos`,
      "Mutation todoCreate": `${appsyncDir}/Mutation.todoCreate`,
      "Mutation todoComplete": `${appsyncDir}/Mutation.todoComplete`,
      "Mutation todoDelete": `${appsyncDir}/Mutation.todoDelete`,
    },
    defaults
  })

  appSync.bind([todos_table])

  

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
    defaults
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
