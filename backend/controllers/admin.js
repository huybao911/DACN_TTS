const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const JobEvent = require("../models/JobEvent");

const City = require("../models/City");
const GT = require("../models/GT");



exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const admin = await User.findOne({ username }).lean();
    //Load danh sách role 
    let getRole = await Role.findById(admin.role);

    //So sánh check
    if (!admin) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "admin")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ admin, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


exports.addRole = async (req, res) => {
  const { nameRole, keyRole } = req.body;
  try {
    if (!nameRole || !keyRole) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    // if (!req.admin) {
    //   return res.status(400).send("You dont have permission");
    // }
    const roleObj = { nameRole, keyRole }
    const role = await new Role(roleObj).save();
    return res
      .status(201)
      .json(role)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().populate("role"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json([await User.findOne().populate("role")]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Role.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).send("User has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobEvents = async (req, res) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await JobEvent.find().populate("poster").populate("gt").populate("city"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getGTs = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await GT.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addGT = async (req, res) => {
  const { nameGT } = req.body;
  try {
    if (!nameGT) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const gtObj = { nameGT }
    const gt = await new GT(gtObj).save();
    return res
      .status(201)
      .json(gt)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateGT = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const gt = await GT.findById(id).lean();
    if (!gt) return res.status(400).send("GT does not exist");
    const gtObj = { ...req.body };
    const newGT = await GT.findByIdAndUpdate(
      { _id: id },
      { ...gtObj },
      { new: true }
    );
    return res.status(200).json(newGT);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteGT = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await GT.deleteOne({ _id: id });
    return res.status(200).send("GT has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCitys = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await City.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addCity = async (req, res) => {
  const { nameCity } = req.body;
  try {
    if (!nameCity) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const cityObj = { nameCity }
    const city = await new City(cityObj).save();
    return res
      .status(201)
      .json(city)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateCity = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const city = await City.findById(id).lean();
    if (!city) return res.status(400).send("City does not exist");
    const cityObj = { ...req.body };
    const newCity = await City.findByIdAndUpdate(
      { _id: id },
      { ...cityObj },
      { new: true }
    );
    return res.status(200).json(newCity);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteCity = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await City.deleteOne({ _id: id });
    return res.status(200).send("City has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id).select("-password").lean();
    let getRole = await Role.findById(admin.role);
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ admin: { ...admin }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
