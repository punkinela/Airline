import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Data from the Colab notebook results
const MODEL_RESULTS = [
  { name: 'Logistic Regression', accuracy: 0.9095, precision: 0.9105, recall: 0.6745, f1: 0.7745, rocAuc: 0.7379 },
  { name: 'Naive Bayes', accuracy: 0.8951, precision: 0.8526, recall: 0.7092, f1: 0.7745, rocAuc: 0.7551 },
  { name: 'Random Forest', accuracy: 0.8965, precision: 0.9142, recall: 0.6519, f1: 0.7606, rocAuc: 0.7265 },
  { name: 'Gradient Boosting', accuracy: 0.8937, precision: 0.8966, recall: 0.6606, f1: 0.7606, rocAuc: 0.7308 },
  { name: 'XGBoost', accuracy: 0.8951, precision: 0.9015, recall: 0.6635, f1: 0.7638, rocAuc: 0.7327 },
  { name: 'LightGBM', accuracy: 0.8965, precision: 0.9028, recall: 0.6693, f1: 0.7685, rocAuc: 0.7745 },
  { name: 'CatBoost', accuracy: 0.8985, precision: 0.9173, recall: 0.6562, f1: 0.7654, rocAuc: 0.7288 },
];

function ModelComparison() {
  const chartData = {
    labels: MODEL_RESULTS.map(m => m.name),
    datasets: [
      {
        label: 'Accuracy',
        data: MODEL_RESULTS.map(m => m.accuracy),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'ROC-AUC',
        data: MODEL_RESULTS.map(m => m.rocAuc),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'F1 Score',
        data: MODEL_RESULTS.map(m => m.f1),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Model Performance Comparison (From Colab Notebook)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return (
    <div className="model-comparison">
      <div className="comparison-header">
        <h2>ML Model Performance</h2>
        <p>Comparing 7 different classifiers trained on ~14,640 airline tweets</p>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>

      <div className="model-table">
        <h3>Detailed Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
              <th>ROC-AUC</th>
            </tr>
          </thead>
          <tbody>
            {MODEL_RESULTS.map((model, idx) => (
              <tr key={idx} className={model.name === 'LightGBM' ? 'best-model' : ''}>
                <td>{model.name}</td>
                <td>{(model.accuracy * 100).toFixed(2)}%</td>
                <td>{(model.precision * 100).toFixed(2)}%</td>
                <td>{(model.recall * 100).toFixed(2)}%</td>
                <td>{model.f1.toFixed(4)}</td>
                <td>{model.rocAuc.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="table-note">
          <strong>Best ROC-AUC:</strong> LightGBM (0.7745) |
          <strong> Best Accuracy:</strong> Logistic Regression (90.95%)
        </p>
      </div>

      <div className="methodology-card">
        <h3>Methodology (From Colab Notebook)</h3>
        <ul>
          <li><strong>Dataset:</strong> Twitter US Airline Sentiment (~14,640 tweets)</li>
          <li><strong>Preprocessing:</strong> Lowercasing, HTML/URL removal, punctuation removal, tokenization</li>
          <li><strong>Features:</strong> TF-IDF vectorization (5,000 top features)</li>
          <li><strong>Text Processing:</strong> NLTK stopword removal, lemmatization</li>
          <li><strong>Classification:</strong> Binary (positive vs. neutral/negative)</li>
          <li><strong>Evaluation:</strong> 5-fold cross-validation, multiple metrics</li>
        </ul>
      </div>
    </div>
  );
}

export default ModelComparison;
