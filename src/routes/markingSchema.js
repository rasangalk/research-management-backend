const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const {
  addMarkingSchema,
  GetAllMarkingSchemas,
  getMarkingSchemaById,
  UpdateMarkingSchema,
  DeleteMarkingSchema,
} = require('../controllers/Admin/admin-controller');

const router = express.Router();

router.post(
  '/admin/markingSchema/add',
  requireSignin,
  adminMiddleware,
  addMarkingSchema,
  addMarkingSchema
);
router.get('/admin/markingSchemas', requireSignin, GetAllMarkingSchemas);
router.get(
  '/admin/markingSchemas/:markingSchemaId',
  requireSignin,
  adminMiddleware,
  getMarkingSchemaById
);
router.patch(
  '/admin/markingSchemas/update/:markingSchemaId',
  UpdateMarkingSchema,
  requireSignin,
  adminMiddleware
);

router.delete(
  '/admin/markingSchemas/delete/:schemaId',
  DeleteMarkingSchema,
  requireSignin,
  adminMiddleware
);

module.exports = router;
