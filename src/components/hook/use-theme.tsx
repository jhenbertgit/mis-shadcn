import { useContext } from "react";
import { ThemeProviderCtx } from "../context/ThemeProviderCtx";

export const useTheme = () => {
  const context = useContext(ThemeProviderCtx);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
