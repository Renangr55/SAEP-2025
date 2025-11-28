import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { id } from "zod/v4/locales";

// Schema Zod
const movementSchema = z.object({
  operation: z.enum(["Input", "Output"]),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
});

export const Card = ({ dados, atributos, onDelete, onHistoricSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const imageURL = dados?.imageProduct
    ? `http://localhost:8000${dados.imageProduct}`
    : "/no-image.png";

  // React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      operation: "Input",
      quantity: "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      reset({ operation: "Input", quantity: "" });
    }
  }, [isModalOpen, reset]);

  const onSubmit = (data) => {
    onHistoricSubmit(dados.id, data.operation, data.quantity);
    setIsModalOpen(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md h-170 bg-white w-full max-w-sm relative">

      {dados.imageProduct && (
        <img src={imageURL} alt={dados.name} className="w-full h-[50%] rounded" />
      )}

      {/* Conteúdo */}
      <div className="pt-3">
        <h2 className="text-xl text-white text-center font-semibold bg-linear-to-r from-blue-500 to-purple-500">{dados.name}</h2>
        {atributos.map((campo, index) => (
          <p className="text-gray-700 mt-1" key={index}>
            <strong>{campo.label}:</strong> {dados[campo.key]}
          </p>
        ))}

        <div className="flex justify-between pt-5 ">
          <button
            onClick={() => onDelete(dados.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Remove
          </button>

          <button
            onClick={() => navigate(`/homepage/updateProduct/${dados.id}`)}
            className="bg-purple-700  text-white font-semibold py-2 px-4 rounded"
          >
            Update
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Moviment
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 **bg-opacity-50**  bg-black bg-opa flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Register Moviment</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div>
                <label className="block mb-1">Operation type:</label>
                <select {...register("operation")} className="border w-full p-2 rounded">
                  <option value="Input">Input</option>
                  <option value="Output">Output</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Quantity:</label>
                <input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  className="border w-full p-2 rounded"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
                >
                  Resgister
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
