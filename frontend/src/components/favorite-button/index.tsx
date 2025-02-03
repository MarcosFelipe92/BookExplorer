"use client";

import { createBook } from "@/actions/book/book-actions";
import { Author } from "@/actions/book/types";
import { Heart, HeartStraight } from "phosphor-react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite
          ? "Livro removido dos favoritos"
          : "Livro adicionado aos favoritos"
      );
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {isFavorite ? (
        <Heart size={32} color="#eab308" weight="fill" />
      ) : (
        <HeartStraight size={32} color="gray" weight="regular" />
      )}
    </button>
  );
};
