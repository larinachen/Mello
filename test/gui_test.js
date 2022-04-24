import { expect } from 'chai';
import { add_goal } from '../src/js/journal.js';

var expect    = require("chai").expect;
var journal = require("../js/journal.js");


describe('add_goal', function () {
  it('check total of entries increment by one when add_goal is called', () => {
    expect(add_goal())
  });
});