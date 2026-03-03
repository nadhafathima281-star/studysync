import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 300) { 
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}


// This hook is used in Navbar.jsx for debouncing the search input, preventing excessive filtering while the user is typing.