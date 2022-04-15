export const active = (
  <svg
    className="icon active"
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
  </svg>
);

export const edit = (
  <svg
    className={"icon edit"}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
  </svg>
);

export const del = (
  <svg
    className={"icon delete"}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
  </svg>
);

export const add = (size = 100) => {
  return (
    <svg
      className={"icon add"}
      xmlns="http://www.w3.org/2000/svg"
      enable-background={`new 0 0 24 24`}
      height={`${size}px`}
      viewBox={`0 0 24 24`}
      width={`${size}px`}
      fill="#000000"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
        </g>
      </g>
    </svg>
  );
};

export const image = () => {
  return (
    <svg
      className={"icon image"}
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 0 24 24"
      width="48px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
    </svg>
  );
};

export const menu = (size = 24) => (
  <svg
    className={"icon menu"}
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export const arrowLeft = (
  <svg
    className={"icon left"}
    xmlns="http://www.w3.org/2000/svg"
    height="72px"
    viewBox="0 0 24 24"
    width="72px"
    fill="#000000"
  >
    <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
    <path d="M14 7l-5 5 5 5V7z" />
  </svg>
);

export const arrowRight = (
  <svg
    className={"icon right"}
    xmlns="http://www.w3.org/2000/svg"
    height="72px"
    viewBox="0 0 24 24"
    width="72px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 17l5-5-5-5v10z" />
  </svg>
);

export const close = (
  <svg
    className={"icon close"}
    xmlns="http://www.w3.org/2000/svg"
    height="36px"
    viewBox="0 0 24 24"
    width="36px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export const centerVertical = (
  <svg
    className={"icon center-vertical"}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z" />
  </svg>
);

export const centerHorizontal = (
  <svg
    className={"icon center-horizontal"}
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <rect fill="none" height="24" width="24" />
    <polygon points="11,2 13,2 13,7 21,7 21,10 13,10 13,14 18,14 18,17 13,17 13,22 11,22 11,17 6,17 6,14 11,14 11,10 3,10 3,7 11,7" />
  </svg>
);
