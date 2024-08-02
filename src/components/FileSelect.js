import React, { useState } from 'react'
import {BounceInBtn} from '../style/button/BounceInBtn'

// Submit 두가지 방법 1.파일선택 2.드래그앤드롭
const FileSelect = ({setFiles, setFormat}) => {
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  return (
    <input 
    className={BounceInBtn.animated}
    type="file" 
    multiple accept=".jpg, .jpeg, peg, png, gif, webp, svg, ico, bmp" 
    onSubmit={handleFileChange}>
      파일 선택
    </input>
  )
}
export default FileSelect;
