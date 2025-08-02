import { log } from './services/logger';

function App() {

  const handleClick = () => {
    log("frontend", "info", "button-click", "User clicked the log button from frontend");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>AffordMed Frontend Logger</h1>
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Send Log
      </button>
    </div>
  );
}

export default App;
