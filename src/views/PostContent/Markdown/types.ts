export interface MarkdownProps {
  children: string;
}

export interface RendererProps {
  children: string;
}

export interface HeadingRendererProps {
  children: string;
  level: number;
}

export interface LinkRendererProps {
  children: string;
  href: string;
}

export interface ImgRendererProps {
  children: string;
  src: string;
  alt: string;
}

export interface CodeRendererProps {
  value: string;
  language: string;
}

export interface ListRendererProps {
  children: JSX.Element | JSX.Element[];
  ordered?: boolean;
}
