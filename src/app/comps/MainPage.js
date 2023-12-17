'use client';

import MachineDetails from './MachineDetails';
import DataInputs from '../comps/DataInputs';
import Submit from '../comps/Submit';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './comps.css'

export default function Home() {

  const [shiftValue, setShiftValue] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [lineValue, setLineValue] = useState("");

  const handleShift = (value) => {
    setShiftValue(value);
  };
  const handleOperatorName = (value) => {
    setOperatorName(value);
  };
  const handleLineValue = (value) => {
    setLineValue(value);
  };

//handles and useState for DataInputs comp
  const [typeCheck, setTypeCheck] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectCavity, setSelectedCavity] = useState("");
  const [inspectionValue, setInspectionValue] = useState("");
  const [seamInspection, setSeamInspection] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [minWallThickness, setMinWallThickness] = useState('');
  //CHANGE BOTTOMM THREE USESTATE TO USEREF, Handle needs to change and value set to weightRef etc
    
  
  const handleSeamInspec = (seamInspection) => {
        setSeamInspection(seamInspection);
    };
  const handleVisualInspec = (inspectionValue) => {
        setInspectionValue(inspectionValue);
    };
  const handleCavity = (selectCavity) => {
        setSelectedCavity(selectCavity);
    };
  const handleSize = (selectedSize) => {
        setSelectedSize(selectedSize);
      };
  const handleTypeCheck = (typeCheck) => {
        setTypeCheck(typeCheck);
      };
  const handleWeight = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d{0,3}(\.\d{0,4})?$/;
    if (regex.test(inputValue)) {
      setWeight(inputValue);
    }
  };
  const handleHeight = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d{0,3}(\.\d{0,4})?$/;
    if (regex.test(inputValue)) {
      setHeight(inputValue);
    }
  };
  const handleMinWallThickness = (event) => {
    const inputValue = event.target.value;
    const regex = /^([0-1](\.\d{0,4})?)?$/;
    if (regex.test(inputValue)) {
      setMinWallThickness(inputValue);
    }
  };

  const db = 'https://policeappserver.duckdns.org:4000/ringcon/data';

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
  
      if (!shiftValue || !operatorName || !lineValue || !typeCheck || !selectedSize || !selectCavity || !inspectionValue || !seamInspection || !weight || !height || !minWallThickness) {
        alert('Please fill in all required fields.');
        return;
      }
  
      const response = await fetch(db, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          shifts: shiftValue,
          operator: operatorName,
          line: lineValue,
          check_type: typeCheck,
          product_size: selectedSize,
          cavity: selectCavity,
          visual_inspection: inspectionValue,
          seam_inspection: seamInspection,
          weight: weight,
          height: height,
          minimum_wall_thickness: minWallThickness
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }
  
      event.target.reset();
    } catch (error) {
      console.error('Error', error.message);
    }
  };
  


  return (
    <form id='data-input-form' onSubmit={handleSubmit}>
          <MachineDetails
                shiftValue={shiftValue}
                handleShift={handleShift}
                operatorName={operatorName}
                handleOperatorName={handleOperatorName}
                lineValue={lineValue}
                handleLineValue={handleLineValue}
          />
          <DataInputs
                typeCheck={typeCheck}
                handleTypeCheck={handleTypeCheck}
                selectedSize={selectedSize}
                handleSize={handleSize}
                selectCavity={selectCavity}
                handleCavity={handleCavity}
                inspectionValue={inspectionValue}
                handleVisualInspec={handleVisualInspec}
                seamInspection={seamInspection}
                handleSeamInspec={handleSeamInspec}
                weight={weight}
                handleWeight={handleWeight}
                height={height}
                handleHeight={handleHeight}
                minWallThickness={minWallThickness}
                handleMinWallThickness={handleMinWallThickness}
          />
        <Submit  />
    </form>
   );
  };
