/*!
 * ga-javascript-sdk - version 2.1.2 
 * Unofficial JavaScript SDK for GameAnalytics, REST API v2 version
 *
 * Orange Games
 * Build at 01-10-2018
 * Released under MIT License 
 */

var CryptoJS = CryptoJS || function(h, s) {
    var f = {}, g = f.lib = {}, q = function() {}, m = g.Base = {
        extend: function(a) {
            q.prototype = this;
            var c = new q();
            return a && c.mixIn(a), c.hasOwnProperty("init") || (c.init = function() {
                c.$super.init.apply(this, arguments);
            }), c.init.prototype = c, c.$super = this, c;
        },
        create: function() {
            var a = this.extend();
            return a.init.apply(a, arguments), a;
        },
        init: function() {},
        mixIn: function(a) {
            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
            a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function() {
            return this.init.prototype.extend(this);
        }
    }, r = g.WordArray = m.extend({
        init: function(a, c) {
            a = this.words = a || [], this.sigBytes = c != s ? c : 4 * a.length;
        },
        toString: function(a) {
            return (a || k).stringify(this);
        },
        concat: function(a) {
            var c = this.words, d = a.words, b = this.sigBytes;
            if (a = a.sigBytes, this.clamp(), b % 4) for (var e = 0; e < a; e++) c[b + e >>> 2] |= (d[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 24 - (b + e) % 4 * 8; else if (65535 < d.length) for (e = 0; e < a; e += 4) c[b + e >>> 2] = d[e >>> 2]; else c.push.apply(c, d);
            return this.sigBytes += a, this;
        },
        clamp: function() {
            var a = this.words, c = this.sigBytes;
            a[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, a.length = h.ceil(c / 4);
        },
        clone: function() {
            var a = m.clone.call(this);
            return a.words = this.words.slice(0), a;
        },
        random: function(a) {
            for (var c = [], d = 0; d < a; d += 4) c.push(4294967296 * h.random() | 0);
            return new r.init(c, a);
        }
    }), l = f.enc = {}, k = l.Hex = {
        stringify: function(a) {
            var c = a.words;
            a = a.sigBytes;
            for (var d = [], b = 0; b < a; b++) {
                var e = c[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                d.push((e >>> 4).toString(16)), d.push((15 & e).toString(16));
            }
            return d.join("");
        },
        parse: function(a) {
            for (var c = a.length, d = [], b = 0; b < c; b += 2) d[b >>> 3] |= parseInt(a.substr(b, 2), 16) << 24 - b % 8 * 4;
            return new r.init(d, c / 2);
        }
    }, n = l.Latin1 = {
        stringify: function(a) {
            var c = a.words;
            a = a.sigBytes;
            for (var d = [], b = 0; b < a; b++) d.push(String.fromCharCode(c[b >>> 2] >>> 24 - b % 4 * 8 & 255));
            return d.join("");
        },
        parse: function(a) {
            for (var c = a.length, d = [], b = 0; b < c; b++) d[b >>> 2] |= (255 & a.charCodeAt(b)) << 24 - b % 4 * 8;
            return new r.init(d, c);
        }
    }, j = l.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(n.stringify(a)));
            } catch (c) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return n.parse(unescape(encodeURIComponent(a)));
        }
    }, u = g.BufferedBlockAlgorithm = m.extend({
        reset: function() {
            this._data = new r.init(), this._nDataBytes = 0;
        },
        _append: function(a) {
            "string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
        },
        _process: function(a) {
            var c = this._data, d = c.words, b = c.sigBytes, e = this.blockSize, f = b / (4 * e), f = a ? h.ceil(f) : h.max((0 | f) - this._minBufferSize, 0);
            if (a = f * e, b = h.min(4 * a, b), a) {
                for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
                g = d.splice(0, a), c.sigBytes -= b;
            }
            return new r.init(g, b);
        },
        clone: function() {
            var a = m.clone.call(this);
            return a._data = this._data.clone(), a;
        },
        _minBufferSize: 0
    });
    g.Hasher = u.extend({
        cfg: m.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset();
        },
        reset: function() {
            u.reset.call(this), this._doReset();
        },
        update: function(a) {
            return this._append(a), this._process(), this;
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(c, d) {
                return new a.init(d).finalize(c);
            };
        },
        _createHmacHelper: function(a) {
            return function(c, d) {
                return new t.HMAC.init(a, d).finalize(c);
            };
        }
    });
    var t = f.algo = {};
    return f;
}(Math);

