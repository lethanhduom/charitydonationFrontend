import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { introspect } from "../../../Service/AccountService";
import swal from 'sweetalert';

const ProtectRoute = () => {
    const token = sessionStorage.getItem("token");

    const [getValid, setValid] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            introspect(token).then((response) => {
                setValid(response.data.valid);
                setLoading(false); // Đánh dấu kiểm tra hoàn tất
            }).catch(() => {
                setValid(false);
                setLoading(false); // Đánh dấu kiểm tra hoàn tất ngay cả khi lỗi
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị trong khi đang kiểm tra token
    }

    return getValid ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectRoute;
