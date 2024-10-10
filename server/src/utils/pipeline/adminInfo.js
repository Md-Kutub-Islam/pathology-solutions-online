import Admin from "../../models/admin.model.js";
import { ObjectId } from "mongodb";

export const adminInfo = async (adminId) => {
  const userData = await Admin.aggregate([
    {
      $match: { _id: new ObjectId(adminId) }, // Ensure adminId is cast to ObjectId
    },
    {
      $lookup: {
        from: "addresses", // The 'addresses' collection
        localField: "_id", // The field from 'users' collection
        foreignField: "owner", // The field from 'addresses' collection
        as: "addressDetails", // The field to include the address information
      },
    },
    {
      $unwind: {
        path: "$addressDetails",
        preserveNullAndEmptyArrays: true, // Preserves result if no address details are found
      },
    },
  ]);

  return userData.length ? userData[0] : null; // Return the first element or null if no match
};
