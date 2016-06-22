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

	describe('Class methods', function () {

		beforeEach(function (done) {
  		Page.create({
		    title: 'foo',
		    content: 'bar',
		    tags: ['foo', 'bar']
  		})
  		.then(function () {
    		done();
  		})
  		.catch(done);
		});

		afterEach(function (done){
			Page.sync({force:true}).then(function(){
				done();
			}).catch(done);

		});


	  describe('findByTag', function () {
      it('gets pages with the search tag', function(done){
      	Page.findByTag('foo').then(function(page){
      		//console.log(page);
      		//expect(tomato).to.exist;
      		//expect(undefined).to.exist;
      		expect(page).to.exist;
      		done();
      	}).catch(done);

      });
      it('does not get pages without the search tag', function(done){
      	Page.findByTag(['foo','bar']).then(function(pages){
      		expect(pages.length).to.equal(1);
      		done();
      	}).catch(done);
      });
	  });
	}); //end of class methods describe

	describe('Instance methods', function () {

		//create 3 pages
		beforeEach(function (done) {

  		var p1 = Page.create({
		    title: 'foo1',
		    content: 'bar',
		    tags: ['foo','tomato']
  		})

  		var p2 = Page.create({
		    title: 'foo',
		    content: 'bar',
		    tags: ['footissimo', 'foo']
  		})

  		var p3 = Page.create({
		    title: 'foo',
		    content: 'bar',
		    tags: ['baz']
  		})

  		Promise.all([p1,p2,p3]).then(function(){
    		done();
  		}).catch(done);

		});

		afterEach(function (done){
			Page.sync({force:true}).then(function(){
				done();
			}).catch(done);

		});

    describe('findSimilar', function () {
      it('never gets itself', function(done){
      	return Page.findOne({
      		where: {
      			title: 'foo1'
      		}
      	}).then(function(foundPage){
      		return foundPage.findSimilar().then(function(similarPages){
      			var same = false;
      			similarPages.forEach(function(aPage){
      				if(aPage.id === foundPage.id) same = true;
      			});
      			expect(same).to.equal(false);
      			done();
      			})
      	}).catch(done);
    	}); //end of it
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });


});
