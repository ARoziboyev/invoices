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

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
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
        toast.success("Card o'chirildi");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!invoice) {
    return <p className="text-center mt-10">Ma'lumot topilmadi</p>;
  }

  return (
    <div className="dark:bg-[#141625] w-[100%] h-[100%]">
      <div className="py-5">
        <div className="w-[730px] m-auto mt-[140px]">
          <Card className="dark:bg-[#1E2139]">
            <CardContent className="flex gap-[198px]">
              <div className="flex items-center gap-2">
                <span>Status: </span>
                <StatusBadge status={invoice.status} />
              </div>

              <div className="flex gap-[8px]">
                {/* Edit Button */}
                <Button
                  onClick={() => navigate(`/edit/${id}`)}
                  className="bg-[#e7e8ec] dark:text-[#fff] dark:bg-[#252945] hover:bg-[#DFE3FA] text-[#7E88C3] w-[73px] h-[48px] rounded-[24px] cursor-pointer">
                  Edit
                </Button>

                {/* Delete Dialog */}
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
                        className="bg-[#EC5757] dark:text-[#fff] hover:bg-[#FF9797] w-[89px] h-[48px] rounded-[24px] cursor-pointer">
                        {deleteLoading ? "Loading..." : "Delete"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {invoice.status === "pending" && (
                  <Button
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                    className="bg-[#7C5DFA] dark:text-[#fff] hover:bg-[#9277FF] w-[131px] h-[48px] rounded-[24px] cursor-pointer">
                    {updateLoading ? "Loading..." : "Mark as Paid"}
                  </Button>
                )}
              </div>
            </CardContent>

            <div className="p-4 border-t dark:border-[#252945]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Bill From
                  </h4>
                  <p className="text-lg">
                    {invoice.senderAddress?.street},{" "}
                    {invoice.senderAddress?.city},{" "}
                    {invoice.senderAddress?.postCode},{" "}
                    {invoice.senderAddress?.country}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bill To</h4>
                  <p className="text-lg">{invoice.clientName || "No name"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Sent to</h4>
                  <p className="text-lg">{invoice.clientEmail || "No email"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Sent to</h4>
                  <p className="text-lg">
                    {invoice.clientAddress?.street},{" "}
                    {invoice.clientAddress?.city},{" "}
                    {invoice.clientAddress?.postCode},{" "}
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
                  <h4 className="text-sm font-medium text-gray-500">
                    Payment Due
                  </h4>
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
                  <p className="text-lg font-bold">
                    £{invoice.total?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
              {invoice.items?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Items</h4>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b dark:border-[#252945]">
                        <th>Name</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b dark:border-[#252945]">
                          <td className="py-2">{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>£{item.price.toFixed(2)}</td>
                          <td className="font-bold">
                            £{item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
