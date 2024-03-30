import React from "react";

const Actions = () => {
  return (
    <td className="flex flex-row">
      <button className="btn btn-xs btn-warning m-1">
        <svg
          class="h-4 w-4 text-slate-600"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path d="M12 20h9" />{" "}
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>
      <button className="btn btn-xs btn-success m-1">
        <svg
          class="h-4 w-4 text-slate-600"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" /> <path d="M5 12l5 5l10 -10" />
        </svg>
      </button>
      <button className="btn btn-xs btn-error m-1">
        <svg
          class="h-4 w-4 text-slate-600"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <line x1="4" y1="7" x2="20" y2="7" />{" "}
          <line x1="10" y1="11" x2="10" y2="17" />{" "}
          <line x1="14" y1="11" x2="14" y2="17" />{" "}
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "}
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </td>
  );
};
export default Actions;
