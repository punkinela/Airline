import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import TweetInput from './TweetInput';
import ResultsDisplay from './ResultsDisplay';
import { analyzeSentiment } from '../utils/sentimentEngine';

function SentimentAnalyzer() {
  const [tweet, setTweet] = useState('');
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const handleAnalyze = () => {
    if (!tweet.trim()) return;

    const analysis = analyzeSentiment(tweet);
    const newResult = {
      id: Date.now(),
      text: tweet,
      ...analysis,
      timestamp: new Date().toLocaleTimeString()
    };

    setResults(newResult);
    setHistory(prev => [newResult, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    setResults(null);
    setTweet('');
  };

  return (
    <div className="sentiment-analyzer">
      <div className="analyzer-card">
        <h2>Analyze Airline Tweet</h2>
        <TweetInput
          value={tweet}
          onChange={setTweet}
          onAnalyze={handleAnalyze}
        />

        {results && <ResultsDisplay results={results} />}
      </div>

      {history.length > 0 && (
        <div className="history-card">
          <div className="history-header">
            <h3>Analysis History</h3>
            <button onClick={clearHistory} className="clear-button">
              <Trash2 size={16} />
              Clear
            </button>
          </div>
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-text">{item.text}</div>
                <div className="history-meta">
                  <span className={`sentiment-badge ${item.sentiment}`}>
                    {item.sentiment}
                  </span>
                  <span className="confidence">
                    {(item.confidence * 100).toFixed(1)}% confident
                  </span>
                  <span className="timestamp">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;
