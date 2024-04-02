"use client";

import { useContext } from "react";
import { SelectionsContext } from "@/app/context/SelectionsContext";
import Loading from "../Loading";
import BarChart from "./BarChart";

export default function Weather() {
  const { searchWeather, weather } = useContext(SelectionsContext);
  return (
    <>
      {searchWeather && <Loading />}
      <h1 className="mt-4 sm:mt-8 text-lg font-semibold">
        <span className="inline-block uppercase mr-4">{weather.city}</span>
        <span className="inline-block">{weather.time}</span>
      </h1>
      <BarChart />
    </>
  );
}
