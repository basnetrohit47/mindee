import MindeDataSource from "../dataSource/minde.api";
import { DocumentResponseModal, DocumentResponseSchema } from "../entities/models/document.model";
import { PredictionModal, PredictionResponseSchema } from "../entities/models/prediction.model";
import MindeeInterface from "../entities/repositories/mindee.interface";
import { z } from "zod";


export default class MindeeService {
    private static _instance: MindeeService;
    public static getInstance(): MindeeService {
        if (!MindeeService._instance) {
            MindeeService._instance = new MindeeService();
        }
        return MindeeService._instance;
    }

    private constructor(
        private datasource: MindeeInterface = new MindeDataSource(),
    ) { }


    private parseWithCustomError<T>(
        schema: z.ZodSchema<T>,
        data: unknown,
        schemaName: string
    ): T {
        const result = schema.safeParse(data);
        if (!result.success) {
            console.error(`${schemaName} validation failed`, result.error.errors);
            throw new Error(`${schemaName} validation error`);
        }
        return result.data;
    }

    public async uploadDocument(params: File): Promise<DocumentResponseModal | undefined> {
        const responseData = await this.datasource.uploadDocument(params);
        return this.parseWithCustomError(DocumentResponseSchema, responseData, "DocumentResponseSchema")




    }
    public async getPrediction(params: string): Promise<PredictionModal | undefined> {
        const responseData = await this.datasource.getPrediction(params)

        const parsedResponse = this.parseWithCustomError(PredictionResponseSchema, responseData, "PredictionResponseSchema")

        if (parsedResponse.job.status === 'waiting' || parsedResponse.job.status === 'processing') {
            throw new Error('Data extraction is in process! Please try again later.')
        }
        if (parsedResponse.job.status === 'failed') {
            throw new Error('Data extraction is in process! Please try again later.')
        }
        return parsedResponse;



    }


}