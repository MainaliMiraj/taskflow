import {useRouter} from "next/navigation";
import {AuthFormValues} from "@/components/authComponent/AuthForm";
import toast from "react-hot-toast";
import {useApiRequest} from "@/hooks/useApiRequest";

export const useRegister = () => {
    const { loading, sendRequest} = useApiRequest();
    const router = useRouter();
    const handleRegister = async ({
                                      name,
                                      email,
                                      password,
                                      setLoading,
                                  }: AuthFormValues) => {

        await sendRequest({
            url: `/api/auth/register`,
            method: "POST",
            body: { name, email, password },
            onSuccess: () => router.push(`/verify-otp?email=${email}`),
            onError: () =>  toast.error("Something went wrong. Please try again.")
        })

        setLoading(false);

    };


    return{
        handleRegister,
        loading
    }
}