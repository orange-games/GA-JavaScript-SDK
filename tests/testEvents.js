var expect = chai.expect;

describe("Events", function () {
    describe("Business", function () {
        it("Should be of category business", function () {
            var b = new GA.Events.Business('foo:bar', 5, 'EUR', 100, 'foo', 'bar');

            expect(b.category).to.equal(GA.Events.Category.business);
        });

        it("Should throw an error if an incorrect event_id is supplied", function () {
            var InvalidIds = [
                'asdasd',
                'asdasf2@$',
                'foo:',
                'foo:bar:baz:bin',
                1234123,
                true,
                undefined
            ];

            InvalidIds.forEach(function (id) {
                expect(function () {
                    var b = new GA.Events.Business(id, 5, 'EUR', 100);
                }).to.throw(Error);
            });
        });

        it("Should throw an error if an incorrect currency is supplied", function () {
            var InvalidCurrencies = [
                'asdasd',
                'asdasf2@$',
                'EU',
                'EURA',
                1234123,
                true
            ];

            InvalidCurrencies.forEach(function (c) {
                expect(function () {
                    var b = new GA.Events.Business('foo:bar', 5, 'c', 100);
                }).to.throw(Error);
            });
        });

        it("Should throw an error when cart type is too long", function () {
            var correctType = 'this_is_cart_type';
            var incorrectType = 'this_is_way_too_long_to_be_a_correct_cart_type';

            expect(function () {
                var b = new GA.Events.Business('foo:bar', 5, 'EUR', 100, correctType);
            }).to.not.throw();

            expect(function () {
                var b = new GA.Events.Business('foo:bar', 5, 'EUR', 100, incorrectType);
            }).to.throw();
        });
    });

    describe("Resourse", function () {
        it("Should be of category Resource", function () {
            var b = new GA.Events.Resource('Sink:foo:bar:baz', 1);

            expect(b.category).to.equal(GA.Events.Category.resource);
        });

        it("Should throw an error if an incorrect event_id is supplied", function () {
            var InvalidIds = [
                'asdasd',
                'asdasf2@$',
                'foo:bar',
                'foo:bar:baz:bin',
                1234123,
                true,
                undefined
            ];

            InvalidIds.forEach(function (id) {
                expect(function () {
                    var b = new GA.Events.Resource(id, 5);
                }).to.throw(Error);
            });
        });
    });

    describe("Progression", function () {
        it("Should be of category progression", function () {
            var b = new GA.Events.Progression('Start:level1', 1, 1);

            expect(b.category).to.equal(GA.Events.Category.progression);
        });

        it("Should throw an error if an incorrect event_id is supplied", function () {
            var InvalidIds = [
                'asdasd',
                'asdasf2@$',
                'foo:bar',
                'foo:bar:baz:bin',
                1234123,
                true,
                undefined
            ];

            InvalidIds.forEach(function (id) {
                expect(function () {
                    var b = new GA.Events.Progression(id, 1, 1);
                }).to.throw(Error);
            });
        });
    });

    describe("Init", function () {
        it("should work correctly?", function () {
            var e = new GA.Events.Init({foo:'bar'});

            expect(e.toString()).to.be.a('string');
        });
    });
});