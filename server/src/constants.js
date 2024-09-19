export const PORT = 6000;

// User roles constants
export const availableUserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
};
export const availableUserRolesEnum = Object.values(availableUserRoles);

// cookie options
// export const cookieOptions = {
//   secure: true,
//   httpOnly: true,
//   sameSite: "none",
//   path: "/",
//   maxAge: 864000000, // 10 days
// };

export const cookieOptions = {
  httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  secure: false, // Ensures cookies are sent over HTTPS in production
  sameSite: "Strict", // Helps prevent CSRF attacks
  maxAge: 1000 * 60 * 15, // 15 minutes expiry time
};

// URI base path
export const BASEPATH = "/api/v1";
export const EMAIL_VERIFY_PAGE = "/emailVerify";
export const RESET_PASS_PAGE = "/resetPassword";

// order status enum
export const orderStatus = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
};
export const orderStatusEnum = Object.values(orderStatus);

export const availablePaymentMethod = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

// allowed image extensions
export const allowedImgExtensions = {
  jpg: ".jpg",
  png: ".png",
  jpeg: ".jpeg",
  webp: ".webp",
};
export const allowedImgExtensionsEnum = Object.values(allowedImgExtensions);
