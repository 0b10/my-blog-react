export const dummyDatesProps = {
  createdAt: "dummy-created-at-date",
  modifiedAt: "dummy-modified-at-date"
};

export const dummyContentProps = {
  children: "dummy content text"
};

export const dummyPostContentProps = {
  ...dummyContentProps,
  ...dummyDatesProps,
  title: "dummy title",
  tldr: "dummy tldr"
};
