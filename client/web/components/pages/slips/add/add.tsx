"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../navbar";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Laundry } from "@/types/Laundry";
import { Toaster, toast } from "sonner";
import { url } from "inspector";

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

  const total = schema.reduce((acc, item) => {
    const value = formData[item] || 0;
    return acc + value;
  }, 0);

  useEffect(() => {
    if (total > 16) {
      setOver(true);
      toast.warning("Laundry Over 16 Items!");
    } else {
      setOver(false);
    }
  }, [total]);

  const addSlip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/add`;
    try {
      if (total == 0) {
        toast.info("Add your clothes!");
      }
      if (total > 0 && laundry) {
        const resp = await axios.post(url, {
          laundrySlug: laundry,
          items: formData,
        });
        console.log(resp.data);
        setFormData({});
        toast.success("Added Slip successfully!");
      }
    } catch (error) {
      console.error("Error adding slip:", error);
    }
  };

  return (
    <div className="h-screen bg-creamyPeach">
      <Navbar />
      <Toaster position="bottom-right" richColors expand={true} />
      <div className="p-10 flex flex-col items-center justify-center h-[90%]">
        <div>
          <select
            value={laundry}
            onChange={(e) => setLaundry(e.target.value)}
            className="p-2 border border-azureOcean text-creamyPeach bg-azureOcean font-spaceGrotesk mb-5"
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
          <div className="">
            <form
              onSubmit={addSlip}
              className="flex flex-col space-y-5 items-center"
            >
              {schema.map((item) => (
                <div
                  key={item}
                  className="flex space-x-3 w-96 items-center justify-between text-azureOcean "
                >
                  <label
                    className="text-azureOcean font-spaceGrotesk font-semibold capitalize"
                    htmlFor={item}
                  >
                    {item}
                  </label>
                  <div className="flex items-center h-full space-x-3">
                    <button
                      type="button"
                      className="bg-azureOcean text-white py-1 px-3"
                      onClick={() => handleChange(item, -1)}
                    >
                      -
                    </button>
                    <input
                      className="border-azureOcean border-2 w-14 text-center"
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
                      className="bg-azureOcean text-white py-1 px-3"
                      onClick={() => handleChange(item, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <p
                className={`font-spaceGrotesk text-azureOcean font-bold ${
                  over && "text-yellow-600"
                }`}
              >
                Total: {total}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  type="reset"
                  onClick={() => setFormData({})}
                  className="bg-azureOcean text-white p-2 capitalize"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-azureOcean text-white p-2 capitalize"
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-azureOcean font-spaceGrotesk capitalize font-semibold text-2xl">
            Please select your laundry.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddPage;
// todo: fine tune ui and make it better, remove old functionality and replace with add slip
// todo: add the necessary fields in the server and send correct stuff to the server on submit
