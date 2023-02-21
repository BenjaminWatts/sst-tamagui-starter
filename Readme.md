# SST and Tamagui (Expo React Native + SST) Starter

This starter gives a combined start repo for anyone looking to build a cross-platform (Web, iOS, Android), Serverless App. I created this to have a quick start for future projects. 

It fuses the starter packs created by the two following commands:

1. `npm create tamagui@latest`
2. `npx create-sst@latest my-sst-app`


## Getting Started
1. Use yarn. I suspect you could use this setup with npm without too much difficulty, but as the Tamagui Starter relies on yarn workspaces quite heavilly I have stuck with that.
2. You'll need to do a `yarn` command to install all the packages. 
3. You'll need an AWS account (obviously!)


## Frontends
1. To spinup mobile, from the `apps/expo` directory run `yarn start`.  For more details on Expo, see their excellent [documentation](https://docs.expo.dev).
2. To spinup web (NextJS), from the `apps/next` directory run `yarn start`
3. You need to manually define two environment variables DEV_API_URL, PROD_API_URL in `apps/expo/.env` to fire up the mobile app. Both are outputs `ApiEndpoint` from the SST stack. You'll want to set them from your local dev and production environment respectively. Note, you ocassionally get a conflict from the `.next` and `.open-next` directories of the next app when starting the metro bundler. If so, delete both these directories before restarting.

![ iOS Screenshot](/screenshots/ios.png | "View from an iOS Emulator")
![ Android Screenshot](/screenshots/android.png  | "View from an Android Emulator")
![ Web Screenshot](/screenshots/web.png  | "View from an Chrome Browser")

### Tamagui

Tamagui is about writing code once for deployment to both React Native (mobile) and React (web.)

By creating an app package (`packages/app`), layout components can be defined once, and then hooked into the respective pages/screens in the mobile/web app. So the landing page is defined here `packages/app/features/home/screen.tsx`, and imported in both `apps/next/pages/index.tsx` and `packages/app/navigation/native/index.tsx`.


## Backend

SST endorses `domain driven design`, which in a nutshell means you should put your business logic into the core package `packages/core` and the wrapper/access functions to access this logic (e.g. API handlers) into the `packages/functions` directory. The monorepo is setup so that (hopefully!), this can access and package/bundle as necessary the business logic in the core directory.

SST enables you to spin up multiple, self-contained environments for development (within the same AWS account, though best practice is to separate your production environment!).

To spin-up a user specific debug environment for just your machine, run `yarn run dev` from the root directory, and then `yarn run console`, which will give you a webpage to open in your local browser. Note, this will use the default AWS account profile. If you want to vary this, consider an environment variable `AWS_PROFILE`. See notes below RE Graphql Playground.

The sheer beauty of SST is it's dev environment, which in summary:

1. Deploys permanent infrastructure to AWS, checks for changes in the infrastructure `stacks/sstExpo.ts` file and prompts you to confirm (by pressing enter) to  trigger a Cloudformation update. Such changes include IAM roles, DynamoDB Tables, Cognito Pools, RDS etc.
2. Creates proxies for each of the Lambda functions and proxies them to your local machine. This means that code changes to the functions defined in the `packages/functions` are instantly updated, but also accessible for development both locally, but also via the public URL created by AWS API Gateway, which is great for Mobile (and especially iOS development).


## COMING SOON -- NextJS Hosting

This is both backend and frontend - so deserves is own section! SST is capable of building and deploying your NextJS site to AWS using a combination of Cloudfront/S3 for static and an AWS Lambda Function for server side content. An example configuration for this is defined in the Stack. Note:

1. Cache invalidation on deployment really slows down whole deployment process.
2. You may prefer to use Vercel to deploy your frontend separately.
3. The default config establishes a Cloudfront domain for your website. You can easilly add a custom domain using an AWS HTTPS certificate (issued in us-east-1 irrespective of where your overall stack is!), following the instructions [here](https://sst.dev/examples/how-to-create-a-nextjs-app-with-serverless.html).  

## Graphql

Apollo Client and Server are used to glue together the backend with various frontends. The typescript, schema first generator enables complete type safety for both front and backend. Apollo Client is available both for web and react native. So Apollo is, all-in-all a great choice for wide platform coverage.

The graphql schema for the app is defined in `package/schema`.

### API Gateway Deployment - for mobile app

The typed Graphql Resolvers defined in `packages/core/src/apollo.ts` ensure complete typesafety.

To open the graphql playground, you will need to navigate your browser to the `/graphql` endpoint of the API Gateway that is created, e.g. `https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/graphql`. The domain is outputted from the stack as `ApiEndpoint`, and is visible on the stacks screen of SST.

### NextJS api/graphql - for NextJS app

Deploying the Graphql app to the endpoint `/api/graphql` enables the web app to make same domain requests for the graphql api. It will enable NextJS authentication (cookies etc) to be used for authentication, whereas the mobile (API Gateway Deployment) can rely on JSON WebTokens. 

## To Use Yourself

If you want to go ahead and re-use this starter for your own project, you will probably want to rename the stack and package names in the following files:

1. SSTExpoStarterStack in `sst.config.ts` and `stacks/sstExpo.ts`
2. The name "sst-tamagui-starter" and aws region (I defaulted to Ireland) in `sst.config.ts`.
3. To run a development stack, run `yarn run dev`.

### Production Deployment

To spin-up a completely separate production deployment, run `sst deploy --stage=prod`.
