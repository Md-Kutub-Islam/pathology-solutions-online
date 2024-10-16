import Category from "../../models/category.model.js";
import { ObjectId } from "mongodb";

export const testInfo = async (categoryId) => {
  const testData = await Category.aggregate([
    {
      $match: { _id: new ObjectId(categoryId) }, // Ensure adminId is cast to ObjectId
    },
    {
      $lookup: {
        from: "tests", // The 'tests' collection
        localField: "_id", // The field from 'test' collection
        foreignField: "category", // The field from 'test' collection
        as: "testDetails", // The field to include the test information
      },
    },
    {
      $unwind: {
        path: "$testDetails",
        preserveNullAndEmptyArrays: true, // Preserves result if no address details are found
      },
    },
  ]);

  return testData.length ? testData[0] : null; // Return the first element or null if no match
};
