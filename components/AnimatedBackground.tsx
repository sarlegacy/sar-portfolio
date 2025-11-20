
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIvPjwvc3ZnPg==')] opacity-30 dark:opacity-10"></div>

      {/* Blob 1: Brand Green */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-green mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob"
      ></div>

      {/* Blob 2: Brand Blue */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-brand-blue mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Blob 3: Purple/Secondary */}
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-400 mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-5 animate-blob"
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  );
};

export default React.memo(AnimatedBackground);
