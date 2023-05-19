import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

interface IProps {
    updateQuery: (arg: string) => void
}

interface IQuery {
    query: string
}


const SearchForm:FC<IProps> = ({updateQuery}) => {
    const {handleSubmit, register} = useForm<IQuery>();

    const submit:SubmitHandler<IQuery> = (request) => {
        updateQuery(request.query)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder="Type your query to search" {...register('query')}/>
                <button>Search</button>
            </form>
        </div>
    );
};

export {
    SearchForm
};