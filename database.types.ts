export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
      Tables: {
        books: {
          Row: {
            id: string; 
            createdAt: string; 
            title: string;
            author: string;
            page: number; 
            isReading: boolean; 
            isMarked: boolean;
            pubDate: string; 
            description: string;
            cover: string;
            publisher: string;
            isbn: string;
          };
          Insert: {
            id?: never;     //옵셔널 체이닝 - 선택적으로 제공
            createdAt?: never; 
            title: string;
            author: string;
            page?: number; 
            isReading?: boolean; 
            isMarked?: boolean; 
            pubDate?: string;
            description?: string;
            cover?: string;
            publisher?: string;
            isbn?: string;
            memo?: string;
          };
          Update: {
            id?: never; // id는 변경불가
            createdAt?: never; // createdAt 변경 불가ㅓ
            title?: string;
            author?: string;
            page?: number;
            isReading?: boolean;
            isMarked?: boolean;
            pubDate?: string;
            description?: string;
            cover?: string;
            publisher?: string;
            isbn?: string;
            memo?: string;
          };
        };
      };
    };
  }
  