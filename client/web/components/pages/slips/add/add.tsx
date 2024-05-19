"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../navbar";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Laundry } from "@/types/Laundry";
import { Toaster, toast } from "sonner";

export const AddPage = () => {
  const { token } = useContext(GlobalContext);
  const [laundry, setLaundry] = useState<string>(""); // laundry slug
  const [laundries, setLaundries] = useState<Laundry[]>([]);
  const [schema, setSchema] = useState<string[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [over, setOver] = useState(false);

  const callLaundries = async () => {
    if (token) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/laundry/all`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLaundries(resp.data.laundries);
    }
  };

  useEffect(() => {
    callLaundries();
  }, [token]);

  useEffect(() => {
    if (laundry) {
      const selectedLaundry = laundries.find((l) => l.slug === laundry);
      if (selectedLaundry) {
        setSchema(selectedLaundry.schema);
      }
    }
  }, [laundry, laundries]);

  const handleChange = (item: string, value: number) => {
    const updatedFormData = { ...formData };
    updatedFormData[item] = (updatedFormData[item] || 0) + value;
    if (updatedFormData[item] < 0) updatedFormData[item] = 0; // Ensure non-negative
    setFormData(updatedFormData);
  };

  const display = (e: React.FormEvent) => {
    e.preventDefault();
    downloadFile();
    setSubmitted(true);
  };

  const total = schema.reduce((acc, item) => {
    const value = formData[item] || 0;
    return acc + value;
  }, 0);

  useEffect(() => {
    if (total > 16) {
      setOver(true);
      toast.error("Laundry Over 16 Items!");
    }
  }, [total]);

  const downloadFile = () => {
    const currentDate = new Date().toLocaleString();
    const data = JSON.stringify(
      {
        date: currentDate,
        laundry: formData,
      },
      null,
      2
    );

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laundry_slip.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen bg-creamyPeach">
      <Navbar />
      <Toaster position="top-center" richColors />
      <div className="p-10">
        <div>
          <select
            value={laundry}
            onChange={(e) => setLaundry(e.target.value)}
            className="p-2 border border-azureOcean text-azureOcean bg-creamyPeach font-spaceGrotesk"
          >
            <option value="">Select your laundry</option>
            {laundries.map((laundry) => (
              <option key={laundry.slug} value={laundry.slug}>
                {laundry.name}
              </option>
            ))}
          </select>
        </div>

        {laundry && schema.length > 0 ? (
          <div className="mt-5">
            {submitted ? (
              <div>
                {schema.map((item) => (
                  <div
                    key={item}
                    className="flex justify-between space-x-1 items-center font-mono"
                  >
                    <p>{item}:</p>
                    <p>{formData[item]}</p>
                  </div>
                ))}
                <p className="font-mono">Total: {total}</p>
                <button
                  className="bg-black text-white p-1 capitalize"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({});
                  }}
                >
                  Redo
                </button>
              </div>
            ) : (
              <form
                onSubmit={display}
                className="flex flex-col space-y-3 items-start"
              >
                {schema.map((item) => (
                  <div key={item} className="flex space-x-3 items-center">
                    <label className="text-black capitalize" htmlFor={item}>
                      {item}
                    </label>
                    <div className="flex items-center h-full">
                      <button
                        type="button"
                        className="bg-black text-white h-full px-1"
                        onClick={() => handleChange(item, -1)}
                      >
                        -
                      </button>
                      <input
                        className="border-black border-2 w-14 text-center"
                        type="number"
                        name={item}
                        id={item}
                        min="0"
                        value={formData[item] || 0}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [item]: parseInt(e.target.value) || 0,
                          }))
                        }
                      />
                      <button
                        type="button"
                        className="bg-black text-white h-full px-1"
                        onClick={() => handleChange(item, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <p className={`font-mono ${over && "text-red-500"}`}>
                  Total: {total}
                </p>
                <button
                  type="submit"
                  className="bg-black text-white p-2 capitalize"
                >
                  Finish
                </button>
              </form>
            )}
          </div>
        ) : (
          <p>Please select your laundry.</p>
        )}
      </div>
    </div>
  );
};

export default AddPage;
