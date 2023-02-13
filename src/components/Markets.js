import React from 'react';
import millify from 'millify';
import { Row, Col, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetMarketsQuery } from '../services/cryptoMarketsApi';
import Loader from './Loader';

const { Title } = Typography;

const Markets = () => {
  const { data: marketsList, isFetching } = useGetMarketsQuery();

  if (isFetching) return <Loader/>;
  return (
    <div className="market">
      <Title className="market__title">
        Top {marketsList.length} <span className="span--crypto">Crypto</span> Markets
      </Title>
      <div className="market__table box--borderless">
        <Row className="table__header">
          <Col span={6} className="table__header-item">
            <Title className="table__title" level={3}>Market | Base</Title>
          </Col>
          <Col span={6} className="table__header-item">
            <Title className="table__title" level={3}>Price ($)</Title>
          </Col>
          <Col span={6} className="table__header-item">
            <Title className="table__title" level={3}>Volume</Title>
          </Col>
          <Col span={6} className="table__header-item">
            <Title className="table__title" level={3}>Volume ($)</Title>
          </Col>
        </Row>
        {marketsList.map((market, i) => (
          <Row key={i} className="table__item">
            <Col span={6}>
              {i + 1}. {market.name} {market.base}
            </Col>
            <Col span={6}>{millify(market.price_usd)}</Col>
            <Col span={6}>{millify(market.volume)}</Col>
            <Col span={6}>{millify(market.volume_usd)}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Markets;
