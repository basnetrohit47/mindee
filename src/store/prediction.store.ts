import { atom } from 'jotai';
import { CustomeAnnotationShape } from '../common/types';


export const predictionShapes = atom<CustomeAnnotationShape[]>([])
export const predictionFields = atom<CustomeAnnotationShape[]>([])

