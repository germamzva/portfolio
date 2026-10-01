import apiRequest from "../utils/apiRequest";

// type
import type { Education } from "../types/education.type";

export const getEducation = async () => {
    try {
        const response = await apiRequest.get("/education");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getEducationById = async (id: string) => {
    try {
        const response = await apiRequest.get(`/education/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addEducation = async (data: Education) => {
    try {
        const response = await apiRequest.post("/education/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEducation = async (id: string, data: Education) => {
    try {
        const response = await apiRequest.put(`/education/edit/${id}`, data);
    return response.data;
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteEducation = async (id: string) => {
    try {
        const response = await apiRequest.delete(`/education/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};