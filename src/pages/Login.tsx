/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BSInput from "../components/form/BSInput";
import BSForm from "../components/form/BSForm";
import BSPInput from "../components/form/BSPInput";
import { toastStyles } from "../constants/toaster";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        userEmail: "mahfuzzayn8@gmail.com",
        password: "bookghor2025",
    };

    const sonnerStyles = {
        style: {
            backgroundColor: "hsl(128, 16%, 29%)", // Custom background color
            color: "hsl(160, 30%, 63%)", // Custom text color
        },
    };

    const [login] = useLoginUserMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging in...", {
            style: toastStyles.loading,
        });

        try {
            const res = await login(data).unwrap();

            const user = verifyToken(res.data.accessToken) as TUser;

            dispatch(setUser({ user, token: res.data.accessToken }));

            if (res.err) {
                toast.error("Failed to login user", {
                    id: toastId,
                    duration: 2000,
                    style: toastStyles.error,
                });
            } else {
                toast.success("User logged in successfully", {
                    id: toastId,
                    duration: 2000,
                    style: toastStyles.success,
                });
                navigate("/");
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                duration: 2000,
                style: toastStyles.error,
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <div className="space-y-5 bg-accent p-20 rounded-xl">
                    <h2 className="text-4xl font-bold text-center mb-10">
                        Book Shop Login
                    </h2>
                    <BSInput type="text" name="email" label="Email" />
                    <BSPInput
                        type="password"
                        name="password"
                        label="Password"
                    />
                    <h5>
                        Don't have an Account?{" "}
                        <span>
                            <Link to="/register" className="!text-dark">
                                Register
                            </Link>
                        </span>
                    </h5>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="!bg-primary"
                    >
                        Login
                    </Button>
                    <h5 className="text-center mt-10">
                        Back to{" "}
                        <span>
                            <Link to="/" className="!text-dark">
                                Home
                            </Link>
                        </span>
                    </h5>
                </div>
            </BSForm>
        </Row>
    );
}
