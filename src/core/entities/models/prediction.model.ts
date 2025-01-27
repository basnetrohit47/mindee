
import { z } from "zod";
import { ApiRequestStatusSchema, JobSchema } from "./document.model";
export const PredictionResponseSchema = z.object({
    job: JobSchema,
    api_request: ApiRequestStatusSchema,
    document: z.object({
        id: z.string(),
        inference: z.object({
            prediction: z.object({
                document_type: z.object({
                    value: z.string()
                })
            }).passthrough(),
            processing_time: z.number().nullable()

        })

    }).passthrough()
})

export type PredictionModal = z.infer<typeof PredictionResponseSchema>