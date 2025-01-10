import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import React from "react";
import { NavLink } from "react-router-dom";


export default function Home() {
  const { categories } = useContext(CategContext);
  console.log(categories);

  
  return (
    <>
      <div
        className="home bg-cover bg-center min-h-screen flex flex-col p-6"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dusfeoquh/image/upload/v1733399077/samples/landscapes/beach-boat.jpg')`,
        }}
      >
        {/* Welcome section */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to my blog</h1>
          <p className="text-lg">
            Discover categories and explore new content with us.
          </p>
        </div>

        
        <div className="flex flex-wrap justify-center gap-8 p-6">
          {categories &&
            categories.map((obj) => (
              <div
                key={obj.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <img
                  src={obj.photoUrl}
                  alt={obj.name || "Category image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <NavLink  to={'/posts?ctg='+obj.name}><h5 className="text-center">{obj.name}</h5></NavLink>
                  
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
