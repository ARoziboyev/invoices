import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { prepareData } from "../lib/utils";
import useAppStore from "../lib/Zustend";
import { addInvoice, updateById } from "../reques";
import { toast } from "sonner";

function Form({ info, setShetOpen }) {
  const { items: zustandItems } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addNewInvoice, updateInvoice } = useAppStore();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = info ? { ...info } : {};

    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }

    formData.forEach((value, key) => {
      if (["quantity", "price", "paymentTerms"].includes(key)) {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = zustandItems;

    const readyData = prepareData(result);
    setSending(readyData);
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);

      if (info?.id) {
        updateById(info.id, sending)
          .then((res) => {
            updateInvoice(res);
            toast.success("Muvaffaqiyatli yangilandi ✅");
            setShetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message || "Yangilashda xato!");
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else {
        addInvoice(sending)
          .then((res) => {
            addNewInvoice(res);
            toast.success("Muvaffaqiyatli qo'shildi ✅");
            setShetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message || "Qo'shishda xato!");
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending]);

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-[#1E2139] text-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-[720px] mx-auto">
      <h2 className="text-lg font-bold mb-6">Edit #{info?.id}</h2>

      <h3 className="text-sm text-purple-500 font-semibold mb-4">Bill From</h3>
      <div className="mb-6">
        <Label htmlFor="senderAddress-street">Street Address</Label>
        <Input
          id="senderAddress-street"
          name="senderAddress-street"
          placeholder="Street Address"
          className="w-full h-[48px] dark:bg-[#252945] text-white"
          defaultValue={info?.senderAddress?.street}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["city", "postCode", "country"].map((field) => (
          <div key={field}>
            <Label htmlFor={`senderAddress-${field}`}>
              {field === "postCode"
                ? "Post Code"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={`senderAddress-${field}`}
              name={`senderAddress-${field}`}
              placeholder={field}
              className="w-full h-[48px] dark:bg-[#252945] text-white"
              defaultValue={info?.senderAddress?.[field]}
            />
          </div>
        ))}
      </div>

      <h3 className="text-sm text-purple-500 font-semibold mb-4">Bill To</h3>
      <div className="mb-6">
        <Label htmlFor="clientName">Client’s Name</Label>
        <Input
          id="clientName"
          name="clientName"
          placeholder="Client Name"
          className="w-full h-[48px] dark:bg-[#252945] text-white"
          defaultValue={info?.clientName}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="clientEmail">Client’s Email</Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          placeholder="email@example.com"
          className="w-full h-[48px] dark:bg-[#252945] text-white"
          defaultValue={info?.clientEmail}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="clientAddress-street">Street Address</Label>
        <Input
          id="clientAddress-street"
          name="clientAddress-street"
          placeholder="Street Address"
          className="w-full h-[48px] dark:bg-[#252945] text-white"
          defaultValue={info?.clientAddress?.street}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["city", "postCode", "country"].map((field) => (
          <div key={field}>
            <Label htmlFor={`clientAddress-${field}`}>
              {field === "postCode"
                ? "Post Code"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={`clientAddress-${field}`}
              name={`clientAddress-${field}`}
              placeholder={field}
              className="w-full h-[48px] dark:bg-[#252945] text-white"
              defaultValue={info?.clientAddress?.[field]}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full">
          <Label htmlFor="createdAt">Invoice Date</Label>
          <Input
            type="date"
            id="createdAt"
            name="createdAt"
            className="w-full h-[48px] dark:bg-[#252945] text-[#ccc] dark:text-white"
            defaultValue={info?.createdAt}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Select
            name="paymentTerms"
            defaultValue={info?.paymentTerms?.toString()}>
            <SelectTrigger className="w-full h-[48px] dark:bg-[#252945] text-white">
              <SelectValue placeholder="Net 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Days</SelectItem>
                <SelectItem value="14">Net 14 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="description">Project Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Website Design"
          className="w-full h-[48px] dark:bg-[#252945] text-white"
          defaultValue={info?.description}
        />
      </div>

      <ItemList info={info && info.items} />

      {info ? (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-end sm:justify-center gap-0.5 dark:bg-[#1E2139] mt-10">
          <Button
            className="w-[96px] dark:bg-[#F9FAFE] h-[48px] rounded-[24px] hover:bg-[#dbe2ff] cursor-pointer text-[#7E88C3]"
            disabled={loading}
            variant={"outline"}>
            Discard
          </Button>
          <Button
            className="bg-[#373B53] w-[110px] h-[48px] rounded-[24px] hover:bg-[#0C0E16] cursor-pointer text-[#fff]"
            disabled={loading}
            id="draft"
            variant={"secondary"}>
            {loading ? "Loading..." : "Save as draft"}
          </Button>
          <Button
            className="bg-[#7C5DFA] w-[110px] h-[48px] rounded-[24px] hover:bg-[#0C0E16] cursor-pointer text-[#fff]"
            disabled={loading}
            id="pending">
            {loading ? "Loading..." : "Save & Send"}
          </Button>
        </div>
      )}
    </form>
  );
}

export default Form;
