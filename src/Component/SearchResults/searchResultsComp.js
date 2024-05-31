import React, { useState } from 'react';
import './searchResultsComp.css';

const SearchResultsComponent = ({ searchResults }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  // Calculate total pages
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  // Function to get current page results
  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return searchResults.slice(startIndex, endIndex);
  };

  // Event handlers for pagination buttons
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
      </div>

      {searchResults.length > 0 && (
        <div className='searchResultsContainer'>
          <div className='searchResultsHeading'>SEARCH RESULTS</div>
          <div className='searchResults'>
            {getCurrentPageResults().map((result, idx) => (
              <div key={idx} className='searchResultItem'>
                <div>Date: {result.date}</div>
                <div>Room: {result.room}</div>
                <div>Name: {result.name}</div>
                <div>Message: {result.message}</div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='paginationControls'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsComponent;
