import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BookSearchPage.css";
import { Pagination } from 'antd';
import Card from '../../../components/BookCards/BookCards';

export default function Books() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    document.title = "Books";
    getData();
  }, []);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/book`)
      .then((response) => {
        console.log(response);
        setData(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className={`cards${isCardsShowing ? " showing" : ""}`}>
      <Card title="Books" handleCardsClick={handleCardsClick} />
      {Data &&
        Data.map((e) => {
          return (
            <Card
              key={e._id}
              id={e._id}
              name={e.name}
              title={e.title}
              course={e.course}
              image={e.image}
              handleCardsClick={handleCardsClick}
            />
          );
        })}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );  
}
