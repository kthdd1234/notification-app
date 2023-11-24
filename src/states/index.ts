import {atom} from 'recoil';
import {eTimestampTypes} from '../types/enum';

const seletedTagAtom = atom({
  key: 'seletedTagAtom',
  default: eTimestampTypes.All.toString(),
});

export {seletedTagAtom};
