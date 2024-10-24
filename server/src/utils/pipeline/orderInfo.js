import { ObjectId } from "mongodb";
import Order from "../../models/order.model.js";

// const orderInfoPipeLine = async (customer) => {
//   const orderAggregation = await Order.aggregate([
//     // Step 1: Match the orders for the given customer
//     {
//       $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
//     },

//     // Step 2: Lookup to get test details from the Test collection (no unwind)
//     {
//       $lookup: {
//         from: "tests",
//         localField: "items.testId", // testId in the items array
//         foreignField: "_id",
//         as: "testDetails", // Test details added as a new field
//       },
//     },

//     // Step 3: Lookup to get lab details from the Lab collection (no unwind)
//     {
//       $lookup: {
//         from: "admis",
//         localField: "labDetails.lab", // lab in the labDetails array
//         foreignField: "_id",
//         as: "labDetails", // Lab details added as a new field
//       },
//     },

//     // Step 4: Lookup to get address details from the Address collection
//     {
//       $lookup: {
//         from: "addresses",
//         localField: "labDetails._id", // Matching lab _id with the owner in the address collection
//         foreignField: "owner", // Corresponding owner field in the 'addresses' collection
//         as: "labAddress", // Address details added as a new field
//       },
//     },

//     // Step 5: Group by order ID to gather test, lab, and address information
//     {
//       $group: {
//         _id: "$_id", // Group by order ID
//         orderPrice: { $first: "$orderPrice" },
//         status: { $first: "$status" },
//         isPaymentDone: { $first: "$isPaymentDone" },
//         customer: { $first: "$customer" },

//         // Accumulate items with test details
//         items: {
//           $push: {
//             test: {
//               testname: { $arrayElemAt: ["$testDetails.testname", 10] }, // Prevent duplication
//               description: { $arrayElemAt: ["$testDetails.description", 10] },
//               price: { $arrayElemAt: ["$testDetails.price", 10] },
//             },
//             labDetails: {
//               labname: { $arrayElemAt: ["$labDetails.labname", 10] }, // Prevent duplication
//               address: { $arrayElemAt: ["$labAddress.address", 10] },
//               city: { $arrayElemAt: ["$labAddress.city", 10] },
//               pincode: { $arrayElemAt: ["$labAddress.pincode", 10] },
//               state: { $arrayElemAt: ["$labAddress.state", 10] },
//               country: { $arrayElemAt: ["$labAddress.country", 10] },
//             },
//           },
//         },

//         // Accumulate lab details
//         // labDetails: {
//         //   $push: {
//         //     labname: { $arrayElemAt: ["$labDetails.labname", 0] }, // Prevent duplication
//         //     address: { $arrayElemAt: ["$labAddress.address", 0] },
//         //     city: { $arrayElemAt: ["$labAddress.city", 0] },
//         //     pincode: { $arrayElemAt: ["$labAddress.pincode", 0] },
//         //     state: { $arrayElemAt: ["$labAddress.state", 0] },
//         //     country: { $arrayElemAt: ["$labAddress.country", 0] },
//         //   },
//         // },
//       },
//     },

//     // Step 6: Project the final result
//     {
//       $project: {
//         _id: 1,
//         orderPrice: 1,
//         status: 1,
//         isPaymentDone: 1,
//         customer: 1,
//         items: 1, // Include test details in items array
//         // labDetails: 1, // Include lab details with address
//       },
//     },
//   ]);

//   return orderAggregation.length > 0
//     ? orderAggregation // Return the array of orders for the customer
//     : [];
// };
// const orderInfoPipeLine = async (customer) => {
//   const orderAggregation = await Order.aggregate([
//     // Step 1: Match the orders for the given customer
//     {
//       $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
//     },

//     // Step 2: Lookup to get test details from the Test collection
//     {
//       $lookup: {
//         from: "tests",
//         localField: "items.testId", // testId in the items array
//         foreignField: "_id",
//         as: "testDetails", // Test details added as a new field
//       },
//     },

//     // Step 3: Lookup to get lab details from the Lab collection
//     {
//       $lookup: {
//         from: "admis",
//         localField: "items.labId", // labId in the items array
//         foreignField: "_id",
//         as: "labDetails", // Lab details added as a new field
//       },
//     },

//     // Step 4: Lookup to get address details from the Address collection
//     {
//       $lookup: {
//         from: "addresses",
//         localField: "labDetails._id", // Matching lab _id with the owner in the address collection
//         foreignField: "owner", // Corresponding owner field in the 'addresses' collection
//         as: "labAddress", // Address details added as a new field
//       },
//     },

