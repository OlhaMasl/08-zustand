import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    page: number,
    onChangeFn: (selectedPage: number) => void,
    total: number
}

const Pagination = ({ page, onChangeFn, total }:PaginationProps) => {
    return (
        <ReactPaginate
            pageCount={total}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => onChangeFn(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    )
};

export default Pagination