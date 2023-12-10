import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { NutritionFacts } from "@/components/nutrition-facts";
import { Dropzone } from "@/components/drop-zone";
import { useEffect, useState } from "react";
import ConsumptionTable from "@/components/consumption-table";
import axios from "axios";
import NutritionCards from "@/components/nutrition-cards";

interface NutrientDetails {
  label: string;
  quantity: number;
  unit: string;
}
export type NutrientsRecord = Record<string, NutrientDetails>;

export interface FoodData {
  combinedData?: {
    calories: number;
    dietLabels: string[];
    totalDaily: NutrientsRecord;
    totalNutrients: NutrientsRecord;
    totalNutrientsKCal: TotalNutrientsKCal;
  };
  individualData?: {
    calories: number;
    dietLabels: string[];
    text: string;
    quantity: number;
    measure: string;
    weight: number;
    food: string;
  }[];
}

export type TotalNutrientsKCal = {
  CHOCDF_KCAL: Details;
  ENERC_KCAL: Details;
  FAT_KCAL: Details;
  PROCNT_KCAL: Details;
};

type Details = {
  label: string;
  quantity: number;
  unit: string;
};

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setFoodData] = useState<FoodData>({});

  const handleFileChange = (f: string[]) => {
    setUploadedFiles(f);
    console.log(uploadedFiles);
    fetchFoodRecords(f);
  };

  // ANALYZING IMAGES
  // PARAMETER: uploadedFiles
  const fetchFoodRecords = async (image: string[]) => {
    setIsLoading(true);
    console.log(image);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/nutritionData"
      );
      setFoodData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [uploadedFiles]);

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Upload</h2>
          <div className="flex items-center space-x-2"></div>
        </div>
        {!isAnalyzing && (
          <Dropzone
            onChange={handleFileChange}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        )}
        {uploadedFiles.length > 0 && isAnalyzing && !isLoading && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <NutritionCards f={foodData?.combinedData?.totalNutrientsKCal} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Records</CardTitle>
                  <CardDescription>
                    A list of food in your meal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview /> */}
                  <ConsumptionTable f={foodData?.individualData} />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <CardDescription>
                    You made {foodData?.combinedData?.calories} calories this
                    meal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NutritionFacts f={foodData?.combinedData} />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Upload;
