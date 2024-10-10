import React from "react";
import { Outlet, useParams,useLocation } from "react-router-dom";

const Characters = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(id,location);

  if (id) return <Outlet />;

  return (
    <>
      <div>Characters</div>
    </>
  );
};

export default Characters;
