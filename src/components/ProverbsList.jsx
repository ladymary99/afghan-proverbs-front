import React, { useState } from "react";

const ProverbsList = ({ proverbs, onViewProverb, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    ...new Set(proverbs.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProverbs = proverbs.filter((proverb) => {
    const matchesSearch =
      !searchTerm ||
      proverb.textDari?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proverb.textPashto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proverb.translationEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proverb.meaning?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || proverb.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="loading">Loading proverbs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="proverbs-list">
      <div className="list-header">
        <h2>Afghan Proverbs Collection</h2>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search proverbs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProverbs.length === 0 ? (
        <div className="no-proverbs">
          {proverbs.length === 0
            ? "No proverbs found. Add some proverbs to get started!"
            : "No proverbs match your search criteria."}
        </div>
      ) : (
        <div className="proverbs-grid">
          {filteredProverbs.map((proverb) => (
            <div key={proverb.id} className="proverb-card">
              <div className="proverb-content">
                <div className="proverb-text">
                  {proverb.textDari && (
                    <p className="text-dari" dir="rtl">
                      {proverb.textDari}
                    </p>
                  )}
                  {proverb.textPashto && (
                    <p className="text-pashto" dir="rtl">
                      {proverb.textPashto}
                    </p>
                  )}
                  <p className="text-english">{proverb.translationEn}</p>
                </div>

                {proverb.category && (
                  <span className="category-tag">{proverb.category}</span>
                )}
              </div>

              <div className="proverb-actions">
                <button
                  onClick={() => onViewProverb(proverb.id)}
                  className="view-button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results-count">
        Showing {filteredProverbs.length} of {proverbs.length} proverbs
      </div>
    </div>
  );
};

export default ProverbsList;
