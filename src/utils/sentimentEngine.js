// Simplified sentiment analysis engine
// In production, this would call a backend API with the trained models from the Colab notebook

const POSITIVE_WORDS = [
  'amazing', 'excellent', 'great', 'fantastic', 'wonderful', 'awesome', 'perfect',
  'love', 'best', 'friendly', 'helpful', 'smooth', 'comfortable', 'professional',
  'quick', 'efficient', 'clean', 'thanks', 'appreciate', 'recommend', 'happy'
];

const NEGATIVE_WORDS = [
  'worst', 'terrible', 'horrible', 'awful', 'bad', 'poor', 'delayed', 'cancelled',
  'lost', 'rude', 'disappointed', 'frustrating', 'annoying', 'angry', 'unacceptable',
  'disgusting', 'useless', 'nightmare', 'horrible', 'hate', 'never', 'complaint'
];

export function analyzeSentiment(text) {
  const cleaned = preprocessText(text);
  const words = cleaned.split(/\s+/);

  let positiveScore = 0;
  let negativeScore = 0;
  const foundPositive = [];
  const foundNegative = [];

  words.forEach(word => {
    if (POSITIVE_WORDS.includes(word)) {
      positiveScore++;
      foundPositive.push(word);
    }
    if (NEGATIVE_WORDS.includes(word)) {
      negativeScore++;
      foundNegative.push(word);
    }
  });

  const totalScore = positiveScore - negativeScore;
  let sentiment = 'neutral';
  let confidence = 0.5;

  if (totalScore > 0) {
    sentiment = 'positive';
    confidence = Math.min(0.95, 0.6 + (positiveScore * 0.1));
  } else if (totalScore < 0) {
    sentiment = 'negative';
    confidence = Math.min(0.95, 0.6 + (negativeScore * 0.1));
  } else if (positiveScore === 0 && negativeScore === 0) {
    confidence = 0.3;
  }

  return {
    sentiment,
    confidence,
    score: totalScore,
    features: {
      positiveWords: foundPositive,
      negativeWords: foundNegative,
      wordCount: words.length
    }
  };
}

function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/@\w+/g, '') // Remove mentions
    .replace(/https?:\/\/\S+/g, '') // Remove URLs
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}
