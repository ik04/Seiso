const { z } = require("zod");
const UserSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

module.exports = UserSignupSchema;
