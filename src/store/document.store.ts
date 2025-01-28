import { atom } from 'jotai';
import { DocumentResponseModal } from '../core/entities/models/document.model';

export const jobId = atom<string | undefined>(undefined)
export const documentResponse = atom<DocumentResponseModal | undefined>(undefined)
