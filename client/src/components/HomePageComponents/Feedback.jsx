"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus(true); 
  
    try {
      const response = await axios.post("/api/send-mail/", {
        text: message,
        userEmail: email,
        userName: name
      });
  
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send email.");
    } finally {
      setStatus(false); 
    }
  };
  

  return (
    <>
      <section id="contact" className="w-full py-[120px] max-w-[1600px]">
        <h2 className="lg:text-4xl text-3xl font-bold text-center my-10">
          Get in Touch with us
        </h2>
        <div className="w-full lg:flex items-center justify-between">
          <div className="lg:w-1/2 w-full flex justify-center items-center">
            <form
              className="flex flex-col p-3 sm:w-[80%] w-[95%]"
              onSubmit={sendEmail} 
            >
              <label className="font-semibold text-lg mb-2">Your Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="rounded-lg border border-gray px-5 py-2 focus:border-[#fe6044] outline-none"
              />
              <label className="font-semibold text-lg mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="rounded-lg border border-gray px-5 py-2 focus:border-[#fe6044] outline-none"
              />
              <label className="font-semibold text-lg mb-2">Your Message</label>
              <textarea
                placeholder="Enter your message here."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="border rounded-lg border-gray p-2 resize-none h-[150px] focus:border-[#fe6044] outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-5 py-3 text-lg text-semibold my-7 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <img src="./images/translator.png" alt="feedback image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
