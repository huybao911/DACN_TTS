const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminController = require("../controllers/admin");

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.get("/auth-admin", isAuth, adminController.getAuthAdmin);
router.get("/users", isAuth, adminController.getUsers);
router.get("/user", isAuth, adminController.getUser);

router.get("/roles", isAuth, adminController.getRoles);
router.post("/addRole", adminController.addRole);

router.get("/gt", isAuth, adminController.getGTs);
router.post("/addGT", isAuth, adminController.addGT);
router.patch("/gt/:id", isAuth, adminController.updateGT);
router.delete("/gt/:id", isAuth, adminController.deleteGT);

router.get("/citys", isAuth, adminController.getCitys);
router.post("/addCity", isAuth, adminController.addCity);
router.patch("/city/:id", isAuth, adminController.updateCity);
router.delete("/city/:id", isAuth, adminController.deleteCity);

router.get("/jobEvents", isAuth, adminController.getJobEvents);

router
  .route("/users/:id")
  .patch(isAuth, adminController.updateUser)
  .delete(isAuth, adminController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
