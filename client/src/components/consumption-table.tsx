import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { FoodData } from "@/pages/upload";

interface ConsumptionTableProps {
  f?: FoodData["individualData"];
}
const ConsumptionTable = ({ f }: ConsumptionTableProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Unit</TableHead>
            <TableHead className="text-right">Food</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right">Weight</TableHead>
            <TableHead className="text-left">Diet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {f?.map((d) => (
            <TableRow key={d.text}>
              {" "}
              <TableCell className="font-medium">{d.quantity}</TableCell>
              <TableCell className="text-right">{d.measure}</TableCell>
              <TableCell className="text-right">{d.food}</TableCell>
              <TableCell className="text-right">{d.calories} kcal</TableCell>
              <TableCell className="text-right">
                {Math.floor(d.weight)} g
              </TableCell>
              <TableCell className="flex space-x-1">
                {d?.dietLabels.map((l: string) => (
                  <Badge variant={"outline"} key={l}>
                    {l}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-sm text-slate-500 text-center">
        {" "}
        Increase protein, fruits, vegetables, healthy fats, calcium, Vitamin D,
        fiber, and hydration.
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-24 my-4">
            <span>See More</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Suggestion</DialogTitle>
            <DialogDescription>Prompted by together.ai</DialogDescription>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Protein</AccordionTrigger>
              <AccordionContent>
                lean meats (100g), fish (100g), tofu (100g), or tempeh (100g)
                for protein.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Fruits</AccordionTrigger>
              <AccordionContent>
                apples (1 medium), bananas (1 medium), berries (1 cup), spinach
                (1 cup), broccoli (1 cup) for fruits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Vegetables</AccordionTrigger>
              <AccordionContent>
                carrots (1 cup), bell peppers (1 cup), sweet potatoes (1 cup),
                kale (1 cup) for vegetables.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <DialogFooter>
            <Button onClick={() => setOpen(!open)} type="submit">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsumptionTable;
