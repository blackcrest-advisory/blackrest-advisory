"use client";

import { createContext, useContext } from "react";

export type CurrentUser = {
  id: string;
  email: string;
  role: string;
  name: string;
  avatarUrl: string | null;
};

const CurrentUserContext = createContext<CurrentUser | null>(null);

export function CurrentUserProvider({
  user,
  children,
}: {
  user: CurrentUser | null;
  children: React.ReactNode;
}) {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
