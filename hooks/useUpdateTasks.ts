import {type Task} from "@/types/task";
import {useApiRequest} from "@/hooks/useApiRequest";

export const useUpdateTasks = (fetchTasks:any) => {
  const { sendRequest, loading } = useApiRequest();

  const handleSubmit = async (taskId?: string|null, formData?: Partial<Task>, action?: "add" | "edit" | "delete") => {
    let url = "/api/tasks";
    let method: "POST" | "PUT" | "DELETE" = "POST";

    if (action === "edit") {
      url = `/api/tasks/${taskId}`;
      method = "PUT";
    }
    if (action === "delete") {
      url = `/api/tasks/${taskId}`;
      method = "DELETE";
    }

    const res:any = await sendRequest({
      url,
      body: action !== "delete" ? formData : undefined,
      method,
      successMessage:
          action === "add"
              ? "Task created!"
              : action === "edit"
                  ? "Task updated!"
                  : "Task deleted!",
    });

    return res?.task; // MUST RETURN CREATED TASK
  };

  return { handleSubmit, isSubmitting: loading };
};
