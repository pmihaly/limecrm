import { NextFunction, Request, Response } from 'express';

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
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
