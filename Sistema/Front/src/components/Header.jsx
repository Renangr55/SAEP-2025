import { Link } from "react-router-dom"
import image from "../assets/image.png"


export const Header = () => {
    return (
        <>
        <header>
            <section className="flex justify-between items-center gap-4 w-full h-20 bg-linear-to-r from-blue-500 to-purple-500 ">
                <figure className="pl-5">
                    <img src={image} alt="" className="h-10" />
                </figure>

                <section className="flex justify-center gap-10 w-150">

                    <Link to={""} className="text-white">
                        Home
                    </Link>

                    <Link to={""} className="text-white">
                        Create Product
                    </Link>

                    <Link to={""} className="text-white">
                            Create Category
                    </Link>

                    <Link to={""} className="text-white">
                            See historic
                    </Link>

                </section>
            
            </section>
        </header>
        </>
    )
}

export default Header