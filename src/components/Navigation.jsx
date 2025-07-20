import React from "react";

const Navigation = ({ currentView, onViewChange }) => {
  const navItems = [
    { key: "list", label: "All Proverbs", icon: "📚" },
    { key: "add", label: "Add Proverb", icon: "➕" },
    { key: "random", label: "Random Proverb", icon: "🎲" },
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.key} className="nav-item">
            <button
              className={`nav-button ${
                currentView === item.key ? "active" : ""
              }`}
              onClick={() => onViewChange(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
