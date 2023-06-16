import React from 'react';
import '../../styles/tables.css';

function getPaginationData(currentPage, pageCount) {
  let delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    result = [];

  result = Array.from({ length: pageCount }, (v, k) => k + 1).filter(
    (i) => i && i >= left && i < right,
  );

  if (result.length > 1) {
    // Add first page and dots
    if (result[0] > 1) {
      if (result[0] > 2) {
        result.unshift('...');
      }
      result.unshift(1);
    }

    // Add dots and last page
    if (result[result.length - 1] < pageCount) {
      if (result[result.length - 1] !== pageCount - 1) {
        result.push('...'  );
      }
      result.push(pageCount);
    }
  }

  return result;
}

const TablePagination = ({ pages = 0, active = 0, changePage, loading }) => {
  const [activePage, setActivePage] = React.useState(active);
  React.useEffect(() => {
    if (!loading) {
      setActivePage(active);
    }
  }, [loading, active]);

  const paginationData = getPaginationData(activePage, pages);
  return (
    <div className="table-pagination py-4 w-full flex justify-center">
      {paginationData.map((value, index) =>
        value === ('...') ? (
          <p key={index} className="mx-1 flex items-center">
            {value}
          </p>
        ) : (
          <div
            key={index}
            className={`pagination-item ${activePage === value && 'active'}`}
            onClick={() => {
              if (!(activePage === value)) {
                setActivePage(value);
                changePage(value - 1);
              }
            }}
          >
            <p>{value}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default TablePagination;
