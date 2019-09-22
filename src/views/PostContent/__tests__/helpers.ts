export const dummyDatesProps = {
  createdAt: "dummy-created-at-date",
  modifiedAt: "dummy-modified-at-date",
};

export const dummyContentProps = {
  children: "dummy content text",
};

export const dummyHeaderImageProps = {
  src: "dummy-header-image-url",
  alt: "dummy header image alt text",
};

export const dummyPostContentProps = {
  ...dummyContentProps,
  ...dummyDatesProps,
  headerImageProps: dummyHeaderImageProps,
  title: "dummy title",
  tldr: "dummy tldr",
};
