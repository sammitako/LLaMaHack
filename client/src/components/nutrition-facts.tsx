import { FoodData } from "@/pages/upload";
import { Separator } from "./ui/separator";
import React from "react";
interface NutritionFactsProps {
  f?: FoodData["combinedData"];
}

export function NutritionFacts({ f }: NutritionFactsProps) {
  if (!f) {
    return null;
  }

  const totalDailyKeys = Object.keys(f?.totalDaily);

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center">
        <div className="ml-4 space-y-2 flex flex-col w-full">
          {totalDailyKeys.map((key) => {
            const dailyNutrient = f.totalDaily[key];
            const correspondingNutrient = f.totalNutrients[key];

            return (
              <React.Fragment key={key}>
                {Math.floor(correspondingNutrient.quantity) > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-sm leading-none">
                        <span className="font-medium">
                          {dailyNutrient.label}
                        </span>{" "}
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(correspondingNutrient.quantity)}{" "}
                          {correspondingNutrient.unit}
                        </span>
                      </p>
                      {correspondingNutrient && (
                        <p className="text-sm font-medium">
                          {Math.floor(dailyNutrient.quantity)}{" "}
                          {dailyNutrient.unit}
                        </p>
                      )}
                    </div>
                    <Separator />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-center pt-2 text-slate-500">
        * Percent Daily Values are based on a 2000 calorie diet
      </div>
    </div>
  );
}
