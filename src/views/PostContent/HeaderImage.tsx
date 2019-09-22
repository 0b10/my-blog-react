import React from "react";

const imgStyles: React.CSSProperties = {
  height: "300px",
  objectFit: "cover",
  width: "100%",
};

export const HeaderImage = ({ src, alt }: IHeaderImageProps) => {
  return src ? <img src={src} alt={alt} style={imgStyles} /> : null;
};

export interface IHeaderImageProps {
  src?: string;
  alt?: string;
}
