import { ObjectId } from "mongodb";
export const getItemsPipeline = async (items) => {
  const testIds = items.map((item) => item.testId);
  const testObjectIds = testIds.map((id) => new ObjectId(id));
  const pipeline = [
    {
      $match: {
        _id: {
          $in: testObjectIds,
        },
      },
    },
    {
      $addFields: {
        testDetails: {
          $map: {
            input: items,
            as: "item",
            in: {
              $cond: {
                if: {
                  $eq: [
                    "$_id",
                    { $convert: { input: "$$item.testId", to: "objectId" } },
                  ],
                },
                then: "$$item",
                else: "$$REMOVE",
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        quantity: {
          $arrayElemAt: ["$testDetails.quantity", 0],
        },
        size: {
          $arrayElemAt: ["$testDetails.size", 0],
        },
      },
    },
  ];
  return pipeline;
};