//     // Step 5: Add each lab's address details into the labDetails array
//     {
//       $addFields: {
//         labDetails: {
//           $map: {
//             input: "$labDetails", // Iterate over the labDetails array
//             as: "lab", // Alias for each element
//             in: {
//               $mergeObjects: [
//                 "$$lab", // Take all the fields from the lab
//                 {
//                   $arrayElemAt: [
//                     {
//                       $filter: {
//                         input: "$labAddress", // Find the matching address in labAddress
//                         as: "address",
//                         cond: { $eq: ["$$address.owner", "$$lab._id"] }, // Match lab ID with address owner
//                       },
//                     },
//                     0, // Return the first matching address
//                   ],
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },

//     // Step 6: Group by order ID to gather test, lab, and address information
//     {
//       $group: {
//         _id: "$_id", // Group by order ID
//         orderPrice: { $first: "$orderPrice" },
//         status: { $first: "$status" },
//         isPaymentDone: { $first: "$isPaymentDone" },
//         customer: { $first: "$customer" },

//         // Accumulate items with test and lab details
//         items: {
//           $push: {
//             test: {
//               testname: { $arrayElemAt: ["$testDetails.testname", 1] }, // Access test name
//               description: { $arrayElemAt: ["$testDetails.description", 1] }, // Access description
//               price: { $arrayElemAt: ["$testDetails.price", 1] }, // Access price
//             },
//             labDetails: {
//               labname: { $arrayElemAt: ["$labDetails.labname", 1] }, // Access lab name
//               address: { $arrayElemAt: ["$labDetails.address", 1] }, // Access address
//               city: { $arrayElemAt: ["$labDetails.city", 1] }, // Access city
//               pincode: { $arrayElemAt: ["$labDetails.pincode", 1] }, // Access pincode
//               state: { $arrayElemAt: ["$labDetails.state", 1] }, // Access state
//               country: { $arrayElemAt: ["$labDetails.country", 1] }, // Access country
//             },
//           },
//         },
//       },
//     },

//     // Step 7: Project the required fields only
//     {
//       $project: {
//         _id: 1,
//         orderPrice: 1,
//         status: 1,
//         isPaymentDone: 1,
//         customer: 1,
//         items: 1, // Include only the required test and lab details in items
//       },
//     },
//   ]);

//   return orderAggregation.length > 0
//     ? orderAggregation // Return the array of orders for the customer
//     : [];
// };

// const orderInfoPipeLine = async (customer) => {
//   const orderAggregation = await Order.aggregate([
//     // Step 1: Match the orders for the given customer
//     {
//       $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
//     },

//     // Step 2: Lookup to get test details from the Test collection
//     {
//       $lookup: {
//         from: "tests",
//         localField: "items.testId", // testId in the items array
//         foreignField: "_id",
//         as: "testDetails", // Test details added as a new field
//       },
//     },

//     // Step 3: Lookup to get lab details from the Lab collection
//     {
//       $lookup: {
//         from: "admis",
//         localField: "items.labId", // labId in the items array
//         foreignField: "_id",
//         as: "labDetails", // Lab details added as a new field
//       },
//     },

//     // Step 4: Lookup to get address details from the Address collection
//     {
//       $lookup: {
//         from: "addresses",
//         localField: "labDetails._id", // Matching lab _id with the owner in the address collection
//         foreignField: "owner", // Corresponding owner field in the 'addresses' collection
//         as: "labAddress", // Address details added as a new field
//       },
//     },

//     // Step 5: Add each lab's address details into the labDetails array
//     {
//       $addFields: {
//         labDetails: {
//           $map: {
//             input: "$labDetails", // Iterate over the labDetails array
//             as: "lab", // Alias for each element
//             in: {
//               $mergeObjects: [
//                 "$$lab", // Take all the fields from the lab
//                 {
//                   $arrayElemAt: [
//                     {
//                       $filter: {
//                         input: "$labAddress", // Find the matching address in labAddress
//                         as: "address",
//                         cond: { $eq: ["$$address.owner", "$$lab._id"] }, // Match lab ID with address owner
//                       },
//                     },
//                     0, // Return the first matching address
//                   ],
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },

//     // Step 6: Unwind the items array so we can process each item separately
//     { $unwind: "$items" },

//     // Step 7: Group by order ID to gather test, lab, and address information
//     {
//       $group: {
//         _id: "$_id", // Group by order ID
//         orderPrice: { $first: "$orderPrice" },
//         status: { $first: "$status" },
//         isPaymentDone: { $first: "$isPaymentDone" },
//         customer: { $first: "$customer" },

