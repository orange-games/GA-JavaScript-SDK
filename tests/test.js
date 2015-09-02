var expect = chai.expect;

describe("GA", function () {
    describe("Utils", function () {
        it("should have a method called createUniqueId", function () {
            expect(GA.Utils).to.have.property('createUniqueId');
            expect(GA.Utils.createUniqueId).to.be.a('function');
        });

        describe("createUniqueId", function () {
            it('should return a valid uuid v4', function () {
                var uuid = GA.Utils.createUniqueId();
                expect(uuid).to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/gi);
            });
        });
    });
});