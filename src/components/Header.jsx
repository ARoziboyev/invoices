import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowDown, Plus } from "lucide-react";
import { queryGanarator } from "../lib/utils";
import useAppStore from "../lib/Zustend";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Form from "./Form";

const info = {
  createdAt: "2021-08-18",
  paymentDue: "2021-08-19",
  description: "Re-branding",
  paymentTerms: 1,
  clientName: "Jensen Huang",
  clientEmail: "jensenh@mail.com",
  status: "paid",
  senderAddress: {
    street: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  },
  clientAddress: {
    street: "106 Kendall Street",
    city: "Sharrington",
    postCode: "NR24 5WQ",
    country: "United Kingdom",
  },
  items: [
    {
      name: "Brand Guidelines",
      quantity: 1,
      price: 1800.9,
      total: 1800.9,
    },
  ],
  total: 1800.9,
  id: 1,
};

function Header({ totalInvoices = 7 }) {
  const [shetOpen, setShetOpen] = useState(false);
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  const handleCheckboxChange = (key) => {
    setItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const result = queryGanarator(items);
    setFilter(result);
  }, [items]);

  return (
    <header className="bg-[#F8F8FB] dark:bg-[#141625]">
      <div className="container max-w-[730px] mx-auto py-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-base md:text-2xl font-bold md:font-semibold text-[#0C0E16] dark:text-white">
            Invoices
          </h1>

          <p className="text-[#888EB0] mt-1  font-[16px] text-sm">
            {(totalInvoices ?? 0) === 0
              ? "No invoices"
              : `There ${
                  totalInvoices === 1 ? "is" : "are"
                } ${totalInvoices} total invoice${
                  totalInvoices !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="p-0 h-auto text-black dark:text-white">
                <span className="flex items-center gap-2 font-medium">
                  Filter <span className="hidden md:inline">by status</span>
                  <ArrowDown className="w-4 h-4 text-[#7C5DFA]" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 p-4 border border-[#DFE3FA] shadow-md bg-white dark:bg-[#1E2139]"
              align="end">
              {Object.entries(items).map(([key, value]) => (
                <div key={key} className="flex items-center mb-3 last:mb-0">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleCheckboxChange(key)}
                    className="h-4 w-4 rounded border-[#7C5DFA]"
                  />
                  <label
                    htmlFor={key}
                    className="ml-3 capitalize dark:text-white font-medium">
                    {key}
                  </label>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                className="bg-[#7C5DFA] hover:bg-[#9277FF] cursor-pointer rounded-full h-12 px-2 pr-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-full">
                    <Plus className="w-4 h-4 text-[#7C5DFA]" />
                  </div>
                  <span className="font-medium">
                    New <span className="hidden md:inline">Invoice</span>
                  </span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent
              className="fixed top-0 left-0 w-full h-screen z-50 overflow-y-auto sm:min-w-full md:min-w-[616px] md:ml-[0px] md:mt-[72px] lg:ml-[103px] lg:min-w-[719px] lg:mt-[0px] dark:bg-[#141625]"
              side="left">
              <Form setShetOpen={setShetOpen} info={null} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
