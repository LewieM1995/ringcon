import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <Button style={{margin: '5px'}} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      <span style={{fontSize: '22px'}}>{currentPage}/{totalPages}</span>
      <Button style={{margin: '5px', width: '85px'}} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
