import React from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    // <nav>
    //     <ul className="pagination">
    //         {pages.map((page) => (
    //             <li
    //                 key={page}
    //                 className={page === currentPage ? 'page-item active' : 'page-item'}
    //             >
    //                 <a onClick={() => onPageChange(page)} className="page-link">
    //                     {page}
    //                 </a>
    //             </li>
    //         ))}
    //     </ul>
    // </nav>
    <div className="join flex justify-center">
      <input
        className="join-item btn btn-square btn-ghost btn-xs"
        type="radio"
        name="options"
        aria-label="1"
        checked
      />
      <input
        className="join-item btn btn-square btn-ghost btn-xs"
        type="radio"
        name="options"
        aria-label="2"
      />
      <input
        className="join-item btn btn-square btn-ghost btn-xs"
        type="radio"
        name="options"
        aria-label="3"
      />
      <input
        className="join-item btn btn-square btn-ghost btn-xs"
        type="radio"
        name="options"
        aria-label="4"
      />
    </div>
  );
};

export default Pagination;
