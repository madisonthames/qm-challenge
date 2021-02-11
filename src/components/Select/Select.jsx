import React, { useRef, useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import './select.scss';

const Select = (props) => {
  const { options, onChange } = props;
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(options[0].field);
  const wrapperRef = useRef(null);
  
  const handleChange = (field, fieldType) => {
    onChange(field, fieldType)
  }

  useEffect(() => {
    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setToggle(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
}, [wrapperRef, toggle]);

  return (
    <div className="select" ref={wrapperRef}>
      <button 
        className="select--button" 
        onClick={() => setToggle(!toggle)}
      >
        <div className="select--title">{selected}</div>
        {toggle
          ? <FontAwesome name="angle-up" size="lg" />
          : <FontAwesome name="angle-down" size="lg" />}
      </button>
      {toggle && (
        <div className="select--options">
          <div className="select--options_inner_wrapper">
            {options.map((option, key) => (
              <button
                className={`select--item ${selected === option.field ? 'selected' : ''}`}
                key={key}
                onClick={() => {
                  handleChange(option.field, option.type);
                  setSelected(option.field);
                  setToggle(false);
                }}
              >
                {option.field}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select;
  