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
	});

	describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
      		page.content = "some content";
      		expect(page.renderedContent).to.equal('<p>'+page.content+'</p>\n');
      });
    });
});
