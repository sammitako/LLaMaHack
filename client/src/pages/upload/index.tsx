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
import { useState } from "react";
import ConsumptionTable from "@/components/consumption-table";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const handleFileChange = (f: string[]) => {
    setUploadedFiles(f);
    console.log(uploadedFiles);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Upload</h2>
          <div className="flex items-center space-x-2"></div>
        </div>
        <Dropzone onChange={handleFileChange} setIsAnalyzing={setIsAnalyzing} />
        {uploadedFiles.length > 0 && !isAnalyzing && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0g</div>
                  <p className="text-xs text-muted-foreground">
                    -30g for today
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Carbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">50g</div>
                  <p className="text-xs text-muted-foreground">
                    +180g for today
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fiber</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12g</div>
                  <p className="text-xs text-muted-foreground">
                    -500g for today
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    +201g for today
                  </p>
                </CardContent>
              </Card>
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
                  <ConsumptionTable />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <CardDescription>
                    You made 1774 calories this meal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NutritionFacts />
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
