import DropdownContainer from "../DropdownContainer";

export default function SearchCityDropdown({
  show,
  setShow,
  cityList,
  handleSearchClick,
  children,
}) {
  return (
    <DropdownContainer show={show} setShow={setShow} background="transparent">
      <div className="absolute z-40 top-[52px] sm:top-full w-full bg-white border-2 rounded-md">
        {children}

        {cityList.map((city) => (
          <div
            key={`${city.id}`}
            className="hover:bg-gray-300 px-4 py-3 flex"
            onClick={() => handleSearchClick(city)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="gray"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">
              {city.areas ? `${city.name}, ${city.areas}` : city.name}
            </span>
          </div>
        ))}
      </div>
    </DropdownContainer>
  );
}