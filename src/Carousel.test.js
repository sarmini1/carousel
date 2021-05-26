import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', function () {
  render(<Carousel />);
});

it('matches snapshot', function () {
  const { container } = render(<Carousel />);
  expect(container).toMatchSnapshot();
});


it('works when you click on the right arrow', function () {
  const { container } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    container.querySelector(
      'img[alt="Photo by Richard Pasquarella on Unsplash"]'
    )
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector('.fa-chevron-circle-right');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector(
      'img[alt="Photo by Richard Pasquarella on Unsplash"]'
    )
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).toBeInTheDocument();
});


it('works when you click on the left arrow', function () {
  const { debug, container } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    container.querySelector(
      'img[alt="Photo by Richard Pasquarella on Unsplash"]'
    )
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector('.fa-chevron-circle-right');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector(
      'img[alt="Photo by Richard Pasquarella on Unsplash"]'
    )
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector('.fa-chevron-circle-left');
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector(
      'img[alt="Photo by Richard Pasquarella on Unsplash"]'
    )
  ).toBeInTheDocument();
});


it('left arrow is not rendered when cardIdx is 1', function () {
  const { debug, container } = render(<Carousel />);

  const leftArrow = container.querySelector('.fa-chevron-circle-left');
  expect(leftArrow.getAttribute('style')).toEqual('visibility: hidden;');
});


it('right arrow is not rendered when cardIdx is 3', function () {
  const { debug, container } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = container.querySelector('.fa-chevron-circle-right');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  debug(container);
  expect(rightArrow.getAttribute('style')).toEqual('visibility: hidden;');
});
