import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreatePictureDto } from '@dtos/pictures.dto';
import PicturesRoute from '@routes/pictures.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Pictures', () => {
  describe('[GET] /pictures', () => {
    it('response fineAll Pictures', async => {
      const picturesRoute = new PicturesRoute();
      const pictures = picturesRoute.picturesController.pictureService.pictures;

      pictures.find = jest.fn().mockReturnValue([
        {
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        },
        {
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        },
        {
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([picturesRoute]);
      return request(app.getServer()).get(`${picturesRoute.path}`).expect(200);
    });
  });

  describe('[GET] /pictures/:id', () => {
    it('response findOne Picture', async => {
      const pictureId = '612fb1677783c8177675ae53';

      const picturesRoute = new PicturesRoute();
      const pictures = picturesRoute.picturesController.pictureService.pictures;

      pictures.findOne = jest.fn().mockReturnValue({
        _id: '612fb1677783c8177675ae53',
        description: '2134234',
        filename: 'lkj',
        uploadDate: '234234',
        uploaderIp: '12312312',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([picturesRoute]);
      return request(app.getServer()).get(`${picturesRoute.path}/${pictureId}`).expect(200);
    });
  });

  describe('[POST] /pictures', () => {
    it('response Create Picture', async => {
      const pictureData: CreatePictureDto = {
        description: '2134234',
        filename: 'lkj',
        uploadDate: '234234',
        uploaderIp: '12312312',
      };

      const picturesRoute = new PicturesRoute();
      const pictures = picturesRoute.picturesController.pictureService.pictures;

      pictures.findOne = jest.fn().mockReturnValue(null);
      pictures.create = jest.fn().mockReturnValue({
        _id: '612fb1677783c8177675ae53',
        description: '2134234',
        filename: 'lkj',
        uploadDate: '234234',
        uploaderIp: '12312312',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([picturesRoute]);
      return request(app.getServer()).post(`${picturesRoute.path}`).send(pictureData).expect(201);
    });
  });

  describe('[PUT] /pictures/:id', () => {
    it('response Update Picture', async => {
      const pictureId = '612fb1677783c8177675ae53';
      const pictureData: CreatePictureDto = {
        description: '2134234',
        filename: 'lkj',
        uploadDate: '234234',
        uploaderIp: '12312312',
      };

      const picturesRoute = new PicturesRoute();
      const pictures = picturesRoute.picturesController.pictureService.pictures;

      if (pictureData.filename) {
        pictures.findOne = jest.fn().mockReturnValue({
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        });

        pictures.findByIdAndUpdate = jest.fn().mockReturnValue({
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        });

        (mongoose as any).connect = jest.fn();
        const app = new App([picturesRoute]);
        return request(app.getServer()).put(`${picturesRoute.path}/${pictureId}`).send(pictureData);
      }
    });

    describe('[DELETE] /pictures/:id', () => {
      it('response Delete Picture', async => {
        const pictureId = '60706478aad6c9ad19a31c84';

        const picturesRoute = new PicturesRoute();
        const pictures = picturesRoute.picturesController.pictureService.pictures;

        pictures.findByIdAndDelete = jest.fn().mockReturnValue({
          _id: '612fb1677783c8177675ae53',
          description: '2134234',
          filename: 'lkj',
          uploadDate: '234234',
          uploaderIp: '12312312',
        });

        (mongoose as any).connect = jest.fn();
        const app = new App([picturesRoute]);
        return request(app.getServer()).delete(`${picturesRoute.path}/${pictureId}`).expect(200);
      });
    });
  });
});
