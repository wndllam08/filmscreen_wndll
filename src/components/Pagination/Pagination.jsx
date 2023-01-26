import React from 'react';
import { Btn, Container, PageNum } from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  console.log('Pagination');

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    setPage((nextPage) => nextPage + 1);
  };

  if (totalPages === 0) return null;

  return (
    <Container>
      <Btn onClick={handlePrev} variant="contained" color="primary" type="button" disabled={currentPage === 1}>Prev</Btn>
      <PageNum variant="h4">{currentPage}</PageNum>
      <Btn onClick={handleNext} variant="contained" color="primary" type="button" disabled={currentPage === totalPages}>Next</Btn>
    </Container>
  );
};

export default Pagination;
