import { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/bitcoin-btc-logo.png';

const { Item } = Menu;
const { Title } = Typography;
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav">
      <div className="logo">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo__title">
          <Link to="/">Cryptica</Link>
        </Title>
        <Button className="nav__btn" onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined/>
        </Button>
      </div>
      {activeMenu && (
        <Menu className="menu" theme="dark">
          <Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Item>
          <Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Item>
          <Item icon={<MoneyCollectOutlined />}>
            <Link to="/markets">Markets</Link>
          </Item>
          <Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
