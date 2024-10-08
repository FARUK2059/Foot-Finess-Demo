"use client"
import { CartContext } from "@/providers/CartProvider";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface Shoe {
    _id: string; 
    id: number;
    category: string;
    shoeName: string;
    price: number;
    discountPrice: number;
    shortDescription: string;
    rating: number;
    image: string;
  }

const WishListCards = () => {
    const [shoes, setShoes] = useState<Shoe[]>([])
    const {addCart}:any = useContext(CartContext)
    const session =useSession()
    const getShoes = async() => {
        const res = await axios.get('http://localhost:3000/api/wishlist')
        setShoes(res.data);
    }
    useEffect(() => {
        getShoes()
    }, [])
    const handleDelete=async(id:any)=>{
        //console.log(id)
        const newId ={id}
        console.log(newId)
        const res = await axios.delete('http://localhost:3000/api/wishlistDelete',{data:newId})
         console.log(res.data)
        if(res.data.deletedCount>0){
            getShoes()
            toast.success('You have successfully deleted a shoe!!')
        }
        else{
            toast.error("Something went wrong!!")
        }
    }
    return (
        <div><h3 className='text-3xl font-semibold text-center'>You Have {shoes?.length} Items in Wishlist</h3> <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {
              session.status==='authenticated' &&  shoes?.map((shoe) => ( 
                    <div key={shoe._id} className=" group relative cursor-zoom-in">
                        <div className="z-0 border opacity-0 group-hover:opacity-100 border-black group-hover:scale-110 scale-100 transition-all duration-1000 w-full h-full absolute"></div>
                        <div className="z-10">       
                            <div className="w-full h-64 bg-cover relative">
                                <Image src={shoe.image} alt={shoe.shoeName} layout="fill"  objectFit="cover" className="w-full"/>
                            </div>
                            <h3 className="text-sm  z-10 mt-5 duration-300 hover:text-[#DF2626]">{shoe.category}</h3>
                            <h3 className="cursor-pointer z-50 text-base font-semibold duration-300 w-fit hover:text-[#DF2626]">{shoe.shoeName}</h3>
                            <div className="flex mt-2 gap-1 items-end">
                                <p className="text-xl text-[#DF2626] font-bold">${shoe.discountPrice}</p>
                                <p className="text-base font-bold line-through italic">${shoe.price}</p>
                            </div>
                            <div className="font-medium flex items-center mt-5 scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                                <button onClick={() =>addCart(shoe)} className="border-black shadow-2xl z-10 border rounded-[4px] mr-2 leading-4 hover:border-[#DF2626] duration-500 px-6 py-2 hover:bg-[#DF2626] text-black hover:text-white">ADD TO  <span className="block">CART</span></button>
                                <button onClick={()=>handleDelete(shoe.id)} className="bg-black z-10 shadow-2xl  text-white hover:bg-[#DF2626] hover:text-white duration-500 px-6 py-2 rounded-[4px] hover:shadow-lg">REMOVE</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div></div>
       
    );
};

export default WishListCards;