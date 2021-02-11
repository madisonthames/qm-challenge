import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import uniqid from "uniqid";
import { CardContext } from '../../context/context';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Sql from '../Sql/Sql';
import './searchBuilder.scss';

const SearchBuilder = () => {
  const { 
    cards, 
    showResults, 
    setShowResults, 
    showError,
    setShowError,
    predicateOptions,
    stringOptions,
    resetCard, 
    setCards 
  } = useContext(CardContext);

  const addCard = () => {
    const id = uniqid();
    setShowResults(false);
    setShowError(false);
      setCards((cards) => [
        ...cards,
        {
          id: id,
          field: predicateOptions[0].field,
          fieldType: predicateOptions[0].type,
          operator: stringOptions[0].field,
          value: '',
          betweenValue: ''
        }
      ]
    );
  }

  const handleSearchClick = () => {
    const valid = cards.every((card) =>
      (card.value && card.operator !== 'between') || (card.operator === 'between' && card.betweenValue && card.value)
    );
    valid ? setShowResults(true) : setShowError(true);

  }

  return (
    <div className="search_builder">
      <div className="search_builder--header">
        Search for Sessions  
      </div>
      <div className="search_builder--cards">
        {cards.map((card) => {
          return <Card key={card.id} id={card.id} />;
        })}
        <button 
          className="search_builder--buttons new_card"
          onClick={addCard}
        >
          And
        </button>
      </div>
      <button 
        className="search_builder--buttons"
        onClick={handleSearchClick}
      >
        <div className="search_builder--search">
          <div className="search_builder--search_icon">
            <FontAwesome name="search" />
          </div>
          Search
        </div>
      </button>
      <button 
        className="search_builder--buttons reset"
        onClick={() => resetCard()}
      >
        Reset
      </button>
      {showResults ? <Sql /> : ''}
      {showError ? <Error /> : ''}
    </div>
  )
}

export default SearchBuilder;
  