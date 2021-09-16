import './style.css'; 

const Pagination = (props) => {
  const buttons = [];
  for (let i = 1; i <= 10; i++) {
    buttons.push(
      <button
        className={
          props.currentPage === i
            ? "pagination__button--select"
            : "pagination__button"
        }
        onClick={() => props.setPage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      <div className="pagination__buttonContainer">{buttons}</div>
    </div>
  );
};

export default Pagination;

