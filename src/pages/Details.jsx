import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { deleteById, getinvois, updateById } from "../reques";

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
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [upDateLoading, setUpdateLoading] = useState(false);
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
        <span className="loading loading-spinner  loading-xl"></span>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!invoice) return <p className="text-center mt-10">Ma'lumot topilmadi</p>;

  return (
    <div className="dark:bg-[#141625] w-[100%] h-[100%] ">
      <div className="py-5">
        <div className="w-[730px] m-auto mt-[50px]">
          <Button
            onClick={GoToBake}
            className="mb-[50px]  bg-transparent hover:bg-transparent border-none text-[#000]  dark:text-[#fff]">
            <ArrowLeft className="text-[#7C5DFA] flex-shrink-0" /> Go back
          </Button>
          <Card className="dark:bg-[#1E2139]">
            <CardContent className="flex justify-between">
              <div className="flex items-center gap-2">
                <span>Status: </span>
                <StatusBadge status={invoice.status} />
              </div>

              <div className="flex gap-[8px]">
                <Button className="bg-[#e7e8ec] dark:text-[#fff] dark:bg-[#252945] hover:bg-[#DFE3FA] text-[#7E88C3] w-[73px] h-[48px] rounded-[24px] cursor-pointer">
                  Edit
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-[48px] rounded-[24px] cursor-pointer">
                      Delete
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className="w-[480px] h-[249px] dark:bg-[#1E2139]"
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description">
                    <DialogHeader>
                      <DialogTitle
                        id="delete-dialog-title"
                        className="leading-[48px] text-[24px] mt-[20px]">
                        Confirm Deletion
                      </DialogTitle>
                      <DialogDescription id="delete-dialog-description">
                        Are you sure you want to delete invoice{" "}
                        <strong>{invoice.invoiceId}</strong>? This action cannot
                        be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-[8px] mt-[16px] justify-end">
                      <DialogClose asChild>
                        <Button className="bg-[#F9FAFE] dark:text-[#fff] hover:bg-[#DFE3FA] text-[#7E88C3] w-[91px] h-[48px] rounded-[24px] dark:bg-[#252945] cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={() => handleDelete(invoice.id)}
                        disabled={deleteLoading}
                        className="bg-[#EC5757] dark:text-[#fff]  hover:bg-[#FF9797] w-[89px] h-[48px] rounded-[24px] cursor-pointer">
                        {deleteLoading ? "Loading..." : "Delete"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {invoice.status === "pending" && (
                  <Button
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                    className="bg-[#7C5DFA] dark:text-[#fff] hover:bg-[#9277FF] w-[131px] h-[48px] rounded-[24px] cursor-pointer">
                    {upDateLoading ? "Loading..." : "Mark as Paid"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="p-4 mt-[50px] border-t dark:border-[#252945] dark:bg-[#1E2139]  border-2 rounded-3xl ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Sender Address
                </h4>
                <p className="text-lg">
                  {invoice.senderAddress?.street}, {invoice.senderAddress?.city}
                  , {invoice.senderAddress?.postCode},{" "}
                  {invoice.senderAddress?.country}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Client Name
                </h4>
                <p className="text-lg">{invoice.clientName || "No name"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Client Email
                </h4>
                <p className="text-lg">{invoice.clientEmail || "No email"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Client Address
                </h4>
                <p className="text-lg">
                  {invoice.clientAddress?.street}, {invoice.clientAddress?.city}
                  , {invoice.clientAddress?.postCode},{" "}
                  {invoice.clientAddress?.country}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Invoice Date
                </h4>
                <p className="text-lg">{invoice.createdAt}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                <p className="text-lg">{invoice.paymentDue}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Description
                </h4>
                <p className="text-lg">
                  {invoice.description || "No description"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Total</h4>
                <p className="text-lg font-bold">£{invoice.total}</p>
              </div>
            </div>

            {invoice.items?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Items</h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b dark:border-[#252945]">
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="border-b dark:border-[#252945]">
                        <td className="py-2">{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>£{parseFloat(item.price || 0).toFixed(2)}</td>
                        <td className="font-bold">
                          £{parseFloat(item.total || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
