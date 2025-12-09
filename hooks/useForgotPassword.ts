import {useRouter} from "next/navigation";
import {useApiRequest} from "@/hooks/useApiRequest";
import {useState} from "react";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
    const router = useRouter();
    const { sendRequest, loading } = useApiRequest();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await sendRequest({
            url: "/api/auth/forgot-password",
            body: { email },
            successMessage: "If this email exists, a reset link has been sent.",
            onSuccess: () => router.push("/login"),
            onError: () => toast.error("Failed to send the reset link. Please try again.")
        });

    };
    return {
        handleSubmit,
        setEmail,
        loading,
    }
}