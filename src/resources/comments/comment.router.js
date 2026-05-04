import { Router } from 'express';

import * as commentController from './comment.controller.js';

const router = Router();

router.route('/').get(commentController.getAll).post(commentController.create);

router.route('/:id/user').get(commentController.getUser);

router.route('/:id/post').get(commentController.getPost);

router
  .route('/:id')
  .get(commentController.getById)
  .put(commentController.update)
  .delete(commentController.remove);

export default router;
