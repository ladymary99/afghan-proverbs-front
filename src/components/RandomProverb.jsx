import React, { useState, useEffect } from "react";
import * as proverbsAPI from "../services/proverbsAPI";

const RandomProverb = ({ onViewProverb }) => {
  const [proverb, setProverb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomProverb = async () => {
    try {
      setLoading(true);
      setError(null);
      const randomProverb = await proverbsAPI.getRandomProverb();
      setProverb(randomProverb);
    } catch (err) {
      setError(
        "Failed to fetch random proverb. Please make sure the API is running."
      );
      console.error("Error fetching random proverb:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomProverb();
  }, []);

  const handleNewRandom = () => {
    fetchRandomProverb();
  };

  if (loading) {
    return <div className="loading">Loading random proverb...</div>;
  }

  if (error) {
    return (
      <div className="random-proverb">
        <div className="random-header">
          <h2>Random Proverb</h2>
        </div>
        <div className="error-message">
          {error}
          <button onClick={handleNewRandom} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!proverb) {
    return (
      <div className="random-proverb">
        <div className="random-header">
          <h2>Random Proverb</h2>
        </div>
        <div className="no-proverb">
          No proverbs available. Add some proverbs first!
        </div>
      </div>
    );
  }

  return (
    <div className="random-proverb">
      <div className="random-header">
        <h2>Random Proverb</h2>
        <p>Discover wisdom through chance</p>
      </div>

      <div className="random-content">
        <div className="proverb-display">
          {proverb.textDari && (
            <div className="text-section">
              <h3>Dari (دری)</h3>
              <p className="text-dari" dir="rtl">
                {proverb.textDari}
              </p>
            </div>
          )}

          {proverb.textPashto && (
            <div className="text-section">
              <h3>Pashto (پښتو)</h3>
              <p className="text-pashto" dir="rtl">
                {proverb.textPashto}
              </p>
            </div>
          )}

          <div className="text-section">
            <h3>English Translation</h3>
            <p className="text-english">{proverb.translationEn}</p>
          </div>

          {proverb.meaning && (
            <div className="text-section">
              <h3>Meaning</h3>
              <p className="proverb-meaning">{proverb.meaning}</p>
            </div>
          )}

          {proverb.category && (
            <div className="proverb-category">
              <span className="category-tag large">{proverb.category}</span>
            </div>
          )}
        </div>

        <div className="random-actions">
          <button
            onClick={handleNewRandom}
            className="new-random-button"
            disabled={loading}
          >
            New Random Proverb
          </button>

          {proverb.id && (
            <button
              onClick={() => onViewProverb(proverb.id)}
              className="view-details-button"
            >
              View Full Details
            </button>
          )}
        </div>
      </div>

      <div className="wisdom-quote">
        <p>
          "Wisdom is not a product of schooling but of the lifelong attempt to
          acquire it." - Afghan wisdom passed through generations
        </p>
      </div>
    </div>
  );
};

export default RandomProverb;
