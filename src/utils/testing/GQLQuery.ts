import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const graphql = (json: any) => ({
  query: jsonToGraphQLQuery(json, {
    pretty: true,
  }),
});

export * from 'json-to-graphql-query';
