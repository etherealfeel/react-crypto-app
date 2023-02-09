import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const { Title } = Typography;
const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <Avatar src={icon} size="large" />
        <Title className="logo__title">
          <Link to="/">Cryptica</Link>
        </Title>
      </div>
      <Menu className ="menu" theme="dark">
        <Menu.Item icon={<HomeOutlined/>}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined/>}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined/>}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined/>}>
          <Link to="/news">News</Link>
        </Menu.Item>

      </Menu>
    </div>
  );
};

export default Navbar;
