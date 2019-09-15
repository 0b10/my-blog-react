import assert from "assert";
import fs from "fs";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import apolloClientFactory from "../../apollo";

// >>> MOCK APOLLO CLIENT >>>
const schema_ = fs.readFileSync("src/graphql/schema.graphql", { encoding: "UTF-8", flag: "r" });

export const schema = `${schema_}`;
assert(
  schema && schema.length > 0,
  "The schema wasn't correctly imported from the schema.graphql file"
);
export const mockApolloClient = (resolvers: IResolvers, enableCache = false) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });
  const mockSchemaLink = new SchemaLink({ schema: executableSchema });
  return apolloClientFactory(undefined, enableCache, mockSchemaLink);
};

export const postsDummyProps = Object.freeze({
  routeHandler: () => null,
});
