import axios from "axios";
import { SERVER } from "../Constants";

const api = axios.create({
    baseURL: SERVER
})

const API = {
    uploadBulkTests: async() => {
        try {
            
        } catch (error) {
            
        }
    },
    addCourse: async({courseName, courseId, CO_PO_Matrix}) => {
        try {
            const response = await api.post()
            return response.data;
        } catch (error) {
            throw error
        }
    },

    addTest: async(data) => {
        try {
            const response = await api.post('/addTest', data)
            
            return response.data

        } catch (error) {
            throw error
        }
    }


}

export default API