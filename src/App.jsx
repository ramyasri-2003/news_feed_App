import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";
import ThemeToggle from "./components/ThemeToggle";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
const PAGE_SIZE = 12;

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query ? `&q=${encodeURIComponent(query)}` : "";
      const cat = category ? `&category=${encodeURIComponent(category)}` : "";
      const endpoint = `${BASE_URL}/top-headlines?language=en&page=${page}&pageSize=${PAGE_SIZE}${q}${cat}&apiKey=${API_KEY}`;

      // ✅ Use a reliable CORS proxy to prevent browser blocking
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const url = `${proxyUrl}${encodeURIComponent(endpoint)}`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.status !== "ok") throw new Error(data.message);

      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query, category, page]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-6">
      <header className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">News Feed App</h1>
        <ThemeToggle />
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar onSearch={setQuery} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {loading && <div className="text-center p-6">🌀 Loading...</div>}
      {error && (
        <div className="text-center bg-red-200 text-red-800 p-3 rounded">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <NewsList articles={articles} />
          <Pagination
            page={page}
            setPage={setPage}
            total={totalResults}
            pageSize={PAGE_SIZE}
          />
        </>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center text-slate-500">No news found.</div>
      )}
    </div>
  );
}