!function(h) {
    for (var s = CryptoJS, f = s.lib, g = f.WordArray, q = f.Hasher, f = s.algo, m = [], r = [], l = function(a) {
        return 4294967296 * (a - (0 | a)) | 0;
    }, k = 2, n = 0; 64 > n; ) {
        var j;
        a: {
            j = k;
            for (var u = h.sqrt(j), t = 2; t <= u; t++) if (!(j % t)) {
                j = !1;
                break a;
            }
            j = !0;
        }
        j && (8 > n && (m[n] = l(h.pow(k, .5))), r[n] = l(h.pow(k, 1 / 3)), n++), k++;
    }
    var a = [], f = f.SHA256 = q.extend({
        _doReset: function() {
            this._hash = new g.init(m.slice(0));
        },
        _doProcessBlock: function(c, d) {
            for (var b = this._hash.words, e = b[0], f = b[1], g = b[2], j = b[3], h = b[4], m = b[5], n = b[6], q = b[7], p = 0; 64 > p; p++) {
                if (16 > p) a[p] = 0 | c[d + p]; else {
                    var k = a[p - 15], l = a[p - 2];
                    a[p] = ((k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3) + a[p - 7] + ((l << 15 | l >>> 17) ^ (l << 13 | l >>> 19) ^ l >>> 10) + a[p - 16];
                }
                k = q + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & m ^ ~h & n) + r[p] + a[p], 
                l = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & f ^ e & g ^ f & g), 
                q = n, n = m, m = h, h = j + k | 0, j = g, g = f, f = e, e = k + l | 0;
            }
            b[0] = b[0] + e | 0, b[1] = b[1] + f | 0, b[2] = b[2] + g | 0, b[3] = b[3] + j | 0, 
            b[4] = b[4] + h | 0, b[5] = b[5] + m | 0, b[6] = b[6] + n | 0, b[7] = b[7] + q | 0;
        },
        _doFinalize: function() {
            var a = this._data, d = a.words, b = 8 * this._nDataBytes, e = 8 * a.sigBytes;
            return d[e >>> 5] |= 128 << 24 - e % 32, d[14 + (e + 64 >>> 9 << 4)] = h.floor(b / 4294967296), 
            d[15 + (e + 64 >>> 9 << 4)] = b, a.sigBytes = 4 * d.length, this._process(), this._hash;
        },
        clone: function() {
            var a = q.clone.call(this);
            return a._hash = this._hash.clone(), a;
        }
    });
    s.SHA256 = q._createHelper(f), s.HmacSHA256 = q._createHmacHelper(f);
}(Math), function() {
    var h = CryptoJS, s = h.enc.Utf8;
    h.algo.HMAC = h.lib.Base.extend({
        init: function(f, g) {
            f = this._hasher = new f.init(), "string" == typeof g && (g = s.parse(g));
            var h = f.blockSize, m = 4 * h;
            g.sigBytes > m && (g = f.finalize(g)), g.clamp();
            for (var r = this._oKey = g.clone(), l = this._iKey = g.clone(), k = r.words, n = l.words, j = 0; j < h; j++) k[j] ^= 1549556828, 
            n[j] ^= 909522486;
            r.sigBytes = l.sigBytes = m, this.reset();
        },
        reset: function() {
            var f = this._hasher;
            f.reset(), f.update(this._iKey);
        },
        update: function(f) {
            return this._hasher.update(f), this;
        },
        finalize: function(f) {
            var g = this._hasher;
            return f = g.finalize(f), g.reset(), g.finalize(this._oKey.clone().concat(f));
        }
    });
}(), function() {
    var h = CryptoJS, j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words, f = b.sigBytes, c = this._map;
            b.clamp(), b = [];
            for (var a = 0; a < f; a += 3) for (var d = (e[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | e[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, g = 0; 4 > g && a + .75 * g < f; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64)) for (;b.length % 4; ) b.push(e);
            return b.join("");
        },
        parse: function(b) {
            var e = b.length, f = this._map, c = f.charAt(64);
            c && -1 != (c = b.indexOf(c)) && (e = c);
            for (var c = [], a = 0, d = 0; d < e; d++) if (d % 4) {
                var g = f.indexOf(b.charAt(d - 1)) << d % 4 * 2, h = f.indexOf(b.charAt(d)) >>> 6 - d % 4 * 2;
                c[a >>> 2] |= (g | h) << 24 - a % 4 * 8, a++;
            }
            return j.create(c, a);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
}();

var GA;

!function(GA) {
    !function(Platform) {
        Platform[Platform.ios = 0] = "ios", Platform[Platform.android = 1] = "android", 
        Platform[Platform.windows = 2] = "windows", Platform[Platform.windows_phone = 3] = "windows_phone", 
        Platform[Platform.blackberry = 4] = "blackberry", Platform[Platform.roku = 5] = "roku", 
        Platform[Platform.tizen = 6] = "tizen", Platform[Platform.nacl = 7] = "nacl", Platform[Platform.mac_osx = 8] = "mac_osx", 
        Platform[Platform.webplayer = 9] = "webplayer";
    }(GA.Platform || (GA.Platform = {}));
    GA.Platform;
    !function(Gender) {
        Gender[Gender.male = 0] = "male", Gender[Gender.female = 1] = "female";
    }(GA.Gender || (GA.Gender = {}));
    GA.Gender;
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}$/, Business = function() {
            function Business(event_id, amount, currency, transaction_num, cart_type, receipt_info) {
                if (this.category = 1, this.transaction_num = 0, !event_id || null === event_id.match(eventIdCheck)) throw new Error("Invalid event_id supplied for BusinessEvent");
                if (this.event_id = event_id, this.amount = amount, !currency || null === currency.match(/^[A-Z]{3}$/)) throw new Error("Invalid currency supplied for BusinessEvent");
                if (this.currency = currency, this.transaction_num = transaction_num, cart_type) {
                    if (cart_type.length > 32) throw new Error("A too long cart_type was supplied, should be max 32 characters");
                    this.cart_type = cart_type;
                }
                void 0 !== receipt_info && (this.receipt_info = receipt_info);
            }
            return Business;
        }();
        Events.Business = Business;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,4}$/, Design = function() {
            function Design(event_id, value) {
                if (this.category = 0, null === event_id.match(eventIdCheck)) throw new Error("Invalid event_id supplied for DesignEvent");
                this.event_id = event_id, void 0 !== value && (this.value = value);
            }
            return Design;
        }();
        Events.Design = Design;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        !function(Category) {
            Category[Category.design = 0] = "design", Category[Category.business = 1] = "business", 
            Category[Category.error = 2] = "error", Category[Category.user = 3] = "user", Category[Category.session_end = 4] = "session_end", 
            Category[Category.progression = 5] = "progression", Category[Category.resource = 6] = "resource";
        }(Events.Category || (Events.Category = {}));
        Events.Category;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        !function(ErrorSeverity) {
            ErrorSeverity[ErrorSeverity.debug = 0] = "debug", ErrorSeverity[ErrorSeverity.info = 1] = "info", 
            ErrorSeverity[ErrorSeverity.warning = 2] = "warning", ErrorSeverity[ErrorSeverity.error = 3] = "error", 
            ErrorSeverity[ErrorSeverity.critical = 4] = "critical";
        }(Events.ErrorSeverity || (Events.ErrorSeverity = {}));
        var ErrorSeverity = Events.ErrorSeverity, Exception = function() {
            function Exception(severity, message) {
                this.category = 2, this.message = "", this.severity = ErrorSeverity[severity], void 0 !== message && (this.message = message.substr(0, 8192));
            }
            return Exception;
        }();
        Events.Exception = Exception;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var InitResponse = function() {
            function InitResponse() {}
            return InitResponse;
        }();
        Events.InitResponse = InitResponse;
        var Init = function() {
            function Init(data) {
                this.data = data;
            }
            return Init.prototype.toString = function() {
                return JSON.stringify(this.data);
            }, Init;
        }();
        Events.Init = Init;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var eventIdCheck = /^(Start|Fail|Complete):[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,2}$/, Progression = function() {
            function Progression(event_id, attempt_num, score) {
                if (this.category = 5, null === event_id.match(eventIdCheck)) throw new Error("Invalid event_id supplied for ProgressionEvent");
                this.event_id = event_id, void 0 !== attempt_num && (this.attempt_num = attempt_num), 
                void 0 !== score && (this.score = score);
            }
            return Progression;
        }();
        Events.Progression = Progression;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var eventIdCheck = /^(Sink|Source):[A-Za-z]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}/, Resource = function() {
            function Resource(event_id, amount) {
                if (this.category = 6, null === event_id.match(eventIdCheck)) throw new Error("Invalid event_id supplied for ResourceEvent");
                this.event_id = event_id, this.amount = amount;
            }
            return Resource;
        }();
        Events.Resource = Resource;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var SessionEnd = function() {
            function SessionEnd(length) {
                this.category = 4, this.length = 0, this.length = length;
            }
            return SessionEnd;
        }();
        Events.SessionEnd = SessionEnd;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Events) {
        var User = function() {
            function User() {
                this.category = 3;
            }
            return User;
        }();
        Events.User = User;
    }(GA.Events || (GA.Events = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    function getInstance() {
        return null === GameAnalytics.instance && (GameAnalytics.instance = new GameAnalytics()), 
        GameAnalytics.instance;
    }
    GA.getInstance = getInstance;
    var GameAnalytics = function() {
        function GameAnalytics() {
            this.sessionId = GA.Utils.createUniqueId(), this.messageQueue = new GA.Utils.MessageQueue(), 
            this.enabled = !1, this.initProcessed = !1, this.timeoutId = 0, this.timeOffset = 0;
        }
        return GameAnalytics.prototype.init = function(gameKey, secretKey, build, user) {
            var _this = this;
            if (null === GameAnalytics.instance) throw new Error("No instance Available!");
            this.gameKey = gameKey, this.secretKey = secretKey, this.build = build, this.user = user, 
            this.incrementSessionNum(user);
            var initEvent = new GA.Events.Init(GA.Utils.getBaseAnnotations());
            return this.sendEvent(initEvent.toString(), "init", function(response) {
                _this.initProcessed = !0, !0 === response.enabled && (_this.enabled = !0, _this.timeOffset = (Date.now() / 1e3 | 0) - response.server_ts);
            }), this.scheduleSendData(GameAnalytics.SCHEDULE_TIME), window.addEventListener("beforeunload", function() {
                _this.sendData();
            }), this;
        }, GameAnalytics.prototype.incrementSessionNum = function(user) {
            var sessionNum = GA.Utils.LocalStorage.getItem(user.user_id);
            sessionNum ? GA.Utils.LocalStorage.setItem(user.user_id, (parseInt(sessionNum) + 1).toString()) : (sessionNum = "1", 
            GA.Utils.LocalStorage.setItem(user.user_id, sessionNum));
        }, GameAnalytics.prototype.addEvent = function(event) {
            if (null === GameAnalytics.instance) throw new Error("No instance Available!");
            var m = new GA.Utils.Message(event, GA.Utils.getDefaultAnnotations(this.user, this.sessionId, this.build, this.timeOffset));
            return this.messageQueue.push(m), this;
        }, GameAnalytics.prototype.sendData = function() {
            if (!1 === this.initProcessed) return this.scheduleSendData(1e3), this;
            if (!1 === this.enabled) return this;
            if (null === GameAnalytics.instance) throw new Error("No instance Available!");
            for (var data = [], d = ""; this.messageQueue.length > 0; ) {
                var m = this.messageQueue.pop();
                data.push(m.data);
            }
            if (0 === data.length) return this.scheduleSendData(GameAnalytics.SCHEDULE_TIME), 
            this;
            try {
                d = JSON.stringify(data);
            } catch (e) {}
            return this.sendEvent(d, "events"), this.scheduleSendData(GameAnalytics.SCHEDULE_TIME), 
            this;
        }, GameAnalytics.prototype.scheduleSendData = function(time) {
            var _this = this;
            clearTimeout(this.timeoutId), this.timeoutId = setTimeout(function() {
                _this.sendData();
            }, time);
        }, GameAnalytics.prototype.sendEvent = function(databag, event, responseHandler) {
            if (void 0 === responseHandler && (responseHandler = null), null === GameAnalytics.instance && null === this.gameKey) throw new Error("No instance Available!");
            if (!(databag.length < 1)) {
                var encryptedMessage = CryptoJS.HmacSHA256(databag, this.secretKey), authHeader = CryptoJS.enc.Base64.stringify(encryptedMessage), url = GameAnalytics.API_URL + this.gameKey + "/" + event;
                GA.Utils.postRequest(url, databag, authHeader, function(response) {
                    if (!1 === response.success && window.console && console.log(response.message), 
                    null != responseHandler) {
                        var r = "";
                        try {
                            r = JSON.parse(response.message);
                        } catch (e) {}
                        responseHandler(r);
                    }
                });
            }
        }, GameAnalytics.SCHEDULE_TIME = 15e3, GameAnalytics.SDK_VERSION = "rest api v2", 
        GameAnalytics.API_URL = ("https:" === document.location.protocol ? "https" : "http") + "://api.gameanalytics.com/v2/", 
        GameAnalytics.instance = null, GameAnalytics;
    }();
    GA.GameAnalytics = GameAnalytics;
}(GA || (GA = {}));

var GA;

!function(GA) {
    var User = function() {
        function User(user_id, facebook_id, gender, birth_year) {
            if (this.user_id = "", user_id) this.user_id = user_id; else {
                var user = GA.Utils.LocalStorage.getItem("user");
                this.user_id = user || GA.Utils.createUniqueUserId();
            }
            facebook_id && facebook_id.length > 0 && (this.facebook_id = facebook_id, this.user_id = facebook_id), 
            GA.Utils.LocalStorage.setItem("user", this.user_id), 1 !== gender && 0 !== gender || (this.gender = gender), 
            birth_year && birth_year.toString().match(/^[0-9]{4}$/gi) && (this.birth_year = birth_year);
        }
        return User;
    }();
    GA.User = User;
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        function getDefaultAnnotations(user, session_id, build, timeOffset) {
            var obj = {
                sdk_version: GA.GameAnalytics.SDK_VERSION,
                platform: GA.Platform[2],
                os_version: GA.Platform[2] + " 8",
                device: "unknown",
                v: 2,
                user_id: user.user_id,
                client_ts: (Date.now() / 1e3 | 0) + timeOffset,
                manufacturer: "unknown",
                session_id: session_id,
                session_num: getSessionNumber(user.user_id),
                build: build
            };
            user.facebook_id && (obj.facebook_id = user.facebook_id), 0 !== user.gender && 1 !== user.gender || (obj.gender = GA.Gender[user.gender]), 
            user.birth_year && (obj.birth_year = user.birth_year);
            var ua = navigator.userAgent;
            return ua.match(/iPad|iPod|iPhone/i) ? (obj.platform = GA.Platform[0], obj.device = ua.match(/iPad|iPod|iPhone/i)[0], 
            obj.manufacturer = "Apple", obj.os_version = GA.Platform[0] + " " + ua.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1].replace(/_/gi, ".")) : ua.match(/Android/i) ? (obj.platform = GA.Platform[1], 
            obj.device = ua.match(/Mobile/i) ? "Phone" : "Tablet", obj.os_version = GA.Platform[1], 
            /Firefox/i.test(ua) || (obj.os_version += " " + ua.match(/Android (\d+(?:\.\d+)*);/)[1])) : ua.match(/Windows Phone/i) && (obj.platform = GA.Platform[2], 
            obj.device = "Windows Phone", obj.os_version = GA.Platform[2] + " " + ua.match(/Phone (\d+(?:\.\d+)+);/)[1]), 
            obj;
        }
        function getBaseAnnotations() {
            var obj = {
                sdk_version: GA.GameAnalytics.SDK_VERSION,
                platform: "unknown",
                os_version: "unknown"
            }, ua = navigator.userAgent;
            return ua.match(/iPad|iPod|iPhone/i) ? (obj.platform = GA.Platform[0], obj.os_version = GA.Platform[0] + " " + ua.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1].replace(/_/gi, ".")) : ua.match(/Android/i) ? (obj.platform = GA.Platform[1], 
            obj.os_version = GA.Platform[1], /Firefox/i.test(ua) || (obj.os_version += " " + ua.match(/Android (\d+(?:\.\d+)*);/)[1])) : ua.match(/Windows Phone/i) && (obj.platform = GA.Platform[2], 
            obj.os_version = GA.Platform[2] + " " + ua.match(/Phone (\d+(?:\.\d+)+);/)[1]), 
            obj;
        }
        function getSessionNumber(userId) {
            var sessionNum = Utils.LocalStorage.getItem(userId);
            return sessionNum ? parseInt(sessionNum) : 1;
        }
        Utils.getDefaultAnnotations = getDefaultAnnotations, Utils.getBaseAnnotations = getBaseAnnotations;
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        var LocalStorage = function() {
            function LocalStorage() {}
            return LocalStorage.getItem = function(key) {
                if (LocalStorage.Available) return localStorage.getItem(LocalStorage.CacheKey + key);
            }, LocalStorage.setItem = function(key, value) {
                LocalStorage.Available && localStorage.setItem(LocalStorage.CacheKey + key, value);
            }, LocalStorage.Available = !1, LocalStorage.CacheKey = "GA:", LocalStorage;
        }();
        Utils.LocalStorage = LocalStorage;
        try {
            "object" == typeof localStorage && (localStorage.setItem("testingLocalStorage", "yes"), 
            localStorage.removeItem("testingLocalStorage"), LocalStorage.Available = !0);
        } catch (e) {}
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        var Message = function() {
            function Message(event, annotations) {
                this.event = event, this.annotations = annotations;
            }
            return Object.defineProperty(Message.prototype, "data", {
                get: function() {
                    for (var property in this.event) this.event.hasOwnProperty(property) && (this.annotations[property] = "category" === property ? GA.Events.Category[this.event[property]] : this.event[property]);
                    return this.annotations;
                },
                enumerable: !0,
                configurable: !0
            }), Message;
        }();
        Utils.Message = Message;
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        var MessageQueue = function() {
            function MessageQueue() {
                this.queue = [], this.load();
            }
            return MessageQueue.prototype.push = function(message) {
                this.queue.push(message);
            }, MessageQueue.prototype.pop = function() {
                return this.queue.pop();
            }, Object.defineProperty(MessageQueue.prototype, "length", {
                get: function() {
                    return this.queue.length;
                },
                enumerable: !0,
                configurable: !0
            }), MessageQueue.prototype.save = function() {}, MessageQueue.prototype.load = function() {}, 
            MessageQueue;
        }();
        Utils.MessageQueue = MessageQueue;
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        function postRequest(url, data, authHeader, callback) {
            var xhr;
            if (!window.XMLHttpRequest) return void callback({
                success: !1,
                message: "Error: Unable to send request, XMLHttpRequest not supported"
            });
            xhr = new XMLHttpRequest(), xhr.onreadystatechange = function() {
                4 == xhr.readyState && (200 === xhr.status ? callback({
                    success: !0,
                    message: xhr.responseText
                }) : xhr.status > 0 && callback({
                    success: !1,
                    message: "Error: There was a problem with the request: status " + xhr.status
                }));
            };
            try {
                xhr.open("POST", url, !0), xhr.setRequestHeader("Authorization", authHeader), xhr.setRequestHeader("Content-Type", "application/json"), 
                xhr.send(data);
            } catch (e) {
                callback({
                    success: !1,
                    message: "Error: Unable to send request, CORS not allowed."
                });
            }
        }
        var Response = function() {
            function Response() {
                this.success = !1, this.message = "";
            }
            return Response;
        }();
        Utils.Response = Response, Utils.postRequest = postRequest;
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));

var GA;

!function(GA) {
    !function(Utils) {
        function createUniqueId() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = 16 * Math.random() | 0;
                return ("x" == c ? r : 3 & r | 8).toString(16);
            });
        }
        function createUniqueUserId() {
            return createUniqueId();
        }
        Utils.createUniqueId = createUniqueId, Utils.createUniqueUserId = createUniqueUserId;
    }(GA.Utils || (GA.Utils = {}));
}(GA || (GA = {}));