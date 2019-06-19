import { Router } from 'express';

const router = Router();

import auth from './auth';
import create from './create';
import get from './get';
import remove from './remove';

router.use('/get', get);
router.use('/create', create);
router.use('/auth', auth);
router.use('/remove', remove);

export default router;
