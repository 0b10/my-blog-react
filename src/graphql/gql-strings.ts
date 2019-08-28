import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  {
    posts {
      __typename
      id
      imgAltText
      imgUrl
      postUrl
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
        postUrl
        title
        tldr
      }
    }
  }
`;

// >>> INTERFACES >>>
export interface IPostContentQueryVariables {
  id: string;
}
