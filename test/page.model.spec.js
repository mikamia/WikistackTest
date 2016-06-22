var chai = require('chai');
var expect = require("chai").expect;
var spies = require('chai-spies');
chai.use(spies);
var models = require("../models");
var Page = models.Page;

describe('Pages model', function () {
	var page;
	beforeEach(function () {
		page = Page.build();
	});
	describe('route', function () {
		it('returns the url_name prepended by "/wiki/"', function() {
			page.urlTitle = 'some_title';
			expect(page.route).to.equal("/wiki/some_title" );
		});
		//xit('');
	});
	//describe('renderedContent');
});
