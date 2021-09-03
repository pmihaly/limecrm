import { NextFunction, Request, Response } from 'express';
import path from 'path';

/**
 * /: nothing to to here
 * TODO: serve the frontend
 *
 * @class IndexController
 */
class IndexController {
  /**
   * Send empty success response
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof IndexController
   */
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.resolve('./') + '/dist/frontend/index.html');
      } else {
        res.send('🥒 React frontend will be served here in production...').status(200);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
