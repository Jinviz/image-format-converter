import React from 'react'

const FormatSelect = ({format, setFormat}) => {
    const handleChange = (e) =>{
        setFormat(e.target.value)
    }
    return (
        <>
            <label htmlFor="comboBox">선택하세요:</label>
            <select id="comboBox" value={format} onChange={handleChange}>
                <option value="">선택하세요</option>
                <option value="jpg">jpg</option>
                <option value="jpeg">jpeg</option>
                <option value="png">png</option>
                <option value="peg">peg</option>
                <option value="gif">gif</option>
                <option value="webp">webp</option>
                <option value="svg">svg</option>
                <option value="ico">ico</option>
                <option value="bmp">bmp</option>
            </select>
        </>
    )       
}
export default FormatSelect
