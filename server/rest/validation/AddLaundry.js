const { z } = require("zod");

const AddLaundrySchema = z.object({
  name: z.string(),
  schema: z.array(z.string()),
});

module.exports = AddLaundrySchema;
