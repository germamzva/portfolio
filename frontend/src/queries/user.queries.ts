import apiRequest from "../utils/apiRequest";

// type
import type { User } from "../types/user.type.js"

export const myInfo = async () : Promise<User> => {
    // eslint-disable-next-line
    try {
        const res = await apiRequest.get("/user/me");
        return res.data;
    } catch (error) {
        throw error;
    }
}