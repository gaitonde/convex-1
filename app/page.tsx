"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const urls = useQuery(api.urls.listUrls);
  const addUrl = useMutation(api.urls.addUrl);
  const deleteUrl = useMutation(api.urls.deleteUrl);

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    try {
      await addUrl({ url: urlInput });
      setUrlInput("");
    } catch (error) {
      console.error("Error adding URL:", error);
    }
  };

  const handleDelete = async (id: Id<"urls">) => {
    try {
      await deleteUrl({ id });
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Summarizer</h1>
        <p className="text-gray-600 mb-8">Store and manage your URLs here</p>

        <form onSubmit={handleAddUrl} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter a URL (e.g., https://example.com)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Add URL
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {urls && urls.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No URLs yet. Add one to get started!
            </p>
          )}
          {urls?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex-1 min-w-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium truncate block"
                >
                  {item.url}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Added {new Date(item._creationTime).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="ml-4 px-3 py-2 text-red-600 hover:bg-red-50 rounded transition font-medium text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
