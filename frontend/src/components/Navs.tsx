import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, useGSAP);

const menu = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Contact", link: "/contact" },
];

export default function Navs() {
  const container = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLAnchorElement>(".menu-item");

      // Place underline on first item initially
      links[0].appendChild(underline.current!);

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          const state = Flip.getState(underline.current!);

          link.appendChild(underline.current!);

          Flip.from(state, {
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <nav ref={container} className="flex gap-8">
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className="relative pb-2 font-mono text-lg text-slate-300 transition-colors duration-300 hover:text-green-500 menu-item"
        >
          {item.name}
        </Link>
      ))}

      <span
        ref={underline}
        className="absolute left-0 bottom-0 h-0.5 w-full bg-green-500 transition-colors duration-300"
      />
    </nav>
  );
}
