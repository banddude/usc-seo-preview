import Image, { type ImageProps } from "next/image";
import { assetPath } from "../lib/preview";

export default function PreviewImage(props: ImageProps) {
  const src = typeof props.src === "string" ? assetPath(props.src) : props.src;
  return <Image {...props} src={src} alt={props.alt} />;
}
