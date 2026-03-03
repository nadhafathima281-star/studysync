import { useState, useMemo, useRef, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useTasks } from "../../context/TaskContext";
import { useNotes } from "../../context/NoteContext";
import { useFlashcards } from "../../context/FlashcardContext";
import { useResources } from "../../context/ResourceContext";
import ThemeToggle from "./ThemeToggle";
import AppIcon from "../../assets/studysync-icon.svg";
import "./navbar.css";

export default function Navbar({ setSidebarOpen }) {
  const { tasks } = useTasks();
  const { notes } = useNotes();
  const { decks } = useFlashcards();
  const { resources } = useResources();
  const navigate = useNavigate();

  /* ===============================
     STATES
  ================================= */

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  const inputRef = useRef();

  /* ===============================
     BUILD SEARCH DATA
  ================================= */

  const searchData = useMemo(() => {
    return [
      ...tasks.map((t) => ({
        type: "Task",
        text: t.title || "",
        link: "/tasks",
      })),
      ...notes.map((n) => ({
        type: "Note",
        text: n.title || "",
        link: "/notes",
      })),
      ...decks.map((d) => ({
        type: "Deck",
        text: d.title || "",
        link: "/flashcards",
      })),
      ...resources.map((r) => ({
        type: "Resource",
        text: r.title || "",
        link: "/resources",
      })),
    ];
  }, [tasks, notes, decks, resources]);

  /* ===============================
     GROUPED RESULTS
  ================================= */

  const groupedResults = useMemo(() => {
    if (!debouncedQuery.trim()) return {};

    const results = searchData.filter((item) =>
      item.text.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return results.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [debouncedQuery, searchData]);

  const flatResults = useMemo(() => {
    return Object.values(groupedResults).flat();
  }, [groupedResults]);

  /* ===============================
     LOADING EFFECT
  ================================= */

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  /* ===============================
     KEYBOARD NAVIGATION
  ================================= */

  useEffect(() => {
    if (!debouncedQuery) return;

    const handleKey = (e) => {
      if (!flatResults.length) return;

      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          prev < flatResults.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : flatResults.length - 1
        );
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        handleSelect(flatResults[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flatResults, activeIndex, debouncedQuery]);

  /* ===============================
     SELECT HANDLER
  ================================= */

  const handleSelect = (item) => {
    navigate(item.link);
    setQuery("");
    setShowDropdown(false);
    setMobileSearchOpen(false);

    const updated = [
      item.text,
      ...recentSearches.filter((r) => r !== item.text),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  /* ===============================
     HIGHLIGHT
  ================================= */

  const highlightText = (text) => {
    const parts = text.split(
      new RegExp(`(${query})`, "gi")
    );

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  /* ===============================
     UI
  ================================= */

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <img
            src={AppIcon}
            alt="logo"
            className="brand-icon"
          />
          <span className="brand-text">
            StudySync
          </span>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="navbar-search desktop-only">
          <Search className="search-icon" size={18} />

          <input
            ref={inputRef}
            value={query}
            placeholder="Search everything..."
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() =>
              setTimeout(() => setShowDropdown(false), 150)
            }
          />

          {showDropdown && (
            <div className="search-dropdown">
              {isSearching && (
                <div className="search-loading">
                  Searching...
                </div>
              )}

              {!debouncedQuery &&
                recentSearches.length > 0 && (
                  <div className="recent-section">
  <div className="recent-header">
    <span className="recent-title">
      Recent Searches
    </span>

    <button
      className="clear-recent-btn"
      onMouseDown={() => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
      }}
    >
      Clear
    </button>
  </div>

                    {recentSearches.map((item, index) => {
  const foundItem = searchData.find(
    (data) => data.text === item
  );

  return (
    <div
      key={index}
      className="search-item"
      onMouseDown={() => {
        if (foundItem) {
          handleSelect(foundItem);
        }
      }}
    >
      {item}
    </div>
  );
})}
                  </div>
                )}

              {!isSearching &&
                debouncedQuery &&
                Object.keys(groupedResults).map(
                  (category) => (
                    <div
                      key={category}
                      className="search-group"
                    >
                      <div className="search-group-title">
                        {category.toUpperCase()}
                      </div>

                      {groupedResults[
                        category
                      ].map((item) => {
                        const globalIndex =
                          flatResults.findIndex(
                            (r) =>
                              r.text ===
                                item.text &&
                              r.type ===
                                item.type
                          );

                          

                        return (
                          <div
                            key={`${item.type}-${item.text}`}
                            className={`search-item ${
                              globalIndex ===
                              activeIndex
                                ? "active"
                                : ""
                            }`}
                            onMouseDown={() =>
                              handleSelect(item)
                            }
                          >
                            <span className="search-text">
                              {highlightText(
                                item.text
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}

              {!isSearching &&
                debouncedQuery &&
                Object.keys(groupedResults)
                  .length === 0 && (
                  <div className="search-empty">
                    No results found
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="navbar-right">
          <button
            className="mobile-search-btn mobile-only"
            onClick={() =>
              setMobileSearchOpen(true)
            }
          >
            <Search size={20} />
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* MOBILE SEARCH */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-header">
            <input
              autoFocus
              value={query}
              placeholder="Search anything..."
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
            <button
              onClick={() =>
                setMobileSearchOpen(false)
              }
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-search-results">
            {flatResults.map((item, index) => (
              <div
                key={index}
                className="search-item"
                onClick={() =>
                  handleSelect(item)
                }
              >
                <span className="search-type">
                  {item.type}
                </span>
                <span className="search-text">
                  {highlightText(
                    item.text
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}