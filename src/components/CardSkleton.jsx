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
            className="max-w-[730px] w-full h-[72px] pt-4 m-auto dark:bg-[#1E2139]">
            <CardHeader>
              <div className="flex items-center justify-between dark:bg-[#1E2139]">
                <CardTitle className="font-sans font-bold text-xs tracking-[-0.25px]">
                  <Skeleton className="w-[72px] dark:bg-[#252945]  h-[16px] rounded-full" />
                </CardTitle>

                <CardDescription className="text-[#888EB0] text-xs ">
                  <Skeleton className="w-[122px] dark:bg-[#252945]  h-[15px] rounded-full" />
                </CardDescription>

                <span className="text-[#858BB2] font-medium text-xs">
                  <Skeleton className="w-[122px] dark:bg-[#252945]  h-[15px] rounded-full" />
                </span>

                <span className="font-bold text-base text-right">
                  <Skeleton className="w-[73px] dark:bg-[#252945]  h-[15px] rounded-full" />
                </span>

                <Skeleton className="w-[104px] dark:bg-[#252945]  h-[36px] rounded-[30px]" />

                <Skeleton className="w-[20px] dark:bg-[#252945]  h-[15px] rounded-full" />
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}

export default CardSkleton;
