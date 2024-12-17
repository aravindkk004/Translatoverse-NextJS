import languages from "@/utils/language";
import { useState } from "react";
import { FaRegBookmark, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaFacebook, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const OutputBox = ({ translatedText, selectedLanguage, languageChange }) => {
  const [showShareModal, setShowShareModel] = useState(false);

  return (
    <>
      <div className="p-[15px] bg-zinc-200 rounded-xl sm:w-[50%] w-[90%]">
        <div className="flex items-center">
          <p className="mr-[10px]">From:</p>
          <div className="flex items-center bg-white rounded-full px-[15px] w-[80%]">
            <TbWorld size={"25px"} />
            <select
              className="w-[100%] p-[10px] rounded-full relative h-[50px] outline-none font-bold"
              value={selectedLanguage}
              onChange={languageChange}
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* output text area  */}
        <div className="bg-white mt-[20px] w-full h-[300px] resize-none rounded-lg outline-none p-[13px] overflow-y-scroll overflow-hidden">{translatedText || ""}</div>
        {/* download and copy options */}
        <div className="flex items-center mt-[10px] text-white justify-between">
          <div className="flex bg-secondary px-[10px] py-[5px] items-center rounded-full">
            <p className="cursor-pointer text-sm md:text-base">Download</p>
            <div>
              <select className="w-[100%] bg-secondary sm:px-[5px] rounded-full py-[5px] outline-none text-sm md:text-base">
                <option value="pdf" className="bg-white text-black">
                  (.pdf)
                </option>
                <option value="png" className="bg-white text-black">
                  (.png)
                </option>
                <option value="mp3" className="bg-white text-black">
                  (.mp3)
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="cursor-pointer bg-white p-2 rounded-full hover:bg-secondary">
              <IoShareSocialOutline
                className="text-black hover:text-white"
                size={20}
                onClick={() => setShowShareModel(!showShareModal)}
              />
            </div>
            <div className="cursor-pointer bg-white p-2 rounded-full hover:bg-secondary">
              <FaRegBookmark
                className="text-black hover:text-white"
                size={20}
              />
            </div>
            <div className="cursor-pointer bg-white p-2 rounded-full hover:bg-secondary">
              <MdContentCopy
                className="text-black hover:text-white"
                size={20}
              />
            </div>
          </div>
        </div>

        <hr className="border-white border-t-4 my-[10px] -ml-[15px] w-[106%]" />
        {/* rate the translation section */}
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="font-bold my-[10px]">Rate this translation...</h2>
          <div className="flex gap-[20px] items-center bg-white rounded-full px-[15px] py-[10px] cursor-pointer">
            <div className="bg-[#f7f7f7] px-[10px] py-[7px] rounded-2xl flex items-center">
              <FaThumbsUp className="text-yellow-300" size={"20px"} />
            </div>
            <FaThumbsDown className="text-yellow-300" size={"20px"} />
          </div>
        </div>

        {/* share options  */}
        {showShareModal && (
          <>
            <div className="bg-white p-4 rounded-3xl absolute top-[435px] right-[100px]">
              <div className="flex gap-[20px] items-center justify-center">
                <FacebookShareButton url={window.location.href} quote={""}>
                  <FaFacebook size={25} color="blue" />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href} title={""}>
                  <FaXTwitter size={25} />
                </TwitterShareButton>
                <LinkedinShareButton url={window.location.href} summary={""}>
                  <FaLinkedinIn className="text-blue-800 " size={25} />
                </LinkedinShareButton>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OutputBox;
