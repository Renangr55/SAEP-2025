import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../services/api";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

export const UpdateProduct = () => {
    // não usei o component input por que esse endpoint precisa ser formData


    const { id } = useParams();

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minimum_quantity, setMinimumQuantity] = useState("");
    const [categoryProduct, setCategory] = useState("");
    const [imageProduct, setImageProduct] = useState(null);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // load data
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get(`api/updateDestroyRetriveProduct/${id}`);
                const data = response.data;

                setName(data.name);
                setWeight(data.weight);
                setHeight(data.height);
                setQuantity(data.quantity);
                setMinimumQuantity(data.minimum_quantity);
                setCategory(data.categoryProduct);
            } catch (error) {
                console.log("Erro ao carregar produto:", error);
            }
        };

        const loadCategories = async () => {
            try {
                const response = await api.get("api/createListCategory");
                setCategories(response.data);
            } catch (err) {
                console.log("Erro ao carregar categorias:", err);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadProduct();
        loadCategories();
    }, [id]);

    // Validation
    const validateFields = () => {
        let newErrors = {};

        if (!name?.trim()) newErrors.name = "Product name is required";
        if (!weight) newErrors.weight = "Weight is required";
        if (!height) newErrors.height = "Height is required";
        if (!quantity) newErrors.quantity = "Quantity is required";
        if (!minimum_quantity) newErrors.minimum_quantity = "Minimum quantity is required";
        if (!categoryProduct) newErrors.categoryProduct = "Category is required";

        if (quantity && minimum_quantity && Number(quantity) < Number(minimum_quantity)) {
            newErrors.quantityCheck = "Quantity cannot be smaller than minimum";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // update
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        const formData = new FormData();

        formData.append("name", name);
        formData.append("weight", weight);
        formData.append("height", height);
        formData.append("quantity", quantity);
        formData.append("minimum_quantity", minimum_quantity);
        formData.append("categoryProduct", categoryProduct);

        if (imageProduct) {
            formData.append("imageProduct", imageProduct);
        }

        try {
            await api.put(`api/updateDestroyRetriveProduct/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Product updated successfully!");
            navigate("/homepage");

        } catch (error) {
            console.log("Erro:", error.response?.data || error);
            alert("Error when updating product.");
        }
    };

    return (
        <>
            <Header />

            <main className="h-screen bg-linear-to-r">
                <section className="pl-5 pt-10">
                    <h1 className="font-bold text-5xl">Update Product</h1>
                </section>

                <form onSubmit={handleUpdate} className="flex flex-col gap-5">

                    {/* Product name */}
                    <section className="flex flex-col pl-5 pt-5">
                        <label>Product name:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </section>

                    {/* Weight */}
                    <section className="flex flex-col pl-5">
                        <label>Weight:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        {errors.weight && <p className="text-red-500">{errors.weight}</p>}
                    </section>

                    {/* Height */}
                    <section className="flex flex-col pl-5">
                        <label>Height:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        {errors.height && <p className="text-red-500">{errors.height}</p>}
                    </section>

                    {/* Quantity */}
                    <section className="flex flex-col pl-5">
                        <label>Quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                        {errors.quantityCheck && (
                            <p className="text-red-500">{errors.quantityCheck}</p>
                        )}
                    </section>

                    {/* Minimum quantity */}
                    <section className="flex flex-col pl-5">
                        <label>Minimum quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={minimum_quantity}
                            onChange={(e) => setMinimumQuantity(e.target.value)}
                        />
                        {errors.minimum_quantity && (
                            <p className="text-red-500">{errors.minimum_quantity}</p>
                        )}
                    </section>

                    {/* Category with select */}
                    <section className="flex flex-col pl-5">
                        <label>Category:</label>

                        {loadingCategories ? (
                            <p>Loading categories...</p>
                        ) : (
                            <select
                                className="h-12 w-80 pl-5 bg-gray-300"
                                value={categoryProduct}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}

                        {errors.categoryProduct && (
                            <p className="text-red-500">{errors.categoryProduct}</p>
                        )}
                    </section>

                    {/* Image upload */}
                    <section className="flex flex-col pl-5">
                        <label>Upload new image (optional):</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="file"
                            onChange={(e) => setImageProduct(e.target.files[0])}
                        />
                    </section>

                    {/* Submit button */}
                    <section className="flex justify-start pl-5 w-full pb-2">
                        <Button
                            typeButton="submit"
                            children={"Update Product"}
                            bgButton={"bg-linear-to-r from-blue-500 to-purple-500"}
                            heightButton={"h-10"}
                            widhtButton={"w-80"}
                            textColor={"text-white"}
                        />
                    </section>
                </form>
            </main>

            <Footer />
        </>
    );
};

export default UpdateProduct;
