var expect = chai.expect;

describe("User", function () {
    it("should always set the user_id", function () {
            var userId = 'mycustomid';
            var user1 = new GA.User();
            var user2 = new GA.User(userId);

            expect(user1).to.have.property('user_id');
            expect(user2).to.have.property('user_id');

            expect(user1.user_id).to.equal('');
            expect(user2.user_id).to.equal(userId);
        }
    );

    it("should only set the facebookId if it contains characters", function () {
        var validFacebookId = 'msfkawtyer';
        var invalidFacebookIds = ['', 0, true, false];

        var user = new GA.User(1, validFacebookId);
        expect(user).to.have.property('facebook_id');
        expect(user.facebook_id).to.equal(validFacebookId);

        invalidFacebookIds.forEach(function (id) {
            var user = new GA.User(1, id);
            expect(user).to.not.have.property('facebook_id');
        })
    });

    it("should only set the gender if it's valid", function () {
        var user = new GA.User(1, false, GA.Gender.male);
        expect(user).to.have.property('gender');
        expect(user.gender).to.equal(GA.Gender.male);

        var user = new GA.User(1, false, GA.Gender.female);
        expect(user).to.have.property('gender');
        expect(user.gender).to.equal(GA.Gender.female);

        var user = new GA.User(1, false, 3);
        expect(user).to.have.not.property('gender');
    });

    it("should only set the birthyear if its a valid year format", function () {
        var validYear = 1970;
        var invalidYears = [999, 99999, 'blaaat', false];

        var user = new GA.User(1, false, false, validYear);
        expect(user).to.have.property('birth_year');
        expect(user.birth_year).to.equal(validYear);

        invalidYears.forEach(function (year) {
            var user = new GA.User(1, false, false, year);
            expect(user).to.not.have.property('birth_year');
        })

    });
});