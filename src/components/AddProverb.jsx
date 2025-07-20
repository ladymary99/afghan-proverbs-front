import React, { useState } from "react";
import * as proverbsAPI from "../services/proverbsAPI";

const AddProverb = ({ onProverbSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    textDari: "",
    textPashto: "",
    translationEn: "",
    meaning: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "wisdom",
    "friendship",
    "family",
    "work",
    "life",
    "patience",
    "courage",
    "honesty",
    "education",
    "prosperity",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.translationEn.trim()) {
      newErrors.translationEn = "English translation is required";
    }

    if (!formData.textDari.trim() && !formData.textPashto.trim()) {
      newErrors.textDari = "At least one of Dari or Pashto text is required";
      newErrors.textPashto = "At least one of Dari or Pashto text is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await proverbsAPI.createProverb(formData);
      onProverbSaved();
    } catch (error) {
      console.error("Error adding proverb:", error);
      setErrors({ submit: "Failed to add proverb. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-proverb">
      <div className="form-header">
        <h2>Add New Proverb</h2>
        <p>Share the wisdom of Afghan culture by adding a new proverb</p>
      </div>

      <form onSubmit={handleSubmit} className="proverb-form">
        <div className="form-group">
          <label htmlFor="textDari">Dari Text (دری) *</label>
          <textarea
            id="textDari"
            name="textDari"
            value={formData.textDari}
            onChange={handleChange}
            placeholder="Enter the proverb in Dari..."
            className={`form-textarea dari-text ${
              errors.textDari ? "error" : ""
            }`}
            dir="rtl"
            rows="3"
          />
          {errors.textDari && (
            <span className="error-text">{errors.textDari}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="textPashto">Pashto Text (پښتو) *</label>
          <textarea
            id="textPashto"
            name="textPashto"
            value={formData.textPashto}
            onChange={handleChange}
            placeholder="Enter the proverb in Pashto..."
            className={`form-textarea pashto-text ${
              errors.textPashto ? "error" : ""
            }`}
            dir="rtl"
            rows="3"
          />
          {errors.textPashto && (
            <span className="error-text">{errors.textPashto}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="translationEn">English Translation *</label>
          <textarea
            id="translationEn"
            name="translationEn"
            value={formData.translationEn}
            onChange={handleChange}
            placeholder="Enter the English translation..."
            className={`form-textarea ${errors.translationEn ? "error" : ""}`}
            rows="3"
            required
          />
          {errors.translationEn && (
            <span className="error-text">{errors.translationEn}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="meaning">Meaning/Explanation</label>
          <textarea
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            placeholder="Explain the meaning and context of this proverb..."
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? "error" : ""}`}
            required
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-text">{errors.category}</span>
          )}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Adding..." : "Add Proverb"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProverb;
