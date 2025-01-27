/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BSInput from "../components/form/BSInput";
import BSForm from "../components/form/BSForm";
import BSPInput from "../components/form/BSPInput";

export default function Register() {
    const navigate = useNavigate();

    const defaultValues = {
        name: "Sutra Mia",
        email: "sutramia786@gmail.com",
        password: "bookghor2025",
    };

    const [register] = useRegisterUserMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Registering...");

        const userData = {
            user: { ...data },
        };

        try {
            const res = await register(userData).unwrap();

            if (res.err) {
                toast.error("Failed to register user", {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.success("User registered successfully", {
                    id: toastId,
                    duration: 2000,
                });
                navigate("/login");
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <div className="space-y-5 bg-accent p-20 rounded-xl">
                    <h2 className="text-4xl font-bold text-center mb-10">
                        Book Shop Register
                    </h2>
                    <BSInput type="text" name="name" label="Name" />
                    <BSInput type="text" name="email" label="Email" />
                    <BSPInput
                        type="password"
                        name="password"
                        label="Password"
                    />
                    <h5>
                        Already have an Account?{" "}
                        <span>
                            <Link to="/login" className="!text-dark">
                                Login
                            </Link>
                        </span>
                    </h5>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="!bg-primary"
                    >
                        Register
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
