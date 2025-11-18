import React from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';

function ResultsDisplay({ results }) {
  const { sentiment, confidence, score, features } = results;

  const getSentimentIcon = () => {
    if (sentiment === 'positive') return <ThumbsUp size={32} />;
    if (sentiment === 'negative') return <ThumbsDown size={32} />;
    return <TrendingUp size={32} />;
  };

  const getSentimentColor = () => {
    if (sentiment === 'positive') return '#10b981';
    if (sentiment === 'negative') return '#ef4444';
    return '#f59e0b';
  };

  return (
    <div className="results-display">
      <div className="sentiment-result" style={{ borderColor: getSentimentColor() }}>
        <div className="sentiment-icon" style={{ color: getSentimentColor() }}>
          {getSentimentIcon()}
        </div>
        <div className="sentiment-info">
          <h3 className="sentiment-label" style={{ color: getSentimentColor() }}>
            {sentiment.toUpperCase()}
          </h3>
          <div className="confidence-bar-container">
            <div
              className="confidence-bar"
              style={{
                width: `${confidence * 100}%`,
                backgroundColor: getSentimentColor()
              }}
            />
          </div>
          <p className="confidence-text">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="analysis-details">
        <h4>Analysis Details</h4>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Sentiment Score:</span>
            <span className="detail-value">{score}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Positive Words:</span>
            <span className="detail-value">{features.positiveWords.length}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Negative Words:</span>
            <span className="detail-value">{features.negativeWords.length}</span>
          </div>
        </div>

        {features.positiveWords.length > 0 && (
          <div className="word-tags">
            <strong>Positive indicators:</strong>
            <div className="tags">
              {features.positiveWords.slice(0, 5).map((word, i) => (
                <span key={i} className="tag positive-tag">{word}</span>
              ))}
            </div>
          </div>
        )}

        {features.negativeWords.length > 0 && (
          <div className="word-tags">
            <strong>Negative indicators:</strong>
            <div className="tags">
              {features.negativeWords.slice(0, 5).map((word, i) => (
                <span key={i} className="tag negative-tag">{word}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsDisplay;
