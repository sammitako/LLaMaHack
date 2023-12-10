export interface Nutrient {
  ntrCode: string;
  name: string;
  unit: string;
}

export const nutrients: Nutrient[] = [
  { ntrCode: "SUGAR.added", name: "Added sugar", unit: "g" },
  { ntrCode: "CA", name: "Calcium, Ca", unit: "mg" },
  { ntrCode: "CHOCDF.net", name: "Carbohydrate (net)", unit: "g" },
  { ntrCode: "CHOCDF", name: "Carbohydrate, by difference", unit: "g" },
  { ntrCode: "CHOLE", name: "Cholesterol", unit: "mg" },
  { ntrCode: "ENERC_KCAL", name: "Energy", unit: "kcal" },
  { ntrCode: "FAMS", name: "Fatty acids, total monounsaturated", unit: "g" },
  { ntrCode: "FAPU", name: "Fatty acids, total polyunsaturated", unit: "g" },
  { ntrCode: "FASAT", name: "Fatty acids, total saturated", unit: "g" },
  { ntrCode: "FATRN", name: "Fatty acids, total trans", unit: "g" },
  { ntrCode: "FIBTG", name: "Fiber, total dietary", unit: "g" },
  { ntrCode: "FOLDFE", name: "Folate, DFE", unit: "µg" },
  { ntrCode: "FOLFD", name: "Folate, food", unit: "µg" },
  { ntrCode: "FOLAC", name: "Folic acid", unit: "µg" },
  { ntrCode: "FE", name: "Iron, Fe", unit: "mg" },
  { ntrCode: "MG", name: "Magnesium", unit: "mg" },
  { ntrCode: "NIA", name: "Niacin", unit: "mg" },
  { ntrCode: "P", name: "Phosphorus, P", unit: "mg" },
  { ntrCode: "K", name: "Potassium, K", unit: "mg" },
  { ntrCode: "PROCNT", name: "Protein", unit: "g" },
  { ntrCode: "RIBF", name: "Riboflavin", unit: "mg" },
  { ntrCode: "NA", name: "Sodium, Na", unit: "mg" },
  { ntrCode: "Sugar.alcohol", name: "Sugar alcohols", unit: "g" },
  { ntrCode: "SUGAR", name: "Sugars, total", unit: "g" },
  { ntrCode: "THIA", name: "Thiamin", unit: "mg" },
  { ntrCode: "FAT", name: "Total lipid (fat)", unit: "g" },
  { ntrCode: "VITA_RAE", name: "Vitamin A, RAE", unit: "µg" },
  { ntrCode: "VITB12", name: "Vitamin B-12", unit: "µg" },
  { ntrCode: "VITB6A", name: "Vitamin B-6", unit: "mg" },
  { ntrCode: "VITC", name: "Vitamin C, total ascorbic acid", unit: "mg" },
  { ntrCode: "VITD", name: "Vitamin D (D2 + D3)", unit: "µg" },
  { ntrCode: "TOCPHA", name: "Vitamin E (alpha-tocopherol)", unit: "mg" },
  { ntrCode: "VITK1", name: "Vitamin K (phylloquinone)", unit: "µg" },
  { ntrCode: "WATER", name: "Water", unit: "g" },
  { ntrCode: "ZN", name: "Zinc, Zn", unit: "mg" },
];
