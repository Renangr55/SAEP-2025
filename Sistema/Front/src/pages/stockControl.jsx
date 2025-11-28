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
                    { key: "quantity", label: "Quanntity" },
                    { key: "minimum_quantity", label: "Minimum Quantity" },
                    { key: "weight", label: "wheight" },
                    { key: "height", label: "height" },
                    { key: "category_name", label: "Category" } 
                ]}
            />
            </section>
        </main>
        </>
    )
}

export default StokeControl