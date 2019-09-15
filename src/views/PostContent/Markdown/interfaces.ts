export interface IMarkdownProps {
  children: string;
}

export interface IRendererProps {
  children: string;
}

export interface IHeadingRendererProps {
  children: string;
  level: number;
}

export interface ILinkRendererProps {
  children: string;
  href: string;
}

export interface IImgRendererProps {
  children: string;
  src: string;
  alt: string;
}

export interface ICodeRendererProps {
  value: string;
  language: string;
}

export interface IListRendererProps {
  children: JSX.Element | JSX.Element[];
  ordered?: boolean;
}
