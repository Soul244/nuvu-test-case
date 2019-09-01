import React from 'react';
import { Container, Row, Col, Button, Input, Badge } from 'reactstrap';
import Draggable from 'react-draggable';

import TextModal from './components/TextModal';
import {
  SlideListContainer,
  SlideList,
  SlideListItem,
  ImageContainer,
  Image,
  Thumb,
  FloatContainer,
  ButtonListContainer,
  ButtonList,
} from './components/StyledComponents';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      slideList: [],
      textList: [],
      textModal: false,
      textValue: '',
      addTextWarning: '',
      deckWarning: '',
      deckMessage: '',
      activeDrags: 0,
    };
  }

  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = (position, index) => {
    const { x, y } = position;
    this.setState(prevState => ({
      activeDrags: prevState.activeDrags - 1,
      textList: [
        ...prevState.textList.slice(0, index),
        {
          ...prevState.textList[index],
          x,
          y,
        },
        ...prevState.textList.slice(index + 1),
      ],
    }));
  };

  textModalToggle = () => {
    this.setState(prevState => ({
      textModal: !prevState.textModal,
    }));
  };

  addText = () => {
    const { textValue } = this.state;
    if (textValue !== '') {
      this.setState(prevState => ({
        textList: [
          ...prevState.textList,
          {
            textValue,
            x: 0,
            y: (prevState.textList.length + 1) * 36,
          },
        ],
        textValue: '',
        textModal: !prevState.textModal,
        addTextWarning: '',
      }));
    } else {
      this.setState({
        addTextWarning: 'You must type something',
      });
    }
  };

  textValueChange = e => {
    this.setState({
      textValue: e.target.value,
    });
  };

  addSlide = () => {
    const { image, textList } = this.state;
    this.setState(prevState => ({
      slideList: [
        ...prevState.slideList,
        {
          image,
          imageBase64: this.getBase64Image(this.imageRef),
          textList,
        },
      ],
      image: null,
      textList: [],
    }));
  };

  uploadImage = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  clearSlide = () => {
    this.setState({
      image: null,
      textList: [],
    });
  };

  loadSlide = slide => {
    this.setState({
      image: slide.image,
      textList: slide.textList,
    });
  };

  saveDeck = () => {
    const { slideList } = this.state;
    if (slideList.length > 0) {
      window.localStorage.setItem('slideList', JSON.stringify(slideList));
      this.setState({
        deckMessage: 'Deck saved',
        deckWarning: '',
      });
    } else {
      this.setState({ deckWarning: 'There is no slide' });
    }
  };

  loadDeck = () => {
    if (window.localStorage.getItem('slideList')) {
      const slideList = JSON.parse(window.localStorage.getItem('slideList'));
      const loadedSlideList = slideList.map(slide => {
        return {
          ...slide,
          image: `data:image/png;base64,${slide.imageBase64}`,
        };
      });
      this.setState({
        slideList: loadedSlideList,
        deckMessage: 'Deck loaded',
        deckWarning: '',
      });
    } else {
      this.setState({
        deckWarning: "You didn't save a SlideList",
      });
    }
  };

  getBase64Image = img => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  };

  render() {
    const {
      slideList,
      textList,
      image,
      textModal,
      textValue,
      addTextWarning,
      deckWarning,
      deckMessage,
    } = this.state;
    return (
      <Container className="mt-4">
        <Row>
          <Col sm="3">
            <SlideListContainer>
              <h6>Slide List</h6>
              <SlideList>
                {slideList.map(slide => (
                  <SlideListItem onClick={() => this.loadSlide(slide)}>
                    <Thumb src={slide.image} />
                  </SlideListItem>
                ))}
              </SlideList>
            </SlideListContainer>
          </Col>
          <Col sm="9">
            <ImageContainer>
              <Image src={image} ref={imageRef => (this.imageRef = imageRef)} />
              {textList.map((text, index) => (
                <Draggable
                  handle=".handle"
                  defaultPosition={{ x: 0, y: index * 36 }}
                  position={{ x: text.x, y: text.y }}
                  bounds="parent"
                  onStart={this.onStart}
                  onStop={(e, position) => {
                    this.onStop(position, index);
                  }}
                >
                  <FloatContainer>
                    <div className="handle">
                      <div>{text.textValue}</div>
                    </div>
                  </FloatContainer>
                </Draggable>
              ))}
            </ImageContainer>
            <ButtonListContainer>
              <ButtonList
                style={{ alignSelf: 'flex-start', justifySelf: 'flex-start' }}
              >
                <Input type="file" onChange={this.uploadImage} />
                <Button onClick={this.textModalToggle}>Add Text</Button>
              </ButtonList>
              <ButtonList>
                <Button onClick={this.addSlide}>Add New Slide</Button>
                <Button onClick={this.saveDeck}>Save Deck</Button>
                <Button onClick={this.loadDeck}>Load Deck</Button>
                <Button onClick={this.clearSlide}>Clear This</Button>
              </ButtonList>
            </ButtonListContainer>
            <TextModal
              isOpen={textModal}
              toggle={this.textModalToggle}
              textValue={textValue}
              textValueChange={this.textValueChange}
              addText={this.addText}
              warning={addTextWarning}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 3 }}>
            {deckWarning && <Badge color="warning">{deckWarning}</Badge>}
            {deckMessage && <Badge color="success">{deckMessage}</Badge>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
