import styled from "styled-components";

export const StyledButton = styled.div`
  border-radius: 15px;
  border: none;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  text-align: center;
  background-color: #d6aca3;
  color: ${({ color }) => color || "#000"};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
