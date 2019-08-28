import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { POST_CONTENT_QUERY } from "../gql-strings";

// export default (props: IPostContentApolloProps) => {
//   const { error, loading, data } = useQuery(props.query, { variables: { id: props.postId } });

//   if (error) {
//     return <div>Error!</div>;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const Dates = props.children[0];
//   const Content = props.children[1];

//   if (!data.postContent) {
//     // TODO: #error - handle this error more cleanly, if necessary
//     throw new Error(
//       "GraphQL Query: postContent is falsy or null, when error and loading are also false"
//     );
//   }
//   const { content, createdAt, modifiedAt } = data.postContent;

//   return (
//     <React.Fragment>
//       {[
//         React.cloneElement(Dates, { createdAt, modifiedAt }),
//         React.cloneElement(Content, { children: content })
//       ]}
//     </React.Fragment>
//   );
// };

export const withPostContentQuery = (
  ContentComponent: React.FC<IContentComponentProps>,
  DateComponent: React.FC<IDateComponentProps>,
  BackgroundComponent: React.FC<IBackgroundProps>
) => {
  return (props: IPostContentApolloProps) => {
    const { error, loading, data } = useQuery(POST_CONTENT_QUERY, {
      variables: { id: props.postId }
    });

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data.postContent) {
      // TODO: #error - handle this error more cleanly, if necessary
      throw new Error(
        "GraphQL Query: postContent is falsy or null, when error and loading are also false"
      );
    }

    const { content, createdAt, modifiedAt } = data.postContent;

    return (
      <BackgroundComponent>
        <DateComponent key="date" createdAt={createdAt} modifiedAt={modifiedAt} />
        <ContentComponent key="content">{content}</ContentComponent>
      </BackgroundComponent>
    );
  };
};

export interface IContentComponentProps {
  children: string;
}

export interface IDateComponentProps {
  createdAt: string;
  modifiedAt: string;
}

export interface IBackgroundProps {
  children: JSX.Element | JSX.Element[];
}

export interface IPostContentApolloProps {
  postId: string;
}
