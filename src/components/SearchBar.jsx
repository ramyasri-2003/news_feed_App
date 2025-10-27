import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={submit} className="flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="🔍 Search news..."
        className="w-full p-2 rounded border shadow-sm focus:outline-none focus:ring focus:border-blue-400 dark:bg-slate-800 dark:border-slate-700"
      />
    </form>
  );
}
