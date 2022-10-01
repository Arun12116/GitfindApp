import { useRef } from "react";


const Search = ({ searchUserName, isSucessfull }) => {

    const refer = useRef();

    const load = e => {
        e.preventDefault()
        // console.log(e);

        const SearchkeyWord = refer.current.value;
        searchUserName(SearchkeyWord)
    }

    return (
        <>
            <div className="card search">
                <h1>Search for Username</h1>
                <form onSubmit={load}>
                    <input type="text" ref={refer} className={isSucessfull === false ? "incorrect-input" : " "} />
                    <button>Search</button>
                </form>
                {isSucessfull === false? (
                    <p className="incorrect">Invaild user name</p>
                ) : false}
            </div>

        </>

    )

}
export default Search;