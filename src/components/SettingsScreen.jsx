import React, { useState } from 'react'
import './SettingsScreen.css'

export default function SettingsScreen({ onStart }) {
  const [displayTime, setDisplayTime] = useState(0.1)
  const [rows, setRows] = useState(3)
  const [charsPerRow, setCharsPerRow] = useState(10)
  const [symmetryType, setSymmetryType] = useState('vertical')

  const handleStart = () => {
    onStart({
      displayTime,
      rows,
      charsPerRow,
      symmetryType
    })
  }

  return (
    <div className="settings-screen">
      <div className="settings-card">
        <h1>右脳トレーニング</h1>
        
        <div className="settings-section">
          <label>表示時間（秒）</label>
          <div className="button-group">
            {[0.1, 0.05, 0.01].map(time => (
              <button
                key={time}
                className={`time-button ${displayTime === time ? 'active' : ''}`}
                onClick={() => setDisplayTime(time)}
              >
                {time}秒
              </button>
            ))}
          </div>
          <p className="selected-value">選択: {displayTime}秒</p>
        </div>

        <div className="settings-section">
          <label>行数</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rows}
            onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field"
          />
          <p className="selected-value">選択: {rows}行</p>
        </div>

        <div className="settings-section">
          <label>1行の文字数</label>
          <input
            type="number"
            min="1"
            max="30"
            value={charsPerRow}
            onChange={(e) => setCharsPerRow(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field"
          />
          <p className="selected-value">選択: {charsPerRow}文字</p>
        </div>

        <div className="settings-section">
          <label>対称性タイプ</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="vertical"
                checked={symmetryType === 'vertical'}
                onChange={(e) => setSymmetryType(e.target.value)}
              />
              上下対称
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="horizontal"
                checked={symmetryType === 'horizontal'}
                onChange={(e) => setSymmetryType(e.target.value)}
              />
              鏡文字（左右対称）
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="mixed"
                checked={symmetryType === 'mixed'}
                onChange={(e) => setSymmetryType(e.target.value)}
              />
              ごちゃまぜ
            </label>
          </div>
        </div>

        <button className="start-button" onClick={handleStart}>
          トレーニング開始
        </button>
      </div>
    </div>
  )
}
