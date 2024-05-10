import { ContextValue } from "@/types/Context";
import { createContext } from "react";

export const GlobalContext = createContext<Partial<ContextValue>>({});
// ! i know this is a crime
