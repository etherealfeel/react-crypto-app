import { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import CryptoChart from './CryptoChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 'Fetching data...';

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Change', value: `${cryptoDetails?.change && millify(cryptoDetails?.change)}%`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <div className="coin">
      <Col className="coin__details">
        <Col className="coin__heading">
          <Title level={2} className="coin__title">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>{cryptoDetails.name} live price in US dollars View value statistics, market cap and supply.</p>
        </Col>
        <Select defaultValue="3h" className="coin__select" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <CryptoChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
        <Col className="stats">
          <Col className="stats__values box--borderless">
            <Col className="stats__heading">
              <Title level={3} className="stats__title">
                {cryptoDetails.name} Value Statictics
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin__stats">
                <Col className="coin__stats-info">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats__value">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="stats__other box--borderless">
            <Col className="stats__heading">
              <Title level={3} className="stats__title">
                {cryptoDetails.name} Other Statictics
              </Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin__stats">
                <Col className="coin__stats-info">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin__desc-link">
          <Row className="coin__desc">
            <Title level={3} className="stats__title">
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin__links">
            <Title level={3} className="stats__title">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row className="links__item" key={link.name}>
                <Title level={5} className="link__title">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </div>
  );
};
export default CryptoDetails;
