// App.js
import { useState, useEffect } from 'react';
import './App.css';
import catImage from './assets/cat.jpg';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [showCat, setShowCat] = useState(false);

  const messages = [
    'Fetching top secret information...',
    'Decrypting classified files...',
    'Bypassing firewalls...',
    'Almost there...',
  ];

  useEffect(() => {
    let interval;
    if (started && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 0.83; // 100% in ~2 min (120s / 0.83 ≈ 144 updates)
          return next >= 100 ? 100 : next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    const msgIndex = Math.floor(progress / 25);
    if (msgIndex < messages.length) {
      setMessage(messages[msgIndex]);
    }

    if (progress >= 95 && !showCat) {
      setShowCat(true);
    }
  }, [progress]);

  const handleStart = () => {
    if (password === 'kushalissmart') {
      setShowModal(false);
      setStarted(true);
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <div className="App">
      {!started && (
        <button onClick={() => setShowModal(true)} className="btn">
          Start Mission
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleStart}>Submit</button>
          </div>
        </div>
      )}

      {started && !showCat && (
        <div className="progress-box">
          <p>{message}</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{Math.floor(progress)}%</p>
        </div>
      )}

      {showCat && (
        <div className="cat-screen">
          <img src={catImage} alt="Cat Meme" />
        </div>
      )}
    </div>
  );
}

export default App;
