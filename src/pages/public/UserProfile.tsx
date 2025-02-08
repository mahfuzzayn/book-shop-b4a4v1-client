/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Row, Spin } from "antd";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import { TResponse } from "../../types";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import BSPInput from "../../components/form/BSPInput";

const UserProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const {
        data: userInfo,
        isLoading: userInfoLoading,
        isFetching: userInfoFetching,
        isError,
    } = useGetUserQuery(user?.userId);
    const [updateUser] = useUpdateUserMutation();

    const userData = userInfo?.data;

    const userDefaultValues = {
        name: userData?.name,
        email: userData?.email,
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating...", {
            style: toastStyles.loading,
        });

        const userId = user?.userId;

        const userData: {
            name?: string;
            oldPassword?: string;
            newPassword?: string;
        } = {};

        if (userInfo?.data?.name !== data.name) {
            userData.name = data.name;
        }

        if (data.oldPassword && data.newPassword) {
            userData.oldPassword = data.oldPassword;
            userData.newPassword = data.newPassword;
        }

        if (Object.keys(userData).length === 0) {
            toast.error("No changes were made to the profile", {
                id: toastId,
                style: toastStyles.error,
            });
            return;
        }

        try {
            const res = (await updateUser({
                userId,
                data: userData,
            })) as TResponse<TUser>;

            if (res.error) {
                toast.error(res.error.data.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                toast.success("Profile updated", {
                    id: toastId,
                    style: toastStyles.success,
                });
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                style: toastStyles.error,
            });
        }
    };

    if (userInfoLoading || userInfoFetching)
        return (
            <div className="flex justify-center items-center min-h-screen w-full mt-10">
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{ fontSize: 48 }}
                            className="!text-primary"
                            spin
                        />
                    }
                />
            </div>
        );

    if (isError)
        return (
            <div className="flex flex-col justify-center items-center gap-y-4 min-h-screen w-full mt-10">
                <h2 className="text-2xl font-bold">Failed to load user data</h2>
                <Link to="/">
                    <Button type="primary" className="!bg-primary">
                        Back to Home
                    </Button>
                </Link>
            </div>
        );

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-y-3 gap-x-3  mb-4">
                <Link to={`/${userData?.role}/dashboard`}>
                    <Button type="primary" className="!bg-primary">
                        <ArrowLeftOutlined />
                        Dashboard
                    </Button>
                </Link>
                <h2 className="text-2xl md:text-3xl !font-bold">
                    User Profile
                </h2>
            </div>
            <div className="flex justify-center items-center my-20">
                <div className="flex flex-col items-center gap-y-2">
                    <div className="bg-primary text-accent p-3 px-5 rounded-full max-w-[60px] text-2xl">
                        {userData?.name?.slice(0, 1)}
                    </div>
                    <h2 className="text-2xl md:text-3xl !font-bold">
                        Hello, {userData?.name}
                    </h2>
                    <Row className="mt-8">
                        <Col span={24}>
                            <BSForm
                                onSubmit={onSubmit}
                                defaultValues={userDefaultValues}
                            >
                                <Row gutter={8}>
                                    <Col
                                        span={24}
                                        md={{ span: 12 }}
                                        lg={{ span: 24 }}
                                    >
                                        <BSInput
                                            type="text"
                                            name="name"
                                            label="Name"
                                        />
                                    </Col>
                                    <Col
                                        span={24}
                                        md={{ span: 12 }}
                                        lg={{ span: 24 }}
                                    >
                                        <BSInput
                                            type="text"
                                            name="email"
                                            label="Email"
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col
                                        span={24}
                                        md={{ span: 12 }}
                                        lg={{ span: 12 }}
                                    >
                                        <BSPInput
                                            type="password"
                                            name="oldPassword"
                                            label="Old Password"
                                        />
                                    </Col>
                                    <Col
                                        span={24}
                                        md={{ span: 12 }}
                                        lg={{ span: 12 }}
                                    >
                                        <BSPInput
                                            type="password"
                                            name="newPassword"
                                            label="New Password"
                                        />
                                    </Col>
                                </Row>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="!bg-primary"
                                >
                                    Update
                                </Button>
                                <p className="mt-4 text-xs">
                                    You can only update{" "}
                                    <span className="text-primary">name</span>{" "}
                                    and{" "}
                                    <span className="text-primary">
                                        password
                                    </span>
                                </p>
                            </BSForm>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
