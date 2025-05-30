import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getinvois } from "../reques";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getinvois(`/invoices/${id}`)
      .then((res) => {
        setInvoice(res);
      })
      .catch((err) => {
        setError(err.message || "Invoice topilmadi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner  loading-xl"></span>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!invoice) return <p className="text-center mt-10">Ma'lumot topilmadi</p>;

  return (
    <div className="dark:bg-[#141625] w-[100%] h-[100vh] ">
      <div className="py-5">
        <div className="w-[730px] m-auto ">
          <Card className="dark:bg-[#1E2139]">
            {" "}
            <CardContent className="flex gap-[198px]">
              <div className="flex items-center gap-2">
                <span>Status: </span>
                <StatusBadge status={invoice.status} />
              </div>

              <div className="flex gap-[8px]">
                <Button
                  className="bg-[#e7e8ec] dark:text-[#fff] dark:bg-[#252945] hover:bg-[#DFE3FA] text-[#7E88C3]  w-[73px] h-[48px] rounded-[24px] cursor-pointer"
                  >
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-[48px] rounded-[24px]  cursor-pointer">
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[480px] h-[249px] dark:bg-[#1E2139]">
                    <DialogHeader>
                      <DialogTitle className=" leading-[48px] text-[24px] mt-[20px] ">
                        Confirm Deletion
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete invoice{" "}
                        {invoice.invoiceId} This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-[8px] mt-[16px] justify-end">
                      <DialogClose asChild>
                        <Button className="bg-[#F9FAFE] dark:text-[#fff] hover:bg-[#DFE3FA] text-[#7E88C3] w-[91px] h-[48px] rounded-[24px] dark:bg-[#252945] cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-[48px] rounded-[24px]  cursor-pointer">
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button className="bg-[#7C5DFA] dark:text-[#fff] hover:bg-[#9277FF] w-[131px] h-[48px] rounded-[24px]  cursor-pointer   ">
                  Mark as Paid
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
