import { Dashboard } from "@/components/pages/dashboard/dashboard";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get("at");
  if (at == undefined || at == null) {
    return redirect("/login");
  }
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-data`,
      {
        withCredentials: true,
        headers: {
          Cookie: `at=${at?.value}`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status == 401) {
      return redirect("/login");
    }
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
