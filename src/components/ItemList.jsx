import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import tresh from "../assets/trash.svg";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useAppStore from "../lib/Zustend";

function ItemList({ info }) {
  const { setItems } = useAppStore();

  const [locolItems, setLocalItems] = useState(
    info && Array.isArray(info) && info.length > 0
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "Banner Design",
            quantity: 1,
            price: 156,
            get total() {
              return this.price * this.quantity;
            },
          },
        ]
  );

  useEffect(() => {
    setItems(locolItems)
  }, [JSON.stringify(locolItems)]);

  function handleChange(e, id) {
    const { name, value } = e.target;

    setLocalItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [name]: name === "name" ? value : value === "" ? "" : Number(value),
          };
          return {
            ...updatedItem,
            get total() {
              return (Number(this.price) || 0) * (Number(this.quantity) || 0);
            },
          };
        }
        return item;
      })
    );
  }

  function handleClick(type, id) {
    if (type === "add") {
      if (
        locolItems.length === 0 ||
        locolItems[locolItems.length - 1].name.trim() !== ""
      ) {
        setLocalItems((prev) => [
          ...prev,
          {
            id,
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return this.price * this.quantity;
            },
          },
        ]);
      } else {
        toast.info("Iltimos, oxirgi element nomini kiriting");
      }
    } else if (type === "delete") {
      if (locolItems.length === 1) {
        toast.info("Eng kamida 1 ta item bo‘lishi kerak");
      } else {
        setLocalItems((prev) => prev.filter((el) => el.id !== id));
      }
    }
  }

  return (
    <div className="w-[504px] max-w-[600px] mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 text-[#777F98]">Item List</h3>
      <div className="flex items-center justify-between px-1 mb-2 text-sm text-[#6B7280] font-medium">
        <span className="w-[214px]">Item Name</span>
        <span className="w-[60px] text-center">Qty.</span>
        <span className="w-[100px] text-right">Price</span>
        <span className="w-[80px] text-right">Total</span>
        <span className="w-[32px]"></span>
      </div>
      <ul>
        {locolItems.map(({ name, quantity, price, total, id }) => (
          <li className="flex items-center justify-between gap-2 mb-3" key={id}>
            <Input
              onChange={(e) => handleChange(e, id)}
              value={name}
              className="w-[214px] h-[48px] dark:text-[#fff] border border-[#E5E7EB] rounded-[4px] px-3 font-medium text-[#111827]"
              type="text"
              name="name"
              placeholder="Item Name"
            />
            <Input
              inputMode="numeric"
              onChange={(e) => handleChange(e, id)}
              value={quantity}
              className="w-[60px] h-[48px] border dark:text-[#fff] border-[#E5E7EB] rounded-[4px] text-center font-medium text-[#111827]"
              type="number"
              min={1}
              name="quantity"
              placeholder="Qty"
            />
            <Input
              inputMode="numeric"
              onChange={(e) => handleChange(e, id)}
              value={price}
              className="w-[100px] h-[48px] border dark:text-[#fff] border-[#3B82F6] rounded-[4px] text-right pr-3 font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              type="number"
              min={0}
              name="price"
              placeholder="Price"
            />
            <span className="w-[80px] text-right dark:text-[#fff] font-medium text-[#6B7280]">
              {isNaN(total) ? "0.00" : total.toFixed(2)}
            </span>
            <Button
              type="button"
              onClick={() => handleClick("delete", id)}
              className="w-[32px] h-[32px] bg-transparent hover:bg-transparent p-0 cursor-pointer">
              <img src={tresh} alt="trash" width={18} height={18} />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => handleClick("add", crypto.randomUUID())}
        className=" mt-[18px] w-[504px] h-[48px] text-[#7E88C3]  bg-[#F9FAFE]  dark:bg-[#252945] rounded-[24px] cursor-pointer ">
        + Add New Item
      </Button>
    </div>
  );
}

export default ItemList;
