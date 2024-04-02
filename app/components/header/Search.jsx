"use client";
import { useContext, useRef } from "react";
import dayjs from "dayjs";

import { SelectionsContext } from "@/app/context/SelectionsContext";
import SearchCity from "./SearchCity";
import SearchDate from "./SearchDate";
import SearchButton from "./SearchButton";
import { getTimezoneShort, promiseMap } from "@/app/utils/search";
import { fetchWeather } from "@/app/utils/fetchWeather";

export default function Search() {
  const {
    startDate,
    selectedCity,
    selectedUnits,
    setSearchWeather,
    handleSetWeather,
  } = useContext(SelectionsContext);

  const dateRef = useRef();

  const handleSearchWeather = async (event) => {
    event.preventDefault();

    const listToFetch = [...Array(25).keys()].map((i) => ({
      date: dayjs(startDate).subtract(i, "year").toDate(),
      city: selectedCity,
    }));

    try {
      setSearchWeather(true);
      const results = await promiseMap(listToFetch, fetchWeather);
      handleSetWeather(
        {
          city: selectedCity.name,
          time: `${dayjs(startDate).format(
            "MMMM D [at] ha"
          )} ${getTimezoneShort(selectedCity.timezone)}`,
          data: results,
        },
        selectedUnits
      );
    } catch (err) {
      console.error("an error occurred searching weather", err);
    } finally {
      setSearchWeather(false);
    }
  };

  return (
    <div className="w-full sm:mt-2">
      <form onSubmit={handleSearchWeather}>
        <div className="flex w-full justify-center">
          <div className="relative w-full sm:max-w-3xl sm:flex sm:items-center mt-3 sm:h-14 rounded-full sm:border-2 sm:border-gray-300 sm:bg-white sm:focus-within:bg-gray-300 cursor-pointer">
            <SearchCity dateRef={dateRef} />
            <div className="hidden sm:block bg-gray-300 w-0.5 h-6"></div>
            <SearchDate dateRef={dateRef} />
            <SearchButton />
          </div>
        </div>
      </form>
    </div>
  );
}
