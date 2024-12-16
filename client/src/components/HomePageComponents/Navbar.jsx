"use client";
import Image from "next/image";
import { RiMenu3Fill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SignedIn, UserButton, useAuth, useUser } from "@clerk/nextjs";
import { FiLogIn } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";

const Navbar = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const isSignedIn = userId ? true : false;
  const [isToggle, setIstoggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        className={`py-5 fixed top-0 w-full flex items-center justify-between px-4 lg:px-20 z-[20] ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        } transition-colors duration-300 max-w-[1600px]`}
      >
        <div>
          <Link href="/">
            <img
              src="./images/logo.png"
              className="lg:h-[60px] lg:w-[200px] h-[40px] w-[150px]"
            />
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex items-center gap-6">
            <Link
              href="#home"
              className="hover:text-primary hover:font-bold transition-all cursor-pointer text-lg"
            >
              Home
            </Link>
            <Link
              href="#howitworks"
              className="hover:text-primary hover:font-bold transition-all cursor-pointer text-lg"
            >
              How it works
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary hover:font-bold transition-all cursor-pointer text-lg"
            >
              Review
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary hover:font-bold transition-all cursor-pointer text-lg"
            >
              Contact
            </Link>
            <Link
              href="#faq"
              className="hover:text-primary hover:font-bold transition-all cursor-pointer text-lg"
            >
              FAQ
            </Link>
          </ul>
        </div>
        <div className="lg:flex hidden">
          {isSignedIn ? (
            <div className="flex items-center gap-[10px]">
              {/* <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      rootBox: {
                        width: "40px",
                        height: "40px",
                        transform: "scale(1.2)",
                      },
                    },
                  }}
                />
              </SignedIn> */}
              <Link href="/dashboard">
                <button className={`${
                  isScrolled ? "bg-primary text-white" : "bg-white"
                } px-8 py-2 rounded-full flex items-center`}>
                  <p>Dashboard</p>
                  <MdOutlineNavigateNext />
                </button>
              </Link>
            </div>
          ) : (
            <Link href="/sign-in">
              <button
                className={`${
                  isScrolled ? "bg-primary text-white" : "bg-white"
                } px-8 py-2 rounded-full`}
              >
                Login
              </button>
            </Link>
          )}
        </div>

        <RiMenu3Fill
          size={"1.5rem"}
          className="lg:hidden"
          onClick={() => setIstoggle(!isToggle)}
        />

        {isToggle && (
          <div className="toggle-bar h-screen w-full md:w-1/2 bg-white shadow-xl absolute top-0 left-0 px-5 py-20 z-2">
            <ul className="text-lg">
              <li
                className="mb-[10px] px-4 py-2 hover:text-primary"
                onClick={() => setIstoggle(false)}
              >
                <a href="#home" className="flex items-center text-2xl">
                  <IoHome className="mr-5" />
                  Home
                </a>
              </li>
              <li
                className="mb-[10px] px-4 py-2 hover:text-primary"
                onClick={() => setIstoggle(false)}
              >
                <a href="#howitworks" className="flex items-center text-2xl">
                  <FaTools className="mr-5" />
                  How it works
                </a>
              </li>
              <li
                className="mb-[10px] px-4 py-2 hover:text-primary"
                onClick={() => setIstoggle(false)}
              >
                <a href="#testimonials" className="flex items-center text-2xl">
                  <FaStar className="mr-5" />
                  Reviews
                </a>
              </li>
              <li
                className="px-4 py-2 hover:text-primary"
                onClick={() => setIstoggle(false)}
              >
                <a href="#contact" className="flex items-center text-2xl">
                  <IoMdContact className="mr-5" />
                  Contact
                </a>
              </li>
            </ul>
            <div className="btn lg:justify-end lg:flex absolute bottom-10 left-[12%]">
              {isSignedIn ? (
                <div className="flex items-center gap-[10px]">
                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          rootBox: {
                            width: "40px",
                            height: "40px",
                            transform: "scale(1.2)", // Increases size
                          },
                        },
                      }}
                    />
                  </SignedIn>
                  <p className="text-xl font-semibold">{user?.username}</p>
                </div>
              ) : (
                <Link
                  href={"/sign-in"}
                  className={`${
                    isScrolled ? " text-black" : "bg-white"
                  } rounded-full text-2xl flex items-center`}
                >
                  <FiLogIn className="mr-5" />
                  Login
                </Link>
              )}
            </div>
            <IoMdClose
              className="absolute top-5 right-5 cursor-pointer"
              size={"2rem"}
              onClick={() => setIstoggle(!isToggle)}
            />
          </div>
        )}
      </nav>
      <Image
        className="banner-shape absolute top-0 right-0 -z-[1] lg:-top-28 w-full max-w-[20%] lg:max-w-[23%] lg:w-auto"
        src="images/banner-shape.svg"
        alt=""
        width={20}
        height={20}
      />
    </>
  );
};

export default Navbar;
