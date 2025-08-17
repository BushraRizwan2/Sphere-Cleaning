
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onUpload: (dataUrl: string) => void;
  children: React.ReactNode;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="cursor-pointer"
    >
      <input 
        type="file" 
        accept="image/*,video/*" 
        ref={inputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />
      {children}
    </div>
  );
};

export default ImageUploader;