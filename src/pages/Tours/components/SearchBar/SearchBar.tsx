import React from "react";
import { Input } from "@heroui/react";
import { Search, X } from "lucide-react";
import "./SearchBar.scss";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onKeyDown,
  onSearchClear,
  placeholder = "Search tours...",
}) => {
  const handleClearSearch = () => {
    setSearchQuery("");
    onSearchClear();
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">
          <Search size={18} />
        </span>
        <Input
          fullWidth // Đảm bảo input mở rộng toàn bộ
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onKeyDown}
          size="lg"
          className="search-input"
          aria-label="Search"
          classNames={{
            inputWrapper: "search-input-wrapper",
            innerWrapper: "search-inner-wrapper",
          }}
        />
        {searchQuery && (
          <button
            className="clear-button"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="search-info">
          <span>
            Search results for: <strong>"{searchQuery}"</strong>
          </span>
        </div>
      )}
    </div>
  );
};