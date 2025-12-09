import {useParams, useRouter} from "next/navigation";
import {useApiRequest} from "@/hooks/useApiRequest";
import {useState} from "react";
import toast from "react-hot-toast";

export const useAddNewPassword = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const { sendRequest, loading } = useApiRequest();
    const [password, setPassword] = useState("");
    const [showing, setShowing] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await sendRequest({
            url: "/api/auth/reset-password",
            body: { token, password },
            successMessage: "Password changed successfully.",
            onSuccess: () => router.push("/login"),
            onError: () => toast.error("Something went wrong. Please try again after some time.")
        });

    };
    return {
        handleSubmit,
        loading,
        showing, setShowing,
        password, setPassword
    }
}