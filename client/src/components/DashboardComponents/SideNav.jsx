import { IoHome } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const SideNav = ({ isOpen, active, toggleNav }) => {
  const [activeBar, setActiveBar] = useState(active);
  const navItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: <IoHome size={"20px"} />,
      path: "/dashboard",
    },
    {
      id: "history",
      label: "History",
      icon: <LuHistory size={"20px"} />,
      path: "/history",
    },
    {
      id: "bookmark",
      label: "Bookmark",
      icon: <FaBookmark size={"20px"} />,
      path: "/bookmark",
    },
    {
      id: "support",
      label: "Support",
      icon: <BiSupport size={"20px"} />,
      path: "/support",
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: <LuCircleDollarSign size={"20px"} />,
      path: "/pricing",
    },
  ];
  return (
    <>
      <div className="w-[18%] h-full relative border-r-2 border-gray px-6 hidden lg:block">
        {navItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`my-[20px] px-[20px] py-[10px] rounded-lg cursor-pointer ${
                activeBar === item.id ? "bg-blue-700 text-white" : " text-black"
              }`}
              onClick={() => setActiveBar(item.id)}
            >
              <p className="flex items-center text-lg">
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </p>
            </div>
          </Link>
        ))}
        <Link href="/logout">
          <div className="absolute bottom-7 px-[20px] py-[10px] cursor-pointer">
            <p className="flex items-center text-lg">
              <MdLogout className="mr-[15px]" size={"20px"} />
              Logout
            </p>
          </div>
        </Link>
      </div>

      {isOpen && (
        <nav className="w-[100%] h-full top-0 pt-[40px] absolute left-0 bg-white z-[2] border-r border-gray-400 px-6">
          <IoMdClose
            className="absolute top-5 right-5 cursor-pointer"
            size={"2rem"}
            onClick={toggleNav}
          />
          <div className="flex justify-center w-full">
            <img
              src="./images/logo.png"
              className="lg:h-[50px] lg:w-[220px] h-[50px] w-[170px]"
            />
          </div>
          {navItems.map((item) => (
            <Link href={item.path} key={item.id} onClick={toggleNav}>
              <div
                key={item.id}
                className={`my-[20px] px-[20px] py-[10px] rounded-lg cursor-pointer ${
                  activeBar === item.id
                    ? "bg-blue-700 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveBar(item.id)}
              >
                <p className="flex items-center text-lg">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </p>
              </div>
            </Link>
          ))}
          <div className="absolute bottom-7 px-[20px] py-[10px] cursor-pointer">
            <p className="flex items-center text-lg">
              <MdLogout className="mr-[15px]" size={"20px"} />
              Logout
            </p>
          </div>
        </nav>
      )}
    </>
  );
};

export default SideNav;
