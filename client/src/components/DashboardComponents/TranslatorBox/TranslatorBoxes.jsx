import { FaArrowRightArrowLeft } from "react-icons/fa6";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

const TranslatorBoxes = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-[40px] lg:px-[55px]">
        <div className="flex flex-col items-center gap-[20px] justify-center relative sm:flex-row w-full">
          <InputBox />
          <FaArrowRightArrowLeft
            size={"40px"}
            className="absolute top-[48%] sm:left-[47%] md:left-[48%] sm:top-[20px] text-white bg-secondary p-2 rounded-full"
          />
          <OutputBox />
        </div>
        <button className="bg-secondary text-white py-3 rounded-lg w-full my-[20px]">
          Translate
        </button>
      </div>
    </>
  );
};

export default TranslatorBoxes;
