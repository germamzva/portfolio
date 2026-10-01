import apiRequest from "../utils/apiRequest";

export const getAuth = async () => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.get("/auth/google/url");
        return response.data;
    } catch (error) {
        throw error;
    }
};