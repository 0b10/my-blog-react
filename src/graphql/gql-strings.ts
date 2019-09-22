import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query getPosts {
    posts {
      __typename
      id
      imgAltText
      imgUrl
      title
      tldr
    }
  }
`;

export const POST_CONTENT_QUERY = gql`
  query getPostContent($id: ID!) {
    postContent(id: $id) {
      __typename
      content
      createdAt
      id
      modifiedAt
      post {
        __typename
        id
        imgAltText
        imgUrl
        title
        tldr
      }
    }
  }
`;

// >>> INTERFACES >>>
export interface PostContentQueryVariables {
  id: string;
}

export interface PostContentQueryResults {
  __typename: "PostContent";
  content: string;
  createdAt: string;
  id: string;
  modifiedAt: string;
  post: PostQueryResults;
}

export interface PostQueryResults {
  __typename: "Post";
  id: string;
  imgAltText: string;
  imgUrl: string;
  title: string;
  tldr: string;
}
