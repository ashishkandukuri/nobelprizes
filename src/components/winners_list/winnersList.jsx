import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './winnersList.css';
import WinnerCard from '../winner_card/winnerCard';

const yearOptions = Array.from({ length: 120 / 4 }, (x, i) => 1900 + 4 * i);
yearOptions.unshift('all');

let categoryOptions = [];

const WinnersList = () => {
  const [data, setData] = useState([]);
  const [filData, setFillData] = useState([]);
  const [category, setCategory] = useState('all');
  const [year, setYear] = useState('all');

  useEffect(() => {
    axios.get(`https://api.nobelprize.org/v1/prize.json`).then(res => {
      setData(res.data.prizes);
      setFillData(res.data.prizes);
    });
  }, []);

  if (data) {
    categoryOptions = data.map((winner, id) => winner.category);
    categoryOptions = categoryOptions.filter(
      (item, index) => categoryOptions.indexOf(item) === index
    );
    categoryOptions.unshift('all');
  }

  const handleChange = (year, category) => {
    console.log(year, category);
    if (year === 'all' && category === 'all') {
      setFillData(data);
    } else if (year === 'all') {
      setFillData(data.filter(winner => winner.category === category));
    } else if (category === 'all') {
      setFillData(
        data.filter(
          winner => winner.year >= year && winner.year < `${Number(year) + 4}`
        )
      );
    } else {
      setFillData(
        data
          .filter(
            winner => winner.year >= year && winner.year < `${Number(year) + 4}`
          )
          .filter(winner => winner.category === category)
      );
    }
  };

  const onYearChange = event => {
    handleChange(event.target.value, category);
    setYear(event.target.value);
  };

  const onCategoryChange = event => {
    handleChange(year, event.target.value);
    setCategory(event.target.value);
  };

  return (
    <div>
      {data && (
        <div>
          <div className='dropdown'>
            <div className='box'>
              <label>year</label>
              <select id='year' defaultValue={'all'} onChange={onYearChange}>
                {yearOptions.map(option => {
                  return (
                    <option className='option' key={option} value={option}>
                      {`${option}`}
                      {option !== 'all' && `- ${option + 4}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='box'>
              <label>category</label>
              <select
                id='category'
                defaultValue={'all'}
                onChange={onCategoryChange}
              >
                {categoryOptions.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='winners-list'>
            {filData.map((winner, key) => {
              return <WinnerCard winner={winner} key={key} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnersList;
