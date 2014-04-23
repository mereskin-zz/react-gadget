/** @jsx React.DOM */
var Gadget = React.createClass({
  getDefaultProps: function(){
    return {
      foo: 'bar',
      editable: false
    };
  },

  render: function(){
    return (
      <div>
      <span>{this.props.editable.toString()}</span>
      <span>{this.props.foo}</span>
      </div>
    );
  }
});

var gadget = React.renderComponent(new Gadget(), document.getElementById('container'));

window.addEventListener('message', function(evt){
  var message = evt.data;
  if(message && message.event) {
    switch(message.event){

      case 'editableChanged':
      case 'attributesChanged':
        gadget.setProps(message.data);
        break;

      case 'learnerStateChanged':
        gadget.setState(message.data);
        break;

      case 'attached':
        break;
    }
  }
});

window.parent.postMessage({ event: 'start' }, '*');
