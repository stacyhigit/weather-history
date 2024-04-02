"use client";

import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/context/SelectionsContext";
import units from "@/app/data/units.json";
import DropdownContainer from "../DropdownContainer";
import UnitsDropdown from "./UnitsDropdown";

export default function Units() {
  const { selectedUnits, setSelectedUnits } = useContext(SelectionsContext);

  const [showUnitsDropdown, setShowUnitsDropdown] = useState(false);

  useEffect(() => {
    setSelectedUnits({
      Temperature:
        JSON.parse(localStorage.getItem("Temperature")) || units.Temperature[0],
      Wind: JSON.parse(localStorage.getItem("Wind")) || units.Wind[1],
    });
  }, [setSelectedUnits]);

  return (
    <div className="col-start-3 w-full min-w-28 text-right">
      <button
        type="button"
        className="inline-flex items-center px-2 py-4 my-0 text-white hover:bg-black hover:bg-opacity-50 transition duration-300 ease-in-out"
        onClick={() => setShowUnitsDropdown(true)}
      >
        <span className="mx-1 text-white">
          {selectedUnits.Temperature.displayShort} |{" "}
          {selectedUnits.Wind.displayShort}{" "}
        </span>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <DropdownContainer
        show={showUnitsDropdown}
        setShow={setShowUnitsDropdown}
        background="transparent"
      >
        <div className="relative">
          <div className="z-40 absolute top-0 right-0 w-fit">
            <div className="relative overflow-auto w-fit bg-white border-2 rounded-md py-2 px-5">
              <h3 className="mt-4 mb-2 font-bold text-left uppercase">
                Settings
              </h3>
              <button
                type="button"
                className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 rounded-full hover:hover:bg-gray-300 transition duration-300"
                onClick={() => setShowUnitsDropdown(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
              {Object.entries(units).map((unit) => (
                <UnitsDropdown
                  key={unit[0]}
                  unit={unit}
                  setShowUnitsDropdown={setShowUnitsDropdown}
                />
              ))}
            </div>
          </div>
        </div>
      </DropdownContainer>
    </div>
  );
}
