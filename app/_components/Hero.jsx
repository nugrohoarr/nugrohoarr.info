import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { TbBrandGmail } from "react-icons/tb";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className='relative grid place-content-center py-20 px-6'>
            <div className='md:max-w-2xl max-w-md text-center grid gap-1'>
                <h1 className='md:text-4xl lg:text-5xl text-3xl font-bold'>
                    Hi, I am <span className='underline underline-offset-4 text-primary'>Nugroho</span> a Software Development<span className='text-primary'>.</span>
                </h1>
                <p className='text-[0.8rem] max-w-md mx-auto'>
                A comprehensive showcase of my software development skills, experiences, and projects, highlighting my expertise and dedication to the craft of coding.<span className='text-primary'>.</span>
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                    <Link href="https://github.com/nugrohoarr" className="hover:text-primary"><GitHubLogoIcon className="h-6 w-6" /></Link>
                    <Link href="https://www.linkedin.com/in/nugroho-ar/" className="hover:text-primary"><LinkedInLogoIcon className="h-6 w-6" /></Link>
                    <Link href="https://www.instagram.com/nugroho.ar__/" className="hover:text-primary"><InstagramLogoIcon className="h-7 w-6" /></Link>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 mt-5'>
                <Button asChild variant="outline">
                    <Link href="/">Explore</Link>
                </Button>
                <Button asChild className="flex gap-1 items-center justify-center">
                    <Link href="https://drive.google.com/file/d/1sIfMHZVcYuPW5eNQEI-L3Qt_WJM2do0j/view?usp=sharing" >Download CV</Link>
                </Button>
            </div>
        </section>
    )
}