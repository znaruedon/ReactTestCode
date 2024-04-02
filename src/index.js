import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GroupedDataComponent from './GroupedDataComponent';

const AppTabs = () => {
  const [activeTab, setActiveTab] = useState('test1'); // State สำหรับเก็บ Tab ที่ถูกเลือก

  return (
    <React.StrictMode>
      <div>
        <button onClick={() => setActiveTab('test1')}>แบบทดสอบชุดที่ 1</button> {/* Button สำหรับเลือก Tab ที่ 1 */}
        <button onClick={() => setActiveTab('test2')}>แบบทดสอบชุดที่ 2</button> {/* Button สำหรับเลือก Tab ที่ 2 */}
      </div>
      {/* แสดง Component ตาม Tab ที่ถูกเลือก */}
      {activeTab === 'test1' && <App />}
      {activeTab === 'test2' && <GroupedDataComponent />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppTabs />);

reportWebVitals();
