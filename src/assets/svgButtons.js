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
      enableBackground={`new 0 0 24 24`}
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
    enableBackground="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <rect fill="none" height="24" width="24" />
    <polygon points="11,2 13,2 13,7 21,7 21,10 13,10 13,14 18,14 18,17 13,17 13,22 11,22 11,17 6,17 6,14 11,14 11,10 3,10 3,7 11,7" />
  </svg>
);

export const home = (size = 24) => (
  <svg
    className="icon home"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
  </svg>
);

export const gallery = (size = 24) => (
  <svg
    className="icon gallery"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
  </svg>
);

export const blog = (size = 24) => (
  <svg
    className="icon blog"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <path d="M22,3l-1.67,1.67L18.67,3L17,4.67L15.33,3l-1.66,1.67L12,3l-1.67,1.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3v16 c0,1.1,0.9,2,2,2l16,0c1.1,0,2-0.9,2-2V3z M11,19H4v-6h7V19z M20,19h-7v-2h7V19z M20,15h-7v-2h7V15z M20,11H4V8h16V11z" />
    </g>
  </svg>
);

export const profile = (size = 24) => (
  <svg
    className="icon profile"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
  </svg>
);

export const album = (size = 24) => (
  <svg
    className="icon album"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <g>
      <rect fill="none" height="24" width="24" x="0" />
    </g>
    <g>
      <path d="M22.47,5.2C22,4.96,21.51,4.76,21,4.59v12.03C19.86,16.21,18.69,16,17.5,16c-1.9,0-3.78,0.54-5.5,1.58V5.48 C10.38,4.55,8.51,4,6.5,4C4.71,4,3.02,4.44,1.53,5.2C1.2,5.36,1,5.71,1,6.08v12.08c0,0.58,0.47,0.99,1,0.99 c0.16,0,0.32-0.04,0.48-0.12C3.69,18.4,5.05,18,6.5,18c2.07,0,3.98,0.82,5.5,2c1.52-1.18,3.43-2,5.5-2c1.45,0,2.81,0.4,4.02,1.04 c0.16,0.08,0.32,0.12,0.48,0.12c0.52,0,1-0.41,1-0.99V6.08C23,5.71,22.8,5.36,22.47,5.2z M10,16.62C8.86,16.21,7.69,16,6.5,16 c-1.19,0-2.36,0.21-3.5,0.62V6.71C4.11,6.24,5.28,6,6.5,6C7.7,6,8.89,6.25,10,6.72V16.62z M19,0.5l-5,5V15l5-4.5V0.5z" />
    </g>
  </svg>
);

export const email = (size = 24) => (
  <svg
    className="icon email"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 0 24 24"
    width={`${size}px`}
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
  </svg>
);

export const back = (size = 24) => (
  <svg
    className="icon back"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 35 48"
    fill="#000000"
  >
    <path d="M20 44 0 24 20 4 22.8 6.85 5.65 24 22.8 41.15Z" />
  </svg>
);

export const forward = (size = 24) => (
  <svg
    className="icon forward"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 35 48"
  >
    <path d="M15.2 43.9 12.4 41.05 29.55 23.9 12.4 6.75 15.2 3.9 35.2 23.9Z" />
  </svg>
);

export const desktop = (size = 24) => (
  <svg
    className="icon desktop"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M16.75 44V41H21.05V36H7.05Q5.85 36 4.95 35.1Q4.05 34.2 4.05 33V9Q4.05 7.8 4.95 6.9Q5.85 6 7.05 6H41.05Q42.25 6 43.15 6.9Q44.05 7.8 44.05 9V33Q44.05 34.2 43.15 35.1Q42.25 36 41.05 36H27.05V41H31.35V44ZM7.05 33H41.05Q41.05 33 41.05 33Q41.05 33 41.05 33V9Q41.05 9 41.05 9Q41.05 9 41.05 9H7.05Q7.05 9 7.05 9Q7.05 9 7.05 9V33Q7.05 33 7.05 33Q7.05 33 7.05 33ZM7.05 33Q7.05 33 7.05 33Q7.05 33 7.05 33V9Q7.05 9 7.05 9Q7.05 9 7.05 9Q7.05 9 7.05 9Q7.05 9 7.05 9V33Q7.05 33 7.05 33Q7.05 33 7.05 33Z" />
  </svg>
);

export const tablet = (size = 24) => (
  <svg
    className="icon tablet"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M9 46Q7.75 46 6.875 45.125Q6 44.25 6 43V5Q6 3.75 6.875 2.875Q7.75 2 9 2H39Q40.25 2 41.125 2.875Q42 3.75 42 5V43Q42 44.25 41.125 45.125Q40.25 46 39 46ZM9 35.5H39V9.5H9ZM9 38.5V43Q9 43 9 43Q9 43 9 43H39Q39 43 39 43Q39 43 39 43V38.5ZM9 6.5H39V5Q39 5 39 5Q39 5 39 5H9Q9 5 9 5Q9 5 9 5ZM9 5Q9 5 9 5Q9 5 9 5V6.5V5Q9 5 9 5Q9 5 9 5ZM9 43Q9 43 9 43Q9 43 9 43V38.5V43Q9 43 9 43Q9 43 9 43ZM24 42.25Q24.65 42.25 25.075 41.825Q25.5 41.4 25.5 40.75Q25.5 40.1 25.075 39.675Q24.65 39.25 24 39.25Q23.35 39.25 22.925 39.675Q22.5 40.1 22.5 40.75Q22.5 41.4 22.925 41.825Q23.35 42.25 24 42.25Z" />
  </svg>
);

