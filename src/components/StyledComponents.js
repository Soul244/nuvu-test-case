import styled from 'styled-components';

const SlideListContainer = styled.div`
  background-color: darkgrey;
`;

const SlideList = styled.ul`
  list-style-type: circle;
`;

const SlideListItem = styled.li`
  padding: 4px 0;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 450px;
  background-color: lightgray;
  border-radius: 8px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const FloatContainer = styled.div`
  position: absolute;
  padding: 0.375rem 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
`;

const ButtonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 25px;
`;

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 5px;
  margin-top: 4px;
`;

const Thumb = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
`;

export {
  SlideListContainer,
  SlideList,
  SlideListItem,
  ImageContainer,
  Image,
  Thumb,
  FloatContainer,
  ButtonListContainer,
  ButtonList,
};
