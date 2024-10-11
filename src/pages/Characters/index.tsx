import React, { useState } from "react";
import { SearchBox, CharacterList } from "./components";

const Characters: React.FC = () => {
  const [filters, setFilters] = useState({ name: "" });

  return (
    <div>
      <SearchBox
        onSearch={(query) => setFilters({ ...filters, name: query })}
      />

      <CharacterList filters={filters} />
    </div>
  );
};

export default Characters;
