"use client";

import { Suspense, useState, useEffect } from "react"; 
import Image from "next/image";
import Loading from "@/app/loading";
import { CategorySection } from "./CategorySection";

const HeroSection = () => {
    const [categories, setCategories] = useState([]); // State to hold categories data
    const [loading, setLoading] = useState(true); // State for loading state
    const [error, setError] = useState(null); // State for error handling

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch categories data from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://api.shope.com.bd/api/v1/public/hero-categories");
                const data = await response.json();
                setCategories(data); // Assuming the response has a 'categories' field
                setLoading(false); // Set loading to false when data is fetched
            } catch (err) {
                console.error("Error fetching categories:", err);
           
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    let height = "325px";
    let top = "88px";

    if (windowWidth >= 1920) {
        height = "394px";
        top = "94px";
    } else if (windowWidth >= 1600) {
        height = "370px";
        top = "92px";
    } else if (windowWidth >= 1440) {
        height = "364px";
        top = "90px";
    } else if (windowWidth >= 976) {
        height = "340px";
        top = "90px";
    }

    if (loading) {
        return <Loading />; // Show loading spinner while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there was an issue fetching the data
    }

    return (
        <div 
        style={{
            position: "relative",
          
        }}>
            <Suspense fallback={<Loading />}>
                {/* Hero Image */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: height,
                        top: top,
                    }}
                >
                    <Image
                        src="/hero.png"
                        alt="Hero Image"
                        sizes="100vw"
                        fill
                        style={{
                            objectFit: "cover",
                        }}
                    />
                    <div  style={{
                        position: "absolute",
                        top:'0'
                        
                       
                    }}>
                           <CategorySection categories={categories} />
                        </div>
                 
                </div>
            </Suspense>
        </div>
    );
};

export default HeroSection;
