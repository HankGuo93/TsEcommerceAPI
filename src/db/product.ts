import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: false },
    price: { type: Float32Array, require: true },
    stock: { type: Int32Array, require: false },
    category: { type: String, require: true },
    createdAt: { type: Int32Array, require: true },
    updateAt: { type: Int32Array, require: false },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductsByCategory = (category: string) => ProductModel.find({ category });
export const createProduct = () => (values: Record<string, any>) => new ProductModel(values)
    .save().then((product) => product.toObject());
export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);