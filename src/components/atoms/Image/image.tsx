import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageComponent } from "./image.types";

const fallbackImage = "/fallback.png";
const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageComponent) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      className="rounded-full my-4"
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};
export default ImageWithFallback;
