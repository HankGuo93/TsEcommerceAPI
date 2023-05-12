import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: false },
    price: { type: Number, require: true },
    stock: { type: Number, require: false },
    category: { type: String, require: true },
    createdAt: { type: Number, require: true },
    updatedAt: { type: Number, require: false },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductsByCategory = (category: string) => ProductModel.find({ category });
export const createProduct = (values: Record<string, any>) => new ProductModel(values)
    .save().then((product) => product.toObject());
export const deleteProductById = (id: string) => ProductModel.findByIdAndRemove(id);
export const updateProductById = async (id: string, values: Record<string, any>) => {
    await ProductModel.findByIdAndUpdate(id, values);
    return ProductModel.findById(id);
};