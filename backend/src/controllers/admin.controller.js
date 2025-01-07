import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js";
import User from "../models/userModel.js";

//Admin only

//Get all users
export const getAllUsers = tryCatchFunction(async (req, res) => {
  const { limit = 5, offset = 0, role } = req.query;

  const allUsersQuery = {};
  if (role) {
    allUsersQuery.role = role;
  }

  const users = await User.find(allUsersQuery).skip(parseInt(offset)).limit(parseInt(limit));
  if (!users) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Reequest",
      error: null
    }
    )
  }

  res.status(200).json({
    status: 200,
    data: users,
    message: "Users retrieved successfully",
    error: null
  });
});


//add a new user
export const addNewUser = tryCatchFunction(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (role == "admin") {
    return res.status(403).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      status: 409,
      data: null,
      message: "Email aready exists"
    });
  };


  const user = new User({ email, password, role });
  user.save();
  res.status(201).json({
    status: 201,
    data: null,
    message: "User Created Successfully",
    error: null
  });
});

//Delete a user
export const deleteUser = tryCatchFunction(async (req, res, next) => {
  // console.log("api hit");

  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "User not found",
      error: null
    });
  }
  res.status(200).json({
    "status": 200,
    data: null,
    message: "User Deleted Successfully.",
    error: null
  })
})