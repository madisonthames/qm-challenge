import React, { useEffect, useState, useCallback } from 'react';
import './input.scss';

const Input = (props) => {
  const { placeholder, onChange } = props;

  return (
    <div className="input">
      <input 
        placeholder={placeholder}
        onBlur={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Input;
  