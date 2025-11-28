import Header from "../components/Header"
import { useState,useEffect } from "react"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"



export const HomePage = () => {
    return (
        <>
        <Header />
        <main className="flex justify-center bg-linear-to-r from-blue-500 to-purple-500 h-screen">
            <section className="flex flex-col justify-arounditems-center">
                <section className="flex  items-center pl-5 h-50">
                    <h1 className="text-5xl font-bold text-white">Welcome to Terzoni</h1>
                </section>

                {/* links */}
                <section className="flex flex-col items-center justify-center h-40 gap-5 w-full">
                    <Link to={"/homepage/createCategory/"} className="flex justify-center items-center text-white font-bold bg-black h-10 w-50">
                            Create Category
                    </Link>

                    <Link to={"/homepage/createProduct"} className="flex justify-center items-center text-white font-bold bg-black h-10 w-50">
                            Create Product
                    </Link>

                    <Link to={"/homepage/stockcontrol"} className="flex justify-center items-center text-white font-bold bg-black h-10 w-50">
                            Stock Control
                    </Link>
                </section>

            
            </section>
        </main>
        <Footer />
        </>
    )
}

export default HomePage