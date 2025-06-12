import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { deleteById, getinvois, updateById } from "../reques";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBages";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Form from "../components/Form";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [upDateLoading, setUpdateLoading] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [shetOpen, setShetOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getinvois(`/${id}`)
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

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        console.log(res);
        navigate("/");
        toast.success("card o'chirildi");
        console.log(navigate);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }
  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById(id, data)
      .then((res) => {
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  function GoToBake() {
    navigate("/");
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!invoice) return <p className="text-center mt-10">Ma'lumot topilmadi</p>;

  return (
    <div className="dark:bg-[#141625] w-full min-h-screen">
      <div className="py-5">
        <div className="w-full max-w-[730px] px-4 md:px-0  mx-auto mt-[80px] md:mt-[70px]">
          <Button
            onClick={GoToBake}
            className="mb-6 md:mb-[50px]  bg-transparent hover:bg-transparent border-none text-[#000] dark:text-[#fff] pl-0">
            <ArrowLeft className="text-[#7C5DFA] flex-shrink-0" /> Go back
          </Button>

          <Card className="dark:bg-[#1E2139] rounded-xl   md:rounded-2xl">
            <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-[68px] md:px-4 md:h-[75px]">
              <div className="flex items-center justify-between w-full md:w-auto">
                <span className="text-sm md:text-base">Status: </span>
                <StatusBadge status={invoice.status} />
              </div>

              <div className="flex flex-end justify-end gap-2 w-full md:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      onClick={() => setEditingInvoice(invoice)}
                      className="bg-[#e7e8ec] dark:text-[#fff] dark:bg-[#252945] hover:bg-[#DFE3FA] text-[#7E88C3] w-[73px] h-10 md:h-[48px] rounded-full">
                      Edit
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    className="md:ml-[103px] w-full md:min-w-[719px] dark:bg-[#141625] z-50 overflow-y-auto"
                    side="left">
                    <Form setShetOpen={setShetOpen} info={editingInvoice} />
                  </SheetContent>
                </Sheet>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-10 md:h-[48px] rounded-full">
                      Delete
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className="w-[90%] max-w-[480px] h-[249px] dark:bg-[#1E2139] rounded-lg"
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description">
                    <DialogHeader>
                      <DialogTitle
                        id="delete-dialog-title"
                        className="text-xl md:text-2xl mt-4">
                        Confirm Deletion
                      </DialogTitle>
                      <DialogDescription
                        id="delete-dialog-description"
                        className="mt-2">
                        Are you sure you want to delete invoice{" "}
                        <strong>{invoice.invoiceId}</strong>? This action cannot
                        be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-3 mt-4 justify-end">
                      <DialogClose asChild>
                        <Button className="bg-[#F9FAFE] dark:text-[#fff] hover:bg-[#DFE3FA] text-[#7E88C3] w-[91px] h-10 rounded-full dark:bg-[#252945]">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={() => handleDelete(invoice.id)}
                        disabled={deleteLoading}
                        className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-10 rounded-full">
                        {deleteLoading ? "Loading..." : "Delete"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {invoice.status === "pending" && (
                  <Button
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                    className="bg-[#7C5DFA] dark:text-[#fff] hover:bg-[#9277FF] w-[131px] h-10 md:h-[48px] rounded-full">
                    {upDateLoading ? "Loading..." : "Mark as Paid"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="p-4 md:p-6 mt-6 md:mt-[50px] bg-[#fff]  border-t dark:border-[#252945] dark:bg-[#1E2139] rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h1 className="text-xl font-bold mb-1">
                      {invoice.invoiceId}
                    </h1>
                    <p className="text-gray-500 text-sm">
                      {invoice.description || "No description"}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-sm md:text-right">
                    <p>{invoice.senderAddress?.street}</p>
                    <p>
                      {invoice.senderAddress?.city},{" "}
                      {invoice.senderAddress?.postCode}
                    </p>
                    <p>{invoice.senderAddress?.country}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 md:mt-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Invoice Date
                  </h4>
                  <p className="font-medium">{invoice.createdAt}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Payment Due
                  </h4>
                  <p className="font-medium">{invoice.paymentDue}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  <h4 className="text-sm font-medium text-gray-500">Bill To</h4>
                  <p className="font-medium">
                    {invoice.clientName || "No name"}
                  </p>
                  <div className="text-gray-500 text-sm mt-1">
                    <p>{invoice.clientAddress?.street}</p>
                    <p>
                      {invoice.clientAddress?.city},{" "}
                      {invoice.clientAddress?.postCode}
                    </p>
                    <p>{invoice.clientAddress?.country}</p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <h4 className="text-sm font-medium text-gray-500">Sent to</h4>
                  <p className="font-[16px] text-sm">
                    {invoice.clientEmail || "No email"}
                  </p>
                </div>
              </div>
            </div>

            {invoice.items?.length > 0 && (
              <div className="mt-8 bg-gray-50 dark:bg-[#252945] rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-5 gap-4 p-6 bg-gray-100 dark:bg-[#1E2139]">
                  <div className="col-span-2">Item Name</div>
                  <div className="text-center">QTY</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Total</div>
                </div>

                <div className="divide-y dark:divide-[#1E2139]">
                  {invoice.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="col-span-2 font-medium">
                        {item.name}
                        <div className="md:hidden text-sm text-gray-500 mt-1">
                          {item.quantity} x £
                          {parseFloat(item.price || 0).toFixed(2)}
                        </div>
                      </div>
                      <div className="hidden md:block text-center">
                        {item.quantity}
                      </div>
                      <div className="hidden md:block text-right">
                        £{parseFloat(item.price || 0).toFixed(2)}
                      </div>
                      <div className="text-right font-bold md:text-right">
                        £{parseFloat(item.total || 0).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#373B53] dark:bg-[#0C0E16] p-6 flex justify-between items-center text-white">
                  <span>Amount Due</span>
                  <span className="text-2xl font-bold">£{invoice.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
