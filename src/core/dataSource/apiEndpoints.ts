export const API_ENDPOINTS = {
    DOCUMENTS: {
        UPLOAD_DOCUMENT: `mindee/financial_document/v1/predict_async`,

    },
    PREDICTION: {
        GET_PREDICTION: (id: string) => `mindee/financial_document/v1/documents/queue/${id}`
    }


}
