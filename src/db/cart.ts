import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, require: true },
      name: { type: String, require: true },
      description: { type: String, require: false },
      price: { type: Number, require: true },
      category: { type: String, require: true },
    },
  ],
  createdAt: { type: Number, require: true },
  updatedAt: { type: Number, require: false },
});

export const CartModel = mongoose.model("Cart", CartSchema);

export const getCartByUserId = async (userId: string) =>
  await CartModel.findOne({ userId });
export const createCart = async (values: Record<string, any>) =>
  await new CartModel(values).save().then((cart) => cart.toObject());
export const addItemToCart = async (userId: string, item: object) => {
  const cart = await CartModel.findOne({ userId });
  if (cart) {
    cart.items.push(item);
    cart.updatedAt = Date.now();
    return cart.save();
  }
  return null;
};
export const removeItemFromCart = async (userId: string, productId: string) => {
  const cart = await CartModel.findOne({ userId });
  if (cart) {
    var products = cart.items.filter((obj) => obj._id.toString() != productId);
    cart.items = products;
    cart.updatedAt = Date.now();
    return cart.save();
  }
  return null;
};
