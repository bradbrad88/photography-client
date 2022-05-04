import React from "react";
export const createCtx = <A>() => {
  const ctx = React.createContext<A | null>(null);
  const useCtx = () => {
    const value = React.useContext(ctx);
    if (value === null) throw new Error("Context can't be null");
    return value;
  };
  return [useCtx, ctx.Provider] as const;
};
