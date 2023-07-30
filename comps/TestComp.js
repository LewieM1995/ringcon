import React, { useState } from 'react';
import Select from 'react-select';

const Dropper = () => {
  const checkType = [
    { value: 'Quick Check', label: 'Quick Check' },
    { value: 'Prod One', label: 'Prod One' },
    { value: 'Prod Two', label: 'Prod Two' },
  ];

  const productSize = [
    { value: '10LT', label: '10LT' },
    { value: '15LT', label: '15LT' },
    { value: '20LT', label: '20LT' },
  ];

  const cavity = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const [typeCheck, setTypeCheck] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectCavity, setSelectedCavity] = useState(null);

  const handleTypeCheck = (selectedOption) => {
    setTypeCheck(selectedOption);
  };

  const handleSize = (selectedOption) => {
    setSelectedSize(selectedOption);
  };

  const handleCavity = (selectedOption) => {
    setSelectedCavity(selectedOption);
  };

  const renderDropdown = (options, value, onChange) => {
    return (
      <div>
        <h1>Select an option:</h1>
        <Select options={options} value={value} onChange={onChange} />
        {value && <p>You selected: {value.label}</p>}
      </div>
    );
  };

  return (
    <div>
      {renderDropdown(checkType, typeCheck, handleTypeCheck)}
      {renderDropdown(productSize, selectedSize, handleSize)}
      {renderDropdown(cavity, selectCavity, handleCavity)}
    </div>
  );
};

export default Dropper;
