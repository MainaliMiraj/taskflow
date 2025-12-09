// hooks/useApiRequest.ts
import { useState } from "react";
import toast from "react-hot-toast";

interface ApiRequestProps<T> {
    url: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: T;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    successMessage?: string;
}

export const useApiRequest = () => {
    const [loading, setLoading] = useState(false);

    const sendRequest = async <T,>({
                                       url,
                                       method = "POST",
                                       body,
                                       onSuccess,
                                       onError,
                                       successMessage,
                                   }: ApiRequestProps<T>) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Request failed");

            successMessage && toast.success(successMessage);
            onSuccess?.(data);
            return data;
        } catch (error: any) {
            toast.error(error.message || "Something went wrong.");
            onError?.(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest, loading };
};
