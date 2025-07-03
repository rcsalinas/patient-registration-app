import { useState, useCallback } from 'react';
import styles from './DragAndDropInput.module.css';

interface DragAndDropInputProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const DragAndDropInput = ({ onFileSelect, error }: DragAndDropInputProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setFileName(file.name);
        onFileSelect(file);
        e.dataTransfer.clearData();
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${error ? styles.error : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg"
          onChange={handleChange}
          className={styles.hiddenInput}
        />
        {fileName ? (
          <p>{fileName}</p>
        ) : (
          <p>Drag 'n' drop a .jpg file here, or click to select</p>
        )}
      </label>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DragAndDropInput;
