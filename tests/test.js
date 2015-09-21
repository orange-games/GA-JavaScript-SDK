var expect = chai.expect;

describe("GA", function () {
    it("should have a method called getInstance that returns a new GameAnalytics instance", function () {
        expect(GA).to.have.property('getInstance');
        expect(GA.getInstance).to.be.a('function');
        expect(GA.getInstance()).to.be.instanceof(GA.GameAnalytics);
    });

    describe("GameAnalytics", function () {

    });
});