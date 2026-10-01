import apiRequest from "../utils/apiRequest";

// type
import type { Contact, ContactSubmission } from "../types/contact.type";

export const getContact = async () => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.get("/contact");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCSRFToken = async () => {
    try {
        const response = await apiRequest.get("/contact/csrf-token");
        return response.data.csrfToken;
    } catch (error) {
        throw error;
    }
};

export const getCaptcha = async () => {
    try {
        const response = await apiRequest.get("/contact/captcha");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createContact = async (data: ContactSubmission) => {
    // eslint-disable-next-line
    try {
        const csrfToken = await getCSRFToken();
        const response = await apiRequest.post("/contact/create", data, {
            headers: {
                "X-CSRF-Token": csrfToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};