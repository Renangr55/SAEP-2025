import Header from "../components/Header"
import { useState,useEffect } from "react"
import { ProductSection } from "../components/ProductSection"


export const StokeControl = () => {
    return (
        <>
        <Header />
        <main>
            <section>
                <section className="flex items-center pl-5 h-30">
                    <h1 className="text-5xl font-bold">Stock Control</h1>
                </section>
            <ProductSection
                atributos={[
                    { key: "quantity", label: "Quantidade" },
                    { key: "minimum_quantity", label: "Qtd Mínima" },
                    { key: "weight", label: "Peso" },
                    { key: "height", label: "Altura" },
                    { key: "category_name", label: "Categoria" } // se vier no serializer
                ]}
            />
            </section>
        </main>
        </>
    )
}

export default StokeControl