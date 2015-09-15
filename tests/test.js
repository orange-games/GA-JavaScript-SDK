var expect = chai.expect;

describe("GA", function () {
    it("should have a method called getInstance that returns a new GameAnalytics instance", function () {
        expect(GA).to.have.property('getInstance');
        expect(GA.getInstance).to.be.a('function');
        expect(GA.getInstance()).to.be.instanceof(GA.GameAnalytics);
    });

    describe("GameAnalytics", function () {

    });

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

        it("should have a method called postRequest", function () {
            expect(GA.Utils).to.have.property('postRequest');
            expect(GA.Utils.postRequest).to.be.a('function');
        });

        describe("postRequest", function () {
            describe('when doing successful request', function () {
                var xhr, requests = [];
                beforeEach(function () {
                    this.xhr = sinon.useFakeXMLHttpRequest();

                    this.requests = [];
                    this.xhr.onCreate = function(xhr) {
                        this.requests.push(xhr);
                    }.bind(this);
                });

                afterEach(function () {
                    this.xhr.restore();
                });

                it('should call an callback with an object that has success set to true on a good post and a message from the server', function (done) {
                    GA.Utils.postRequest('http://blaat', {}, '', function (data) {
                        expect(data.success).to.equal(true);
                        expect(data.message).to.equal('OK');
                        done();
                    });

                    this.requests[0].respond(200, { 'Content-Type': 'text/plain' }, 'OK');
                });

                it('should call an callback with an error on incorrect http status', function (done) {
                    GA.Utils.postRequest('http://blaat', {}, '', function (data) {
                        expect(data.success).to.equal(false);
                        expect(data.message).to.match(/^Error/gi);
                        done();
                    });

                    this.requests[0].respond(404, { 'Content-Type': 'text/plain' }, '');
                });

                it('should call an callback when there is no XMLHttpRequest', function () {
                    window.XMLHttpRequest = null;
                });
            });

            describe('when in IE9', function () {
                beforeEach(function () {
                    window._XMLHttpRequest = window.XMLHttpRequest;
                    window.XMLHttpRequest = null;
                });

                afterEach(function () {
                    window.XMLHttpRequest = window._XMLHttpRequest;
                });

                it('should call an callback when there is no XMLHttpRequest', function (done) {
                    GA.Utils.postRequest('http://blaat', {}, '', function (data) {
                        expect(data.success).to.equal(false);
                        expect(data.message).to.match(/^Error/gi);
                        done();
                    });

                });
            });

            describe('when failing on error', function () {
                var oldF;
                beforeEach(function () {
                    var oldF = window.XMLHttpRequest.prototype.send;
                    window.XMLHttpRequest.prototype.send = function () {
                        throw new Error('w00t');
                    };
                });

                afterEach(function () {
                    window.XMLHttpRequest.prototype.send = oldF;
                });

                it('should call an callback when there is no XMLHttpRequest', function (done) {
                    GA.Utils.postRequest('http://blaat', {}, '', function (data) {
                        expect(data.success).to.equal(false);
                        expect(data.message).to.match(/^Error/gi);
                        done();
                    });

                });
            });
        });

        describe("Message", function () {
            it("should have a local event and annotations", function () {
                var testEvent = new GA.Events.User();
                var annotations = GA.Utils.getBaseAnnotations();
                var message = new GA.Utils.Message(testEvent, annotations);

                expect(message.event).to.equal(testEvent);
                expect(message.annotations).to.equal(annotations);
            });

            it("should have a property data that returns a nice object that can be send over the wire", function () {
                var testEvent = new GA.Events.SessionEnd(300);
                var annotations = GA.Utils.getBaseAnnotations();
                var message = new GA.Utils.Message(testEvent, annotations);

                expect(function () {
                    JSON.stringify(message.data)
                }).to.not.throw(Error);
            });

        });

        describe("MessageQueue", function () {
            it("should behave like an Queue, meaning it can push/pop data and has a length", function () {
                var queue = new GA.Utils.MessageQueue();
                var testEvent = new GA.Events.SessionEnd(300);
                var annotations = GA.Utils.getBaseAnnotations();
                var message = new GA.Utils.Message(testEvent, annotations);

                expect(queue).to.have.property('pop');
                expect(queue).to.have.property('push');
                expect(queue).to.have.property('length');

                expect(queue.length).to.equal(0);
                queue.push(message);
                expect(queue.length).to.equal(1);
                expect(queue.pop()).to.equal(message);
                expect(queue.length).to.equal(0);
            });
        });

        describe("Response", function () {
            it("should be default have an empty message and success equal false", function () {
                var response = new GA.Utils.Response();

                expect(response.message).to.equal('');
                expect(response.success).to.equal(false);
            });
        });

        describe("Annotations", function () {
            describe("getDefaultAnnotations", function () {
                describe('on a desktop', function () {
                    it("should return a nice object we can send to gameanalytics including some device data", function () {
                        var user = new GA.User('124123', '1241234', GA.Gender.male, 1970);
                        var obj = GA.Utils.getDefaultAnnotations(user, '12341234', '1');

                        expect(obj).to.have.property('platform');
                        expect(obj.platform).to.equal('windows');
                        expect(obj).to.have.property('os_version');
                        expect(obj.os_version).to.equal('windows 8');
                        expect(obj).to.have.property('device');
                        expect(obj.device).to.equal('unknown');
                        expect(obj).to.have.property('manufacturer');
                        expect(obj.manufacturer).to.equal('unknown');
                        expect(obj).to.have.property('facebook_id');
                        expect(obj).to.have.property('gender');
                        expect(obj).to.have.property('birth_year');
                        expect(obj).to.have.property('user_id');
                    });
                });
            });
        });
    });
});