import React, { useState } from "react";
import "./style.css";

const Pagination = ({ items, itemsPerPage = 6, renderItem, wrapper }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Ensure items is always an array
  const validItems = Array.isArray(items) ? items : [];

  const totalPages = Math.ceil(validItems.length / itemsPerPage);

  const handleClickPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentItems = validItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderedItems = currentItems.map((item, index) => renderItem(item, index));

  if (validItems.length === 0) {
    return <div>No items found</div>; // Handling empty state gracefully
  }

  return (
    <div>
      {/* Render wrapped items */}
      {wrapper ? wrapper(renderedItems) : renderedItems}

      {/* Pagination controls */}
      <div className="pagination-container">
        <button
          onClick={() => handleClickPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClickPage(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handleClickPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
