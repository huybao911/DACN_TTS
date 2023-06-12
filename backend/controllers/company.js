const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const City = require("../models/City");
const JobEvent = require("../models/JobEvent");
const GT = require("../models/GT");
paginate = require("../util/paginate");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const company = await User.findOne({ email }).lean();
    let getRole = await Role.findById(company.role);

    if (!company) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "company")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, company.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ company, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, company, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  const companyUser = await User.findById(req?.company?._id).populate("role");
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    return res.status(200).json([companyUser]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getGT = async (req, res, next) => {
  try {
    return res.status(200).json(await GT.find().lean());
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

exports.getJobs = async (req, res) => {
  const companyUser = await User.findById(req?.company?._id);
  const companyJob = await JobEvent.find({ poster: companyUser._id }).populate("poster").populate("gt").populate("city").populate({ path: "usersApplyJob", populate: [{ path: "userApply"}] });
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    return res.status(200).json(companyJob);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createNewJob = async (req, res) => {
  const { nameJob, gt, city, quantity, salary, jobDescription, jobRequest, benefit, expirationDate, storagers, usersApplyJob } = req.body;
  const companyUser = await User.findById(req?.company?._id);
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    if (!nameJob || !gt || !city || !quantity || !salary || !jobDescription || !jobRequest || !benefit || !expirationDate) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    const NewJob = new JobEvent({
      nameJob: nameJob,
      gt: gt,
      city: city,
      poster: companyUser,
      quantity: quantity,
      quantityRemaining: quantity,
      salary: salary,
      jobDescription: jobDescription,
      jobRequest: jobRequest,
      benefit: benefit,
      expirationDate: expirationDate,
      storagers: storagers,
      usersApplyJob: usersApplyJob,
    });
    await NewJob.save();

    res.status(200).json(NewJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { nameJob, gt, city, poster, quantity,quantityRemaining, salary, jobDescription, jobRequest, benefit, expirationDate } = req.body;
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    const job = await JobEvent.findById(id).lean();
    if (!job) return res.status(400).send("Job does not exist");
    const jobObj = {
      nameJob: nameJob,
      gt: gt,
      city: city,
      poster: poster,
      quantity: quantity,
      quantityRemaining: quantityRemaining,
      salary: salary,
      jobDescription: jobDescription,
      jobRequest: jobRequest,
      benefit: benefit,
      expirationDate: expirationDate,
    };
    const newJob = await JobEvent.findByIdAndUpdate(
      { _id: id },
      {
        nameJob: jobObj.nameJob,
        gt: jobObj.gt,
        city: jobObj.city,
        poster: jobObj.poster,
        quantity: jobObj.quantity,
        quantityRemaining: jobObj.quantityRemaining,
        salary: jobObj.salary,
        jobDescription: jobObj.jobDescription,
        jobRequest: jobObj.jobRequest,
        benefit: jobObj.benefit,
        expirationDate: jobObj.expirationDate,
      },
      { new: true }
    );
    return res.status(200).json(newJob);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    await JobEvent.deleteOne({ _id: id });
    return res.status(200).send("Job has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getProfileCompany = async (req, res, next) => {
  const companyProfile = await User.findById(req?.company?._id).populate("role").populate("city").populate('job.city');
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    return res.status(200).json([companyProfile]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const getJob = await JobEvent.find({ poster: id });
  const { username, email, nameCompany, address, webAddress, companyIntro, quantityEmployees, city} = req.body;
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    const company = await User.findById(id).lean();
    if (!company) return res.status(400).send("User does not exist");
    const profileUserObj = {
      username: username,
      email: email,
      nameCompany: nameCompany,
      address: address,
      webAddress: webAddress,
      companyIntro: companyIntro,
      quantityEmployees: quantityEmployees,
      job: getJob,
      city: city,
    };
    const newProfileUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: profileUserObj.username,
        email: profileUserObj.email,
        nameCompany: profileUserObj.nameCompany,
        address: profileUserObj.address,
        webAddress: profileUserObj.webAddress,
        companyIntro: profileUserObj.companyIntro,
        quantityEmployees: profileUserObj.quantityEmployees,
        job: profileUserObj.job,
        city: profileUserObj.city,
      },
      { new: true }
    );
    return res.status(200).json(newProfileUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.readCVUserApplyJob = async (req, res, next) => {
  const { jobId, userApplyId } = req.params;

  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    const newUserApply = await JobEvent.findOneAndUpdate(
      {
        _id: jobId,
      },
      {
        $set: {
          'usersApplyJob.$[el].applyStatus': "Xem CV",
          'usersApplyJob.$[el].notiApplyJob': "NTD xem hồ sơ"
        },
      },
      { 
        arrayFilters:[{
          "el._id":userApplyId
        }],
        'new': true, 'safe': true, 'upsert': true
      }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.approveUserApplyJob = async (req, res, next) => {
  const { jobId, userApplyId } = req.params;
  const job = await JobEvent.findById(jobId);
  quantityRe = job.quantityRemaining  - 1;
  try {
    if (!req.company) return res.status(400).send("You dont have permission");
    const newUserApply = await JobEvent.findOneAndUpdate(
      {
        _id: jobId,
      },
      {
        $set: {
          'usersApplyJob.$[el].applyStatus': "Duyệt",
          'usersApplyJob.$[el].notiApplyJob': "Hồ sơ phù hợp"
        },
        quantityRemaining: quantityRe,
      },
      { 
        arrayFilters:[{
          "el._id":userApplyId
        }],
        'new': true, 'safe': true, 'upsert': true
      }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getAuthCompany = async (req, res, next) => {
    try {
      const company = await User.findById(req?.company?._id).select("-password").lean().populate("city");
      let getRole = await Role.findById(company.role);
      if (!company)
        return res.status(400).send("Company not found, Authorization denied..");
      return res.status(200).json({ company: { ...company }, getRole });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };