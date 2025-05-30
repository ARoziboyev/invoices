import { useState, useEffect } from "react";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import logoImeg from "../assets/Logo_icon.svg";
import user from "../assets/user.imeg.png";

function SideBar() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen md:z-[999] lg:block">
        <div className="w-[103px] h-[100vh] bg-[#373B53] rounded-tr-[20px] rounded-br-[20px] flex flex-col items-center justify-between overflow-hidden">
          <div className="rounded-tr-[20px] flex justify-center w-full">
            <img src={logoImeg} alt="logo"  className="w-full md:h-full" />
          </div>

          <div className="flex flex-col items-center w-full gap-[30px] mb-6">
            <button
              onClick={() => setDark(!dark)}
              className="p-3 hover:bg-[#494E6E] rounded-full transition-colors">
              <img
                src={dark ? sun : moon}
                alt="theme"
                className="w-6 h-6 filter brightness-150"
              />
            </button>

            <div className="w-full flex justify-center pt-8 border-t border-[#494E6E]">
              <div className="p-1 rounded-full border-2 border-[#494E6E]">
                <img
                  src={user}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full h-[72px] bg-[#373B53] fixed top-0 left-0 flex items-center justify-between px-4 z-50">
        <img src={logoImeg} alt="logo" className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 hover:bg-[#494E6E] rounded-full transition-colors">
            <img
              src={dark ? sun : moon}
              alt="theme"
              className="w-6 h-6 filter brightness-150"
            />
          </button>
          <div className="p-1 rounded-full border-2 border-[#494E6E]">
            <img
              src={user}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
