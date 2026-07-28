const babel = require('@babel/core');
const code = `
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />;
  }

  const next = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <div className="relative w-full h-full group/carousel">
      <img src={images[currentIndex]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <button onClick={prev} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer backdrop-blur-md">
        <ChevronDown size={18} className="rotate-90" />
      </button>
      <button onClick={next} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer backdrop-blur-md">
        <ChevronDown size={18} className="-rotate-90" />
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <div key={i} className={\`h-1.5 rounded-full transition-all \${i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}\`} />
        ))}
      </div>
    </div>
  );
};
`;
try {
  babel.transformSync(code, { presets: ['@babel/preset-react'] });
  console.log("Valid JSX");
} catch(e) {
  console.log(e.message);
}