//         // Accumulate items with test and lab details
//         items: {
//           $push: {
//             test: {
//               testname: { $arrayElemAt: ["$testDetails.testname", 0] }, // Access test name
//               description: { $arrayElemAt: ["$testDetails.description", 0] }, // Access description
//               price: { $arrayElemAt: ["$testDetails.price", 0] }, // Access price
//             },
//             labDetails: {
//               labname: { $arrayElemAt: ["$labDetails.labname", 0] }, // Access lab name
//               address: { $arrayElemAt: ["$labDetails.address", 0] }, // Access address
//               city: { $arrayElemAt: ["$labDetails.city", 0] }, // Access city
//               pincode: { $arrayElemAt: ["$labDetails.pincode", 0] }, // Access pincode
//               state: { $arrayElemAt: ["$labDetails.state", 0] }, // Access state
//               country: { $arrayElemAt: ["$labDetails.country", 0] }, // Access country
//             },
//           },
//         },
//       },
//     },

//     // Step 8: Project the required fields only
//     {
//       $project: {
//         _id: 1,
//         orderPrice: 1,
//         status: 1,
//         isPaymentDone: 1,
//         customer: 1,
//         items: 1, // Include all items with test and lab details
//       },
//     },
//   ]);

//   return orderAggregation.length > 0
//     ? orderAggregation // Return the array of orders for the customer
//     : [];
// };

// const orderInfoPipeLine = async (customer) => {
//   const orderAggregation = await Order.aggregate([
//     // Step 1: Match the orders for the given customer
//     {
//       $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
//     },

//     // Step 2: Lookup to get test details from the Test collection
//     {
//       $lookup: {
//         from: "tests",
//         localField: "items.testId", // testId in the items array
//         foreignField: "_id",
//         as: "testDetails", // Test details added as a new field
//       },
//     },

//     // Step 3: Lookup to get lab details from the Lab collection
//     {
//       $lookup: {
//         from: "admis",
//         localField: "items.labId", // labId in the items array
//         foreignField: "_id",
//         as: "labDetails", // Lab details added as a new field
//       },
//     },

//     // Step 4: Unwind the items array so we can process each item separately
//     { $unwind: "$items" },

//     // Step 5: Add the test and lab details into the items array
//     {
//       $addFields: {
//         "items.test": {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$testDetails",
//                 as: "test",
//                 cond: { $eq: ["$$test._id", "$items.testId"] }, // Match testId
//               },
//             },
//             0,
//           ],
//         },
//         "items.labDetails": {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$labDetails",
//                 as: "lab",
//                 cond: { $eq: ["$$lab._id", "$items.labId"] }, // Match labId
//               },
//             },
//             0,
//           ],
//         },
//       },
//     },

//     // Step 6: Group the orders back by order ID
//     {
//       $group: {
//         _id: "$_id", // Group by order ID
//         orderPrice: { $first: "$orderPrice" },
//         status: { $first: "$status" },
//         isPaymentDone: { $first: "$isPaymentDone" },
//         customer: { $first: "$customer" },

//         // Accumulate items with test and lab details
//         items: {
//           $push: {
//             test: {
//               testname: "$items.test.testname",
//               description: "$items.test.description",
//               price: "$items.test.price",
//             },
//             labDetails: {
//               labname: "$items.labDetails.labname",
//               address: "$items.labDetails.address",
//               city: "$items.labDetails.city",
//               pincode: "$items.labDetails.pincode",
//               state: "$items.labDetails.state",
//               country: "$items.labDetails.country",
//             },
//           },
//         },
//       },
//     },

//     // Step 7: Project the required fields only
//     {
//       $project: {
//         _id: 1,
//         orderPrice: 1,
//         status: 1,
//         isPaymentDone: 1,
//         customer: 1,
//         items: 1, // Include all items with test and lab details
//       },
//     },
//   ]);

//   return orderAggregation.length > 0
//     ? orderAggregation // Return the array of orders for the customer
//     : [];
// };

// const orderInfoPipeLine = async (customer) => {
//   const orderAggregation = await Order.aggregate([
//     // Step 1: Match the orders for the given customer
//     {
//       $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
//     },

//     // Step 2: Lookup to get test details from the Test collection
//     {
//       $lookup: {
//         from: "tests",
//         localField: "items.testId", // testId in the items array
//         foreignField: "_id",
//         as: "testDetails", // Test details added as a new field
//       },
//     },

//     // Step 3: Lookup to get lab details from the Lab collection (admis)
//     {
//       $lookup: {
//         from: "admis", // Assuming admis is the lab collection
//         localField: "items.labId", // labId in the items array
//         foreignField: "_id",
//         as: "labDetails", // Lab details added as a new field
//       },
//     },

//     // Step 4: Unwind the items array so we can process each item separately
//     { $unwind: "$items" },

//     // Step 5: Add the test and lab details into the items array
//     {
//       $addFields: {
//         "items.test": {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$testDetails",
//                 as: "test",
//                 cond: { $eq: ["$$test._id", "$items.testId"] }, // Match testId
//               },
//             },
//             0,
//           ],
//         },
//         "items.labDetails": {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$labDetails",
//                 as: "lab",
//                 cond: { $eq: ["$$lab._id", "$items.labId"] }, // Match labId
//               },
//             },
//             0,
//           ],
//         },
//       },
//     },

