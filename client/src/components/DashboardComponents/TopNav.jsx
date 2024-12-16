import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { RiMenu3Fill } from "react-icons/ri";

const TopNav = ({toggleNav}) => {
  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-[#D4D4D8] p-3">
        <div>
          <img
            src="./images/logo.png"
            className="lg:h-[50px] lg:w-[220px] h-[40px] w-[150px]"
          />
        </div>
        <div className="flex items-center gap-[20px]">
          <SignedIn>
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
          </SignedIn>
          <RiMenu3Fill size={"1.5rem"} className="lg:hidden" onClick={toggleNav}/>
        </div>
      </div>
    </>
  );
};

export default TopNav;
