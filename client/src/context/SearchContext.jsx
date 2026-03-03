import { createContext, useContext, useState} from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [ searchData, setSearchData ] = useState({
        tasks: [],
        notes: [],
        resources: [],
        decks: [],
    });

    return (
        <SearchContext.Provider value={{searchData, setSearchData }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);