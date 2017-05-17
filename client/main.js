import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const symbols = { "a": 1, "b": 5, "c": 10 }



Template.tester.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.formula = new ReactiveVar("a+b*c");
});


Template.tester.helpers({
  expression(){
    const mkFunc = require('expression-parser/func');
    formula = Template.instance().formula.get();
    expression = mkFunc.express(formula);
    console.log(formula, expression);
    return mkFunc.express(formula);
  },
  formula(){
    return Template.instance().formula.get();
  },
  result(){
    const mkFunc = require('expression-parser/func');
    formula = Template.instance().formula.get();
    const fn = mkFunc(formula);
    const value = fn(symbols);
    return value;
  }
});

Template.tester.events({
  'input input'(event, instance) {
    let value = event.currentTarget.value;
    console.log("New value:" + value);
    // increment the counter when button is clicked
    instance.formula.set(value);
  },
});
