"use client";

import React, { useEffect, useState } from 'react';

export const TypewriterEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="font-mono">
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse bg-accent w-2 h-8 ml-1 inline-block align-middle" />}
    </span>
  );
};
