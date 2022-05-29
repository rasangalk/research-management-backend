const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addMarkingSchema,
  GetAllMarkingSchemas,
  getMarkingSchemaById,
  UpdateMarkingSchema,
  DeleteMarkingSchema,
} = require("../controllers/Admin/admin-controller");

const router = express.Router();

router.post(
  "/admin/markingSchema/add",
  requireSignin,
  addMarkingSchema,
  addMarkingSchema
);
router.get("/admin/markingSchemas", requireSignin, GetAllMarkingSchemas);
router.get(
  "/admin/markingSchemas/:markingSchemaId",
  requireSignin,
  getMarkingSchemaById
);
router.patch(
  "/admin/markingSchemas/update/:markingSchemaId",
  UpdateMarkingSchema,
  requireSignin,
  adminMiddleware
);

router.delete(
  "/admin/markingSchemas/delete",
  DeleteMarkingSchema,
  requireSignin,
  adminMiddleware
);

module.exports = router;
