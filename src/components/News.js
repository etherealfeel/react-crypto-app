import { useState, useEffect } from 'react';
import { Input, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import { SearchOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const { data: newsList } = useGetNewsQuery({ newsCategory: 'top', count: simplified ? 9 : 100 });
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setNews(newsList);
    const filteredList = newsList?.filter((newsItem) => newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setNews(filteredList);
  }, [newsList, searchTerm]);

  if (!newsList) return 'Fetching data...';

  return (
    <>
      {!simplified && (
        <div className="news__search box--borderless">
          <SearchOutlined className="search__icon"/>
          <Input className="news__input" placeholder="Search news..." onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      )}
      <Row gutter={[16, 16]} className={`${simplified ? 'box--borderless' : ''}`}>
        {news?.map((newsItem, i) => (
          <Col key={i} xs={24} sm={12} lg={8}>
            <Card hoverable className="news__card">
              <a href={newsItem.url} target="_blank" rel="noreferrer">
                <div className="news__content">
                  <div className="content__info">
                    <Title className="news__title">{newsItem.title}</Title>
                    <p className="news__desc">{newsItem.description.length > 100 ? `${newsItem.description.substring(0, 100)}...` : newsItem.description}</p>
                  </div>
                  <Text className="news__date">{moment(newsItem.date).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
