import React, { useContext } from 'react';
import { CardContext } from '../../context/context';
import './sql.scss'

const Sql = () => {
  const { cards, predicateOptions} = useContext(CardContext);
  
  let sqlStatement = '';
  let dynamicStatement = '';
  cards.map((card, key) => {
    const option = predicateOptions.filter((option) => option.field === card.field);
    switch (card.operator) {
      case 'equals':
        card.fieldType === 'string' 
          ? dynamicStatement = `${option[0].column} = '${card.value}'`
          : dynamicStatement = `${option[0].column} = ${card.value}`
        break;
      case 'contains':
        dynamicStatement = `${option[0].column} CONTAINS '${card.value}'`;
        break;
      case 'starts with':
        dynamicStatement = `${option[0].column} LIKE '${card.value}%'`;
        break;
      case 'in list':
        dynamicStatement = `${option[0].column} IN (${card.value})`;
        break;
      case 'between':
        dynamicStatement = `${option[0].column} BETWEEN ${card.value} AND ${card.betweenValue}`;
        break;
      case 'greater than':
        dynamicStatement = `${option[0].column} > ${card.value}`;
        break;
      case 'less than':
        dynamicStatement = `${option[0].column} < ${card.value}`;
        break;
      default:
        dynamicStatement = '';
        break;
    }

    key === 0 
      ? sqlStatement = `SELECT * FROM session WHERE ${dynamicStatement}`
      : sqlStatement += ` AND ${dynamicStatement}`

    return sqlStatement;
  });

  return (
    <div className="sql">
      {sqlStatement}
    </div>
  )
}

export default Sql;