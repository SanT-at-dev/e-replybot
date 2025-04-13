import axiosInstance from "./axiosInstance";

export const generateEmailReply = async ({ emailContent, tone }) => {
    const response = await axiosInstance.post("/email/generate", {
        emailContent,
        tone,
    });
    return response.data;
};