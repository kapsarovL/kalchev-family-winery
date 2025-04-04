import React from "react";

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

/**
 * An optimized image component that implements best practices for SEO and accessibility
 *
 * Best practices implemented:
 * 1. Always requires descriptive alt text
 * 2. Optional title attribute for additional context
 * 3. Width and height attributes to prevent layout shifts
 * 4. Lazy loading by default for performance
 * 5. Consistent className handling
 */
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
  // Validate that alt text is provided (except for truly decorative images)
  if (!alt && alt !== "") {
    console.warn(
      'OptimizedImage: All images should have alt text for accessibility. Use alt="" for decorative images.'
    );
  }

  return (
    <img
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
