import React from 'react';
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
  