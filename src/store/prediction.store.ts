import { atom } from 'jotai';
import { PredictionModal } from '../core/entities/models/prediction.model';
import { CustomeAnnotationShape } from '../common/types';

export const predictonResponse = atom<PredictionModal | null>(null)

export const predictionShapes = atom<CustomeAnnotationShape[]>([])
export const predictionFields = atom<CustomeAnnotationShape[]>([])
export const inputRefsAtom = atom<Record<number, HTMLInputElement | HTMLDivElement | null>>({});

