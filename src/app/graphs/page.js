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
  const db = 'https://policeappserver.duckdns.org:4000/ringcon/data';
  const productSize = selectedOption?.value;

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
        setError(error);
      }
    };

    if (selectedOption?.value) {
      fetchData(selectedOption.value);
    }
  }, [selectedOption]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'black' }}>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
        <p>This error may be caused by an issue relating to DuckDNS a free DDNS service.</p>
      </div>
    )
  };

  const labelMap = data.map(item => item.submission_time);

  const ChartCards = [
    {
      key: 1,
      comp: <Charts
        data={data.map(item => (item.weight))}
        lowerLimit={testfunc(productSize, 'lowerLimit')}
        upperLimit={testfunc(productSize, 'upperLimit')}
        yAxisLabel='Weight (g)'
        labels={labelMap}
        type='line'
        label={`(${productSize}) Weight`}
      />,
    },
    {
      key: 2,
      comp: <Charts
        data={calculateBarData(data)}
        lowerLimit={0}
        upperLimit={50}
        yAxisLabel='Readings Taken'
        labels={['Lower (0.7 - 0.85mm)', 'Mean (0.86 - 0.125mm)', 'Upper(0.126 - 0.15mm)']}
        type='bar'
        label={`(${productSize}) Min Wall Thickness`}
        barColors={['red', 'red', 'red']}
      />,
    },
    {
      key: 3,
      comp: <Charts
        data={data.map(item => (item.height))}
        lowerLimit={testfuncTwo(productSize, 'lowerLimit')}
        upperLimit={testfuncTwo(productSize, 'upperLimit')}
        yAxisLabel='Height  (mm)'
        labels={labelMap}
        type='line'
        label={`(${productSize}) Height`}
      />,
    },
  ];


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
      {selectedOption && data && (
        <section className="chart-section">
          {ChartCards.map((item) => (
            <React.Fragment key={item.key}>
              {item.comp}
            </React.Fragment>
          ))}
        </section>
      )}
    </main>
  )
}

export default graph