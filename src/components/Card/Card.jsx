import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { CardContext } from '../../context/context';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Conjunction from '../Conjunction/Conjunction';
import './card.scss';

const Card = ( props ) => {
  const { 
    deleteCard, 
    integerOptions, 
    predicateOptions, 
    stringOptions, 
    updateCardField, 
  } = useContext(CardContext);
  const id = props.id;
  const [field, setField] = useState(predicateOptions[0].field);
  const [fieldType, setFieldType] = useState(predicateOptions[0].type);
  const [operator, setOperator] = useState('equals');
  const [value, setValue] = useState();
  const [betweenValue, setBetweenValue] = useState();

  const handleToggle = (selectToggleState) => {
    return false;
  }

  const handleFieldChange = (field, type) => {
    setField(field);
    setFieldType(type);
    updateCardField(id, field, type, operator, value, betweenValue);
  }

  const handleOperatorChange = (operator) => {
    setOperator(operator);
    updateCardField(id, field, fieldType, operator, value, betweenValue);
  }

  const handleValueChange = (value) => {
    setValue(value);
    updateCardField(id, field, fieldType, operator, value, betweenValue);
  }

  const handleBetweenValueChange = (betweenValue) => {
    setBetweenValue(betweenValue);
    updateCardField(id, field, fieldType, operator, value, betweenValue);
  }

  let options = '';
  let placeholder = '';
  predicateOptions.filter((option) => {
    if (option.field === field) {
      placeholder = option.placeholder;
      option.type === 'string' 
        ? options = stringOptions
        : options = integerOptions
    }
    return options;
  })

  return (
    <div className="card">
        <div className="card--delete">
          <FontAwesome 
            name="times" 
            size="lg" 
            onClick={() => deleteCard(id)}
          />
        </div>
        <div className="card--select_wrapper">
          <Select 
            options={predicateOptions} 
            onChange={handleFieldChange}
            name='predicate'
          />
          {operator === 'between' && (
            <Conjunction conjunction="is" />
          )}
          <Select 
            options={options} 
            onChange={handleOperatorChange}
            toggleChanged={handleToggle}
            otherSelectOpened={handleToggle}
            name='operator'
          />
          <Input 
            placeholder={placeholder} 
            onChange={handleValueChange}
          />
          {operator === 'between' && (
            <div className="card--between">
              <Conjunction conjunction="and" />
              <Input 
                placeholder={placeholder} 
                onChange={handleBetweenValueChange}
              />
            </div>
          )}
        </div>
    </div>
  )
}

export default Card;
  