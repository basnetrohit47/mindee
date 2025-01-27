import { z } from "zod";


export const ApiRequestStatusSchema = z.object({
    status: z.string(),
    status_code: z.number()

})
export const JobSchema = z.object({
    available_at: z.string().nullable(),
    status: z.string(),
    issued_at: z.string(),
    id: z.string(),

})
export const DocumentResponseSchema = z.object({
    job: JobSchema,
    api_request: ApiRequestStatusSchema
})

export type DocumentResponseModal = z.infer<typeof DocumentResponseSchema>;

