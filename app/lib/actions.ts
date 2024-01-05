"use server";

import { revalidatePath } from "next/cache";
import { User, Product } from "./models";
import { connectDb } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

// UPDATE

export const updateUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { _id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectDb();
    const updateFields: { [key: string]: string } = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(_id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update the user");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateProduct = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { _id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectDb();
    const updateFields: { [key: string]: string } = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(_id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update the product");
  }

  revalidatePath("/dashboard/product");
  redirect("/dashboard/products");
};

// ADD

export const addUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectDb();

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create a new user");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectDb();

    const newProduct = new Product({ title, desc, price, stock, color, size });

    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create a new product");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// DELETE

export const deleteUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectDb();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete a user");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteProduct = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDb();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete a product");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// AUTH

export const authenticate = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
