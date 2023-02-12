import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/bitcoin-btc-logo.png';

const { Item } = Menu;
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
      <Menu className="menu" theme="dark" >  
        <Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Item>
        <Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Item>
        <Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default Navbar;
