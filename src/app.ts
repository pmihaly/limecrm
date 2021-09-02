process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import path from 'path';

/**
 * Create the server application, and initialize needed modules
 *
 * @class App
 */
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.serveStatic();
  }

  /**
   * Start the server
   *
   * @memberof App
   */
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  /**
   * Getter of the express app instance
   *
   * @return {*}
   * @memberof App
   */
  public getServer() {
    return this.app;
  }

  /**
   * Set mongoose debug configuration if needed and call the connect function
   *
   * @private
   * @memberof App
   */
  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options);
  }

  /**
   * Initialize needed middlewares
   *
   * @private
   * @memberof App
   */
  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  /**
   * Initialize routes
   *
   * @private
   * @param {Routes[]} routes
   * @memberof App
   */
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  /**
   * Initialize swagger, which is available at /api-docs
   *
   * @private
   * @memberof App
   */
  private initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));
  }

  /**
   * Initialize error handling
   *
   * @private
   * @memberof App
   */
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  /**
   * Serve uploaded pictures
   *
   * @private
   * @memberof App
   */
  private serveStatic() {
    this.app.use(express.static(process.env.NODE_ENV === 'production' ? process.env.UPLOADS_DIR : path.join(__dirname, config.get('uploads'))));
  }
}

export default App;
