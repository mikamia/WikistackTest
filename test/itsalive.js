var expect = require("chai").expect;

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
});
