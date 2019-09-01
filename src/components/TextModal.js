import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from 'reactstrap';

function TextModal({
  isOpen,
  toggle,
  addText,
  warning,
  textValue,
  textValueChange,
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>What is your message?</ModalHeader>
      <ModalBody>
        <Input value={textValue} onChange={textValueChange} />
      </ModalBody>
      <ModalFooter>
        {warning && <Badge color="warning">{warning}</Badge>}
        <Button color="primary" onClick={addText}>
          Add Text
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

TextModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  addText: PropTypes.func.isRequired,
  textValueChange: PropTypes.func.isRequired,

  isOpen: PropTypes.bool.isRequired,
  warning: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
};

export default TextModal;
