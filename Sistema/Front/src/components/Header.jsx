import { Link } from "react-router-dom"
import image from "../assets/image.png"
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


export const Header = () => {
    const navigate = useNavigate()
    const username = localStorage.getItem("username"); 
    console.log(username)

    const logout = () => {
        try{
            console.log(localStorage.getItem("token"))
            const log = localStorage.removeItem("token")
            console.log(log)
            console.log(localStorage.getItem("token"))
            navigate("/login")
            alert("Logout")
        } catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <header>
            <section className="flex justify-between items-center gap-4 w-full pr-20 h-20 bg-linear-to-r from-blue-500 to-purple-500 ">
                <figure className="pl-5">
                    <img src={image} alt="" className="h-10" />
                </figure>

                <section className="flex justify-center gap-10 w-150">

                    <Link to={"/homepage"} className="text-white">
                        Home
                    </Link>

                    <Link to={"/createProduct"} className="text-white">
                        Create Product
                    </Link>

                    <Link to={""} className="text-white">
                            Create Category
                    </Link>

                    <Link to={""} className="text-white">
                            See historic
                    </Link>

                    <Link to={"/homepage/stockcontrol"} className="text-white">
                            Stock Control
                    </Link>

                    
                    

                </section>

                <section className="w-20">
                    <h1 className="text-white">Username: {username}</h1>
                </section>

                <section>
                    <Button 
                        typeButton="button" 
                        children={"logout"} 
                        bgButton={"bg-red-600"} 
                        heightButton={"h-10"} 
                        widhtButton={"w-30"}
                        onClickFuction={() => 
                            logout()}
                        textColor={"text-white"}
                        />
                </section>
            
            </section>
        </header>
        </>
    )
}

export default Header