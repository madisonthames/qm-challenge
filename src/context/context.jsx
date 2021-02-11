import React, { useState, createContext } from "react";
import uniqid from "uniqid";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const id = uniqid();
  const initialState = [{
    id: id,
    field: 'Domain',
    fieldType: 'string',
    operator: 'equals',
    value: '',
    betweenValue: ''
  }];
  const [cards, setCards] = useState(initialState);
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);

  const predicateOptions = [
    {
      field: 'Domain',
      type: 'string',
      placeholder: 'website.com',
      column: 'domain'
    },
    {
      field: 'First Name',
      type: 'string',
      placeholder: 'John',
      column: 'user_first_name'
    },
    {
      field: 'Last Name',
      type: 'string',
      placeholder: 'Doe',
      column: 'user_last_name'
    },
    {
      field: 'Number of Visits',
      type: 'integer',
      placeholder: '0',
      column: 'visits'
    },
    {
      field: 'Page Path',
      type: 'string',
      placeholder: '/path',
      column: 'path'
    }, 
    {
      field: 'Page Response Time (ms)',
      type: 'integer',
      placeholder: '0',
      column: 'page_response'
    }, 
    {
      field: 'Screen Height',
      type: 'integer',
      placeholder: '0',
      column: 'screen_height'
    },
    {
      field: 'Screen Width',
      type: 'integer',
      placeholder: '0',
      column: 'screen_width'
    }, 
    {
      field: 'User Email',
      type: 'string',
      placeholder: 'johndoe@email.com',
      column: 'user_email'
    }
  ];

  const integerOptions = [
    {
      field: 'equals',
    }, 
    {
      field: 'between'
    },
    {
      field: 'greater than'
    }, 
    {
      field: 'less than'
    }, 
    {
      field: 'in list'
    }
  ];

  const stringOptions = [
    {
      field: 'equals'
    }, 
    {
      field: 'contains'
    },
    {
      field: 'starts with'
    }, 
    {
      field: 'in list'
    }
  ];

  const updateCardField = (id, field, fieldType, operator, value, betweenValue) => {
    setShowResults(false);
    setShowError(false);
    setCards((cards) => cards.filter((card) => {
      if (card.id === id) {
        card.field = field;
        card.fieldType = fieldType;
        card.operator = operator;
        card.value = value;
        card.betweenValue = betweenValue;
      }
      return cards;
    }));
  };

  const deleteCard = (id) => {
    setShowResults(false);
    setShowError(false);
    if (cards.length === 1) {
      resetCard();
    } else {
      setCards((cards) => cards.filter((card) => {
        return card.id !== id
      }));
    }
  };

  const resetCard = () => {
    setShowResults(false);
    setShowError(false);
    setCards([...initialState]);
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        showResults,
        setShowResults,
        showError,
        setShowError,
        predicateOptions,
        stringOptions,
        integerOptions,
        updateCardField,
        deleteCard,
        resetCard
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
