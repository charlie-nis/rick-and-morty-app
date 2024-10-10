// import React from "react";

// import getCharacters from "@/data/characters";

// const Characters = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   // console.log(id, location);
//  const {character} = getCharacters();
//  console.log(character);
//   if (id) return <Outlet />;

//   return (
//     <>
//       <div>Characters</div>
//     </>
//   );
// };

// export default Characters;

// Characters.tsx
import React, { useRef, useCallback, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useInfiniteCharacters } from "@/hooks/useInfiniteCharacters";
import { TCharacter } from "@/types/allTypes";

const Characters: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const [filters, setFilters] = useState({ name: "", status: "" });
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCharacters(filters);

  // Scroll observer for infinite scrolling
  const observer = useRef<IntersectionObserver>();
  const lastCharacterRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || isFetchingNextPage || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Filter Inputs */}
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Character List */}
      {data?.pages.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page.results.map((character: TCharacter, charIndex: number) => {
            const isLastCharacter =
              pageIndex === data.pages.length - 1 &&
              charIndex === page.results.length - 1;
            return (
              <li
                key={character.id}
                ref={isLastCharacter ? lastCharacterRef : null}
              >
                <Link
                  to={`/characters/${character.id}`}
                  className="text-black text-2xl font-bold"
                >
                  {character.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ))}

      {/* Loading more characters */}
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default Characters;
