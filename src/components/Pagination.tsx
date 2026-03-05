interface PaginationProps {
  curPage: number;
  handlePagination: (event: React.MouseEvent<HTMLElement>) => void;
  lastPage: number;
  totalItems: number;
}

type PaginationItem = number | "...";
interface PaginationHelperProps {
  curPage: number;
  elements: Array<PaginationItem>;
  handlePagination: (event: React.MouseEvent<HTMLElement>) => void;
}
const PaginationHelper = ({
  curPage,
  elements,
  handlePagination,
}: PaginationHelperProps) => {
  if (curPage <= 1) {
    return null;
  }
  return elements.map((e) => (
    <div
      className={`child ${e === "..." ? "child-dot" : ""}`}
      onClick={e === "..." ? () => "" : handlePagination}
    >
      {e}
    </div>
  ));
};
const Pagination = ({
  curPage,
  handlePagination,
  lastPage,
  totalItems,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <PaginationHelper
        curPage={curPage}
        elements={[1, "..."]}
        handlePagination={handlePagination}
      />

      {Array.from({ length: Math.min(5, totalItems) }).map((_, idx) => {
        const pageNum = curPage + idx + (curPage <= 1 ? 0 : 1);
        return (
          <div
            key={idx}
            className={`child ${pageNum === curPage ? "child-active" : ""}`}
            onClick={handlePagination}
          >
            {pageNum}
          </div>
        );
      })}
      <PaginationHelper
        curPage={Math.min(curPage, totalItems)}
        elements={["...", lastPage]}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Pagination;
