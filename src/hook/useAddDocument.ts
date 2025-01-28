import { useMutation } from "@tanstack/react-query"
import MindeeService from "../core/services/mindee.service";
const service = MindeeService.getInstance();
interface AddDocumentCallbacks {
    onUploadSuccess?: () => void;
    onUploadError?: (error: Error) => void;
    onUploadStart?: () => void;
}
export const useAddDocument = (callbacks?: AddDocumentCallbacks) => {
    return useMutation({
        mutationFn: (file: File) => service.uploadDocument(file),
        onSuccess: () => {
            callbacks?.onUploadSuccess?.()
        }




    })
}

