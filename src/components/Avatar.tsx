import { useMemo, useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
};

export const Avatar = ({ src, alt = 'Avatar', size = 'md', className = '' }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(() => {
    if (!alt) return '?';
    const parts = alt.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return alt[0]?.toUpperCase() || '?';
  }, [alt]);

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center font-medium bg-gray-200 text-gray-600 overflow-hidden ${className}`;

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={baseClasses}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className={baseClasses}>
      {initials}
    </div>
  );
};

