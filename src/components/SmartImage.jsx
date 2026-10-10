import React, { useState, useEffect } from 'react';

export default function SmartImage({ src, alt, className = "", fallbackSrc = "/fallback-food.png" }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoading(!!src);
        setHasError(false);
    }, [src]);

    const handleError = () => {
        // Prevent infinite loops if fallbackSrc also fails
        if (!hasError) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    const currentSrc = (hasError || !src) ? fallbackSrc : src;

    return (
        <div className={`relative overflow-hidden bg-[#f0e3dc]/50 dark:bg-[#3b322e]/50 flex items-center justify-center shrink-0 ${className}`}>
            {/* Shimmer / Skeleton Loader */}
            {isLoading && (
                <div className="absolute inset-0 z-10 w-full h-full bg-[#f2e6dc] dark:bg-[#4d3e35]">
                    {/* CSS Shimmer Effect overlay */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                </div>
            )}
            
            <img 
                src={currentSrc} 
                alt={alt || "L'Ray Treat Artistic Element"}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-700 ease-out absolute inset-0 z-20 ${isLoading ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'}`}
                onLoad={handleLoad}
                onError={handleError}
            />
            {/* Inject Global Keyframe if strictly isolated, but standard Tailwind handles `animate-[...]` */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
