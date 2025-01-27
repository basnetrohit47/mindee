import { useMutation } from "@tanstack/react-query"
import MindeeService from "../core/services/mindee.service";
const service = MindeeService.getInstance();

export const useAddDocument = () => {
    return useMutation({
        mutationFn: (file: File) => service.uploadDocument(file),




    })
}

