import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 415px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 415px) and (max-width: 1023px) {
      ${props}
    }
  `;
};
