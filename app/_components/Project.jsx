import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Project({ title, alt, image, description, url, techs }) {
    // Function to truncate the description text
    const truncateText = (text, length) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    return (
        <div className="relative border bg-background dark:bg-secondary rounded-lg shadow-base hover:shadow-xl transition-shadow duration-300 ease-in-out" 
             style={{ width: '280px', height: '330px' }}> 
            <div className="group cursor-pointer overflow-hidden">
                <img className="w-full object-cover rounded-lg transform transition-all duration-500 ease-in-out group-hover:scale-105" 
                     style={{ height: '180px' }} src={image} alt={alt} /> 

                <div className="p-4">
                    <Link href={url} passHref className="text-base font-bold  hover:text-primary">{title}</Link>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 mb-2">{truncateText(description, 100)}</p>

                    <div className="flex flex-wrap gap-2 mt-1 mb-4">
                        {techs.map((tech, index) => (
                            <Badge key={index} className="bg-primary text-white rounded-full px-3 py-1 text-xs font-medium shadow">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    {/* <Link href={url} passHref>
                        <a className="inline-block bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-2 text-sm transition-colors duration-300 ease-in-out">
                            View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
