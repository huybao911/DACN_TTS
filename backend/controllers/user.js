const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const JobEvent = require("../models/JobEvent");
const City = require("../models/City");

exports.register = async (req, res, next) => {
  const { username, email, password, role, university, fullName,nameCompany, address, webAddress, companyIntro, quantityEmployees, job, city } = req.body;

  if (!username || !email || !password || !role)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const userObj = { username, email, role, university, fullName, nameCompany, address, webAddress, companyIntro, quantityEmployees, job, city };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    let getRole = await Role.findById(userObj.role);

    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(200)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null, avatar: null, cv: null, university: null, fullName: null, address: null }, getRole } : getRole.keyRole === "admin" ? { token, admin: { ...user._doc, password: null }, getRole } : { token, company: { ...user._doc, password: null, avatar: null, nameCompany: null, address:null, webAddress: null, companyIntro: null, quantityEmployees: null, job: [], city: null }, getRole }) //role: getRole, department: getDepartment

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();
    let getRole = await Role.findById(user.role);

    if (!user) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password, resetPass, confirmPass } = req.body;
  const user = await User.findById(req?.user?._id).populate("role").populate("department");
  if ( !password || !resetPass)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const isMatchPass = await compare(confirmPass, user.password);
    if (!isMatchPass) return res.status(400).send("Mật khẩu cũ không trùng khớp");
    const hashedPwd = await hash(password, 12);
    const passwordObj = {
      password: hashedPwd,
    };
    const isMatch = await compare(resetPass, passwordObj.password);
    if (!isMatch) return res.status(400).send("Mật khẩu không trùng khớp");
    const newPass = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: passwordObj.password },
      { new: true }
    );
    return res.status(200).json(newPass);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getProfileUser = async (req, res, next) => {
  const userProfile = await User.findById(req?.user?._id).populate("role");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    return res.status(200).json([userProfile]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, fullName, university, address} = req.body;
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const profileUserObj = {
      username: username,
      email: email,
      fullName: fullName,
      university: university,
      address: address,
    };
    const newProfileUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: profileUserObj.username,
        email: profileUserObj.email,
        fullName: profileUserObj.fullName,
        university: profileUserObj.university,
        address: profileUserObj.address,
      },
      { new: true }
    );
    return res.status(200).json(newProfileUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getJobs = async (req, res) => {
  const userJob = await JobEvent.find().populate("poster").populate("gt").populate("city");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    return res.status(200).json(userJob);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobStorager = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role");
  const findJob = await JobEvent.find({ storagers: { $elemMatch: { storager: userStorage._id } } }).populate("poster").populate("gt").populate("city").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]});
  try {
    return res.status(200).json(findJob);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.Storager = async (req, res) => {
  const { id } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role");
  const { created } = req.body;
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const job = await JobEvent.findById(id).lean();
    if (!job) return res.status(400).send("JobEvent does not exist");
    const jobObj = {
      storager: userStorage,
      created:created,
    };
    const newStorager = await JobEvent.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          storagers: [{
            storager: jobObj.storager,
            created: jobObj.created,
          }]
        }
      },
      { new: true }
    );
    return res.status(200).json(newStorager);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};
exports.unStorager = async (req, res) => {
  const { id } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const newStorager = await JobEvent.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          storagers: {
            storager: userStorage._id,
          }
        }
      },
      { new: true }
    );
    return res.status(200).json(newStorager);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getUserJobApply = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role");
  const findJob = await JobEvent.find({ usersApplyJob: { $elemMatch: { userApply: userApplyJob._id }}}).populate("poster").populate("gt").populate("city").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]});
  // const findJobUserApply = findEvent.map((userapply) => userapply.usersApplyJob.filter((userapply) => userapply.userApply.username === userApplyJob.username));
  try {
    return res.status(200).json(findJob);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.UserApplyJob = async (req, res) => {
  const { jobId } = req.params;
  const userApplyJob = await User.findById(req?.user?._id).populate("role");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const job = await JobEvent.findById(jobId).populate("poster");
    if (!job) return res.status(400).send("Job does not exist");
    const eventObj = {
      userApply: userApplyJob,
      jobEvent: job,
    };
    const newUserApply = await JobEvent.findByIdAndUpdate(
      { _id: jobId },
      {
        $push: {
          usersApplyJob: [{
            userApply: eventObj.userApply,
          }]
        },
      },
      { new: true }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.UserUnApplyJob = async (req, res) => {
  const { jobId } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const newUserApply = await JobEvent.findOneAndUpdate(
      { _id: jobId },
      {
        $pull: {
          usersApplyJob: {
            userApply: userStorage._id,
          }
        }
      },
      { new: true }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getCompany = async (req, res, next) => {
  try {
    return res.status(200).json(await User.find({ role: "647dab9412e60b4e64926213" }).populate("role").populate("city"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobs = async (req, res) => {
  const usergetJob = await JobEvent.find().populate("poster").populate("gt").populate("city").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]});
  try {
    return res.status(200).json(usergetJob);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCity = async (req, res, next) => {
  try {
    return res.status(200).json(await City.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    return res.status(200).json(await Department.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ user: { ...user }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};