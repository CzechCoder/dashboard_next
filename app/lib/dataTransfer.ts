import { Product, User } from "./models";
import { UserType } from "./types";
import { connectDb } from "./utils";

// USERS

export const fetchUsers = async (q: string, page: number) => {
  const regex: RegExp = new RegExp(q, "i");

  const item_per_page: number = 2;

  try {
    connectDb();
    const countArr: any[] = await User.find({
      username: { $regex: regex },
    });
    const count: number = countArr.length;
    const users = await User.find({ username: { $regex: regex } })
      .limit(item_per_page)
      .skip(item_per_page * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUser = async (_id: string) => {
  try {
    connectDb();
    const user = await User.findById(_id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

// PRODUCTS

export const fetchProducts = async (q: string, page: number) => {
  const regex: RegExp = new RegExp(q, "i");

  const item_per_page: number = 2;

  try {
    connectDb();
    const countArr: any[] = await Product.find({
      title: { $regex: regex },
    });
    const count: number = countArr.length;
    const products = await Product.find({ title: { $regex: regex } })
      .limit(item_per_page)
      .skip(item_per_page * (page - 1));
    return { count, products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProduct = async (_id: string) => {
  try {
    connectDb();
    const product = await Product.findById(_id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};
