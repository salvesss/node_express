import { Router } from 'express';

import * as userController from './user.controller.js';

const router = Router();

router.route('/').get(userController.getAll).post(userController.create);
router.route('/:id/posts').get(userController.getPosts);
router.route('/:id/comments').get(userController.getComments);
router.route('/:id').get(userController.getById).put(userController.update).delete(userController.remove);

export default router;
