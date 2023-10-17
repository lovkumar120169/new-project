import { Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './pages/Account';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CompanyInfo from './pages/CompanyInfo';
import { useState } from 'react';



function App() {
  const [loginStatus, setloginStatus] = useState(false);

  return (
    <div className="main">

      <Navbar setloginStatus={setloginStatus} loginStatus={loginStatus} />
      <Routes>

        {/* <Route path="/" element={<Account setloginStatus={setloginStatus} />} /> */}
        <Route path="/account" element={<Account setloginStatus={setloginStatus} />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CompanyInfo" element={<CompanyInfo />} />
      </Routes>

    </div>
  );
}

export default App;
