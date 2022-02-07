import React from "react";

export default function ClickToCopy({ link,copyLink }) {
  return (
    <div className="copyToClipboard">
      <div>
        <button onClick={() => copyLink(link)}><i class="bi bi-clipboard"></i></button>
      </div>
      <div>
        <input type="text" disabled readonly value={link} />
      </div>
    </div>
  );
}
