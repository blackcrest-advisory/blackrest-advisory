import { useState } from "react";
import { Search } from "lucide-react";

const SearchArea = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-4">
      <div
        className="relative w-full rounded-full border transition-all duration-200"
        style={{
          borderColor: searchFocused
            ? "var(--color-gold)"
            : "var(--color-border)",
          backgroundColor: "var(--color-muted)",
        }}
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-body)" }}
        />

        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full h-9 pl-10 pr-4 bg-transparent border-none rounded-full text-sm outline-none"
          style={{ color: "var(--color-foreground)" }}
        />
      </div>
    </div>
  );
};

export default SearchArea;
