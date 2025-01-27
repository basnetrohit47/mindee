import axios, { AxiosRequestConfig } from "axios";



const API_BASE_URL = import.meta.env.VITE_MINDEE_BASE_API_URL || "https://api.mindee.net/v1/products/";
const API_KEY = import.meta.env.VITE_MINDEE_API_KEY



interface ApiConfig extends AxiosRequestConfig {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export const apiClient = async<T>({ url, method = "GET", data = null, params = null, headers = {} }: ApiConfig): Promise<T> => {




    try {
        const response = await axios({
            url: `${API_BASE_URL}${url}`,
            method,
            params,
            data,
            headers: {
                ...headers,
                Authorization: API_KEY ? `Token ${API_KEY}` : '', // Add Authorization header
            }
        })

        return response.data

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Network Error');
    }

}


