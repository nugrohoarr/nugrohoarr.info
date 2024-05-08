
"use client";
import * as React from "react";
import { useState } from "react";
import { certicate } from "@/lib/certificates";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";


export function Certification() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(certicate.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = certicate.slice(startIndex, endIndex);

  // Handler for previous button
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler for next button
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-2">
        {currentItems.map((item, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg" style={{ width: '280px' }}>
            <CardContent className="flex flex-col items-center p-4">
              <img src={item.image} alt={item.title} className="w-full h-40  rounded-t-lg"/>
              <div className="text-center mt-3">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <a href={item.credential || "/"} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-primary text-sm">
                View Credential
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent className="mt-3">
          <PaginationItem >
            <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} className={i + 1 === currentPage ? 'text-primary' : ''}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}


