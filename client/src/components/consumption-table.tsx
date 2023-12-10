import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const ConsumptionTable = () => {
  return (
    <ScrollArea>
      <Table>
        <TableCaption>
          You need to consume 10g Vitamin B and 20g protines today.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right w-[100px]">Quantity</TableHead>
            <TableHead className="text-right">Unit</TableHead>
            <TableHead className="text-right">Food</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right">Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="text-right">Cup</TableCell>
            <TableCell className="text-right">Rice</TableCell>
            <TableCell className="text-right">702 kcal</TableCell>
            <TableCell className="text-right">285.3 g</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="text-right">Cup</TableCell>
            <TableCell className="text-right">Rice</TableCell>
            <TableCell className="text-right">702 kcal</TableCell>
            <TableCell className="text-right">285.3 g</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="text-right">Cup</TableCell>
            <TableCell className="text-right">Rice</TableCell>
            <TableCell className="text-right">702 kcal</TableCell>
            <TableCell className="text-right">285.3 g</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="text-right">Cup</TableCell>
            <TableCell className="text-right">Rice</TableCell>
            <TableCell className="text-right">702 kcal</TableCell>
            <TableCell className="text-right">285.3 g</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="text-right">Cup</TableCell>
            <TableCell className="text-right">Rice</TableCell>
            <TableCell className="text-right">702 kcal</TableCell>
            <TableCell className="text-right">285.3 g</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default ConsumptionTable;
