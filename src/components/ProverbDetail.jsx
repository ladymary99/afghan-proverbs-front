import React from "react";

const ProverbDetail = ({ proverb, onEdit, onDelete }) => {
  if (!proverb) {
    return <div className="error">Proverb not found.</div>;
  }

  return (
    <div className="proverb-detail">
      <div className="detail-header">
        <h2>Proverb Details</h2>
        <div className="detail-actions">
          <button onClick={() => onEdit(proverb)} className="edit-button">
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(proverb.id)}
            className="delete-button"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="proverb-texts">
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
        </div>

        <div className="proverb-meta">
          {proverb.category && (
            <div className="meta-item">
              <strong>Category:</strong>
              <span className="category-tag large">{proverb.category}</span>
            </div>
          )}

          {proverb.id && (
            <div className="meta-item">
              <strong>ID:</strong>
              <span>{proverb.id}</span>
            </div>
          )}
        </div>
      </div>

      <div className="detail-footer">
        <p className="cultural-note">
          🌟 This proverb represents the rich cultural wisdom of Afghanistan,
          passed down through generations to teach valuable life lessons.
        </p>
      </div>
    </div>
  );
};

export default ProverbDetail;
