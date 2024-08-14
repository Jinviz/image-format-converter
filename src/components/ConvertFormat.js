import React, { useState } from 'react'
import PulseBtn from '../style/button/PulseBtn.css'
import FileSelect from './FileSelect'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormatSelect from './FormatSelect';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


// 50개 단위로 Convert 후 다운로드 -> 남은 파일 반복
// 진척도 확인을 위한 Circle Progressbar //+ 변환될 포맷 옵션 제공
const ConvertFormat = () => {
    const [files, setFiles] = useState([]);
    const [format, setFormat] = useState('');

    const convertImageToPNG = (file) => {
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
        <form onSubmit={handleSubmit}> 
            <FileSelect setFiles={setFiles} />
            <FormatSelect format={format} setFormat={setFormat} />
            <button className={PulseBtn.animated} type="submit">
                포맷 변환
            </button>
        </form>
    )
}
export default ConvertFormat
