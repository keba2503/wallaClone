import React from 'react';
import { shallow } from 'enzyme';
import ADSList from './ADSList';

describe('ADSSList', () => {
  const props = {
    className: 'test',
    ADS: [{ id: '1' }, { id: '3' }],
    addToCart: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ADSList {...props} />);
  });

  test('snapshot testing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have a "test" class', () => {
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  test('should render a List of ADS', () => {
    expect(wrapper.find('List').props().items).toEqual(props.ADS);
  });

  test('should add a ADSS to cart', () => {
    const ADSS = {
      id: '1',
      price: 895,
      name: 'name',
      image: 'image',
      hasStock: true,
    };
    const ADSSItem = shallow(wrapper.find('List').props().renderItem(ADSS));
    ADSSItem.find('button').simulate('click');
    expect(props.addToCart).toHaveBeenCalledWith(ADSS.id);
    // const ADSSItem = wrapper.find('List').props().renderItem(ADSS);
    // ADSSItem.props.onAddToCartClick();
    // expect(props.addToCart).toHaveBeenCalledWith(ADSS.id);
  });
});
