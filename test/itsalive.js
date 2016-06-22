var expect = require("chai").expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe("Testing tests", function() {

	it("checks that 2+2 = 4", function() {
		expect(2 + 2).to.equal(4);
	});

	it("setTimeout waits for the right amount of time", function(done) {
		var start = new Date();
		setTimeout(function() {
			var duration = new Date() - start;
			expect(duration).to.be.closeTo(1000, 50);
			done();
		}, 1000);
	});

  it('will invoke a function once per element', function () {
    var arr = ['x','y','z'];
      function logNth (val, idx) {
        console.log('Logging elem #'+idx+':', val);
      }
    var logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);
  });

});
