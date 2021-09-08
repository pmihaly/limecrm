import { render } from '@testing-library/react';

import App from '../App';
import PictureInterface from '../interfaces/PictureInterface';

export const testPictures: PictureInterface[] = [
  {
    _id: '613713d04cde7330b7aad924',
    filename: '2021-09-07T07:25:04.185Z_1630949946.png',
    filesize: 578698,
    pictureDimensions: {
      width: 4480,
      height: 1080,
    },
    uploaderIp: '192.168.0.24',
    description: '234234234',
    uploadDate: '2021-09-07T07:25:04.197Z',
  },
  {
    _id: '613713d04cde7330b7aad925',
    filename: '2021-09-07T07:25:04.185Z_1630949946.png',
    filesize: 578698,
    pictureDimensions: {
      width: 4480,
      height: 1080,
    },
    uploaderIp: '192.168.0.24',
    description: '234234234',
    uploadDate: '2021-09-07T07:25:04.197Z',
  },
];

export default function appRenderer() {
  return render(<App defaultPictures={testPictures} />);
}
