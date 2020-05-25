import * as React from 'react';
import { ReactElement, CSSProperties } from "react";

interface ImageProps{
    src:string;
    style?:CSSProperties;
    onClick?:()=>void;
    alt?:string;
}

const Image =({ src , style , alt , onClick }: ImageProps):ReactElement => {
  return <img src={src} style={style} alt={alt} onClick={onClick} />;
}

export default Image;
