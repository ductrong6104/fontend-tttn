'use client'
import ButtonCustome from "@/components/button/button";
import { useAuth } from "@/components/context/authContext";

export default function PageSetting() {
    const {logout} = useAuth();
    const handleLogOut = () => {
        logout();
    }
    return (
        <ButtonCustome onClick={handleLogOut}>Đăng xuất</ButtonCustome>
    )
}