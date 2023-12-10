"use client";

import { Chart } from "react-google-charts";
export const data = [
  ["Nutrition", "Grams per Day"],
  ["Protein", 11],
  ["Fat", 6],
  ["Vitamin D", 5],
  ["Mineral", 4],
  ["Carbohydrate", 3],
];

export function Overview() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      width={"100%"}
      height={"100%"}
      options={{ chartArea: { width: "100%", height: "100%" } }}
    />
  );
}
