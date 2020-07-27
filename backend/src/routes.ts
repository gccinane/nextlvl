import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer'

const upload = multer(multerConfig);
const routes = express.Router();

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

routes.get('/items', ItemsController.index)

routes.post('/points', upload.single('image'), PointsController.create)
routes.get('/points', PointsController.index)
routes.get('/points/:id', PointsController.show)

export default routes;