'use client'

import { useState, useEffect } from "react";
import Dropdown from "../comps/DropDown";
import Link from 'next/link';
import './table.css'
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "./Pagination";


function data_tables() {

  const [filterQuery, setFilterQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const db = 'http://localhost:8080/data_table';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15
  //const productSize = selectedOption?.value;

  const [data, setData] = useState([]);
  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
      setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const hasMoreData = data.length > 0 && currentItems.length === itemsPerPage;

  useEffect(() => {
    const fetchData = async (productSize) => {
      try {
        const response = await fetch(`${db}?productSize=${productSize}`);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedOption?.value) {
      fetchData(selectedOption.value);
    }
  }, [selectedOption]);



  return (
    <main className="data-main">
      <div className="nav-btn-container" >
            <Link href="/graphs">
              <Button>Previous Page</Button>
            </Link>
      </div>
      <div className="dropdown-container">
        <h3 style={{ textAlign: 'center', color:'aliceblue' }} >Select a product size</h3>
          <Dropdown options={[
            { label: '10LT', value: '10LT' },
            { label: '15LT', value: '15LT' },
            { label: '20LT', value: '20LT' },
          ]} 
          value={selectedOption}
          onChange={handleDropdownChange}
          />
          <Form onSubmit={(e)=> e.preventDefault()} >
            <Form.Group>
              <Form.Control style={{marginTop: '5px'}}type="text" placeholder="Filter data..." value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)} />
            </Form.Group>
          </Form>
      </div>
      <div className="table-container">
      {selectedOption && (
        <table className="output-table" >
            <thead>
                <tr>
                    <th>Operator</th>
                    <th>Machine</th>
                    <th>Shift</th>
                    <th>Check Type</th>
                    <th>Product Size</th>
                    <th>Cavity</th>
                    <th>Visual Inspection</th>
                    <th>Seam Inspection</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Wall Thickness</th>
                    <th>Time</th>
                </tr>
            </thead> 
        <tbody>
            {currentItems.filter((item) => 
            Object.values(item).some(
              (value) =>
              typeof value === 'string' && 
              value.toLowerCase().includes(filterQuery.toLowerCase())
            )).map((item, index) => {
              return(
              <tr key={index}>
                <td>{item.operator}</td>
                <td>{item.line}</td>
                <td>{item.shift}</td>
                <td>{item.check_type}</td>
                <td>{item.product_size}</td>
                <td>{item.cavity}</td>
                <td>{item.visual_inspection}</td>
                <td>{item.seam_inspection}</td>
                <td>{item.weight}</td>
                <td>{item.height}</td>
                <td>{item.minimum_wall_thickness}</td>
                <td>{item.submission_time}</td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
      </div>
      <div className="pagination-div" >
      {selectedOption && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          hasMoreData={hasMoreData}
        />
      )}
      </div>
    </main>
  );
};

export default data_tables