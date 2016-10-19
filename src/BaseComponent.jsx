import React from 'react';

// Found this method to simplify binding context to functions - http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}
