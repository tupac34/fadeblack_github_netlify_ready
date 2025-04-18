import * as React from "react";

const Storefront = ({ pageContext }) => {
  const { storeData } = pageContext;

  return (
    <main style={{ background: "#000", color: "#fff", padding: "2rem" }}>
      <h1>{storeData.store}</h1>
      <p>Plan: {storeData.plan}</p>
      <p>Owner: {storeData.email}</p>
    </main>
  );
};

export default Storefront;
