import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/shorturls', {
        url,
        shortcode: shortcode.trim() || undefined,
        validity: validity ? parseInt(validity) : undefined
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Validity in minutes (optional)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {result && (
        <div className="result">
          <p><strong>Short Link:</strong> <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a></p>
          <p><strong>Expires At:</strong> {new Date(result.expiry).toLocaleString()}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
