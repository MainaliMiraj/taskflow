import {useRouter} from "next/navigation";
import {AuthFormValues} from "@/components/authComponent/AuthForm";
import {useApiRequest} from "@/hooks/useApiRequest";

export const useRegister = () => {
    const {loading, sendRequest} = useApiRequest();
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
            body: {name, email, password},
            onSuccess: () => router.push(`/verify-otp?email=${email}`)
        })

        setLoading(false);

    };


    return {
        handleRegister,
        loading
    }
}