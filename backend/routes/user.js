const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/resetPass", isAuth, userController.resetPassword);
router.get("/auth-user", isAuth, userController.getAuthUser);

router.get("/profile", isAuth, userController.getProfileUser);
router.patch("/profile/:id", isAuth, userController.updateProfile);

router.get("/company", userController.getCompany);
router.get("/jobs", userController.getJobs);
router.get("/city", userController.getCity);

router.get("/jobStorager", isAuth, userController.getJobStorager);
router.put("/storagerJob/:id", isAuth, userController.Storager);
router.put("/unstoragerJob/:id", isAuth, userController.unStorager);

router.get("/jobApply", isAuth, userController.getUserJobApply);
router.put("/userApplyJob/:jobId", isAuth, userController.UserApplyJob);
router.put("/userUnApplyJob/:jobId", isAuth, userController.UserUnApplyJob);

module.exports = router;
