import { useMutation, useQuery } from "@tanstack/react-query"
import MindeeService from "../core/services/mindee.service";

const service = MindeeService.getInstance();


export const useGetPrediction = () => {
    return useMutation({
        mutationFn: (params: string) => service.getPrediction(params),


    })
}

export const useGetPredictions = (params: string) => {
    return useQuery({
        queryFn: () => service.getPrediction(params),
        queryKey: ['prediction']
    })
}
