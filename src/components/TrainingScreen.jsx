import React, { useState, useEffect } from 'react'
import { generateTrainingTexts } from '../utils/textGenerator'
import './TrainingScreen.css'

export default function TrainingScreen({ settings, onBack }) {
  const [trainingTexts, setTrainingTexts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDisplaying, setIsDisplaying] = useState(false)
  const [userAnswer, setUserAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [trainingComplete, setTrainingComplete] = useState(false)

  // テキスト生成
  useEffect(() => {
    const texts = generateTrainingTexts(
      settings.rows,
      settings.charsPerRow,
      settings.symmetryType,
      100
    )
    setTrainingTexts(texts)
  }, [settings])

  // テキスト表示タイマー
  useEffect(() => {
    if (!trainingTexts.length || answered || trainingComplete) return

    setIsDisplaying(true)
    setDisplayText(trainingTexts[currentIndex].display)

    const timer = setTimeout(() => {
      setIsDisplaying(false)
      setDisplayText('')
    }, settings.displayTime * 1000)

    return () => clearTimeout(timer)
  }, [currentIndex, trainingTexts, settings.displayTime, answered, trainingComplete])

  const handleAnswer = (answer) => {
    if (answered || !trainingTexts.length) return

    setUserAnswer(answer)
    setAnswered(true)

    // 正解判定（ユーザーの選択と設定が一致したら正解）
    if (answer === settings.symmetryType) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= trainingTexts.length) {
      setTrainingComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer(null)
      setAnswered(false)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setUserAnswer(null)
    setAnswered(false)
    setScore(0)
    setTrainingComplete(false)
    setDisplayText('')
  }

  if (!trainingTexts.length) {
    return <div className="training-screen"><p>準備中...</p></div>
  }

  if (trainingComplete) {
    const accuracy = ((score / trainingTexts.length) * 100).toFixed(1)
    return (
      <div className="training-screen">
        <div className="results-card">
          <h2>トレーニング完了！</h2>
          <div className="score-display">
            <p className="score-text">スコア</p>
            <p className="score-value">{score} / {trainingTexts.length}</p>
            <p className="accuracy">正答率: {accuracy}%</p>
          </div>
          <div className="button-group">
            <button className="restart-button" onClick={handleRestart}>
              もう一度チャレンジ
            </button>
            <button className="back-button" onClick={onBack}>
              設定に戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentText = trainingTexts[currentIndex]
  const progress = ((currentIndex + 1) / trainingTexts.length) * 100

  return (
    <div className="training-screen">
      <div className="training-card">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <p className="progress-text">{currentIndex + 1} / {trainingTexts.length}</p>
        </div>

        <div className="display-area">
          {isDisplaying ? (
            <div className="text-display">
              <pre>{displayText}</pre>
            </div>
          ) : (
            <div className="waiting-display">
              {answered ? '✓ 回答を記録しました' : '↓ 下の選択肢を選んでください'}
            </div>
          )}
        </div>

        <div className="score-area">
          <p>現在のスコア: <span>{score}</span> / {currentIndex}</p>
        </div>

        {answered ? (
          <div className="answered-display">
            <p className="answered-text">
              {userAnswer === settings.symmetryType ? '✓ 正解！' : '✗ 不正解'}
            </p>
            <button className="next-button" onClick={handleNext}>
              {currentIndex + 1 >= trainingTexts.length ? '完了' : '次へ'}
            </button>
          </div>
        ) : (
          <div className="answer-buttons">
            <button
              className="answer-button"
              onClick={() => handleAnswer('vertical')}
              disabled={isDisplaying}
            >
              上下対称
            </button>
            <button
              className="answer-button"
              onClick={() => handleAnswer('horizontal')}
              disabled={isDisplaying}
            >
              鏡文字
            </button>
            <button
              className="answer-button"
              onClick={() => handleAnswer('mixed')}
              disabled={isDisplaying}
            >
              ごちゃまぜ
            </button>
          </div>
        )}

        <button className="back-button-small" onClick={onBack}>
          戻る
        </button>
      </div>
    </div>
  )
}
