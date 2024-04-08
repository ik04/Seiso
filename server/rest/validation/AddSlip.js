const { z } = require("zod");

const ItemSchema = z
  .object({
    [z.string()]: z.number().min(1),
  })
  .refine(
    (val) => {
      for (const key in val) {
        if (val.hasOwnProperty(key) && typeof val[key] !== "number") {
          return false;
        }
      }
      return Object.keys(val).length > 0;
    },
    {
      message: "Items object must have at least one field with a number value",
    }
  );

const AddSlipSchema = z.object({
  items: ItemSchema,
  laundrySlug: z.string(),
});

module.exports = AddSlipSchema;
