"use client";
import { Button } from "@/components/ui/button";
import Project from "./Project";
import { projects } from "@/lib/projects";
import { useState, useEffect } from "react";

// Mock project data based on your provided structure

export default function ProjectsSnip() {
    const [selectedTech, setSelectedTech] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const handleFilter = (tech) => {
        setSelectedTech(tech);
        if (tech) {
            setFilteredProjects(projects.filter(project => project.techs.includes(tech)));
        } else {
            setFilteredProjects(projects);
        }
    };

    return (
        <div className="md:px-20 lg:px-32 px-5">
            <div className="flex flex-wrap gap-2 mb-6 px-6 items-center justify-center">
                {["Express.js", "Nest.js", "GCP", "Flask", "PostgreSQL", "Docker"].map((tech) => (
                    <Button key={tech} onClick={() => handleFilter(tech)}
                            variant={selectedTech !== tech ? "secondary" : ""}
                            size="sm" className="rounded-full text-xs">
                        {tech}
                    </Button>
                ))}
            </div>
            <div className='flex flex-wrap mb-10 gap-5 items-center justify-center'>
                {filteredProjects.map((project, index) => (
                    <Project key={index} {...project} />
                ))}
            </div>
        </div>
    );
}
