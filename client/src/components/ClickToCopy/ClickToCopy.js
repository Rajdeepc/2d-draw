import React from "react";

export default function ClickToCopy({ link,copyLink }) {
  return (
    <div>
      <span>
        <button onClick={() => copyLink(link)}></button>
      </span>
      <span>
        <input type="text" disabled readonly value={link} />
      </span>
    </div>
  );
}
