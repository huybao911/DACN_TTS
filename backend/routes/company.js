const { Router } = require("express");

const isAuth = require("../middleware/is-company");
const CompanyController = require("../controllers/company");

const router = Router({ strict: true });

router.post("/login", CompanyController.login);
router.get("/auth-Company", isAuth, CompanyController.getAuthCompany);
router.get("/city", isAuth, CompanyController.getCity);
router.get("/gt", isAuth, CompanyController.getGT);
router.get("/user", isAuth, CompanyController.getUser);

router.get("/jobs", isAuth, CompanyController.getJobs);
router.post("/createJob", isAuth, CompanyController.createNewJob);
router.put("/job/:id", isAuth, CompanyController.updateJob);
router.delete("/job/:id", isAuth, CompanyController.deleteJob);

router.put("/readCV/:jobId/:userApplyId", isAuth, CompanyController.readCVUserApplyJob);
router.put("/approveUser/:jobId/:userApplyId", isAuth, CompanyController.approveUserApplyJob);

router.get("/profile", isAuth, CompanyController.getProfileCompany);
router.patch("/profile/:id", isAuth, CompanyController.updateProfile);

module.exports = router;