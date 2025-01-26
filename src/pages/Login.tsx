/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import {
    useLoginMutation,
    useLoginUserMutation,
} from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BSInput from "../components/form/BSInput";
import BSForm from "../components/form/BSForm";
import BSPInput from "../components/form/BSPInput";
import Item from "antd/es/list/Item";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        userEmail: "mahfuzzayn8@gmail.com",
        password: "bookghor2025",
    };

    const [login] = useLoginUserMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <div className="space-y-5 bg-blue-200 p-20 rounded-xl">
                    <h2 className="text-4xl font-bold text-center mb-10">
                        Book Shop Login
                    </h2>
                    <BSInput type="text" name="userEmail" label="Email" />
                    <BSPInput
                        type="password"
                        name="password"
                        label="Password"
                    />
                    <h5>
                        Don't have an Account?{" "}
                        <span className="text-blue-600">
                            <Link to="/register">Register</Link>
                        </span>
                    </h5>
                    <Button htmlType="submit">Login</Button>
                </div>
            </BSForm>
        </Row>
    );
}
