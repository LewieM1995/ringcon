"use client";

import '../comps/comps.css'
import Dropdown from './DropDown';

function DrpDwnInputs( {shiftValue, lineValue, operatorName, handleLineValue, handleOperatorName, handleShift} ) {

  const shifts = [
    { value: "Day", label: "Day"},
    { value: "Shift 1", label: "Shift 1"},
    { value: "Shift 2", label: "Shift 2"}
  ];
 

  const operator = [
    { value: "James D", label: "James D"},
    { value: "Lydia F", label: "Lydia F"}
  ];
 

  const line = [
    { value: "Liberty 1", label: "Liberty 1"},
    { value: "Liberty 2", label: "Liberty 2"},
    { value: "Liberty 3", label: "Liberty 3"}
  ];
  


  return (
    <section className='machine-details-container'>
      <h1>Machine Details</h1>
      <div className='machine-details'>
          <label>Shift</label>
          <Dropdown options={shifts} value={shiftValue} onChange={handleShift}/>
          <label>Operator</label>
          <Dropdown options={operator} value={operatorName} onChange={handleOperatorName}/>
          <label>Line</label>
          <Dropdown options={line} value={lineValue} onChange={handleLineValue}/>
      </div>
    </section>
  )
}

export default DrpDwnInputs