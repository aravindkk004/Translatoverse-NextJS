import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section id="home" className="pt-[130px] pb-[70px] px-[40px]">
      <div className="max-w-[1500px] lg:flex items-center justify-between">
        <div className="lg:w-1/2 w-full">
          <h2 className="lg:text-5xl text-3xl font-bold">
            Empower Global Connections: Translate with Ease!
          </h2>
          <p className="lg:text-xl text-lg text-gray mt-5">
            Translate text, PDFs, images, and voice to Indian languages
            seamlessly. Break language barriers with ease using TranslatoVerse.
          </p>
          <Link href="/dashboard">
            <button className="bg-primary px-7 py-2 rounded-full text-white mt-3">
              Get started
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img src="./images/hero-img.png" className="lg:h-[450px] h-[350px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
