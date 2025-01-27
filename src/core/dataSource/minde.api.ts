import MindeeInterface from "../entities/repositories/mindee.interface";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./apiEndpoints";

export default class MindeDataSource extends MindeeInterface {

    public async uploadDocument(params: File): Promise<object | undefined> {
        try {
            const formData = new FormData();
            formData.append("document", params, params.name)
            const data = await apiClient({
                url: API_ENDPOINTS.DOCUMENTS.UPLOAD_DOCUMENT, method: "POST", data: formData, headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (!data) {
                throw new Error('No data received from the server.');

            }

            return data;

        }
        catch (error) {
            console.error('Error during file upload:', error)
            throw new Error('Failed to send the file');
        }
    }
    public async getPrediction(params: string): Promise<object | undefined> {
        console.log('okad', params)
        try {
            console.log('id', params)
            const data = await apiClient({
                url: API_ENDPOINTS.PREDICTION.GET_PREDICTION(params), method: "GET", headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (!data) {
                throw new Error('No data received from the server.');

            }
            return data;

        }
        catch (error) {
            console.error('Error during  prediction:', error)
            throw new Error('Failed to get the prediction');
        }

    }


}