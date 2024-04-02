import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import dayjs from "dayjs";

import { SelectionsContext } from "@/app/context/SelectionsContext";

export default function SearchDate({ dateRef }) {
  const { startDate, setStartDate } = useContext(SelectionsContext);
  return (
    <div className="rounded-container search-container flex flex-col justify-center sm:w-[300px] ml-0 sm:-ml-1 mt-1 sm:mt-0">
      <DatePicker
        ref={dateRef}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={dayjs(new Date()).subtract(5, "day").toDate()}
        showTimeSelect
        timeIntervals={60}
        className="bg-transparent ml-2 focus:border-none focus:outline-none cursor-pointer placeholder-gray-700"
        dateFormat="MMMM d, h:mm aa"
        placeholderText="Select Date and Time"
        showIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
            className="-ml-1 w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
    </div>
  );
}
