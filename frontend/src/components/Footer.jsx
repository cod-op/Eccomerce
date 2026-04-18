import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
            aspernatur voluptas nam neque voluptates mollitia esse quos error
            soluta consectetur sequi est sed aliquid cumque nulla, culpa, quae
            corrupti porro.
          </p>
        </div>

        <div>
          <p className="text-xl font-normal text-gray-500 mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
            <li
              onClick={() => window.open("http://localhost:5175", "_blank")}
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium mt-2"
            >
              Admin Panel
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-normal text-gray-500 mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-465-7890</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ forever.com-All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
