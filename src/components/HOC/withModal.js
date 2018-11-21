import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../theme/Wrapper';
import Overlay from '../../theme/Overlay';
import withDocumentClick from './withDocumentClick';

export const ModalWrap = withDocumentClick(({ children }) => (
  <Wrapper
    display="flex"
    position="fixed"
    top="0px"
    left="0px"
    width="100%"
    height="100%"
    textAlign="left"
    justifyContent="center"
    alignItems="center"
    zIndex={4}
  >
    {children}
  </Wrapper>
));

export default ComposedComponent => {
  class withModalComponent extends PureComponent {
    static getDerivedStateFromProps = nextProps => ({
      isOpen: nextProps.isOpen,
    });
    state = {
      isOpen: this.props.isOpen,
    };
    onDocumentClick = event =>
      this.state.isOpen && this.props.hideOnOutsideClick && !this.modalRef.contains(event.target) && this.closeModal();
    setModalRef = element => {
      this.modalRef = element;
    };
    closeModal = () => this.setState({ isOpen: false }, () => this.props.onModalClose());
    render = () =>
      this.state.isOpen && (
        <ModalWrap className="modal" innerRef={this.setModalRef} onDocumentClick={this.onDocumentClick}>
          <Overlay background="rgb(0, 0, 0)" opacity="0.6" />
          <ComposedComponent closeModal={this.closeModal} {...this.props} />;
        </ModalWrap>
      );
  }
  withModalComponent.defaultProps = {
    hideOnOutsideClick: false,
    isOpen: false,
    onModalClose() {},
    children() {},
  };
  withModalComponent.propTypes = {
    hideOnOutsideClick: PropTypes.bool,
    isOpen: PropTypes.bool,
    onModalClose: PropTypes.func,
    children: PropTypes.func,
  };
  return withModalComponent;
};
