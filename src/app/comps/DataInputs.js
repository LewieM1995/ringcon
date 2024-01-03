"use client";

import '../comps/comps.css'
import Dropdown from '../../../sharedcomps/DropDown';

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
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" }
    ];

    const visualInspection = [
        { value: "Pass", label: "Pass" },
        { value: "Fail", label: "Fail" }
    ];

    const seamInspec = [
        { value: "Pass", label: "Pass" },
        { value: "Fail", label: "Fail" }
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
        <section className='data-inputs-container'>
            <h1>Product Details</h1>
            <div className='production-inputs'>
                <label>Check Type</label>
                <Dropdown options={checkType} value={typeCheck} onChange={handleTypeCheck} />
                <label>Product Size</label>
                <Dropdown options={productSize} value={selectedSize} onChange={handleSize} />
                <label>Cavity</label><Dropdown options={cavity} value={selectCavity} onChange={handleCavity} />
            </div>
            <h1>Basic Inspection</h1>
            <div className='basic-inputs' >
                <label>Visual Inspection</label>
                <Dropdown options={visualInspection} value={inspectionValue} onChange={handleVisualInspec} />
                <label>Seam Inspection</label>
                <Dropdown options={seamInspec} value={seamInspection} onChange={handleSeamInspec} />
            </div>
            <h1>Measurements</h1>
            <div className='measurement-inputs'>
                <label>Weight(Grams): {weightString}</label>
                <br />
                <input type="text" placeholder={weightString} value={weight} onChange={handleWeight} />
                <br />
                <label>Height(mm): {sizeString}</label>
                <br />
                <input type="text" placeholder={sizeString} value={height} onChange={handleHeight} />
                <br />
                <label>Min Wall: 0.7 - 1.4</label>
                <br />
                <input type="text" placeholder="range: 0.7 - 1.4" value={minWallThickness} onChange={handleMinWallThickness} />
            </div>
        </section>
    )
}

export default DataInputs
