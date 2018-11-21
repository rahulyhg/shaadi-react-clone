import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import initializeStore from '../../../../store';
import { UploadFromComputerBtn, ImportFromFbBtn } from '../../Photo';

const store = initializeStore();
const doHeaderAction = jest.fn();
const onChange = jest.fn();
const onClick = jest.fn();

const fileContents = 'file contents';
const file = new Blob([fileContents], { type: 'text/plain' });
const files = [file];
const target = { files };
const event = { target };

describe('Upload From Computer Button', () => {
  it('render test', () => {
    UploadFromComputerBtn.mapStateToProps();
    const props = {
      doHeaderAction,
    };
    const wrapper = mount(
      <Provider store={store}>
        <UploadFromComputerBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('Upload From Computer Button with no icon', () => {
    const props = {
      doHeaderAction,
      showIcon: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <UploadFromComputerBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('Upload From Computer Button trigger onChange with props passed function', () => {
    const props = {
      doHeaderAction,
      showIcon: false,
      onChange,
    };
    const wrapper = mount(
      <Provider store={store}>
        <UploadFromComputerBtn.WrappedComponent {...props} />
      </Provider>,
    );

    expect(wrapper.find('input[type="file"]').at(0)).toHaveLength(1);
    wrapper
      .find('input[type="file"]')
      .at(0)
      .simulate('change', event);
  });

  it('Upload From Computer Button trigger onChange doHeaderAction', () => {
    const props = {
      doHeaderAction,
      showIcon: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <UploadFromComputerBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper.find('input[type="file"]').at(0)).toHaveLength(1);
    wrapper
      .find('input[type="file"]')
      .at(0)
      .simulate('change', event);
  });
});

describe('Import from Facebook', () => {
  it('render test', () => {
    ImportFromFbBtn.mapStateToProps();
    const props = {
      doHeaderAction,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ImportFromFbBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('render ImportFromFbBtn with no icon and no border but with backgound', () => {
    const props = {
      doHeaderAction,
      showIcon: false,
      fbBorder: false,
      useBackground: true,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ImportFromFbBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('click on import btn', () => {
    const props = {
      doHeaderAction,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ImportFromFbBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper.find('#import-from-fb-btn').at(0)).toHaveLength(1);
    wrapper
      .find('#import-from-fb-btn')
      .at(0)
      .simulate('click');
  });

  it('click on import btn', () => {
    const props = {
      doHeaderAction,
      onClick,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ImportFromFbBtn.WrappedComponent {...props} />
      </Provider>,
    );
    expect(wrapper.find('#import-from-fb-btn').at(0)).toHaveLength(1);
    wrapper
      .find('#import-from-fb-btn')
      .at(0)
      .simulate('click');
  });
});

/* describe('uploadFromComputer', () => {
  it('file upload must fail as it is a text file', () => {
    const fileContents = 'file contents';
    const expectedFinalState = { fileContents };
    const file = new Blob([fileContents], { type: 'text/plain' });
    const readAsText = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => {
      evtHandler();
    });
    const dummyFileReader = { addEventListener, readAsText, result: fileContents };
    window.FileReader = jest.fn(() => dummyFileReader);

    // spyOn(component, 'setState').and.callThrough();
    // spyOn(component, 'changeHandler').and.callThrough(); // not yet working

    component.find('input').simulate('change', { target: { files: [file] } });

    expect(FileReader).toHaveBeenCalled();
    // expect(addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    expect(readAsText).toHaveBeenCalledWith(file);
    expect(component.setState).toHaveBeenCalledWith(expectedFinalState);
    expect(component.state).toEqual(expectedFinalState);
    // expect(component.changeHandler).toHaveBeenCalled(); // not yet working

    const items = [{ id: 1, text: 'hello' }, { id: 2, text: 'world' }];
    const handleClickStub = sinon.spy();
    const wrapper = mount(<UploadFromComputerBtn />); 
    console.log(wrapper.state('clickedChild')) // prints false
    wrapper.find(ChildComponent).last().simulate('click')
    expect(handleClickStub.calledOnce).to.be.true // successful
    console.log(wrapper.state('clickedChild'))  // prints true
  });
}); */
