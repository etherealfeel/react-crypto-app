import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import News from "./News";
import Cryptocurrencies from "./Cryptocurrencies";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from './Loader';

const {Title} = Typography;

const Homepage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  
  if(isFetching) return <Loader/>;

  return (
    <>
      <Title level={2} className="home__heading heading"> 
        Global <span className="span--crypto">Crypto</span> Stats
      </Title>
      <Row className="box--borderless">
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} />
        </Col>
      </Row>
      <div className="home__bottom">
        <Title level={2} className="home__bottom-title">
          Top <span className="span--crypto">Crypto</span>currencies
        </Title>
        <Title level={3} className="home__bottom-link">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home__bottom">
        <Title level={2} className="home__bottom-title">
          Top <span className="span--crypto">Crypto</span> News
        </Title>
        <Title level={3} className="home__bottom-link">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage