import {eDays} from '../../types/enum';

// Helper
export const StringIsNumber = value => isNaN(Number(value));
export const days = Object.keys(eDays).filter(StringIsNumber);
