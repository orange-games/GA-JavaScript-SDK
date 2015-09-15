/// <reference path="../vendor/cryptojs.d.ts" />
declare module GA {
    /**
     * Fetches an created instance
     *
     * @returns {GameAnalytics}
     */
    function getInstance(): GameAnalytics;
    /**
     * GameAnalytics lib
     */
    class GameAnalytics {
        static SCHEDULE_TIME: number;
        /**
         * Version showing in GameAnalytics, I prefer Javascript 2.x.x but docs state
         * //Custom solutions should ALWAYS use the string “rest api v2”
         *
         * @type {string}
         */
        static SDK_VERSION: string;
        /**
         * The url for GameAnalytics' API
         *
         * @type {string}
         */
        static API_URL: string;
        /**
         * Stored instance for GameAnalytics
         *
         * @type {GameAnalytics}
         */
        static instance: GameAnalytics;
        /**
         * The key of the game, provided by GameAnalytics
         */
        private gameKey;
        /**
         * The secret to sign the request, provided by GameAnalytics
         */
        private secretKey;
        /**
         * The build version of the game
         */
        private build;
        /**
         * The user
         */
        private user;
        /**
         * The current sesison of the playing user
         *
         * @type {string}
         */
        private sessionId;
        /**
         * Queue of messages for GameAnalytics, will be drained every 15 seconds or when a user calls sendData
         *
         * @type {GA.MessageQueue}
         */
        private messageQueue;
        /**
         * Used to check if events can be sent to the API, set based on the response of the init request
         *
         * @type {boolean}  events are only sendEvent of true
         */
        private enabled;
        /**
         * If the init call has ben processed or not. If not, we reschedule sendData() calls so we make sure data is send
         *
         * @type {boolean}
         */
        private initProcessed;
        /**
         * The message queue gets drained every 15 seconds, but we reset this time when sendData() was called manually
         *
         * @type {number}
         */
        private timeoutId;
        /**
         * An integer timestamp of the current server time in UTC (seconds since EPOCH).
         * This is stored locally along with client timestamp to calculate an offset (if client clock is not configured correctly).
         *
         * @type {number}
         */
        private serverTime;
        /**
         * This initializes the GameAnalytics stuff with some important parameters
         * GA won't work without!
         *
         * @param gameKey       a Game's unique key
         * @param secretKey     secret key used to auth an message
         * @param build         The build version of your application
         * @param userId        The id of the user
         */
        init(gameKey: string, secretKey: string, build: string, user: User): GameAnalytics;
        /**
         * Adds an event to the message queue
         *
         * @param event
         */
        addEvent(event: Events.Event): GameAnalytics;
        /**
         * Send data from the message queue
         */
        sendData(): GameAnalytics;
        /**
         * Schedules the next time for a sendData call
         *
         * @param time  The time in ms until the next sendData call
         */
        private scheduleSendData(time);
        /**
         * Sends a message to GA
         *
         * @param databag
         * @param event
         * @param responseHandler
         */
        private sendEvent(databag, event, responseHandler?);
    }
}
declare module GA {
    enum Gender {
        male = 0,
        female = 1,
    }
    class User {
        user_id: string;
        facebook_id: string;
        gender: Gender;
        birth_year: number;
        constructor(user_id: string, facebook_id?: string, gender?: Gender, birth_year?: number);
    }
}
declare module GA {
    module Utils {
        /**
         * A message queue that stores messages that need to be sendEvent to GA
         * Saves the queue's to local storage and can be loaded from localStorage
         */
        class MessageQueue {
            private queue;
            /**
             * Load possible old queue from localStorage
             */
            constructor();
            push(message: Message): void;
            pop(): Message;
            length: number;
            /**
             * Save the queue in localStorage
             */
            private save();
            /**
             * Load the queue from localStorage
             */
            private load();
        }
    }
}
declare module GA {
    module Utils {
        /**
         * Message
         * It's a wrapper for an event that can be sendEvent to GA. It can be constructed normally
         * or from a single string
         */
        class Message {
            /**
             * The Event we would like to send to GameAnalytics
             */
            private event;
            /**
             * Some default data that needs to be send with any event
             */
            private annotations;
            constructor(event: Events.Event, annotations: DefaultAnnotations);
            /**
             * Returns the data that should be sendEvent over the wire
             *
             * @returns {{eventId: string, value: number, area: string, x: number, y: number, z: number, userId: string, sessionId: string, build: string}}
             */
            data: Object;
        }
    }
}
declare module GA {
    module Utils {
        /**
         * Creates a UUID that can be used for GameAnalytics
         *
         * @returns {String}
         */
        function createUniqueId(): string;
    }
}
declare module GA {
    module Utils {
        class Response {
            /**
             * The response state, if the call was successful or not
             *
             * @type {boolean}
             */
            success: boolean;
            /**
             * The response of the server
             *
             * @type {string}
             */
            message: string;
        }
        /**
         * Sends some data to a given url
         *
         * @param url           The url we would like to POST the data to
         * @param data          The data that we want to post
         * @param authHeader    The authentication header that needs to be set in order to make the POST succeed
         * @param callback      The callback that handles the responses from the server
         */
        function postRequest(url: string, data: string, authHeader: string, callback: (data: Response) => void): void;
    }
}
declare module GA {
    module Utils {
        interface BaseAnnotations {
            /**
             * Custom solutions should ALWAYS use the string “rest api v2”
             */
            sdk_version: string;
            /**
             * A string representing the OS version, e.g. “ios 8.1”
             */
            platform: string;
            /**
             * A string representing the platform of the SDK, e.g. “ios”
             */
            os_version: string;
        }
        interface DefaultAnnotations extends BaseAnnotations {
            device: string;
            v: number;
            user_id: string;
            client_ts: number;
            manufacturer: string;
            session_id: string;
            session_num: number;
            googleplus_id?: string;
            facebook_id?: string;
            gender?: string;
            birth_year?: number;
            custom_01?: string;
            custom_02?: string;
            custom_03?: string;
            build?: string;
            engine_version?: string;
            connection_type?: string;
            progression?: string;
            ios_idfv?: string;
            ios_idfa?: string;
            google_aid?: string;
            limit_ad_tracking?: boolean;
            logon_gamecenter?: boolean;
            logon_googleplay?: boolean;
            jailbroken?: boolean;
            android_id?: string;
        }
        function getDefaultAnnotations(user: User, session_id: string, build: string): DefaultAnnotations;
        function getBaseAnnotations(): BaseAnnotations;
    }
}
declare module GA {
    module Events {
        class Design implements IdEvent {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * A 1-5 part event id.
             */
            event_id: string;
            /**
             * Optional value.
             */
            value: number;
            constructor(event_id: string, value?: number);
        }
    }
}
declare module GA {
    module Events {
        enum ErrorSeverity {
            debug = 0,
            info = 1,
            warning = 2,
            error = 3,
            critical = 4,
        }
        class Exception implements Event {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * The type of error severity.
             */
            severity: string;
            /**
             * Stack trace or other information detailing the error. Can be an empty string.
             */
            message: string;
            /**
             * Create a new Error event
             *
             * @param severity  Error severity, should be of type ErrorSeverity
             * @param message   The emssage of the error, we'd like new Error().stack
             */
            constructor(severity: ErrorSeverity, message?: string);
        }
    }
}
declare module GA {
    module Events {
        interface Response {
        }
        interface Event {
            category: Category;
        }
        interface IdEvent extends Event {
            event_id: string;
        }
        enum Category {
            design = 0,
            business = 1,
            error = 2,
            user = 3,
            session_end = 4,
            progression = 5,
            resource = 6,
        }
    }
}
declare module GA {
    module Events {
        /**
         * The response object for an Init event. This tells us if we're allowed to do future requests
         */
        class InitResponse implements Response {
            /**
             * Events should ONLY be sent if this field is present and set to true. If not true then deactivate.
             */
            enabled: boolean;
            /**
             * An integer timestamp of the current server time in UTC (seconds since EPOCH).
             */
            severs_ts: number;
            /**
             * An array of strings. Not used at the moment. In the future this could contain flags set by GA servers to control SDK behaviour.
             */
            flags: string[];
        }
        /**
         * Init event, should be called when a new session starts
         */
        class Init {
            data: Utils.BaseAnnotations;
            constructor(data: Utils.BaseAnnotations);
            toString(): string;
        }
    }
}
declare module GA {
    module Events {
        class Progression implements IdEvent {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * A 2-4 part event id. Status:Progression1:Progression2:Progression3
             */
            event_id: string;
            /**
             * The attempts performed on this level. Send only when Status is “Complete”.
             * Similar to the session_num. Incremented each time a progression attempt is started for this speficic event_id.
             */
            attempt_num: number;
            /**
             * An optional player score for attempt. Only sent when Status is “Fail” or “Complete”.
             */
            score: number;
            constructor(event_id: string, attempt_num?: number, score?: number);
        }
    }
}
declare module GA {
    module Events {
        class Resource implements IdEvent {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * A 4 part event id. FlowType:InGameCurrency:ItemType:ItemId
             */
            event_id: string;
            /**
             * The amount of the in game currency (float)
             */
            amount: number;
            constructor(event_id: string, amount: number);
        }
    }
}
declare module GA {
    module Events {
        /**
         * The session_end event should always be sent whenever a session is determined to be over.
         * For example whenever a mobile device is ‘going-to-background’ or when a user quit your game in other ways.
         * Only one session_end event per session should be generated/sent.
         */
        class SessionEnd implements Event {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * The length of the session in seconds
             *
             * @type {number}
             */
            length: number;
            constructor(lenth: number);
        }
    }
}
declare module GA {
    module Events {
        /**
         * The user event acts like a session start.
         * It should always be the first event in the first batch sent to the collectors and added each time a session starts.
         */
        class User implements Event {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
        }
    }
}
declare module GA {
    module Events {
        class Business implements IdEvent {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            category: Category;
            /**
             * A 2 part event id; ItemType:ItemId
             */
            event_id: string;
            /**
             * The amount of the purchase in cents (integer)
             */
            amount: number;
            /**
             * Currency need to be a 3 letter upper case string to pass validation.
             * In addition the currency need to be a valid currency for correct rate/conversion calculation at a later stage.
             * Look at the following link for a list valid currency values.
             *
             * http://openexchangerates.org/currencies.json.
             */
            currency: string;
            /**
             * Similar to the session_num. Store this value locally and increment each time a business event is submitted during the lifetime (installation) of the game/app.
             * @type {number}
             */
            transaction_num: number;
            /**
             * A string representing the cart (the location) from which the purchase was made.
             * Could be menu_shop or end_of_level_shop.
             */
            cart_type: string;
            /**
             * A JSON object that can contain 3 fields: store, receipt and signature. Used for payment validation of receipts.
             * Currently purchase validation is only supported for iOS and Android stores.
             *
             * For iOS the store is apple and the receipt is base64 encoded.
             * For Android the store is google_play and the receipt is base64 encoded + the IAP signature is also required.
             */
            receipt_info: {};
            constructor(event_id: string, amount: number, currency: string, transaction_num: number, cart_type?: string, receipt_info?: {});
        }
    }
}
