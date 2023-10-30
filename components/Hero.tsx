"use client";

import Image from "next/image";
import heroImage from "../public/Hero_image.webp";

export default function Hero() {
  return (
    <div className="container mx-auto pt-16 flex justify-evenly flex-col sm:flex-col lg:flex-row xs:items-center sm:items-center md:items-center">
      <div className="flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-bold text-primary">
          Manage documents: <br />
          <span className="text-accent">The simple way</span>
        </h2>
        <p className="text-lg pt-4 max-w-2xl">
          Welcome to Dokke! Where simplicity meets productivity. Streamline your
          workflow and focus on your content, while using the simplest tool on
          the web.
        </p>
      </div>
      <Image
        src={heroImage}
        width={600}
        height={600}
        alt="Hero image of man sitting on documents"
        priority
      />
    </div>
  );
}
