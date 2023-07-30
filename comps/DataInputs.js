"use client";

import '../comps/comps.css'
import Dropdown from './DropDown';

function DataInputs({ typeCheck, selectedSize, selectCavity, inspectionValue, seamInspection, handleCavity, handleSeamInspec, handleSize, handleTypeCheck, handleVisualInspec, weight, handleWeight, handleHeight, height, handleMinWallThickness, minWallThickness }) {

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
        { value: "1", label: "1"},
        { value: "2", label: "2"},
        { value: "3", label: "3"}
    ];

    const visualInspection = [
        { value: "Pass", label: "Pass"},
        { value: "Fail", label: "Fail"}
    ];

    const seamInspec = [
        { value: "Pass", label: "Pass"},
        { value: "Fail", label: "Fail"}
    ];


    const getSizeString = () => {
        if (selectedSize.value === "10LT") {
            return "245 - 250mm"
        } else if (selectedSize.value === "15LT") {
            return "260 - 265mm"
        } else if (selectedSize.value === "20LT") {
            return "270 - 275mm"
        } else {
            return "Select A Product Size"
        };
    };
    const sizeString = getSizeString(selectedSize)

    const getWeightString = () => {
        if (selectedSize.value === "10LT") {
            return "215 - 225G"
        } else if (selectedSize.value === "15LT") {
            return "250 - 260G"
        } else if (selectedSize.value === "20LT") {
            return "270 - 280G"
        } else {
            return "Select A Product Size"
        };
    };
    const weightString = getWeightString(selectedSize)


  return (
    <div className='data-inputs-container'>
        <section>
            <h2>Product Details</h2>
            <div className="input-div">
                <label>Check Type</label>
                <Dropdown options={checkType} value={typeCheck} onChange={handleTypeCheck} />
            </div>
            <div className="input-div">
                <label>Product Size</label>
                <Dropdown options={productSize} value={selectedSize} onChange={handleSize} />
            </div>
            <div className="input-div">
                <label>Cavity</label>
                <Dropdown options={cavity} value={selectCavity} onChange={handleCavity} />
            </div>
        </section>
        <section>
            <h2>Basic Inspections</h2>
            <div className="input-div">
                <label>Visual Inspection</label>
                <Dropdown options={visualInspection} value={inspectionValue} onChange={handleVisualInspec} />
            </div>
            <div className="input-div">
                <label>Seam Inspection</label>
                <Dropdown options={seamInspec} value={seamInspection} onChange={handleSeamInspec} />
            </div>
        </section>
        <section>
            <h2>Measurements</h2>
            <div className="input-div">
                <label>Weight(Grams) : {weightString}</label>
                <input type="number" placeholder="Gram Weight" className='custom-input' value={weight} onChange={handleWeight}/>
            </div>
            <div className="input-div">
                <label>Height(mm) : {sizeString} </label>
                <input type="number" placeholder="Height in millimetres" className='custom-input' value={height} onChange={handleHeight}/>
            </div>
            <div className="input-div">
                <label>Minimum Wall Thickness : Enter a Number Between 0.7 - 1.4</label>
                <input type="number" placeholder="Minimum Wall Thickness" className='custom-input' value={minWallThickness} onChange={handleMinWallThickness}/>
            </div>
        </section>
    </div>
  )
}

export default DataInputs