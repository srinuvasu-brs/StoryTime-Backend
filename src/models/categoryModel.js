import mongoose from "mongoose";

const categoryShema = mongoose.Schema(
  {
    category: { type: String },
    keywords: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Category = mongoose.model("Category", categoryShema);

export default Category;
