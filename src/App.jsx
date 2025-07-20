import React, { useState, useEffect } from "react";
import "./App.css";
import ProverbsList from "./components/ProverbsList";
import ProverbDetail from "./components/ProverbDetail";
import AddProverb from "./components/AddProverb";
import EditProverb from "./components/EditProverb";
import RandomProverb from "./components/RandomProverb";
import Navigation from "./components/Navigation";
import * as proverbsAPI from "./services/proverbsAPI";

function App() {
  const [currentView, setCurrentView] = useState("list");
  const [selectedProverb, setSelectedProverb] = useState(null);
  const [proverbs, setProverbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentView === "list") {
      loadProverbs();
    }
  }, [currentView]);

  const loadProverbs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await proverbsAPI.getAllProverbs();
      setProverbs(data);
    } catch (err) {
      setError("Failed to load proverbs. Please make sure the API is running.");
      console.error("Error loading proverbs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProverb = async (id) => {
    try {
      setLoading(true);
      const proverb = await proverbsAPI.getProverbById(id);
      setSelectedProverb(proverb);
      setCurrentView("detail");
    } catch (err) {
      setError("Failed to load proverb details.");
      console.error("Error loading proverb:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProverb = (proverb) => {
    setSelectedProverb(proverb);
    setCurrentView("edit");
  };

  const handleDeleteProverb = async (id) => {
    if (window.confirm("Are you sure you want to delete this proverb?")) {
      try {
        await proverbsAPI.deleteProverb(id);
        setProverbs(proverbs.filter((p) => p.id !== id));
        if (selectedProverb && selectedProverb.id === id) {
          setCurrentView("list");
          setSelectedProverb(null);
        }
      } catch (err) {
        setError("Failed to delete proverb.");
        console.error("Error deleting proverb:", err);
      }
    }
  };

  const handleProverbSaved = () => {
    setCurrentView("list");
    setSelectedProverb(null);
    loadProverbs();
  };

  const renderCurrentView = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    switch (currentView) {
      case "list":
        return (
          <ProverbsList
            proverbs={proverbs}
            onViewProverb={handleViewProverb}
            loading={loading}
            error={error}
          />
        );
      case "detail":
        return (
          <ProverbDetail
            proverb={selectedProverb}
            onEdit={handleEditProverb}
            onDelete={handleDeleteProverb}
          />
        );
      case "add":
        return (
          <AddProverb
            onProverbSaved={handleProverbSaved}
            onCancel={() => setCurrentView("list")}
          />
        );
      case "edit":
        return (
          <EditProverb
            proverb={selectedProverb}
            onProverbSaved={handleProverbSaved}
            onCancel={() => setCurrentView("list")}
          />
        );
      case "random":
        return <RandomProverb onViewProverb={handleViewProverb} />;
      default:
        return (
          <ProverbsList proverbs={proverbs} onViewProverb={handleViewProverb} />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Afghan Proverbs & Sayings</h1>
        <p>Explore the wisdom of Afghan culture through traditional proverbs</p>
      </header>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-error">
            ×
          </button>
        </div>
      )}

      <main className="app-main">{renderCurrentView()}</main>

      <footer className="app-footer">
        <p>
          &copy; 2025 Afghan Proverbs & Sayings. Preserving cultural wisdom.
        </p>
      </footer>
    </div>
  );
}

export default App;
