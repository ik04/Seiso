const { z } = require("zod");
const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = UserLoginSchema;
