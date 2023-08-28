import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <p className={'tds-body-02'}>Hello world</p>
      <tds-button type="button" variant="primary" size="lg" text="TDS button">
        <tds-icon slot="icon" className="tds-btn-icon" size="20px" name="document_eye"></tds-icon>
      </tds-button>
    </div>
  );
}

export default App;
