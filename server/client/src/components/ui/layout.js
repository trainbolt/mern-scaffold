import React from "react";
import styled from "styled-components";

export const Container = props => <UIContainer>{props.children}</UIContainer>;

const UIContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Section = props => <UISection>{props.children}</UISection>;

const UISection = styled.div`
  width: 100%;
  max-width: 1024px;
  position: relative;
`;
