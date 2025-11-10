import css from './SearchBox.module.css';

interface SearchBoxProps {
    onSearch: (search: string) => void,
    searchValue: string
};

const SearchBox = ({ onSearch, searchValue}: SearchBoxProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
     };
    return (
        <input
            className={css.input}
            type="text"
            defaultValue={searchValue}
            placeholder="Search notes"
            onChange={handleChange}
        />
    )
};

export default SearchBox