import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Afficher toutes les pages si moins de maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);

      // Calculer les pages autour de la page actuelle
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Ajuster si on est proche du début
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }

      // Ajuster si on est proche de la fin
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Ajouter des ellipses si nécessaire
      if (start > 2) {
        pages.push("...");
      }

      // Ajouter les pages autour de la page actuelle
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Ajouter des ellipses si nécessaire
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Toujours afficher la dernière page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-button-prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        <span>‹</span>
      </button>

      <div className="pagination-pages">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              className={`pagination-button pagination-button-page ${
                isActive ? "active" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        className="pagination-button pagination-button-next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        <span>›</span>
      </button>
    </div>
  );
};

export default Pagination;

