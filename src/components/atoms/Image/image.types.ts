import { ImageProps } from "next/image";

export interface ImageComponent extends ImageProps {
  fallback?: string;
}
