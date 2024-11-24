"use client";

import { Suspense, useState, useEffect } from "react"; 
import CategorySection from "@/Component/CategorySection";
import Image from "next/image";
import Loading from "@/app/loading";

const HeroSection = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
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

    return (
        <div>
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
                         
                         <CategorySection />
                </div>
          

            </Suspense>
        </div>
    );
};

export default HeroSection;
