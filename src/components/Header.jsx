import React from "react";
import bookIcon from "../assets/book.png";
import addIcon from "../assets/add.png";
import randomIcon from "../assets/random.png";

const Navigation = ({ currentView, onViewChange }) => {
  const navItems = [
    {
      key: "list",
      label: "All Proverbs",
      icon: <img src={bookIcon} alt="All Proverbs" />,
    },
    {
      key: "add",
      label: "Add Proverb",
      icon: <img src={addIcon} alt="Add Proverb" />,
    },
    {
      key: "random",
      label: "Random Proverb",
      icon: <img src={randomIcon} alt="Random Proverb" />,
    },
  ];

  return (
    <nav className="navigation">
      <div className="app-header">
        <h1>AP&S</h1>
        <p>Afghan Proverbs & Sayings</p>
      </div>
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
