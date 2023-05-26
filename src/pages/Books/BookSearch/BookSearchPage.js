import React, { useState } from 'react';
import "./BookSearchPage.css";
import { Pagination } from 'antd';
import Card from '../../../components/BookCards/BookCards';

export default function Books() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };
  return (
    <div className={`cards${isCardsShowing ? " showing" : ""}`}>
      <Card title="Books" handleCardsClick={handleCardsClick} />
      <Pagination defaultCurrent={1} total={50}/>
    </div>
  );
}
