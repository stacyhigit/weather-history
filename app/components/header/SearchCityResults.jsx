import { SelectionsContext } from "@/app/context/SelectionsContext";
import { useContext, useEffect, useState } from "react";
import SearchCityDropdown from "./SearchCityDropdown";

export default function SearchCityResults({
  suggestions,
  showSearchCityResults,
  setShowSearchCityhResults,
  showRecents,
  setShowRecents,
  searchCityError,
  setPlaceholder,
  dateRef,
  inputRef,
}) {
  const { setSelectedCity } = useContext(SelectionsContext);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const recents = JSON.parse(localStorage.getItem("recents")) || [];
      setRecents(recents);
    }
  }, []);

  const handleSearchClick = (city) => {
    setSelectedCity(city);
    setPlaceholder(`${city.name}, ${city.areas}`);
    setRecents((prevRecents) => {
      if (prevRecents.some((recent) => recent.id === city.id)) {
        return prevRecents;
      }
      const nextRecents = [city, ...prevRecents.slice(0, 4)];
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("recents", JSON.stringify(nextRecents));
      }
      return nextRecents;
    });
    setShowSearchCityhResults(false);
    setShowRecents(false);
    inputRef.current.value = "";
    dateRef.current.setFocus();
  };

  const dropdownProps = {
    show: showSearchCityResults,
    setShow: setShowSearchCityhResults,
    handleSearchClick,
  };

  if (searchCityError) {
    return (
      <SearchCityDropdown {...dropdownProps} cityList={[]}>
        <div className="p-4 text-red-600">
          Problem connecting. Please check your internet connection and try
          again.{" "}
        </div>
      </SearchCityDropdown>
    );
  }

  if (showRecents && recents.length > 0) {
    return (
      <SearchCityDropdown
        {...dropdownProps}
        show={showRecents}
        setShow={setShowRecents}
        cityList={recents}
      >
        <div className="px-4 py-3 text-sm">RECENTS</div>
      </SearchCityDropdown>
    );
  }

  if (showSearchCityResults && suggestions.length > 0) {
    return (
      <SearchCityDropdown
        {...dropdownProps}
        cityList={suggestions}
      ></SearchCityDropdown>
    );
  }
  return null;
}
