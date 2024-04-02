import { SelectionsContext } from "@/app/context/SelectionsContext";
import { useContext } from "react";

export default function SearchButton() {
  const { selectedCity, startDate, searchWeather } =
    useContext(SelectionsContext);

  const disabled = !startDate || selectedCity.id === 0 || searchWeather;

  return (
    <button
      className="bg-primary-600 text-white sm:absolute sm:right-0 h-10 sm:h-12 mr-0 sm:mr-1 w-full sm:w-12 mt-1 sm:mt-0 rounded-full flex justify-center items-center cursor-pointer"
      onClick={(event) => event.currentTarget.blur()}
      disabled={disabled}
    >
      <span className="block sm:hidden mr-2 font-semibold uppercase">
        Search
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      {!disabled && (
        <div className="absolute bottom-0 left-0 right-0 top-auto sm:top-0 h-12 w-full rounded-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-10"></div>
      )}
    </button>
  );
}
