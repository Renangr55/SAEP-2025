import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";

// Schema de validação com Zod
const movementSchema = z.object({
  operation: z.enum(["Input", "Output"], { required_error: "Operation is required" }),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(1, "Quantity must be greater than 0"),
  operation_date: z.string().min(1, "Operation date is required"),
});

export const ProductMovementModal = ({ isOpen, onClose, product, userId, onUpdated }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      typeOperation: "Input",
      quantity: "",
      operation_date: "",
    },
  });

 

  // Resetar o formulário quando abrir
  useEffect(() => {
    if (isOpen) {
      reset({
        typeOperation: "Input",
        quantity: "",
        operation_date: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const payload = {
        product_id: product.id,
        quantity: parseInt(data.quantity),
        user_id: Number(userId), // <--- trocar
        operation_date: data.operation_date,
    };

    try {
      if (data.operation === "Input") {
        await api.post("/api/addProduct/", payload);
      } else {
        await api.delete("/api/removeProduct/", { data: payload });
      }

      onUpdated(); // Atualiza produtos/alertas
      onClose(); // Fecha modal
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.Error || "Erro ao registrar movimentação");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Movimentar Produto</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label className="block mb-1">Operation:</label>
            <select {...register("operation")} className="w-full border p-2 rounded">
              <option value="Input">Entrada</option>
              <option value="Output">Saída</option>
            </select>
            {errors.operation && <p className="text-red-500">{errors.operation.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Quantity:</label>
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Operation Date:</label>
            <input
              type="datetime-local"
              {...register("operation_date")}
              className="w-full border p-2 rounded"
            />
            {errors.operation_date && <p className="text-red-500">{errors.operation_date.message}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductMovementModal;
