import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function App() {
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0)

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const convertImageToPNG = (file) => {
    setCount(count => count + 1);
    console.log('convertImageToPNG ', count)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve({ name: file.name.replace(/\.[^/.]+$/, '') + '.png', blob });
          }, 'image/png');
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      try {
        const convertedFile = await convertImageToPNG(files[i]);
        zip.file(convertedFile.name, convertedFile.blob);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'converted_images.zip');
      });
  };

  return (
    <div className="App">
      <h1>JPG to PNG Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple accept=".jpg,.jpeg" onChange={handleFileChange} />
        <button type="submit">Convert to PNG and Download as ZIP</button>
      </form>
    </div>
  );
}

export default App;
