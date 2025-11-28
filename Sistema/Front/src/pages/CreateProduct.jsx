import React, { useState } from "react";
import Header from "../components/Header";
import api from "../services/api";
import Button from "../components/Button";
import { Navigate, useNavigate } from "react-router-dom";

export const CreateProduct = () => {

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minimum_quantity, setMinimumQuantity] = useState("");
    const [categoryProduct, setCategory] = useState("");
    const [imageProduct, setImageProduct] = useState(null);

    const navigate = useNavigate()
    const handleSend = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("weight", parseFloat(weight));
        formData.append("height", parseFloat(height));
        formData.append("quantity", quantity);
        formData.append("minimum_quantity", minimum_quantity);
        formData.append("categoryProduct", categoryProduct); // AQUI ESTÁ A CORREÇÃO

        if (parseInt(quantity) < parseInt(minimum_quantity)) {
            alert("The quantity is smaller than minimum quantity")
            return; 
        }
        if (imageProduct) {
            formData.append("imageProduct", imageProduct); 
        }

        try {
            await api.post("api/createListProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
            );
            navigate("/homepage")

            alert("Produto criado com sucesso!");
        } catch (error) {
            console.log("Erro:", error.response?.data || error);
            alert(error.response?.data)
        }
    };

    return (
        <>
            <Header />

            <main className="h-screen">
                <section className="pl-5 pt-10">
                    <h1 className="font-bold text-5xl">Create a Tool</h1>
                </section>

                <form onSubmit={handleSend} className="flex flex-col gap-5">

                    {/* Product name */}
                    <section className="flex flex-col pl-5 pt-5 ">
                        <label htmlFor="nameInput">Product name:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="text"
                            id="nameInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>

                    {/* Weight */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="weightInput">Product weight:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            id="weightInput"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </section>

                    {/* Height */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="heightInput">Height:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            id="heightInput"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </section>

                    {/* Quantity */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="quantityInput">Quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            id="quantityInput"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </section>

                    {/* Minimum Quantity */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="minimumQuantityInput">Minimum quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            id="minimumQuantityInput"
                            value={minimum_quantity}
                            onChange={(e) => setMinimumQuantity(e.target.value)}
                        />
                    </section>

                    {/* Category */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="categoryInput">Category:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            id="categoryInput"
                            value={categoryProduct}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </section>

                    {/* imageProduct */}
                    <section className="flex flex-col pl-5">
                        <label htmlFor="imageProduct">Upload of Images:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="file"
                            id="imageProduct"
                            onChange={(e) => setImageProduct(e.target.files[0])}
                        />
                    </section>

                    <section className="flex justify-start pl-5 w-full pb-2">
                        <Button
                            typeButton="submit"
                            children={"Sign now"}
                            bgButton={"bg-linear-to-r from-blue-500 to-purple-500"}
                            heightButton={"h-10"}
                            widhtButton={"w-80"}
                            textColor={"text-white"}
                        />
                    </section>

                </form>
            </main>
        </>
    );
};

export default CreateProduct;
