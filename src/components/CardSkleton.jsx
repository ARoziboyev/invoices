import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CardSkleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4">
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="max-w-[730px] w-full h-[72px] pt-4 m-auto dark:bg-[#1E2139]"
          >
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3 dark:bg-[#1E2139]">
                {/* ID - Mobile: to'liq kenglik, Desktop: 72px */}
                <CardTitle className="font-sans font-bold text-xs tracking-[-0.25px] md:w-[72px]">
                  <Skeleton className="w-full md:w-[72px] dark:bg-[#252945] h-[16px] rounded-full" />
                </CardTitle>

                {/* Due Date - Mobile: 50%, Tablet: 122px, Desktop: 122px */}
                <CardDescription className="text-[#888EB0] text-xs w-1/2 md:w-[122px]">
                  <Skeleton className="w-full md:w-[122px] dark:bg-[#252945] h-[15px] rounded-full" />
                </CardDescription>

                {/* Client Name - Mobile: to'liq kenglik, Desktop: 122px */}
                <span className="text-[#858BB2] font-medium text-xs w-full md:w-[122px] order-last md:order-none">
                  <Skeleton className="w-full md:w-[122px] dark:bg-[#252945] h-[15px] rounded-full" />
                </span>

                {/* Total - Mobile: 50%, Desktop: 73px */}
                <span className="font-bold text-base text-right w-1/2 md:w-[73px]">
                  <Skeleton className="w-full md:w-[73px] dark:bg-[#252945] h-[15px] rounded-full" />
                </span>

                {/* Status - Mobile: to'liq kenglik, Desktop: 104px */}
                <div className="w-full md:w-[104px] order-last md:order-none">
                  <Skeleton className="w-full md:w-[104px] dark:bg-[#252945] h-[36px] rounded-[30px]" />
                </div>

                {/* Chevron - Faqat Desktop */}
                <div className="hidden md:block">
                  <Skeleton className="w-[20px] dark:bg-[#252945] h-[15px] rounded-full" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}

export default CardSkleton; 