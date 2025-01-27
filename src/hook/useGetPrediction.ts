import { useMutation } from "@tanstack/react-query"
import MindeeService from "../core/services/mindee.service";

const service = MindeeService.getInstance();


export const useGetPrediction = () => {
    return useMutation({
        mutationFn: (params: string) => service.getPrediction(params)
    })
}
