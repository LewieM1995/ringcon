import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ currentPage, totalPages, onPageChange, hasMoreData }) => {
  return (
    <div className="pagination">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </Button>
      <span>{currentPage}/{totalPages}</span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || !hasMoreData}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
