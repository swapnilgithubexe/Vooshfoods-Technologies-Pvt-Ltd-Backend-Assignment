import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js";
import User from "../models/userModel.js";

//Admin only
export const getAllUsers = tryCatchFunction(async (req, res) => {
  const { limit = 5, offset = 0, role } = req.query;

  const allUsersQuery = {};
  if (role) {
    allUsersQuery.role = role;
  }

  const users = await User.find(allUsersQuery).skip(parseInt(offset)).limit(parseInt(limit));

  res.status(200).json({
    status: 200,
    data: users,
    message: "Users retrieved successfully",
    error: null
  });
});