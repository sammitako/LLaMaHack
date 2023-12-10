import { Separator } from "./ui/separator";

export function RecentSales() {
  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center">
        <div className="ml-4 space-y-2 flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-sm leading-none">
              <span className="font-medium">Total Fat</span>{" "}
              <span className="text-sm text-muted-foreground">18.3 g</span>
            </p>
            <p className="text-sm font-medium">28 %</p>
          </div>

          <Separator />
          <div className="ml-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground leading-none">
                Saturated Fat 2g
              </p>
              <p className="text-sm font-medium">10 %</p>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground leading-none">
                Saturated Fat 2g
              </p>
              <p className="text-sm font-medium">10 %</p>
            </div>
            <Separator />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-2 flex flex-col w-full">
          <p className="text-sm leading-none">
            <span className="font-medium">Total Fat</span>{" "}
            <span className="text-sm text-muted-foreground">18.3 g</span>
          </p>
          <Separator />

          <div className="ml-4 space-y-2">
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-2 flex flex-col w-full">
          <p className="text-sm leading-none">
            <span className="font-medium">Total Fat</span>{" "}
            <span className="text-sm text-muted-foreground">18.3 g</span>
          </p>
          <Separator />

          <div className="ml-4 space-y-2">
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-2 flex flex-col w-full">
          <p className="text-sm leading-none">
            <span className="font-medium">Total Fat</span>{" "}
            <span className="text-sm text-muted-foreground">18.3 g</span>
          </p>
          <Separator />
          <div className="ml-4 space-y-2">
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
            <p className="text-sm text-muted-foreground leading-none">
              Saturated Fat 2g
            </p>
            <Separator />
          </div>
        </div>
      </div>
    </div>
  );
}
