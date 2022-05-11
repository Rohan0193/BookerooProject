import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer'

// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BooksList from './components/BookDisplay/BooksList';

configure({ adapter: new Adapter() });

//snapshot testing
//bookslist
describe('Snapshot Testing -- BooksList', () => {
  it('Test to see if component works as expected',() => {
    const component = renderer.create(<BooksList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})


// describe('Test useEffect() function in books list', () => {
//   it('Gets the right amount of entries in the database', () =>{
//      shallow( 
//             <BooksList />
//             ).dive()
//             expect(wrapper.find('p').text()).toContain("There are 1 in the database!")
//   })
// })
