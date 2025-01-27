import { NavLink } from "react-router-dom";
import { TNavbarItem, TUserPath } from "../types";

export const sidebarItemsGenerator = (items: TUserPath[], role?: string) => {
    const sidebarItems = items.reduce((acc: TNavbarItem[], item) => {
        const basePath = role ? `/${role}/dashboard` : "";

        if (item.path && item.name) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink
                        to={`${basePath}/${item.path}`}
                        className="hover:text-blue-500"
                    >
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
                        return {
                            key: child.name,
                            label: (
                                <NavLink
                                    to={`${basePath}/${child.path}`}
                                    className="hover:text-blue-500"
                                >
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
