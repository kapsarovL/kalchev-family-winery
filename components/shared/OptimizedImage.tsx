import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  title,
  width,
  height,
  className = "",
  loading = "lazy",
  onClick,
}) => {
  if (!alt && alt !== "") {
    console.warn(
      'OptimizedImage: All images should have alt text for accessibility. Use alt="" for decorative images.'
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      loading={loading}
      className={className}
      onClick={onClick}
    />
  );
};

export default OptimizedImage;
