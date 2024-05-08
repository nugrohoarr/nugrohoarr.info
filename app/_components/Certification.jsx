
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
    <div className="relative grid place-content-center py-12 px-4 sm:py-12 sm:px-6">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {currentItems.map((item, index) => (
          <Card key={index} className="border bg-background dark:bg-secondary w-60 md:w-86"> {/* Adjusted width for smaller cards */}
            <CardContent className="flex flex-col items-center justify-center p-1 sm:p-3"> {/* Reduced padding */}
              <img src={item.image} alt={item.title} className="w-3/4 sm:w-full h-auto mb-2"/>
              <p className="text-xs text-center">{item.description}</p>
              <a href={item.credential || "/"} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary mt-5">
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


