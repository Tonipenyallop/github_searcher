interface PaginationProps {
  curPage: number;
  handlePagination: (page: number) => void;
  lastPage: number;
}

/*
    can see the 5 window pagination
    2 + cur page to be centre + 2
*/
const Pagination = ({
  curPage,
  handlePagination,
  lastPage,
}: PaginationProps) => {
  let firstPageInWindow = Math.max(1, curPage - 2);
  let lastPageInWindow = Math.min(curPage + 2, lastPage);

  if (curPage <= 3) {
    // handles close to first case(idx,1,2,3)
    lastPageInWindow = Math.min(5, lastPage);
  }

  if (curPage > lastPage - 2) {
    // handles almost end cases(i.e, max = 34, 30,31,32, and so on)
    firstPageInWindow = Math.max(1, lastPage - 4);
  }

  const pages = [];
  for (let cur = firstPageInWindow; cur <= lastPageInWindow; cur++) {
    pages.push(cur);
  }

  return (
    <div className="pagination">
      {firstPageInWindow > 1 && (
        <>
          <div
            className="child"
            onClick={() => {
              handlePagination(1);
            }}
          >
            {1}
          </div>
          <div className="child child-dot">...</div>
        </>
      )}

      {pages.map((page) => {
        return (
          <div
            key={`page-${page}`}
            className={`child ${page === curPage ? "child-active" : ""}`}
            onClick={() => {
              handlePagination(page);
            }}
          >
            {page}
          </div>
        );
      })}

      {lastPageInWindow !== lastPage && (
        <>
          <div className="child child-dot">...</div>
          <div
            className="child"
            onClick={() => {
              handlePagination(lastPage);
            }}
          >
            {lastPage}
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
