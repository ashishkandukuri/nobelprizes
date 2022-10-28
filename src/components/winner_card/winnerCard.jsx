import React from 'react';
import './winnerCard.css';

const WinnerCard = ({ winner }) => {
  let names;
  let motivation;
  if (winner.laureates) {
    names = winner.laureates.map(el => el.firstname + el?.surname).join(', ');
    motivation = winner.laureates[0].motivation;
  }

  if (winner.overallMotivation) {
    motivation = winner.overallMotivation;
  }

  return (
    <div className='card'>
      <div className='infos'>
        <div className='name'>
          <h2>{names}</h2>
        </div>
        <p className='motivation'>{motivation}</p>
        <ul className='stats'>
          <li>
            <h3>
              <span>category:</span> {winner.category}
            </h3>
          </li>
          <li>
            <h3>
              <span>year:</span> {winner.year}
            </h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WinnerCard;
