import React, { useState } from 'react';
import { Plane, Brain, BarChart3 } from 'lucide-react';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import ModelComparison from './components/ModelComparison';

function App() {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <Plane size={32} className="logo-icon" />
          <h1>Airline Sentiment Analyzer</h1>
          <p className="subtitle">ML-Powered Tweet Sentiment Classification</p>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          <Brain size={20} />
          Analyze Sentiment
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <BarChart3 size={20} />
          Model Comparison
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'analyzer' && <SentimentAnalyzer />}
        {activeTab === 'comparison' && <ModelComparison />}
      </main>

      <footer className="app-footer">
        <p>Based on the Twitter US Airline Sentiment Dataset</p>
        <p>Using NLP techniques: TF-IDF, Lemmatization, Stopword Removal</p>
      </footer>
    </div>
  );
}

export default App;
