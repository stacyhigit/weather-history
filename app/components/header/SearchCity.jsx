import { useCallback, useRef, useState } from "react";
import SearchCityResults from "./SearchCityResults";
import { useDebounce } from "@/app/utils/search";
import { fetchCity } from "@/app/utils/fetchCity";

export default function SearchCity({ dateRef }) {
  const placeholderDefault = "Search City or Zip";

  const [isSearching, setIsSearching] = useState(false);
  const [showSearchCityResults, setShowSearchCityhResults] = useState(false);
  const [showRecents, setShowRecents] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchCityError, setSearchCityError] = useState(false);
  const [placeholder, setPlaceholder] = useState(placeholderDefault);

  const inputRef = useRef();

  const searchCityResultsProps = {
    suggestions,
    showSearchCityResults,
    setShowSearchCityhResults,
    showRecents,
    setShowRecents,
    searchCityError,
    setPlaceholder,
    dateRef,
    inputRef,
  };

  const handleChange = (value) => {
    setSearchCityError(false);
    if (value.length > 2) {
      setIsSearching(true);
      setShowRecents(false);
      debouncedFetch(value);
    } else {
      setIsSearching(false);
      setShowSearchCityhResults(false);
      setShowRecents(true);
      setSuggestions([]);
    }
  };

  const handleDebouncedFetch = useCallback(async (value) => {
    try {
      const response = await fetchCity(value);
      setIsSearching(false);
      if (response === "error") {
        setSearchCityError(true);
        setShowSearchCityhResults(true);
      }

      if (response?.props) {
        setSuggestions(response.props.suggestions);
        setShowSearchCityhResults(true);
      } else {
        setSuggestions([]);
        setShowSearchCityhResults(false);
      }
    } catch (e) {
      setIsSearching(false);
      setSearchCityError(true);
      setShowSearchCityhResults(true);
      console.error("An error occurred: ", e);
    }
  }, []);

  const debouncedFetch = useDebounce(handleDebouncedFetch, 1000);

  return (
    <>
      <SearchCityResults {...searchCityResultsProps} />

      <div className="rounded-container search-container relative flex items-center sm:grow mr-0 sm:-mr-1">
        <label htmlFor="city-search" className="sr-only">
          {placeholderDefault}
        </label>
        {!isSearching ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <div className="border-t-transparent border-solid animate-spin rounded-full border-primary-600 border-2 h-5 w-5"></div>
        )}
        <input
          ref={inputRef}
          key="searchCityInput"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className="w-full pl-3 placeholder-gray-700 bg-transparent shadow-none focus:border-none focus:outline-none cursor-pointer"
          onClick={() => {
            setShowRecents(true);
            setPlaceholder(placeholderDefault);
          }}
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>
    </>
  );
}
