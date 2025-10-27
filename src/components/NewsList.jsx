import React from "react";
import ArticleCard from "./ArticleCard";

export default function NewsList({ articles }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  );
}
