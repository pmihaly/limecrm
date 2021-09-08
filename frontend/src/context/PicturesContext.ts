import { createContext, useContext } from 'react';

import PictureInterface from '../interfaces/PictureInterface';

export type PicturesContextType = {
  pictures: PictureInterface[];
  setPictures: (Pictures: PictureInterface[]) => void;
};

export const PicturesContext = createContext<PicturesContextType>({ pictures: [], setPictures: pictures => console.warn('no pictures provider') });
export const usePictures = () => useContext(PicturesContext);
