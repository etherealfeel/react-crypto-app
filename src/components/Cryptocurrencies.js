import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Card } from 'antd';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredList = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredList);
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Fetching data...';

  return (
    <>
      {!simplified && (
        <div className="crypto__search box--borderless">
          <SearchOutlined className="search__icon"/>
          <Input className="crypto__input" placeholder="Search Cryptocurrency..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[16, 16]} className={`crypto__grid ${simplified ? "box--borderless" : ""}`}>
        {cryptos?.map((curr, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto__card" key={i}>
            <Link to={`/crypto/${curr.uuid}`}>
              <Card title={`${curr.rank}. ${curr.name}`} extra={<img className="crypto__image" src={curr.iconUrl} />} hoverable>
                <p>Price: {millify(curr.price)}</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>DailyChange: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
