import Link from "next/link";
import Logo from "./Logo";
import Social from "./Social";
import { ModeToggle } from "./ModeToggle";

export default function Footer() {
    return (
        <footer className="grid gap-3 md:px-20 lg:px-32 px-8 py-10">
            <div className="flex justify-between">
                <div>
                    <Logo />
                </div>
                <ModeToggle/>
            </div>
            <div className="flex flex-col items-center w-full">
                <Social />
            </div>
            <p className="text-xs text-center">
                    Built by 💖, available on 
                    <a href="https://github.com/nugrohoarr" className="hover:underline hover:text-primary mt-"> GitHub</a>
                    <span className="text-primary">.</span>
                </p>
            <p className="text-xs text-center">
                © {new Date().getFullYear()} 
                <a href="https://github.com/nugrohoarr" className="hover:underline hover:text-primary"> Nugroho AR </a> 
                All Rights Reserved.
            </p>
        </footer>
    )
}