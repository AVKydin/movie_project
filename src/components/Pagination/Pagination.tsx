import {FC} from "react";

import css from "./Pagination.module.css";


interface IProps {
    changePage: (value: number) => void
    currentPage: number
    status:string|null
}


const Pagination: FC<IProps> = ({changePage, currentPage, status}) => {

    return (
        <div className={css.pagination}>
            {currentPage !== 1 && <button onClick={() => changePage(-1)}>Prev page</button>}
            {status && <button onClick={() => changePage(1)}>Next page</button>}
        </div>
    );
};

export {Pagination};