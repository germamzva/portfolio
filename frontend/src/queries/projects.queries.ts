import apiRequest from "../utils/apiRequest";

// type
import type { Project } from "../types/project.type.ts";

export const getProjects = async () => {
    try {
        const response = await apiRequest.get("/projects");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProjectsById = async (id: string) => {
    try {
        const response = await apiRequest.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addProjects = async (data: Project) => {
    try {
        const response = await apiRequest.post("/projects/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeProjects = async (id: string) => {
    try {
        const response = await apiRequest.delete(`/projects/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateProjects = async (id: string, data: Project) => {
    try {
        const response = await apiRequest.put(`/projects/edit/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}