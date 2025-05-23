import React, { useState, useCallback, useEffect } from 'react';

const FileUpload = ({ 
  onFileChange, 
  accept, 
  name, 
  initialPreview,
  resetTrigger 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(initialPreview || null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setPreview(initialPreview || null);
    setFileName('');
  }, [initialPreview, resetTrigger]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const processFile = (file) => {
    if (!file) {
      onFileChange(null, name);
      setPreview(null);
      setFileName('');
      return;
    }

    setFileName(file.name);
    onFileChange(file, name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="file-upload-wrapper">
      <div className="file-input-container">
        <input
          type="file"
          id={`file-upload-${name}`}
          onChange={handleChange}
          accept={accept}
          name={name}
          className="file-input"
        />
        <label 
          htmlFor={`file-upload-${name}`}
          className={`file-label ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="image-preview" />
              <button 
                type="button" 
                className="remove-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  processFile(null);
                  document.getElementById(`file-upload-${name}`).value = '';
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">+</div>
              <div className="upload-text">Drag & drop or click to upload</div>
            </div>
          )}
        </label>
      </div>

      <style jsx>{`
        .file-upload-wrapper {
          width: 100%;
          position: relative;
        }
        
        .file-input-container {
          width: 100%;
          height: auto;
          position: relative;
        }
        
        .file-input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          top: 0;
          left: 0;
          cursor: pointer;
          z-index: 2;
        }
        
        .file-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100px;
          border: 2px dashed #ccc;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .file-label.dragging {
          border-color: #2196F3;
          background-color: #f0f8ff;
        }
        
        .preview-container {
          width: 50px;
          height: 50px;
          margin: 0 auto;
          position: relative;
        }
        
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 4px;
        }
        
        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .upload-icon {
          font-size: 24px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .upload-text {
          font-size: 14px;
          color: #666;
        }
        
        .remove-btn {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 24px;
          height: 24px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          z-index: 3;
        }
        
        .remove-btn:hover {
          background: #cc0000;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;