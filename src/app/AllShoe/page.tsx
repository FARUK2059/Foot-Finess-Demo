'use client';
import ShoeCard from '@/components/ShoeCard';
import React, { useEffect, useState } from 'react';

const AllShoe = () => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoe, setFilteredShoe] = useState([]);
  const [count, setCount] = useState(0);
  const [shoePerPage, setShoePerPage] = useState(10);
  const numberOfPages = Math.ceil(count / shoePerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [];

  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  const loadShoes = async () => {
    const res = await fetch(
      `http://localhost:3000/AllShoe/api/get-all?page=${currentPage}&size=${shoePerPage}`
    );
    const data = await res.json();
    setShoes(data);
    setFilteredShoe(data);
  };

  const loadCount = async () => {
    const res = await fetch('http://localhost:3000/AllShoe/api/get-total');
    const data = await res.json();
    setCount(data.count);
  };

  useEffect(() => {
    loadCount();
    loadShoes();
  }, [currentPage, shoePerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    const filtered = shoes.filter((shoe) =>
      shoe?.shoeName?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredShoe(filtered);
  };

  const handleShoePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShoePerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page change
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='mt-20 px-10'>
      <h1 className='py-10 text-center text-3xl font-semibold'>
        Discover the Latest Trends in Shoes
      </h1>
      <div className='mb-3 text-center'>
        <input
          onChange={handleInputChange}
          className='w-25 border-2 px-2 py-2'
          type='text'
          placeholder='Search...'
        />
      </div>
      <div className='grid grid-cols-1 gap-7 md:grid-cols-3 lg:grid-cols-4'>
        {filteredShoe?.map((shoe, index) => <ShoeCard key={index} shoe={shoe} />)}
      </div>
      <div className='mb-40 text-center'>
        <p>Current Page: {currentPage}</p>
        <button onClick={handlePrevPage}>Prev</button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={page}
            className={currentPage === page ? 'm-2 bg-yellow-500 px-3 py-2' : 'm-2 px-3 py-2'}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage}>Next</button>
        <select value={shoePerPage} onChange={handleShoePerPage}>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </select>
      </div>
    </div>
  );
};

export default AllShoe;
