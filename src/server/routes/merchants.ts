import { Router, Request, Response, NextFunction } from 'express';

import * as merchantsController from '../controllers/merchants';
import { MerchantSchema as MerchantSchema } from '../utils/types';

const router: Router = Router();

/**
 * Endpoint for fetching an array of all the companies.
 */
router.get('/',
  merchantsController.getMerchants,
  (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.merchants) {
      return next('Reached responding middleware function without res.locals.merchants set.');
    }

    const frontendMerchants: MerchantSchema = res.locals.merchants.map((merchant: MerchantSchema) => ({
      name: merchant.name,
      tagId: merchant.tagId,
    }));

    return res.json(frontendMerchants);
  }
);

/**
 * Endpoint for creating new merchant entries in database. Accepts an array of merchant objects in body
 * of the request.
 */
router.post('/',
  merchantsController.updateOrCreate,
  (req: Request, res: Response,) => {
    return res.json({ message: 'success' });
  }
);

/**
 * Endpoint for updating (with upsert) merchant entries in database. Accepts an array of merchant objects 
 * in body of the request.
 */
router.put('/',
  merchantsController.updateOrCreate,
  (req: Request, res: Response,) => {
    return res.json({ message: 'success' });
  }
);

/**
 * Endpoint for deleting merchant entries in database. Accepts an array of merchant objects in body of 
 * the request.
 */
router.delete('/',
  merchantsController.deleteMany,
  (req: Request, res: Response,) => {
    return res.json({ message: 'success' });
  }
);

export default router;
