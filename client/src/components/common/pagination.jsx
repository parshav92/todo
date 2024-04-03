import React from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="join flex justify-center">
      {pages.map((page) => (
        <input
          key={page}
          className="join-item  btn btn-square btn-ghost btn-xs"
          type="radio"
          name="options"
          aria-label={page}
          checked={page === currentPage}
          onChange={() => onPageChange(page)}
        />
      ))}
    </div>
  );
};

export default Pagination;
