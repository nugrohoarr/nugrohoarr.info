import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TbBrandGmail } from "react-icons/tb";

export default function Social() {
    return (
        <div className="flex gap-2 items-center -ml-1 bg-secondary rounded-full p-2 w-fit">
            <Link href="https://github.com/nugrohoarr" className="hover:text-primary"><GitHubLogoIcon className="h-5 w-5" /></Link>
            <Link href="https://www.linkedin.com/in/nugroho-ar/" className="hover:text-primary"><LinkedInLogoIcon className="h-5 w-5" /></Link>
            <Link href="https://www.instagram.com/nugroho.ar__/" className="hover:text-primary"><InstagramLogoIcon className="h-5 w-5" /></Link>
            <Link href="mailto:mit.shuki23@gmail.com" className="hover:text-primary"><TbBrandGmail className="h-5 w-5" /></Link>
        </div>
    )
}