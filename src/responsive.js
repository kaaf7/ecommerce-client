import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 428px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 415px) and (max-width: 1025px) {
      ${props}
    }
  `;
};

export const mcBook = (props) => {
  return css`
    @media only screen and (min-width: 1025px) and (max-width: 1919px) {
      ${props}
    }
  `;
};

export const macBookro = (props) => {
  return css`
    @media only screen and (min-width: 1920px) and (max-width: 2560px) {
      ${props}
    }
  `;
};
