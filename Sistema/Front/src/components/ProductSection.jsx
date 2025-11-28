import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Card } from "./Card";
import ProductMovementModal from "./ProductMoviementModal";

export const ProductSection = ({ atributos }) => {
  const [produtos, setProdutos] = useState([]);
  const [alertShown, setAlertShown] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = localStorage.getItem("userId");
  const userNumber = Number(userId);
  if (!userNumber) {
    alert("User not found!");
    return;
  }

  const mergeSortProducts = (arr) => {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = mergeSortProducts(arr.slice(0, middle));
    const right = mergeSortProducts(arr.slice(middle));

    return merge(left, right);
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i].name.toLowerCase() < right[j].name.toLowerCase()) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const fetchProdutos = async () => {
    try {
      const response = await api.get("api/createListProduct");
      const { Product, alert } = response.data;

      const sortedProducts = mergeSortProducts(Product);
      setProdutos(sortedProducts);

      const currentAlerts = alert || [];
      const newAlerts = currentAlerts.filter((msg) => !alertShown.includes(msg));
      newAlerts.forEach((msg) => window.alert(msg));
      setAlertShown(currentAlerts);
    } catch (error) {
      console.log("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/updateDestroyRetriveProduct/${id}`);
      setProdutos(produtos.filter((prod) => prod.id !== id));
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o produto!");
    }
  };

  const handleHistoricSubmit = async (productId, type, quantity, operationDate) => {
    if (!quantity || quantity <= 0) return;

    try {
      const payload = {
        user_id: Number(userId),
        typeOperation: type,
        product_id: productId,
        quantity: parseInt(quantity),
        operation_date: operationDate || new Date().toISOString(),
      };

      if (type === "Input") {
        await api.post("/api/addProduct/", payload);
      } else {
        await api.delete("/api/removeProduct/", { data: payload });
      }

      await fetchProdutos();
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.Error || "Erro ao registrar movimentação");
    }
  };

  const filteredProducts = produtos.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full flex justify-center mt-5">
        <input
          type="text"
          placeholder="Search product by name..."
          className="border border-gray-400 rounded-lg w-80 p-2 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="justify-items-center grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
        {filteredProducts.map((item) => (
          <Card
            key={item.id}
            dados={item}
            atributos={atributos}
            onDelete={handleDelete}
            onHistoricSubmit={handleHistoricSubmit}
            onOpenModal={() => handleOpenModal(item)}
          />
        ))}
      </div>

      <ProductMovementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        userId={userId}
        onUpdated={fetchProdutos}
        onHistoricSubmit={handleHistoricSubmit}
      />
    </>
  );
};
