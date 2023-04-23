import logo from './logo.svg';
import NCHANDIWebsiteService from './lib/NCHANDIWebsiteService';
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const nchandiWebsiteService = new NCHANDIWebsiteService();

function App() {
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      const { data: membersData } = await nchandiWebsiteService.getMembers();
      setTableData(membersData);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

 /**
   *
   */
 useEffect(() => {
  fetchTableData();
}, [fetchTableData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {console.log(tableData)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
