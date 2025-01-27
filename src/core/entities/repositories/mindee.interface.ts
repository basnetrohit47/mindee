
export default abstract class MindeeInterface {
    public abstract uploadDocument(file: File): Promise<object | undefined>
    public abstract getPrediction(params: string): Promise<object | undefined>

}