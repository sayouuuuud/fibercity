"use client";

import { CldImage, CldImageProps } from 'next-cloudinary';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CloudinaryImgProps extends Omit<CldImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

export function CloudinaryImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallbackSrc = '/images/placeholder.jpg',
  ...props 
}: CloudinaryImgProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // If it's not a cloudinary image (e.g. local public path) or it errored, fallback to next/image
  const isCloudinary = src?.includes('res.cloudinary.com') || src?.includes('cloudinary:');
  
  // Clean up the src if it's an absolute cloudinary URL, as CldImage can take public IDs or full URLs
  const cldSrc = src;

  if (!isCloudinary || error) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <Image
          src={error ? fallbackSrc : src || fallbackSrc}
          alt={alt || "Image"}
          className={cn(
            "transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            if (!error) setError(true);
            setLoading(false);
          }}
          fill={props.fill}
          width={props.fill ? undefined : props.width as number}
          height={props.fill ? undefined : props.height as number}
          sizes={props.sizes}
          priority={props.priority}
          unoptimized={!isCloudinary}
        />
        {loading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <CldImage
        src={cldSrc}
        alt={alt || "Image"}
        className={cn(
          "transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        format="auto"
        quality="auto"
        {...props}
      />
      {loading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}
