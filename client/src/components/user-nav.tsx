import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserNav() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">LlamaHack</p>
            <p className="text-xs leading-none text-muted-foreground">
              LlamaHack@cornell.tech
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Settings
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[475px]">
              <DialogHeader>
                <DialogTitle>Save preset</DialogTitle>
                <DialogDescription>
                  This will save your information as a preset which you can
                  change later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="female" />
                      <Label className="font-normal" htmlFor="female">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="male" />
                      <Label className="font-normal" htmlFor="male">
                        Male
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Age</Label>
                  <Input id="description" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Goal</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="a">Bulk up</SelectItem>
                        <SelectItem value="b">Lose weight</SelectItem>
                        <SelectItem value="c">Balance diet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Diet</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your diet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="d">Protein based</SelectItem>
                        <SelectItem value="e">Kito</SelectItem>
                        <SelectItem value="f">Vegetarian</SelectItem>
                        <SelectItem value="g">Vegan</SelectItem>
                        <SelectItem value="h">No seafood</SelectItem>
                        <SelectItem value="i">No peanut</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(!open)} type="submit">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
