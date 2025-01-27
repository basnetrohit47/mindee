import { AnnotationShape } from "react-mindee-js";

export interface Prediction {
    confidence: number;
    description: string;
    polygon?: number[][];
    value?: string;
}
export interface DocumentPrediction {
    [key: string]: Prediction | Prediction[];
}
export interface CustomeAnnotationShape extends AnnotationShape {
    colorSet?: { fill: string, stroke: string }
    confidence?: number
    isList: boolean
}

