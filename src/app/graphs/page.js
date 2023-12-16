'use client'

import React, { useEffect } from 'react'
import Charts from './Chart';
import Link from 'next/link';
import { useState } from 'react';
import './graph.css';
import Dropdown from '../../../sharedcomps/DropDown';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { calculateBarData, testfunc, testfuncTwo } from './CalcBarData';


function graph() {

  const [selectedOption, setSelectedOption] = useState(null);
  const db = 'http://localhost:4000/data';
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

  


  return (
    <main className="main-container">
        <section className='nav-btn-container'>
          <Link href="/">
            <Button type='button'>Prev Page</Button>
          </Link>
          <Link href="/tables">
            <Button type='button'>Next Page</Button>
          </Link>
        </section>
        <section className='dropdown-container'>
          <h2 style={{ textAlign: 'center' }} >Product Size</h2>
          <Dropdown options={[
            { label: '10LT', value: '10LT' },
            { label: '15LT', value: '15LT' },
            { label: '20LT', value: '20LT' },
          ]} 
          value={selectedOption}
          onChange={handleDropdownChange}
          />
        </section>
        {selectedOption && (
          <section className="chart-section">
          <Charts data={data.map(item => item.weight)} 
          lowerLimit={testfunc(productSize, 'lowerLimit')} 
          upperLimit={testfunc(productSize, 'upperLimit')} 
          yAxisLabel={'Weight  (G)'} labels={labelMap} 
          type='line' 
          label={`(${productSize}) Weight`} 
          />
          <Charts data={calculateBarData(data)} 
          yAxisLabel={'Readings Taken'} 
          lowerLimit={0} upperLimit={50} 
          labels={['Lower (0.7 - 0.85mm)', 'Mean (0.86 - 0.125mm)', 'Upper(0.126 - 0.15mm)']} 
          type='bar' 
          label={`(${productSize}) Min Wall Thickness`}
          barColors={['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)']}
          />
          <Charts data={data.map(item => item.height)} 
          yAxisLabel={'Height  (mm)'} 
          lowerLimit={testfuncTwo(productSize, 'lowerLimit')} 
          upperLimit={testfuncTwo(productSize, 'upperLimit')} 
          labels={labelMap} 
          type='line' 
          label={`(${productSize}) Height`}
          />
        </section>
        )}
           
    </main>
  )
}

export default graph