import { cn } from '@/lib/utils';
import { UploadIcon, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: File | string;
  disabled?: boolean;
  className?: string;
  accept?: string;
}

const FileUpload = ({
  onChange,
  value,
  disabled,
  className,
  accept = "image/*"
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(
    typeof value === 'string' ? value.split('/').pop() ?? null : null
  );
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' && accept.startsWith('image/') ? value : null
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange(file);
      setFileName(file.name);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  }, [disabled, onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    setFileName(file ? file.name : null);

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [onChange]);

  const handleRemove = useCallback(() => {
    onChange(null);
    setFileName(null);
    setPreview(null);
  }, [onChange]);

  return (
    <div className={cn("relative", className)}>
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
          accept={accept}
        />
        <label 
          htmlFor="fileUpload"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          {preview && accept.startsWith('image/') ? (
            <div className="relative w-full flex flex-col items-center">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-[200px] object-contain rounded-md"
              />
            </div>
          ) : fileName ? (
            <p className="text-sm font-medium text-center">{fileName}</p>
          ) : (
            <>
              <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">
                Drag & drop file here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {accept.startsWith('image/') ? "Supports images (JPG, PNG, GIF)" : "Supports PDFs"}
              </p>
            </>
          )}
        </label>
      </div>
      
      {fileName && (
        <button
          onClick={handleRemove}
          type="button"
          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm"
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default FileUpload;
