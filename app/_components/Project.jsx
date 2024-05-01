import { Button } from "@/components/ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";


export default function Project({ title, alt, image, description, url }) {
    return (
        <div className="relative border bg-background dark:bg-secondary max-w-fit rounded-md grid place-content-center">
            <div className="relative p-1 cursor-pointer group overflow-hidden"> {/* Add overflow hidden to contain the scaling within the border */}
                <img className="w-full max-w-[340px] md:max-w-[300px] h-full rounded-md aspect-video transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={image} alt={alt} />
                {/* Hover effect overlay for description */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <div className="text-xs bg-secondary opacity-80 p-2 px-3 rounded text-center leading-tight">
                        {description}
                    </div>
                </div>
                {/* Always visible alt text at the bottom of the image */}
                <div className="absolute bottom-0 left-0 p-2 mb-2">
                <span className="text-xs dark:bg-secondary bg-background p-2 px-3 rounded">{alt}</span>
                </div>
        </div>
            <div className="flex items-center justify-between px-4 py-4 mt-[5px]">
                <h1 className="text-lg">{title}</h1>
                <Button size="sm">
                    <Link href={url || "/"} target="_blank" className="flex items-center gap-1 justify-center">view <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
            </div>
        </div>
    )
}