import { useContext } from "react";
import { SelectionsContext } from "@/app/context/SelectionsContext";

export default function UnitsDropdown({
  unit: [name, units],
  setShowUnitsDropdown,
}) {
  const { selectedUnits, setSelectedUnits, handleSetWeather, weather } =
    useContext(SelectionsContext);

  function handleUnitChange(event, unit) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem([event.target.name], JSON.stringify(unit));
    }
    const nextUnits = {
      ...selectedUnits,
      [event.target.name]: unit,
    };
    setSelectedUnits(nextUnits);
    handleSetWeather(weather, nextUnits);
    setShowUnitsDropdown(false);
  }

  return (
    <>
      <h2 className="text-left mt-4 mb-3 font-semibold">{name} Units</h2>
      <div className="flex flex-col space-y-5">
        <div className="flex w-fit mb-3 py-2 px-1 bg-gradient-dark rounded-full">
          {units.map((unit) => (
            <div key={unit.id}>
              <input
                id={unit.value}
                className="sr-only peer"
                type="radio"
                name={name}
                checked={unit.id === selectedUnits[name].id}
                onChange={(event) => handleUnitChange(event, unit)}
              />
              <label
                tabIndex="0"
                className="rounded-full bg-gradient-dark px-5 py-2 text-sm text-gray-100 peer-checked:bg-none peer-checked:bg-white peer-checked:text-black peer-checked:font-bold cursor-pointer hover:bg-none hover:bg-black hover:bg-opacity-50"
                htmlFor={unit.value}
              >
                {unit.displayShort}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
