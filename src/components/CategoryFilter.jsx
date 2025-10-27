import React from "react";

const categories = [
  { id: "", label: "All" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-3 py-1 rounded-full text-sm border ${
            selected === cat.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
