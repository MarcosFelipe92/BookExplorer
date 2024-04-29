"use client";

import { createBook } from "@/app/api/book/route";
import { Heart } from "phosphor-react";

type FavoritesButtonProps = {
  className?: string;
  book: {
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
        type: string;
        identifier: string;
      }[];
      readingModes: {
        text: boolean;
        image: boolean;
      };
      pageCount: number;
      printedPageCount: number;
      dimensions: {
        height: string;
      };
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
        small: string;
        medium: string;
        large: string;
        extraLarge: string;
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    userId: number;
  };
};

export const FavoritesButton = ({ className, book }: FavoritesButtonProps) => {
  return (
    <button
      className={className}
      onClick={() =>
        createBook(
          book.volumeInfo.title,
          book.volumeInfo.authors,
          book.volumeInfo.publishedDate,
          book.volumeInfo.description,
          book.volumeInfo.language,
          book.volumeInfo.imageLinks.smallThumbnail,
          book.volumeInfo.imageLinks.thumbnail,
          book.userId
        )
      }
    >
      Favoritos
      <Heart />
    </button>
  );
};
