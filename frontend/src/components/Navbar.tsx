import { Link, NavLink, useLocation } from "react-router-dom";
import Resume from "./Resume";
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// utils
import { useCurrentUser } from "../utils/useCurrentUser";

// context
import { ThemeContext } from "../context/ThemeContext";

// components
import Login from "./Login";

gsap.registerPlugin(Flip, useGSAP);

type Menu = {
  name: string;
  link: string;
};

const menu: Menu[] = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Contact", link: "/contact" },
];

export default function Navbar() {
  // get the user info after successfully login
  const { data: user } = useCurrentUser();
  // const username = user?.username?.split(" ")[0] || "User";

  const { theme, toggleTheme } = useContext(ThemeContext);

  const container = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // set the title of the page
  // const pageTitle = 

  // // set the title of the page
  // if (pageTitle) {
  //   document.title = pageTitle;
  // }

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const moveUnderline = (target: HTMLAnchorElement) => {
    if (!underline.current) return;

    const state = Flip.getState(underline.current);

    target.appendChild(underline.current);

    Flip.from(state, {
      duration: 0.35,
      absolute: true,
      ease: "power2.out",
    });
  };

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    moveUnderline(e.currentTarget);
  };

  const handleLeave = () => {
    const active = container.current?.querySelector(
      ".menu-item.active",
    ) as HTMLAnchorElement | null;

    if (active) {
      moveUnderline(active);
    }
  };

  useGSAP(
    () => {
      const active = container.current?.querySelector(
        ".menu-item.active",
      ) as HTMLAnchorElement | null;

      if (active) {
        active.appendChild(underline.current!);
      } else {
        moveUnderline(container.current!.querySelector(".menu-item")!);
      }
    },
    {
      scope: container,
      dependencies: [location.pathname],
    },
  );

  function handleOpenResume(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setResumeOpen((prev) => !prev);
  }

  function handleOpenLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoginOpen((prev) => !prev);
  }

  // function handleCloseMenu(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   setShowMenu((prev) => !prev);
  // }

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

  function closeMenu() {
    setShowMenu(false);
  }

  return (
    <>
      <header className={`mx-auto max-w-7xl fixed top-0 left-0 right-0 mt-10 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full mt-0!"}`}>
        <div className={`flex flex-row justify-between items-center bg-slate-600/20 dark:bg-amber-50 border-slate-400 backdrop-blur-2xl py-5 px-5 relative z-100 ${showMenu ? "active_dropdown_menu rounded-t-[40px]" : "active_dropdown_menu_hide rounded-full"}`}>
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,120,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,120,0.08)_1px,transparent_1px)] bg-size-[40px_40px] z-[-1]" />
          <div className="font-sora font-xbold uppercase text-2xl sm:text-3xl md:text-4xl text-green-400">
            <Link to="/">{`<GCodes>`}</Link>
          </div>
          <div className="flex flex-row items-center gap-5">
            <nav
              ref={container}
              onMouseLeave={handleLeave}
              className="flex flex-row gap-4 text-amber-50 dark:text-slate-900 uppercase tracking-widest font-medium text-fsize4 hidden md:flex"
            >
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  end={item.link === "/"}
                  onMouseEnter={handleHover}
                  className={({ isActive }) =>
                    `relative py-2 menu-item ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <span
                ref={underline}
                className="absolute left-0 bottom-0 h-[2px] w-full bg-green-500"
              />
            </nav>
            {!user ? (
              <button
                onClick={(e) => handleOpenLogin(e)}
                className="bg-white dark:bg-green-400 hover:bg-green-400 text-slate-700 hover:text-white transition font-bold py-2 px-6 rounded-full font-roboto uppercase tracking-widest cursor-pointer"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => handleOpenResume(e)}
                  className="bg-white font-mono text-slate-700 dark:bg-green-400 dark:text-white hover:bg-green-400 hover:text-white transition font-bold py-2 px-6 rounded-full uppercase tracking-widest cursor-pointer hidden md:flex"
                >
                  Resume
                </button>

                <button
                  onClick={toggleTheme}
                  className="text-white dark:text-slate-800 hover:text-green-500 dark:hover:text-green-500 transition font-bold py-2 rounded-full font-roboto uppercase tracking-widest cursor-pointer hidden md:flex"
                >
                  {theme === "light" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon preview-icon">
                      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun preview-icon">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  )}
                </button>   
              </>
            )}

                  {/* <button className="md:hidden" onClick={(e) => handleCloseMenu(e)}>
              <span>☰</span>
            </button> */}

            <button
                  onClick={toggleTheme}
                  className="text-white dark:text-slate-800 hover:text-green-500 dark:hover:text-green-500 transition font-bold py-2 rounded-full font-roboto uppercase tracking-widest cursor-pointer md:hidden md:flex"
                >
                  {theme === "light" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon preview-icon">
                      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun preview-icon">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  )}
                </button>

            <button
              type="button"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={toggleMenu}
              aria-label={showMenu ? "Close menu" : "Open menu"}
              aria-expanded={showMenu}
            >
              <span
                className={`h-0.5 w-6 bg-green-500 transition-all duration-300 ${showMenu ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-6 bg-green-500 transition-all duration-300 ${showMenu ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-6 bg-green-500 transition-all duration-300 ${showMenu ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* slid mobile menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 ${showMenu ? "block rounded-b-[40px]" : "hidden"}`}>
          <nav className="flex flex-col text-inter gap-4 text-white uppercase tracking-widest font-medium text-fsize4 px-5 py-5">
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                end={item.link === "/"}
                onClick={() => closeMenu()}
                className={({ isActive }) =>
                  `relative py-1 menu-item text-center ${isActive ? "active text-green-500" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Resume resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </>
  );
}
