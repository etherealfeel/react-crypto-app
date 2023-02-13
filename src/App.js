import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Markets, News, CryptoDetails, Cryptocurrencies } from './components';
import './App.css';

const { Title } = Typography;

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <Navbar />
      </nav>
      <main className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/markets" element={<Markets />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
          <footer className="footer">
            <Title level={5} style={{ color: '#fff', textAlign: 'center' }}>
              Cryptica <br />
              All rights reserved
            </Title>
            <Space className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/markets">Markets</Link>
              <Link to="/news">News</Link>
            </Space>
          </footer>
        </Layout>
      </main>
    </div>
  );
};

export default App;
