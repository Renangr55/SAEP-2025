// ProductSection.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Card } from "./Card";
import  ProductMovementModal  from "./ProductMoviementModal";

export const ProductSection = ({ atributos }) => {
  const [produtos, setProdutos] = useState([]);
  const [alertShown, setAlertShown] = useState([]); // alertas atualmente ativos
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const userNumber = Number(userId)
  if (!userNumber) {
    alert("Usuário não encontrado!");
    return;
  }

  // buble sort
  const mergeSortProducts = (arr) => {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = mergeSortProducts(arr.slice(0, middle));
    const right = mergeSortProducts(arr.slice(middle));

    return merge(left, right);
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i].name.toLowerCase() < right[j].name.toLowerCase()) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Adiciona o restante
    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  // Função para buscar produtos e gerenciar alertas
  const fetchProdutos = async () => {
  try {
    const response = await api.get("api/createListProduct");
    const { Product, alert } = response.data;

    // Ordena produtos pelo nome antes de setar
    const sortedProducts = mergeSortProducts(Product);
    setProdutos(sortedProducts);

    // Lida com alertas
    const currentAlerts = alert || [];
    const newAlerts = currentAlerts.filter(msg => !alertShown.includes(msg));
    newAlerts.forEach(msg => window.alert(msg));
    setAlertShown(currentAlerts);
  } catch (error) {
    console.log("Erro ao carregar produtos:", error);
  }
};


  useEffect(() => {
    fetchProdutos();
  }, []);

  // Abrir modal com produto selecionado
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Deletar produto
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/updateDestroyRetriveProduct/${id}`);
      setProdutos(produtos.filter(prod => prod.id !== id));
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o produto!");
    }
  };

  // Movimentação (entrada/saída) via modal
  const handleHistoricSubmit = async (productId, type, quantity, operationDate) => {
    if (!quantity || quantity <= 0) return;

    try {
        const payload = {
        user_id: Number(userId), // <--- aqui
        typeOperation: type,
        product_id: productId,
        quantity: parseInt(quantity),
        operation_date: operationDate || new Date().toISOString()
        };

        if (type === "Input") {
        await api.post("/api/addProduct/", payload);
        } else {
        await api.delete("/api/removeProduct/", { data: payload });
        }

    // Atualiza produtos após movimentação
    await fetchProdutos();
  } catch (error) {
    console.error(error.response?.data || error);
    alert(error.response?.data?.Error || "Erro ao registrar movimentação");
  }
};

  return (
    <>
      <div className="justify-items-center grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
        {produtos.map((item) => (
         <Card
            key={item.id}
            dados={item}
            atributos={atributos}
            onDelete={handleDelete}
            onHistoricSubmit={handleHistoricSubmit}  // <--- ESSENCIAL
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
