import React from "react";
import ItemList from "./ItemList";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { prepareData } from "../lib/utils";

function Form({ info }) {
  const {
    senderAddress,
    clientAddress,
    clientName,
    paymentTerms,
    clientEmail,
    description,
    paymentDue,
    createdAt,
    street,
    items,
  } = info || {};
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = { status: e.nativeEvent.submitter.id };
    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = [
      {
        id: crypto.randomUUID(),
        name: "Banner Design",
        quantity: 1,
        price: 156,
        get total() {
          return this.price * this.quantity;
        },
      },
    ];

    const redyData = prepareData(result);
    console.log(redyData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8  rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-purple-600 mb-4">
          Bill From
        </h3>
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <Label
              htmlFor="senderAddress-street"
              className="text-sm font-medium text-gray-700 mb-1 block">
              Street Address
            </Label>
            <Input
              type="text"
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Address"
              className="w-[504px] h-[48px]p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              defaultValue={info && info.senderAddress.street}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="senderAddress-city"
                className="text-sm font-medium text-gray-700 mb-1 block">
                City
              </Label>
              <Input
                type="text"
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="City"
                className="w-[152px] h-[48px] border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={info && info.senderAddress.city}
              />
            </div>
            <div>
              <Label
                htmlFor="senderAddress-postCode"
                className="text-sm font-medium text-gray-700 mb-1 block">
                Post Code
              </Label>
              <Input
                type="text"
                id="senderAddress-postCode"
                name="senderAddress-postCode"
                placeholder="Post code"
                className="w-[152px] h-[48px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={info && info.senderAddress.postCode}
              />
            </div>

            <div>
              <Label
                htmlFor="senderAddress-country"
                className="text-sm font-medium text-gray-700 mb-1 block">
                Country
              </Label>
              <Input
                type="text"
                id="senderAddress-country"
                name="senderAddress-country"
                placeholder="Country"
                className="w-[152px] h-[48px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={info && info.senderAddress.country}
              />
            </div>
          </div>
        </div>
      </div>
      {/* bill */}
      <div className="mt-12 mb-10">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Bill To</h3>
          <div className="flex flex-col gap-5">
            <div className="w-full">
              <Label
                htmlFor="clientName"
                className="text-sm font-medium text-gray-700 mb-1 block">
                Client’s Name
              </Label>
              <Input
                type="text"
                id="clientName"
                name="clientName"
                placeholder="Alex Grim"
                className="w-[504px] h-[48px]p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={info && info.clientName}
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="clientEmail"
                className="text-sm font-medium text-gray-700 mb-1 block">
                Client’s Email
              </Label>
              <Input
                type="email"
                id="clientEmail"
                name="clientEmail"
                placeholder="alexgrim@mail.com"
                className="w-[504px] h-[48px]p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={info && info.clientEmail}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <Label
                  htmlFor="clientAddress-street"
                  className="text-sm font-medium text-gray-700 mb-1 block">
                  Street Address
                </Label>
                <Input
                  type="text"
                  id="clientAddress-street"
                  name="clientAddress-street"
                  placeholder="Street Address"
                  className="w-[504px] h-[48px]p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  defaultValue={info && info.clientAddress.street}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="clientAddress-city"
                    className="text-sm font-medium text-gray-700 mb-1 block">
                    City
                  </Label>
                  <Input
                    type="text"
                    id="clientAddress-city"
                    name="clientAddress-city"
                    placeholder="City"
                    className="w-[152px] h-[48px] border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue={info && info.clientAddress.city}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="clientAddress-postCode"
                    className="text-sm font-medium text-gray-700 mb-1 block">
                    Post Code
                  </Label>
                  <Input
                    type="text"
                    id="clientAddress-postCode"
                    name="clientAddress-postCode"
                    placeholder="Post code"
                    className="w-[152px] h-[48px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue={info && info.clientAddress.postCode}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="clientAddress-country"
                    className="text-sm font-medium text-gray-700 mb-1 block">
                    Country
                  </Label>
                  <Input
                    type="text"
                    id="clientAddress-country"
                    name="clientAddress-country"
                    placeholder="Country"
                    className="w-[152px] h-[48px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue={info && info.clientAddress.country}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-[24px] items-center mt-[48px] mb-[24px]">
            <div>
              <Label htmlFor="createdAt">Invoice date</Label>
              <Input
                type="date"
                id="createdAt"
                name="createdAt"
                placeholder="Invoice date"
                className="w-[240px] h-[48px]"
                defaultValue={info && info.createdAt}
              />
            </div>

            <Select
              name="paymentTerms"
              defaultValue={info && info.paymentTerms.toString()}>
              <SelectTrigger className="w-[240px] min:h-[48px] ">
                <SelectValue placeholder="Net 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Terms</SelectLabel>
                  <SelectItem value="1">Net 1 Day</SelectItem>
                  <SelectItem value="7">Net 7 Days</SelectItem>
                  <SelectItem value="14">Net 14 Days</SelectItem>
                  <SelectItem value="30">Net 30 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Graphic Design"
              defaultValue={info && info.description}
              className="w-[504px] h-[48px]"
            />
          </div>
        </div>
        <ItemList info={info} />
        {info ? (
          <div className="flex justify-end gap-5 mt-10">
            <Button variant={"outline"}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-5 mt-10">
            <Button variant={"outline"}>Discard</Button>
            <Button id="draft" variant={"secondary"}>
              Save as draft
            </Button>
            <Button id="pending">Save & Send</Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
