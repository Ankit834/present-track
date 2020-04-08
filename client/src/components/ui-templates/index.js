import styled from 'styled-components';

export const TitleContainer = styled.div`
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`

export const Info = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const ButtonContainer = styled.div`
`;

export const Button = styled.button`
  display: inline-block;
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
`;