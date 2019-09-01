import { withPostsQuery } from "./components/withPostsQuery";
import { withPostContentQuery } from "./components/withPostContentQuery";
import apolloClientFactory from "./apollo";
import * as fakeQl from "./fakeql/fakeql-endpoints";

export { apolloClientFactory, fakeQl, withPostContentQuery, withPostsQuery };
