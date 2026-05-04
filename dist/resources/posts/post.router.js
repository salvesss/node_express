import { Router } from 'express';
import * as postController from './post.controller.js';
const router = Router();
router.route('/').get(postController.getAll).post(postController.create);
router.route('/:id/user').get(postController.getUser);
router.route('/:id/comments').get(postController.getComments);
router.route('/:id').get(postController.getById).put(postController.update).delete(postController.remove);
export default router;
