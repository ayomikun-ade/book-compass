import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const bookTool = createTool({
  id: "get-book-or-author",
  description: "Search Google Books API for book or author data",
  inputSchema: z.object({
    query: z.string().describe("Book title or author name"),
  }),
  outputSchema: z.object({
    title: z.string().optional(),
    authors: z.array(z.string()).optional(),
    description: z.string().optional(),
    publishedDate: z.string().optional(),
    previewLink: z.string().optional(),
  }),
  execute: async ({ context }) => {
    return await getBookData(context.query);
  },
});

const getBookData = async (searchQuery: string) => {
  const bookAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchQuery
  )}`;
  const response = await fetch(bookAPIUrl);
  const data = await response.json();

  if (!data.items?.[0]) {
    throw new Error(`No results found for '${searchQuery}'`);
  }

  const info = data.items[0].volumeInfo;

  return {
    title: info.title,
    authors: info.authors,
    description: info.description,
    publishedDate: info.publishedDate,
    previewLink: info.previewLink,
  };
};

export const authorBooksTool = createTool({
  id: "get-author-books",
  description: "Get top N books by an author using Google Books API",
  inputSchema: z.object({
    author: z.string().describe("Author name"),
    limit: z.number().default(5).describe("Max number of books to return"),
  }),
  outputSchema: z.object({
    books: z.array(
      z.object({
        title: z.string(),
        publishedDate: z.string().optional(),
        previewLink: z.string().optional(),
        thumbnail: z.string().optional(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await getAuthorBooks(context.author, context.limit);
  },
});

const getAuthorBooks = async (author: string, limit: number) => {
  // search with inauthor filter → more accurate
  const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
    author
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error(`No books found for author '${author}'`);
  }

  // sort by published date descending
  const sorted = data.items.sort((a: any, b: any) => {
    const da = a.volumeInfo.publishedDate
      ? new Date(a.volumeInfo.publishedDate).getTime()
      : 0;
    const db = b.volumeInfo.publishedDate
      ? new Date(b.volumeInfo.publishedDate).getTime()
      : 0;
    return db - da;
  });

  const sliced = sorted.slice(0, limit);

  return {
    books: sliced.map((item: any) => ({
      title: item.volumeInfo.title,
      publishedDate: item.volumeInfo.publishedDate,
      previewLink: item.volumeInfo.previewLink,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    })),
  };
};

export const similarBooksTool = createTool({
  id: "get-similar-books",
  description:
    "Get similar books by searching Google Books API using related keywords",
  inputSchema: z.object({
    terms: z
      .array(z.string())
      .describe("keywords / tags extracted from original book"),
    limit: z.number().default(5),
  }),
  outputSchema: z.object({
    books: z.array(
      z.object({
        title: z.string(),
        authors: z.array(z.string()).optional(),
        publishedDate: z.string().optional(),
        previewLink: z.string().optional(),
        thumbnail: z.string().optional(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await getSimilarBooks(context.terms, context.limit);
  },
});

const getSimilarBooks = async (terms: string[], limit: number) => {
  // join terms into a query — e.g. ["space", "politics"] → "space+politics"
  const query = terms.map((t) => encodeURIComponent(t)).join("+");

  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error(`No similar books found for '${terms.join(", ")}'`);
  }

  const sliced = data.items.slice(0, limit);

  return {
    books: sliced.map((item: any) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      publishedDate: item.volumeInfo.publishedDate,
      previewLink: item.volumeInfo.previewLink,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    })),
  };
};
