interface PaginationProps {
  curPage: number;
  handlePagination: (event: React.MouseEvent<HTMLElement>) => void;
  lastPage: number;
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
  if (curPage < 1) {
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
}: PaginationProps) => {
  return (
    <div className="pagination">
      <PaginationHelper
        curPage={curPage}
        elements={[1, "..."]}
        handlePagination={handlePagination}
      />

      {Array.from({ length: 5 }).map((_, idx) => {
        return (
          <div key={idx} className="child" onClick={handlePagination}>
            {curPage + idx}
          </div>
        );
      })}
      <PaginationHelper
        curPage={curPage}
        elements={["...", lastPage]}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Pagination;
