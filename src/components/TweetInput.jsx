import React from 'react';
import { Send, Sparkles } from 'lucide-react';

const SAMPLE_TWEETS = [
  "@VirginAmerica flight was amazing! Crew was so friendly and helpful.",
  "@united worst experience ever. Flight delayed 3 hours with no updates.",
  "@SouthwestAir great service as always! On time and comfortable.",
  "@AmericanAir lost my luggage and customer service was terrible.",
  "@JetBlue thanks for the smooth flight and free wifi!"
];

function TweetInput({ value, onChange, onAnalyze }) {
  const useSample = () => {
    const randomTweet = SAMPLE_TWEETS[Math.floor(Math.random() * SAMPLE_TWEETS.length)];
    onChange(randomTweet);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="tweet-input-container">
      <textarea
        className="tweet-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter an airline-related tweet to analyze sentiment...&#10;&#10;Example: @Delta excellent service! My flight was on time and the crew was wonderful."
        rows={4}
        maxLength={280}
      />
      <div className="input-controls">
        <button onClick={useSample} className="sample-button">
          <Sparkles size={16} />
          Try Sample
        </button>
        <span className="char-count">{value.length}/280</span>
        <button
          onClick={onAnalyze}
          disabled={!value.trim()}
          className="analyze-button"
        >
          <Send size={16} />
          Analyze
        </button>
      </div>
    </div>
  );
}

export default TweetInput;
