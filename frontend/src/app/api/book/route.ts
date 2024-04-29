export type BookResponse = {
  id: string;
  title: string;
  author: string;
  description: string;
  language: string;
  images: {
    smallThumbnail: string;
    thumbnail: string;
  };
};

type BookVolume = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
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
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
    offers: {
      finskyOfferType: number;
      listPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      giftable: boolean;
    }[];
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
};

export const createBook = async (
  title: string,
  author: string[],
  publishedDate: string,
  description: string,
  language: string,
  smallThumbnail: string,
  thumbnail: string,
  userId: number
): Promise<BookResponse> => {
  const response = await fetch("http://localhost:8080/books", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title,
      author,
      publishedDate,
      description,
      language,
      smallThumbnail,
      thumbnail,
      userId,
    }),
  });

  const data = await response.json();
  console.log(data);

  return data;
};

export const findGoogleBook = async (): Promise<BookResponse[]> => {
  const response = await fetch("http://localhost:8080/books/external/api", {
    method: "GET",
  });

  const data = await response.json();

  return data;
};

export const findGoogleBookByParams = async (
  title: string,
  author: string
): Promise<BookResponse[]> => {
  const queryParams = new URLSearchParams({
    title: title,
    author: author,
    limit: "40",
  });

  const url = `http://localhost:8080/books/external/api/params?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
export const findGoogleBookDetails = async (
  id: string
): Promise<BookVolume> => {
  const url = `http://localhost:8080/books/external/api/params/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
