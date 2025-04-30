"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../contexts/UserContext";

export default function Logout() {
    const router = useRouter();
    const userContext = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem("user");
        userContext?.setUser(null);
        router.replace("/login");
    }, [router, userContext]);
    return null;
}
