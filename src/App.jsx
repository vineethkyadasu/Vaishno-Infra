import React from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Admin Dashboard
              </h1>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App

