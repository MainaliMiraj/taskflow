import {useRouter} from "next/navigation";
import {AuthFormValues} from "@/components/authComponent/AuthForm";
import {useApiRequest} from "@/hooks/useApiRequest";

export const useLogin = () => {
    const router = useRouter();
    const { sendRequest, loading } = useApiRequest();

    const handleLogin = async ({ email, password, setLoading }: AuthFormValues) => {
        await sendRequest({
            url: "/api/auth/login",
            body: { email, password },
            successMessage: "Welcome back!",
            onSuccess: () => router.push("/dashboard"),
            onError: () => setLoading(false),
        });

        setLoading(false);
    };

    return {
        handleLogin,
        loading,
    };
};