import User from "../../models/user.model.js";
import { ObjectId } from "mongodb";

export const userInfo = async (userId) => {
  const userData = await User.aggregate([
    {
      $match: { _id: new ObjectId(userId) }, // Ensure userId is cast to ObjectId
    },
    {
      $lookup: {
        from: "addresses", // The 'addresses' collection
        localField: "_id", // The field from 'users' collection
        foreignField: "owner", // The field from 'addresses' collection
        as: "userDetails", // The field to include the address information
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserves result if no address details are found
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$name" },
        email: { $first: "$email" },
        useraddress: {
          $push: {
            street: "$userDetails.address",
            city: "$userDetails.city",
            pincode: "$userDetails.pincode",
            state: "$userDetails.state",
          },
        },
      },
    },
  ]);

  return userData[0] || null;
};
