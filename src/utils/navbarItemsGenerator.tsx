import { NavLink } from "react-router-dom";
import { TNavbarItem, TUserPath } from "../types";

export const navbarItemsGenerator = (items: TUserPath[], role?: string) => {
    const sidebarItems = items.reduce((acc: TNavbarItem[], item) => {
        const isPublic = item.isPublic || !role;
        const basePath = isPublic ? "" : `/${role}`;

        if (item.visible === false) {
            return acc;
        }

        if (item.path && item.name && !item.children) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink to={`${basePath}/${item.path}`}>
                        {item.name}
                    </NavLink>
                ),
            });
        }

        if (item.path && item.name && item.children) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink
                        to={`${basePath}/${item.path}`}
                        className="!text-primary"
                    >
                        {item.name}
                    </NavLink>
                ),
                children: item.children
                    .filter((child) => child.visible !== false)
                    .map((child) => ({
                        key: child.name,
                        label: (
                            <NavLink to={`${basePath}/${child.path}`}>
                                {child.name}
                            </NavLink>
                        ),
                    })),
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
