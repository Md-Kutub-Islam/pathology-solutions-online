export const PORT = 6000;

// User roles constants
export const availableUserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
};
export const availableUserRolesEnum = Object.values(availableUserRoles);

// cookie options
export const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
  path: "/",
  maxAge: 864000000, // 10 days
};

// URI base path
export const BASEPATH = "/api/v1";
export const EMAIL_VERIFY_PAGE = "/emailVerify";
