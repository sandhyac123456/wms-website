import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { aiEndPoints } from "../apis";

const { AI_CHAT_API } = aiEndPoints;

export const askAI = async (message) => {

  const toastId = toast.loading("AI is thinking...");

  try {

    const response = await apiConnector(
      "POST",
      AI_CHAT_API,
      { message }
    );

    toast.dismiss(toastId);

    if (!response?.data?.success) {
      throw new Error("AI error");
    }

    return response.data.reply;

  } catch (error) {

    toast.dismiss(toastId);
    toast.error("AI failed");

    return "AI is currently unavailable.";

  }
};