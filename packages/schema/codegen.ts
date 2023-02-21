import type { CodegenConfig } from '@graphql-codegen/cli'
 
const frontendConfig = {
    schema: 'schema/*.graphql',
    documents: 'documents/*.graphql',
    // plugins: ['typescript', ''],
    preset: 'client',
    config: {
      avoidOptionals: true
    }
  }

const backendConfig = {
  schema: 'schema/*.graphql',
  // documents: 'documents/*.graphql',
  plugins: ['typescript', 'typescript-operations', 'typedefs', 'typescript-resolvers'],
  config: {
    avoidOptionals: true
  }
}

const config: CodegenConfig = {
  generates: {
    // '../../apps/expo/g.tsx': frontendConfig,
    // '../../apps/next.tsx': frontendConfig,
    '../app/g/': frontendConfig,
    '../core/src/g.ts': backendConfig,
  }
}
export default config