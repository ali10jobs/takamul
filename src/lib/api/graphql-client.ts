import { GraphQLClient } from 'graphql-request';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://api.takamul.sa/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
