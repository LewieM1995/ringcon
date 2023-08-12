import React, { useEffect } from 'react'
import Charts from '../comps/Chart';
import Link from 'next/link';
import { useState } from 'react';
import '../pages/graph.css'
import Dropdown from '../comps/DropDown';


function graph() {

  const [selectedOption, setSelectedOption] = useState(null);
  const db = 'http://localhost:8080/data';
  const productSize = selectedOption?.value;

  const [data, setData] = useState([]);
  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const fetchData = async (productSize) => {
      try {
        const response = await fetch(`${db}?productSize=${productSize}`);
        const result = await response.json();
        //console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedOption?.value) {
      fetchData(selectedOption.value);
    }
  }, [selectedOption]);

  const labelMap = data.map(item => item.submission_time)

  const limitsArray = [
    { lowerLimit: 180, upperLimit: 240 },
    { lowerLimit: 245, upperLimit: 270 },
    { lowerLimit: 255, upperLimit: 290 },
  ];

  const hLimitsArray = [
    {lowerLimit: 240, upperLimit: 255},
    {lowerLimit: 260, upperLimit: 272},
    {lowerLimit: 260, upperLimit: 280},
  ];
  
  const testfunc = (productSize, limitType) => {
    if (productSize === '10LT') {
      return limitType === 'lowerLimit' ? limitsArray[0].lowerLimit : limitsArray[0].upperLimit;
    } else if (productSize === '15LT') {
      return limitType === 'lowerLimit' ? limitsArray[1].lowerLimit : limitsArray[1].upperLimit;
    } else {
      return limitType === 'lowerLimit' ? limitsArray[2].lowerLimit : limitsArray[2].upperLimit;
    }
  };

  const testfuncTwo = (productSize, limitType) => {
    if (productSize === '10LT') {
      return limitType === 'lowerLimit' ? hLimitsArray[0].lowerLimit : hLimitsArray[0].upperLimit;
    } else if (productSize === '15LT') {
      return limitType === 'lowerLimit' ? hLimitsArray[1].lowerLimit : hLimitsArray[1].upperLimit;
    } else {
      return limitType === 'lowerLimit' ? hLimitsArray[2].lowerLimit : hLimitsArray[2].upperLimit;
    }
  };


  const calculateBarData = (data) => {
    if (data && data.length > 0) {
      const minimumWallThicknessData = data.map((item) => parseFloat(item.minimum_wall_thickness));
  
      // Define the range of lower and upper end values
      const lowerEnd = 0.85;
      const upperEnd = 1.25;
  
      // Calculate lower end and upper end values based on mean and range
      const lowerEndValue = minimumWallThicknessData.filter((value) => value < lowerEnd).length;
      const upperEndValue = minimumWallThicknessData.filter((value) => value > upperEnd).length;
      const meanValue = minimumWallThicknessData.filter((value) => value >= lowerEnd && value <= upperEnd).length;
  
      return [lowerEndValue, meanValue, upperEndValue];
    }
  };
  

  return (
    <main className='graph-main'>
      <div className="top-box">
        <Link href="/">
          <button type='button' className='prev-btn '>Previous Page</button>
        </Link>
        <div className='chart-select'>
          <h2 style={{ textAlign: 'center' }} >Product Size</h2>
          <Dropdown options={[
            { label: '10LT', value: '10LT' },
            { label: '15LT', value: '15LT' },
            { label: '20LT', value: '20LT' },
          ]} 
          value={selectedOption}
          onChange={handleDropdownChange}
          />
        </div>
      </div>

      <div className="chart-box">
        <Charts data={data.map(item => item.weight)} lowerLimit={testfunc(productSize, 'lowerLimit')} upperLimit={testfunc(productSize, 'upperLimit')} yAxisLabel={'Weight  (G)'} labels={labelMap} type='line' label={`(${productSize}) Weight`} />
      </div>
      <div className="chart-box">
        <Charts data={calculateBarData(data)} yAxisLabel={'Min Wall  (mm)'} lowerLimit={0} upperLimit={50} labels={['Lower (0.7-0.85)', 'Mean (0.86-0.125)', 'Upper(0.126-0.15)']} type='bar' label={`(${productSize}) Min Wall Thickness`}/>
      </div>
      <div className="chart-box-3">
        <Charts data={data.map(item => item.height)} yAxisLabel={'Height  (mm)'} lowerLimit={testfuncTwo(productSize, 'lowerLimit')} upperLimit={testfuncTwo(productSize, 'upperLimit')} labels={labelMap} type='line' label={`(${productSize}) Height`}/>
      </div> 
    </main>
  )
}

export default graph

// dynamically alter the lowerlimit and upper limit value