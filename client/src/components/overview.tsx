"use client";

import { Chart } from "react-google-charts";
export const data = [
  ["Nutrition", "Grams per Day"],
  ["Protein", 11],
  ["Fat", 2],
  ["Vitamin D", 2],
  ["Mineral", 2],
  ["Carbohydrate", 7],
];

export function Overview() {
  return (
    <Chart chartType="PieChart" data={data} width={"100%"} height={"100%"} />
  );
}
