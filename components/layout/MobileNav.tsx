import React from "react";

const MobileNav = () => {
  return (
    <div>
      <nav>
        <ul className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-800 text-white">
          <li>
            <a href="#home" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
