import React, { useState } from 'react'
import {PulseBtn} from '../style/button/PulseBtn'
import FileSelect from './FileSelect'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormatSelect from './FormatSelect';


// 50개 단위로 Convert 후 다운로드 -> 남은 파일 반복
// 진척도 확인을 위한 Circle Progressbar //+ 변환될 포맷 옵션 제공
const ConvertFormat = () => {
    const [files, setFiles] = useState([]);
    const [format, setFormat] = useState('');

    return (
        <form> 
            <FileSelect setFiles={setFiles} setFormat={setFormat} />
            <FormatSelect format={format} setFormat={setFormat} />
            <button className={PulseBtn.animated} type="submit">
                포맷 변환
            </button>
        </form>
    )
}
export default ConvertFormat
