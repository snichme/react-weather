'use strict';

//jest.unmock('../');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Navigation from '../../components/Navigation';
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies);

const should = chai.should();
const expect = chai.expect


describe('Navigation', () => {

  var Wrapper = React.createClass({
    render: function() {
      return (
        <div>{this.props.children}</div>
      );
    }
  });

  it('should render the given query in the search input field', () => {
    // Render a checkbox with label in the document
    let callback = () => {
    }

    const checkbox = TestUtils.renderIntoDocument(
      <Wrapper>
        <Navigation query="TestQuery" onSearch={callback} />
        </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    expect(input.value).to.equal("TestQuery")
  });

  it('should call callback when [Enter] is pressed', () => {
    // Render a checkbox with label in the document
    let callback = chai.spy("search spy")

    const checkbox = TestUtils.renderIntoDocument(
      <Wrapper>
        <Navigation query="TestQuery" onSearch={callback} />
      </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')

    TestUtils.Simulate.keyUp(input, {
      target: {
        value: "searchStringTest"
      },
      nativeEvent: {
        key: "Enter",
        keyCode: 13,
        which: 13
      }
    });

    expect(callback).to.have.been.called.with('searchStringTest');
    expect(callback).to.have.been.called.once;

  });
});
