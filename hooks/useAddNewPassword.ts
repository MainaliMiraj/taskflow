import { useParams, useRouter } from "next/navigation";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useState } from "react";

export const useAddNewPassword = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const { sendRequest, loading } = useApiRequest();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await sendRequest({
            url: "/api/auth/reset-password",
            body: { token, password },
            successMessage: "Password updated successfully!",
            onSuccess: () => router.push("/login"),
        });
    };

    return {
        handleSubmit,
        password,
        setPassword,
        loading,
    };
};