export const mobile = (size = 24) => (
  <svg
    className="icon mobile"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M24 42.25Q24.65 42.25 25.075 41.825Q25.5 41.4 25.5 40.75Q25.5 40.1 25.075 39.675Q24.65 39.25 24 39.25Q23.35 39.25 22.925 39.675Q22.5 40.1 22.5 40.75Q22.5 41.4 22.925 41.825Q23.35 42.25 24 42.25ZM13 35.5H35V9.5H13ZM13 46Q11.8 46 10.9 45.1Q10 44.2 10 43V5Q10 3.8 10.9 2.9Q11.8 2 13 2H35Q36.2 2 37.1 2.9Q38 3.8 38 5V43Q38 44.2 37.1 45.1Q36.2 46 35 46ZM13 6.5H35V5Q35 5 35 5Q35 5 35 5H13Q13 5 13 5Q13 5 13 5ZM13 5Q13 5 13 5Q13 5 13 5V6.5V5Q13 5 13 5Q13 5 13 5ZM13 38.5V43Q13 43 13 43Q13 43 13 43H35Q35 43 35 43Q35 43 35 43V38.5ZM13 43Q13 43 13 43Q13 43 13 43V38.5V43Q13 43 13 43Q13 43 13 43Z" />
  </svg>
);

export const down = (size = 24) => (
  <svg
    className="icon down"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M24 30.8 12 18.8 14.15 16.65 24 26.5 33.85 16.65 36 18.8Z" />
  </svg>
);

export const up = (size = 24) => (
  <svg
    className="icon up"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M14.15 30.15 12 28 24 16 36 28 33.85 30.15 24 20.3Z" />
  </svg>
);

export const aspectRatio = (size = 24) => (
  <svg
    className="icon aspect-ratio"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M9.65 23.4H12.65V16.7H19.2V13.7H9.65ZM28.85 34.3H38.4V24.6H35.4V31.3H28.85ZM7 40Q5.8 40 4.9 39.1Q4 38.2 4 37V11Q4 9.8 4.9 8.9Q5.8 8 7 8H41Q42.2 8 43.1 8.9Q44 9.8 44 11V37Q44 38.2 43.1 39.1Q42.2 40 41 40ZM7 37Q7 37 7 37Q7 37 7 37V11Q7 11 7 11Q7 11 7 11Q7 11 7 11Q7 11 7 11V37Q7 37 7 37Q7 37 7 37ZM7 37H41Q41 37 41 37Q41 37 41 37V11Q41 11 41 11Q41 11 41 11H7Q7 11 7 11Q7 11 7 11V37Q7 37 7 37Q7 37 7 37Z" />
  </svg>
);

export const resizeHandle = (size = 24) => (
  <svg
    className="icon resize"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path strokeWidth={"5px"} d="M 30 48 48 30 M 15 48 48 15 M 0 48 48 0" />
  </svg>
);

export const aspectRatioLock = (size = 24) => (
  <svg
    className="icon aspect-ratio-lock"
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    width={`${size}px`}
    viewBox="0 0 48 48"
  >
    <path d="M24 2Q27.95 2 30.725 4.775Q33.5 7.55 33.5 11.5V16.3H37Q38.25 16.3 39.125 17.175Q40 18.05 40 19.3V41Q40 42.25 39.125 43.125Q38.25 44 37 44H11Q9.75 44 8.875 43.125Q8 42.25 8 41V19.3Q8 18.05 8.875 17.175Q9.75 16.3 11 16.3H14.5V11.5Q14.5 7.55 17.275 4.775Q20.05 2 24 2ZM24 5Q21.3 5 19.4 6.9Q17.5 8.8 17.5 11.5V16.3H30.5V11.5Q30.5 8.8 28.6 6.9Q26.7 5 24 5ZM11 41H37Q37 41 37 41Q37 41 37 41V19.3Q37 19.3 37 19.3Q37 19.3 37 19.3H11Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41ZM24 26.3Q22.4 26.3 21.275 27.525Q20.15 28.75 20.15 30.25Q20.15 31.8 21.275 32.9Q22.4 34 24 34Q25.6 34 26.725 32.9Q27.85 31.8 27.85 30.25Q27.85 28.75 26.725 27.525Q25.6 26.3 24 26.3ZM11 19.3Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41Q11 41 11 41Q11 41 11 41V19.3Q11 19.3 11 19.3Q11 19.3 11 19.3Z" />
  </svg>
);
