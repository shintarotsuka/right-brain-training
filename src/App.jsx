import React, { useState } from 'react'
import SettingsScreen from './components/SettingsScreen'
import TrainingScreen from './components/TrainingScreen'
import './App.css'

export default function App() {
  const [settings, setSettings] = useState(null)

  const handleStartTraining = (config) => {
    setSettings(config)
  }

  const handleBackToSettings = () => {
    setSettings(null)
  }

  return (
    <div className="app-container">
      {!settings ? (
        <SettingsScreen onStart={handleStartTraining} />
      ) : (
        <TrainingScreen settings={settings} onBack={handleBackToSettings} />
      )}
    </div>
  )
}
