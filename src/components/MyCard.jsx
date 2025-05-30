import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBages";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "paid",
  id = "0",
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/${id}`)}
      className="w-full dark:bg-[#1E2139] h-auto md:h-[72px] p-4 md:pt-[16px] md:px-8 mb-4 md:mb-[16px] border-2 border-transparent hover:border-[#7C5DFA] transition-colors duration-200 cursor-pointer">
      <CardHeader className="p-0">
        <div className="md:hidden flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <CardTitle className="font-bold text-sm dark:text-[#fff]">
              <span className="text-[#7C5DFA]">#</span>
              {id}
            </CardTitle>
            <span className="font-medium text-xs text-[#858BB2]">
              {clientName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <CardDescription className="text-[#888EB0] text-xs">
              {createdAt}
            </CardDescription>
            <span className="font-bold text-sm tracking-[-0.8px]">
              £{total}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <StatusBadge status={status} />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between gap-2">
          <CardTitle className="font-bold text-xs dark:text-[#fff] tracking-[-0.25px] flex-shrink-0">
            <span className="text-[#7C5DFA]">#</span>
            {id}
          </CardTitle>

          <CardDescription className="text-[#888EB0] text-xs flex-shrink-0">
            {createdAt}
          </CardDescription>

          <span className="font-medium text-xs text-[#858BB2] truncate flex-1 mx-4">
            {clientName}
          </span>

          <span className="font-bold text-base tracking-[-0.8px] text-right min-w-[100px]">
            £{total}
          </span>

          <div className="flex-shrink-0 mx-4">
            <StatusBadge status={status} />
          </div>

          <ArrowRight className="text-[#7C5DFA] flex-shrink-0" />
        </div>
      </CardHeader>
    </Card>






    
  );
}

export default MyCard;
