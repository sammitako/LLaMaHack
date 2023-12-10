import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TotalNutrientsKCal } from "@/pages/upload";

interface NutritionCardsProps {
  f?: TotalNutrientsKCal;
}


const NutritionCards = ({ f }: NutritionCardsProps) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {f?.FAT_KCAL.quantity} {f?.FAT_KCAL.unit}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Carbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {f?.CHOCDF_KCAL.quantity} {f?.CHOCDF_KCAL.unit}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Energy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {f?.ENERC_KCAL.quantity} {f?.ENERC_KCAL.unit}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Protein</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {f?.PROCNT_KCAL.quantity} {f?.PROCNT_KCAL.unit}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NutritionCards;
