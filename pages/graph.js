import React, { useEffect } from 'react'
import Charts from '../comps/Chart';
import Link from 'next/link';
import { useState } from 'react';
import '../pages/graph.css'
import Dropdown from '../comps/DropDown';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { calculateBarData, testfunc, testfuncTwo } from '../comps/CalcBarData';


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

  


  return (
    <main className='graph-main'>
      <div className="top-box">
        <div className='link-container'>
          <Link href="/">
            <Button type='button' style={{margin: '10px', width: '125px'}}>Previous Page</Button>
          </Link>
          <Link href="/data_tables">
            <Button type='button' style={{width: '125px'}}>Next Page</Button>
          </Link>
        </div>
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