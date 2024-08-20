import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination aria-label="Page navigation" >
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => onPageChange(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
      </PaginationItem>
      {pages.map(page => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => onPageChange(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

export default Paginate;
