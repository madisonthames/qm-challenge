import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import Select from '../Select/Select';
import './conjunction.scss';

const Conjunction = (props) => {
  const conjunction = props.conjunction;
  return (
    <div className="conjunction">
      {conjunction}
    </div>
  )
}

export default Conjunction;
  