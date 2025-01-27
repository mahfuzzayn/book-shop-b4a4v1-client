import Item from "antd/es/list/Item";
import { Link } from "react-router-dom";

const Menu = ({ items }) => {
    console.log(items);

    return (
        <ul>
            {items.map((item) => (
                <Item key={item.key} className="p-4">
                    <Link
                        to={`/admin/dashboard/${item.value}`}
                        className="text-accent"
                    >
                        {item.label}
                    </Link>
                </Item>
            ))}
        </ul>
    );
};

export default Menu;
