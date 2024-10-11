import React, { useRef, useCallback } from "react";
import { useInfiniteCharacters } from "@/hooks/useInfiniteCharacters";
import { type TCharacter } from "@/types/allTypes";
import { FullScreenLoader, CharacterItem } from "@/components";

type TCharacterListProps = {
  filters: {
    name: string;
  };
};

const CharacterList: React.FC<TCharacterListProps> = ({ filters }) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCharacters(filters);

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

  if (isLoading) return <FullScreenLoader />;
  if (error) {
    if (
      error.message === "No characters found with the given search criteria."
    ) {
      return (
        <p className="text-red-500 text-center w-full">
          No characters found. Please try a different search.
        </p>
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-7 list-none">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((character: TCharacter, charIndex: number) => {
              const isLastCharacter =
                pageIndex === data.pages.length - 1 &&
                charIndex === page.results.length - 1;
              return (
                <li
                  key={character.id}
                  ref={isLastCharacter ? lastCharacterRef : null}
                >
                  <CharacterItem character={character} />
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="loader border-t-2 border-gray-300 rounded-full w-5 h-5 animate-spin m-auto mt-6"></div>
      )}
    </div>
  );
};

export default CharacterList;
