import { atom } from 'jotai';
import { DocumentResponseModal } from '../core/entities/models/document.model';

export const documentResponse = atom<DocumentResponseModal | undefined>(undefined)
