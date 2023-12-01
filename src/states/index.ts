import {atom} from 'recoil';
import {eThemaTypes, eTimestampTypes} from '../types/enum';

const userIdAtom = atom({key: 'userIdAtom', default: ''});

const themaAtom = atom({
  key: 'themaAtom',
  default: eThemaTypes.White.toString(),
});

const seletedTagAtom = atom({
  key: 'seletedTagAtom',
  default: eTimestampTypes.All.toString(),
});

export {seletedTagAtom, themaAtom, userIdAtom};
