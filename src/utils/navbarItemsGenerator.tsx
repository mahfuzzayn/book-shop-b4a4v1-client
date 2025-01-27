import { NavLink } from "react-router-dom";
import { TNavbarItem, TUserPath } from "../types";

export const navbarItemsGenerator = (items: TUserPath[], role?: string) => {
    const sidebarItems = items.reduce((acc: TNavbarItem[], item) => {
        const isPublic = item.isPublic || !role;
        const basePath = isPublic ? "" : `/${role}`;

        if (item.path && item.name) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink to={`${basePath}/${item.path}`}>
                        {item.name}
                    </NavLink>
                ),
            });
        }
        if (item.children) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.map((child) => {
                    if (child.name) {
                        const childBasePath = isPublic ? "" : `/${role}`;
                        return {
                            key: child.name,
                            label: (
                                <NavLink to={`${childBasePath}/${child.path}`}>
                                    {child.name}
                                </NavLink>
                            ),
                        };
                    }
                }),
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
