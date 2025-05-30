import React, { useEffect, useState } from "react";
import { getInvoise } from "../reques";
import CardSkleton from "../components/CardSkleton";
import MyCard from "../components/MyCard";
import useAppStore from "../lib/Zustend";
import NotFoundComponent from "./NotFoundComponent";

function InvoicesCards() {
  const filter = useAppStore((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getInvoise(filter)
      .then((res) => {
        const filtered = res.filter((item) =>
          ["draft", "paid", "pending"].includes(item.status)
        );
        setInvoices(filtered);
      })
      .catch((err) => {
        setError(err.message || "Ma'lumotlarni yuklab bo'lmadi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return (
      <div className="flex justify-center flex-col gap-4 mt-8">
        <CardSkleton />
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10">{error}</p>;
  }

  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div className="max-w-[730px] mx-auto flex flex-col  gap-4 mt-10">
      {invoices.map((el) => (
        <MyCard key={el.id} {...el} />
      ))}
    </div>
  );
}

export default InvoicesCards;
