import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Input } from "../components/Input";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


export const CreateCategory = () => {
  const navigate = useNavigate();

  const categorySchema = z.object({
    categoryName: z.string().min(1, "Category name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    try {
        const response = await api.post("api/createListCategory", data);
        console.log(response.data)
        alert("Category created successfully!");
        navigate("/homepage");
    } catch (error) {
        console.log(error.response?.data || error);
        alert("Error creating category.");
    }
  };

  return (
    <>
    <Header />
      <main className="flex justify-center items-center bg-linear-to-r from-blue-500 to-purple-500  w-full h-dvh">
        <form onSubmit={handleSubmit(onSubmit)} className="h-100">
          <section className="flex flex-col bg-white h-100 w-100 justify-between">

            <section className="flex justify-center">
              <h1 className="font-bold text-2xl pt-5">Create Category</h1>
            </section>

            <section className="w-full flex flex-col justify-center items-center gap-1.5">
              {/* component input*/}
              <Input
                idInput={"categoryNameInput"}
                labelId={"categoryNameInput"}
                widthInput={"w-70"}
                heightInput={"h-10"}
                textLabel={"Category Name"}
                bgInput={"bg-gray-200"}
                register={register("categoryName")}
              />
              {errors.categoryName && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
              )}
            </section>

            <section className="flex justify-center w-full pb-2">
              
              {/* component input */}
              <Button
                typeButton="submit"
                children={"Create"}
                bgButton={"bg-linear-to-r from-blue-500 to-purple-500  to-blue-500"}
                heightButton={"h-10"}
                widhtButton={"w-50"}
                textColor={"text-white"}
                
              />
            </section>
          </section>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreateCategory;