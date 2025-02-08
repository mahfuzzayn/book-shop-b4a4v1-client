import { ReactNode } from "react";

export type TRoute = {
    index?: boolean;
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
    index?: boolean
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[];
    isPublic?: boolean;
    visible?: boolean;
};