//     // Step 6: Group the orders back by order ID
//     {
//       $group: {
//         _id: "$_id", // Group by order ID
//         orderPrice: { $first: "$orderPrice" },
//         status: { $first: "$status" },
//         isPaymentDone: { $first: "$isPaymentDone" },
//         customer: { $first: "$customer" },

//         // Accumulate items with test and lab details
//         items: {
//           $push: {
//             test: {
//               testname: "$items.test.testname",
//               description: "$items.test.description",
//               price: "$items.test.price",
//             },
//             labDetails: {
//               labname: "$items.labDetails.labname",
//               address: "$items.labDetails.address",
//               city: "$items.labDetails.city",
//               pincode: "$items.labDetails.pincode",
//               state: "$items.labDetails.state",
//               country: "$items.labDetails.country",
//             },
//           },
//         },
//       },
//     },

//     // Step 7: Project the required fields only
//     {
//       $project: {
//         _id: 1,
//         orderPrice: 1,
//         status: 1,
//         isPaymentDone: 1,
//         customer: 1,
//         items: 1, // Include all items with test and lab details
//       },
//     },
//   ]);

//   return orderAggregation.length > 0
//     ? orderAggregation // Return the array of orders for the customer
//     : [];
// };

const orderInfoPipeLine = async (customer) => {
  const orderAggregation = await Order.aggregate([
    // Step 1: Match the orders for the given customer
    {
      $match: { customer: new ObjectId(customer) }, // Ensure customer is cast to ObjectId
    },

    // Step 2: Lookup to get test details from the Test collection
    {
      $lookup: {
        from: "tests",
        localField: "items.testId", // testId in the items array
        foreignField: "_id",
        as: "testDetails", // Test details added as a new field
      },
    },

    // Step 3: Lookup to get lab details from the Lab collection (admis)
    {
      $lookup: {
        from: "admis", // Assuming admis is the lab collection
        localField: "items.labId", // labId in the items array
        foreignField: "_id",
        as: "labDetails", // Lab details added as a new field
      },
    },

    // Step 4: Lookup to get the address details from the addresses collection
    {
      $lookup: {
        from: "addresses", // Assuming addresses is the address collection
        localField: "items.labId", // Same labId to match the address owner
        foreignField: "owner", // Foreign field from address linked to the lab
        as: "labAddress", // Lab address added as a new field
      },
    },

    // Step 5: Unwind the items array so we can process each item separately
    { $unwind: "$items" },

    // Step 6: Add the test, lab, and address details into the items array
    {
      $addFields: {
        "items.test": {
          $arrayElemAt: [
            {
              $filter: {
                input: "$testDetails",
                as: "test",
                cond: { $eq: ["$$test._id", "$items.testId"] }, // Match testId
              },
            },
            0,
          ],
        },
        "items.labDetails": {
          $mergeObjects: [
            {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$labDetails",
                    as: "lab",
                    cond: { $eq: ["$$lab._id", "$items.labId"] }, // Match labId
                  },
                },
                0,
              ],
            },
            {
              address: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$labAddress",
                      as: "address",
                      cond: { $eq: ["$$address.owner", "$items.labId"] }, // Match labId with address owner
                    },
                  },
                  0,
                ],
              },
            },
          ],
        },
      },
    },

    // Step 7: Group the orders back by order ID
    {
      $group: {
        _id: "$_id", // Group by order ID
        orderPrice: { $first: "$orderPrice" },
        status: { $first: "$status" },
        isPaymentDone: { $first: "$isPaymentDone" },
        customer: { $first: "$customer" },

        // Accumulate items with test, lab details, and address
        items: {
          $push: {
            test: {
              testname: "$items.test.testname",
              description: "$items.test.description",
              price: "$items.test.price",
            },
            labDetails: {
              labname: "$items.labDetails.labname",
              description: "$items.labDetails.description",
              email: "$items.labDetails.email",
              address: {
                street: "$items.labDetails.address.address",
                city: "$items.labDetails.address.city",
                pincode: "$items.labDetails.address.pincode",
                state: "$items.labDetails.address.state",
                country: "$items.labDetails.address.country",
              },
            },
          },
        },
      },
    },

    // Step 8: Project the required fields only
    {
      $project: {
        _id: 1,
        orderPrice: 1,
        status: 1,
        isPaymentDone: 1,
        customer: 1,
        items: 1, // Include all items with test, lab details, and lab address
      },
    },
  ]);

  return orderAggregation.length > 0
    ? orderAggregation // Return the array of orders for the customer
    : [];
};

export default orderInfoPipeLine;
