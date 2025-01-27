import { ReactNode, useEffect, useMemo } from "react";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

type TProtectedRoute = {
    children: ReactNode;
    role?: string;
};

export default function ProtectedRoute({ children, role }: TProtectedRoute) {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useMemo(() => {
        if (token) {
            return verifyToken(token);
        }
        return null;
    }, [token]);

    useEffect(() => {
        if (!user) {
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    }, [user, dispatch, navigate]);

    useEffect(() => {
        if (role && user?.role !== role) {
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    }, [role, user, dispatch, navigate]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
