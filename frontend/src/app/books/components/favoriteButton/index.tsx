"use client";

import { createBook } from "@/app/api/book/route";
import { Author } from "@/app/api/book/types";
import { Heart } from "phosphor-react";
import toast, { Toaster } from "react-hot-toast";

type FavoritesButtonProps = {
  className?: string;
  book: {
    id: string;
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
  const authors = book.volumeInfo.authors?.map((author) => ({
    name: author,
  })) as Author[];

  const handleClick = async () => {
    const res = await createBook(
      book.id,
      book.volumeInfo.title,
      authors,
      book.volumeInfo.publishedDate,
      book.volumeInfo.description,
      book.volumeInfo.language,
      book.volumeInfo.imageLinks.smallThumbnail,
      book.volumeInfo.imageLinks.thumbnail,
      book.userId
    );
    if (res) {
      toast.success("Livro adicionado aos favoritos");
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      <Toaster />
      <Heart />
    </button>
  );
};
