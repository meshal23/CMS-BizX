import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const reports = [
  {
    value: "item-report",
    label: "Item Report",
  },
  {
    value: "customer-report",
    label: "Customer Report",
  },
  {
    value: "sq-report",
    label: "Sales Quotation Report",
  },
];

export function ReportNavigationMenu() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    navigate(`/intro/reports/${value}`);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full font-roboto-bold"
        >
          {!value && <TbReportAnalytics size={25} />}
          {value
            ? reports.find((report) => report.value === value)?.label
            : "Select Report..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] tablet:w-[450px] mr-3">
        <Command>
          <CommandInput placeholder="Search Report..." />
          <CommandList>
            <CommandEmpty>No Reports found.</CommandEmpty>
            <CommandGroup>
              {reports.map((rep) => (
                <CommandItem
                  className="text-lg tracking-wider font-roboto-bold"
                  key={rep.value}
                  value={rep.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    console.log(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === rep.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {rep.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
