const express = require("express");
// const { requireSignin } = require("../../common-middleware");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const {
  AddTemplate,
  DeleteTemplate,
  getTemplates,
} = require("../controllers/Admin/admin-controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/admin/template/add",
  //   requireSignin,
  upload.array("researchTemplate"),
  AddTemplate
);
router.delete("/admin/template/delete/:templateId", DeleteTemplate);
router.get("/admin/templates", getTemplates);
// // router.get("/product/:slug", getProductsBySlug);
// router.get("/admin/movies/:movieId", getMovieDetailsById);

// router.post("/admin/movies/update", UpdateMovie);

// router.get('/category/getcategory',getCategories );

module.exports = router;
