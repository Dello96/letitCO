export type AldBook = {
  adult?: boolean;
  author: string;
  categoryId?: number;
  categoryName: string;
  cover: string;
  customerReviewRank?: number;
  description: string;
  fixedPrice?: boolean;
  isbn: string;
  isbn13: string;
  itemId?: number;
  link: string;
  mallType?: string;
  mileage?: number;
  priceSales?: number;
  priceStandard?: number;
  pubDate: string;
  publisher: string;
  salesPoint?: number;
  stockStatus?: string;
  subInfo?: string;
  title: string;
};

export type AldDetail = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice?: boolean;
  customerReviewRank: number;
  subInfo?: {
    ebookList: [];
    usedList: {
      aladinUsed: {
        itemCount: number;
        minPrice: number;
        link: string;
      };
      userUsed: {
        itemCount: number;
        minPrice: number;
        link: string;
      };
      spaceUsed: {
        itemCount: number;
        minPrice: number;
        link: string;
      };
    };
    subTitle: string;
    originalTitle: string;
    itemPage: number;
  };
  startDate?: string;
  DoneDate?: string;
};

export type Book = {
  id?: string;
  title?: string;
  author?: string;
  page?: number;
  cover?: string;
  description?: string;
  pubDate?: string;
  publisher?: string;
  isReading?: boolean;
  isMarked?: boolean;
  isbn?: string;
  isbn13?: string;
  createdAt?: string;
  updatedPages?: number;
  readUpto?: number;
  category?: string;
};

export type Memo = {
  id?: string;
  content?: string;
  uid?: string;
  bookId?: string;
  isEditing?: boolean;
  editingText?: string;
  timeStamp?: number;
};
 