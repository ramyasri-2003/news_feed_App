import React from "react";

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow hover:shadow-xl transition flex flex-col">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="news"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-semibold text-lg mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
          {article.description || "No description available."}
        </p>
        <div className="mt-4 flex justify-between text-xs text-slate-500">
          <span>{article.source?.name}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}
