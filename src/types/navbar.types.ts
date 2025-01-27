import { ReactNode } from "react";

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TNavbarItem =
    | {
          key: string | undefined;
          label: ReactNode;
          children?: TNavbarItem[];
      }
    | undefined;

export type TUserPath = {
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[];
    isPublic?: boolean;
    visible?: boolean;
};
