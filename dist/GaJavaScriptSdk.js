/*!
 * GA-JavaScript-SDK - version 2.0.2 
 * Unofficial JavaScript SDK for GameAnalytics, REST API v2 version
 *
 * Gembly BV
 * Build at 05-10-2015
 * Released under GNUv3 License 
 */

var GA;
(function (GA) {
    (function (Platform) {
        Platform[Platform["ios"] = 0] = "ios";
        Platform[Platform["android"] = 1] = "android";
        Platform[Platform["windows"] = 2] = "windows";
        Platform[Platform["windows_phone"] = 3] = "windows_phone";
        Platform[Platform["blackberry"] = 4] = "blackberry";
        Platform[Platform["roku"] = 5] = "roku";
        Platform[Platform["tizen"] = 6] = "tizen";
        Platform[Platform["nacl"] = 7] = "nacl";
        Platform[Platform["mac_osx"] = 8] = "mac_osx";
        Platform[Platform["webplayer"] = 9] = "webplayer";
    })(GA.Platform || (GA.Platform = {}));
    var Platform = GA.Platform;
    (function (Gender) {
        Gender[Gender["male"] = 0] = "male";
        Gender[Gender["female"] = 1] = "female";
    })(GA.Gender || (GA.Gender = {}));
    var Gender = GA.Gender;
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}$/;
        var Business = (function () {
            function Business(event_id, amount, currency, transaction_num, cart_type, receipt_info) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 1 /* business */;
                /**
                 * Similar to the session_num. Store this value locally and increment each time a business event is submitted during the lifetime (installation) of the game/app.
                 * @type {number}
                 */
                this.transaction_num = 0;
                if (!event_id || null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for BusinessEvent');
                }
                this.event_id = event_id;
                this.amount = amount;
                if (!currency || null === currency.match(/^[A-Z]{3}$/)) {
                    throw new Error('Invalid currency supplied for BusinessEvent');
                }
                this.currency = currency;
                this.transaction_num = transaction_num;
                if (cart_type) {
                    if (cart_type.length > 32) {
                        throw new Error('A too long cart_type was supplied, should be max 32 characters');
                    }
                    this.cart_type = cart_type;
                }
                if (receipt_info !== undefined) {
                    this.receipt_info = receipt_info;
                }
            }
            return Business;
        })();
        Events.Business = Business;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,4}$/;
        var Design = (function () {
            function Design(event_id, value) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 0 /* design */;
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for DesignEvent');
                }
                this.event_id = event_id;
                if (value !== undefined) {
                    this.value = value;
                }
            }
            return Design;
        })();
        Events.Design = Design;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        (function (Category) {
            Category[Category["design"] = 0] = "design";
            Category[Category["business"] = 1] = "business";
            Category[Category["error"] = 2] = "error";
            Category[Category["user"] = 3] = "user";
            Category[Category["session_end"] = 4] = "session_end";
            Category[Category["progression"] = 5] = "progression";
            Category[Category["resource"] = 6] = "resource";
        })(Events.Category || (Events.Category = {}));
        var Category = Events.Category;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        (function (ErrorSeverity) {
            ErrorSeverity[ErrorSeverity["debug"] = 0] = "debug";
            ErrorSeverity[ErrorSeverity["info"] = 1] = "info";
            ErrorSeverity[ErrorSeverity["warning"] = 2] = "warning";
            ErrorSeverity[ErrorSeverity["error"] = 3] = "error";
            ErrorSeverity[ErrorSeverity["critical"] = 4] = "critical";
        })(Events.ErrorSeverity || (Events.ErrorSeverity = {}));
        var ErrorSeverity = Events.ErrorSeverity;
        var Exception = (function () {
            /**
             * Create a new Error event
             *
             * @param severity  Error severity, should be of type ErrorSeverity
             * @param message   The emssage of the error, we'd like new Error().stack
             */
            function Exception(severity, message) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 2 /* error */;
                /**
                 * Stack trace or other information detailing the error. Can be an empty string.
                 */
                this.message = '';
                this.severity = ErrorSeverity[severity];
                if (message !== undefined) {
                    //Trim it because GameAnalytics doesn't accept bigger message
                    this.message = message.substr(0, 8192);
                }
            }
            return Exception;
        })();
        Events.Exception = Exception;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        /**
         * The response object for an Init event. This tells us if we're allowed to do future requests
         */
        var InitResponse = (function () {
            function InitResponse() {
            }
            return InitResponse;
        })();
        Events.InitResponse = InitResponse;
        /**
         * Init event, should be called when a new session starts
         */
        var Init = (function () {
            function Init(data) {
                this.data = data;
            }
            Init.prototype.toString = function () {
                return JSON.stringify(this.data);
            };
            return Init;
        })();
        Events.Init = Init;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        var eventIdCheck = /^(Start|Fail|Complete):[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,2}$/;
        var Progression = (function () {
            function Progression(event_id, attempt_num, score) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 5 /* progression */;
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for ProgressionEvent');
                }
                this.event_id = event_id;
                if (attempt_num !== undefined) {
                    this.attempt_num = attempt_num;
                }
                if (score !== undefined) {
                    this.score = score;
                }
            }
            return Progression;
        })();
        Events.Progression = Progression;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        var eventIdCheck = /^(Sink|Source):[A-Za-z]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}/;
        var Resource = (function () {
            function Resource(event_id, amount) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 6 /* resource */;
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for ResourceEvent');
                }
                this.event_id = event_id;
                this.amount = amount;
            }
            return Resource;
        })();
        Events.Resource = Resource;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        /**
         * The session_end event should always be sent whenever a session is determined to be over.
         * For example whenever a mobile device is ‘going-to-background’ or when a user quit your game in other ways.
         * Only one session_end event per session should be generated/sent.
         */
        var SessionEnd = (function () {
            function SessionEnd(lenth) {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 4 /* session_end */;
                /**
                 * The length of the session in seconds
                 *
                 * @type {number}
                 */
                this.length = 0;
                this.length = length;
            }
            return SessionEnd;
        })();
        Events.SessionEnd = SessionEnd;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Events;
    (function (Events) {
        /**
         * The user event acts like a session start.
         * It should always be the first event in the first batch sent to the collectors and added each time a session starts.
         */
        var User = (function () {
            function User() {
                /**
                 * The category of this event, sendEvent to GameAnalytics to identify the event type
                 *
                 * @type {GA.Events.Category}
                 */
                this.category = 3 /* user */;
            }
            return User;
        })();
        Events.User = User;
    })(Events = GA.Events || (GA.Events = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    /**
     * Fetches an created instance
     *
     * @returns {GameAnalytics}
     */
    function getInstance() {
        if (null === GameAnalytics.instance) {
            GameAnalytics.instance = new GameAnalytics();
        }
        return GameAnalytics.instance;
    }
    GA.getInstance = getInstance;
    /**
     * GameAnalytics lib
     */
    var GameAnalytics = (function () {
        function GameAnalytics() {
            /**
             * The current sesison of the playing user
             *
             * @type {string}
             */
            this.sessionId = GA.Utils.createUniqueId();
            /**
             * Queue of messages for GameAnalytics, will be drained every 15 seconds or when a user calls sendData
             *
             * @type {GA.MessageQueue}
             */
            this.messageQueue = new GA.Utils.MessageQueue();
            /**
             * Used to check if events can be sent to the API, set based on the response of the init request
             *
             * @type {boolean}  events are only sendEvent of true
             */
            this.enabled = false;
            /**
             * If the init call has ben processed or not. If not, we reschedule sendData() calls so we make sure data is send
             *
             * @type {boolean}
             */
            this.initProcessed = false;
            /**
             * The message queue gets drained every 15 seconds, but we reset this time when sendData() was called manually
             *
             * @type {number}
             */
            this.timeoutId = 0;
            /**
             * An integer timestamp of the current server time in UTC (seconds since EPOCH).
             * This is stored locally along with client timestamp to calculate an offset (if client clock is not configured correctly).
             *
             * @type {number}
             */
            this.timeOffset = 0;
        }
        /**
         * This initializes the GameAnalytics stuff with some important parameters
         * GA won't work without!
         *
         * @param gameKey       a Game's unique key
         * @param secretKey     secret key used to auth an message
         * @param build         The build version of your application
         * @param userId        The id of the user
         */
        GameAnalytics.prototype.init = function (gameKey, secretKey, build, user) {
            var _this = this;
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }
            this.gameKey = gameKey;
            this.secretKey = secretKey;
            this.build = build;
            this.user = user;
            var initEvent = new GA.Events.Init(GA.Utils.getBaseAnnotations());
            this.sendEvent(initEvent.toString(), 'init', function (response) {
                _this.initProcessed = true;
                if (response.enabled === true) {
                    _this.enabled = true;
                    _this.timeOffset = (Date.now() / 1000 | 0) - response.server_ts;
                }
            });
            //Start the interval. The queue should be emptied every 15 seconds
            this.scheduleSendData(GameAnalytics.SCHEDULE_TIME);
            //Also make sure the queue is empty before we leave the page
            window.addEventListener('beforeunload', function () {
                _this.sendData();
            });
            return this;
        };
        /**
         * Adds an event to the message queue
         *
         * @param event
         */
        GameAnalytics.prototype.addEvent = function (event) {
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }
            var m = new GA.Utils.Message(event, GA.Utils.getDefaultAnnotations(this.user, this.sessionId, this.build, this.timeOffset));
            this.messageQueue.push(m);
            return this;
        };
        /**
         * Send data from the message queue
         */
        GameAnalytics.prototype.sendData = function () {
            if (this.initProcessed === false) {
                //Init not yet processed, try again in 1 second
                this.scheduleSendData(1000);
                return this;
            }
            if (this.enabled === false) {
                return this;
            }
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }
            var data = [];
            var d = '';
            while (this.messageQueue.length > 0) {
                var m = this.messageQueue.pop();
                data.push(m.data);
            }
            if (0 === data.length) {
                this.scheduleSendData(GameAnalytics.SCHEDULE_TIME);
                return this;
            }
            try {
                d = JSON.stringify(data);
            }
            catch (e) {
            }
            this.sendEvent(d, 'events');
            //Reschedule this method
            this.scheduleSendData(GameAnalytics.SCHEDULE_TIME);
            return this;
        };
        /**
         * Schedules the next time for a sendData call
         *
         * @param time  The time in ms until the next sendData call
         */
        GameAnalytics.prototype.scheduleSendData = function (time) {
            var _this = this;
            //Reschedule this method
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function () {
                _this.sendData();
            }, time);
        };
        /**
         * Sends a message to GA
         *
         * @param databag
         * @param event
         * @param responseHandler
         */
        GameAnalytics.prototype.sendEvent = function (databag, event, responseHandler) {
            if (responseHandler === void 0) { responseHandler = null; }
            if (null === GameAnalytics.instance && null === this.gameKey) {
                throw new Error('No instance available!');
            }
            if (databag.length < 1) {
                return;
            }
            var encryptedMessage = CryptoJS.HmacSHA256(databag, this.secretKey);
            var authHeader = CryptoJS.enc.Base64.stringify(encryptedMessage);
            var url = GameAnalytics.API_URL + this.gameKey + '/' + event;
            GA.Utils.postRequest(url, databag, authHeader, function (response) {
                if (response.success === false) {
                    if (window.console) {
                        console.log(response.message);
                    }
                }
                if (responseHandler != null) {
                    var r = '';
                    try {
                        r = JSON.parse(response.message);
                    }
                    catch (e) {
                    }
                    responseHandler(r);
                }
            });
        };
        GameAnalytics.SCHEDULE_TIME = 15000;
        /**
         * Version showing in GameAnalytics, I prefer Javascript 2.x.x but docs state
         * //Custom solutions should ALWAYS use the string “rest api v2”
         *
         * @type {string}
         */
        //public static SDK_VERSION:string = 'Javascript 2.0.0';
        GameAnalytics.SDK_VERSION = 'rest api v2';
        /**
         * The url for GameAnalytics' API
         *
         * @type {string}
         */
        GameAnalytics.API_URL = ('https:' === document.location.protocol ? 'https' : 'http') + '://api.gameanalytics.com/v2/';
        /**
         * Stored instance for GameAnalytics
         *
         * @type {GameAnalytics}
         */
        GameAnalytics.instance = null;
        return GameAnalytics;
    })();
    GA.GameAnalytics = GameAnalytics;
})(GA || (GA = {}));
var GA;
(function (GA) {
    var User = (function () {
        function User(user_id, facebook_id, gender, birth_year) {
            this.user_id = '';
            if (user_id) {
                this.user_id = user_id;
            }
            if (facebook_id && facebook_id.length > 0) {
                this.facebook_id = facebook_id;
                //https://github.com/GameAnalytics/GA-SDK-UNREAL/wiki/Set-Facebook-Id
                //User Id must be set to the player's Facebook Id.
                this.user_id = facebook_id;
            }
            if (gender === 1 /* female */ || gender === 0 /* male */) {
                this.gender = gender;
            }
            if (birth_year && birth_year.toString().match(/^[0-9]{4}$/gi)) {
                this.birth_year = birth_year;
            }
        }
        return User;
    })();
    GA.User = User;
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Utils;
    (function (Utils) {
        function getDefaultAnnotations(user, session_id, build, timeOffset) {
            var obj = {
                sdk_version: GA.GameAnalytics.SDK_VERSION,
                platform: GA.Platform[2 /* windows */],
                os_version: GA.Platform[2 /* windows */] + ' 8',
                device: 'unknown',
                v: 2,
                user_id: user.user_id,
                client_ts: (Date.now() / 1000 | 0) + timeOffset,
                manufacturer: 'unknown',
                session_id: session_id,
                session_num: 1,
                build: build
            };
            if (user.facebook_id) {
                obj.facebook_id = user.facebook_id;
            }
            if (user.gender === 0 /* male */ || user.gender === 1 /* female */) {
                obj.gender = GA.Gender[user.gender];
            }
            if (user.birth_year) {
                obj.birth_year = user.birth_year;
            }
            var ua = navigator.userAgent;
            if (ua.match(/iPad|iPod|iPhone/i)) {
                //code for iPad here
                obj.platform = GA.Platform[0 /* ios */];
                obj.device = ua.match(/iPad|iPod|iPhone/i)[0];
                obj.manufacturer = 'Apple';
                var uaindex = ua.indexOf('OS ');
                obj.os_version = GA.Platform[0 /* ios */] + ' ' + ua.substr(uaindex + 3, 5).replace(/_/gi, '.');
            }
            else if (ua.match(/Android/i)) {
                //code for Android here
                obj.platform = GA.Platform[1 /* android */];
                obj.device = (ua.match(/Mobile/i)) ? 'Phone' : 'Tablet';
                var uaindex = ua.indexOf('Android ');
                obj.os_version = GA.Platform[1 /* android */] + ' ' + ua.substr(uaindex + 8, 5);
            }
            else if (ua.match(/Windows Phone/i)) {
                //code for Windows phone here
                obj.platform = GA.Platform[2 /* windows */];
                obj.device = 'Windows Phone';
                var uaindex = ua.indexOf('Windows Phone ');
                obj.os_version = GA.Platform[2 /* windows */] + ' ' + ua.substr(uaindex + 14, 3);
            }
            return obj;
        }
        Utils.getDefaultAnnotations = getDefaultAnnotations;
        function getBaseAnnotations() {
            var obj = {
                sdk_version: GA.GameAnalytics.SDK_VERSION,
                platform: 'unknown',
                os_version: 'unknown'
            };
            var ua = navigator.userAgent;
            if (ua.match(/iPad|iPod|iPhone/i)) {
                //code for iPad here
                obj.platform = GA.Platform[0 /* ios */];
                var uaindex = ua.indexOf('OS ');
                obj.os_version = GA.Platform[0 /* ios */] + ' ' + ua.substr(uaindex + 3, 5).replace(/_/gi, '.');
            }
            else if (ua.match(/Android/i)) {
                //code for Android here
                obj.platform = GA.Platform[1 /* android */];
                var uaindex = ua.indexOf('Android ');
                obj.os_version = GA.Platform[1 /* android */] + ' ' + ua.substr(uaindex + 8, 5);
            }
            else if (ua.match(/Windows Phone/i)) {
                //code for Windows phone here
                obj.platform = GA.Platform[2 /* windows */];
                var uaindex = ua.indexOf('Windows Phone ');
                obj.os_version = GA.Platform[2 /* windows */] + ' ' + ua.substr(uaindex + 14, 3);
            }
            return obj;
        }
        Utils.getBaseAnnotations = getBaseAnnotations;
    })(Utils = GA.Utils || (GA.Utils = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Utils;
    (function (Utils) {
        /**
         * Message
         * It's a wrapper for an event that can be sendEvent to GA. It can be constructed normally
         * or from a single string
         */
        var Message = (function () {
            function Message(event, annotations) {
                this.event = event;
                this.annotations = annotations;
            }
            Object.defineProperty(Message.prototype, "data", {
                /**
                 * Returns the data that should be sendEvent over the wire
                 *
                 * @returns {{eventId: string, value: number, area: string, x: number, y: number, z: number, userId: string, sessionId: string, build: string}}
                 */
                get: function () {
                    for (var property in this.event) {
                        if (this.event.hasOwnProperty(property)) {
                            if (property === 'category') {
                                //Use the string representation of the category
                                this.annotations[property] = GA.Events.Category[this.event[property]];
                            }
                            else {
                                this.annotations[property] = this.event[property];
                            }
                        }
                    }
                    return this.annotations;
                },
                enumerable: true,
                configurable: true
            });
            return Message;
        })();
        Utils.Message = Message;
    })(Utils = GA.Utils || (GA.Utils = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Utils;
    (function (Utils) {
        /**
         * A message queue that stores messages that need to be sendEvent to GA
         * Saves the queue's to local storage and can be loaded from localStorage
         */
        var MessageQueue = (function () {
            /**
             * Load possible old queue from localStorage
             */
            function MessageQueue() {
                this.queue = [];
                this.load();
            }
            MessageQueue.prototype.push = function (message) {
                this.queue.push(message);
            };
            MessageQueue.prototype.pop = function () {
                return this.queue.pop();
            };
            Object.defineProperty(MessageQueue.prototype, "length", {
                get: function () {
                    return this.queue.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Save the queue in localStorage
             */
            MessageQueue.prototype.save = function () {
            };
            /**
             * Load the queue from localStorage
             */
            MessageQueue.prototype.load = function () {
            };
            return MessageQueue;
        })();
        Utils.MessageQueue = MessageQueue;
    })(Utils = GA.Utils || (GA.Utils = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Utils;
    (function (Utils) {
        var Response = (function () {
            function Response() {
                /**
                 * The response state, if the call was successful or not
                 *
                 * @type {boolean}
                 */
                this.success = false;
                /**
                 * The response of the server
                 *
                 * @type {string}
                 */
                this.message = '';
            }
            return Response;
        })();
        Utils.Response = Response;
        /**
         * Sends some data to a given url
         *
         * @param url           The url we would like to POST the data to
         * @param data          The data that we want to post
         * @param authHeader    The authentication header that needs to be set in order to make the POST succeed
         * @param callback      The callback that handles the responses from the server
         */
        function postRequest(url, data, authHeader, callback) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status === 200) {
                            callback({
                                success: true,
                                message: xhr.responseText
                            });
                        }
                        else if (xhr.status > 0) {
                            callback({
                                success: false,
                                message: 'Error: There was a problem with the request: status ' + xhr.status
                            });
                        }
                    }
                };
            }
            else {
                callback({
                    success: false,
                    message: 'Error: Unable to send request, XMLHttpRequest not supported'
                });
                return;
            }
            try {
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Authorization', authHeader);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(data);
            }
            catch (e) {
                callback({
                    success: false,
                    message: 'Error: Unable to send request, CORS not allowed.'
                });
            }
        }
        Utils.postRequest = postRequest;
    })(Utils = GA.Utils || (GA.Utils = {}));
})(GA || (GA = {}));
var GA;
(function (GA) {
    var Utils;
    (function (Utils) {
        /**
         * Creates a UUID that can be used for GameAnalytics
         *
         * @returns {String}
         */
        function createUniqueId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        Utils.createUniqueId = createUniqueId;
    })(Utils = GA.Utils || (GA.Utils = {}));
})(GA || (GA = {}));
//# sourceMappingURL=GaJavaScriptSdk.js.map