/// <reference path="references.ts" />

module GA
{
    /**
     * Fetches an created instance
     *
     * @returns {GameAnalytics}
     */
    export function getInstance(): GameAnalytics
    {
        if (null === GameAnalytics.instance) {
            GameAnalytics.instance = new GameAnalytics();
        }
        return GameAnalytics.instance;
    }


    /**
     * GameAnalytics lib
     */
    export class GameAnalytics
    {
        public static SCHEDULE_TIME: number = 15000;

        /**
         * Version showing in GameAnalytics, I prefer Javascript 2.x.x but docs state
         * //Custom solutions should ALWAYS use the string “rest api v2”
         *
         * @type {string}
         */
        //public static SDK_VERSION:string = 'Javascript 2.0.0';
        public static SDK_VERSION: string = 'rest api v2';

        /**
         * The url for GameAnalytics' API
         *
         * @type {string}
         */
        public static API_URL: string = window.location.protocol + '//api.gameanalytics.com/v2/';

        /**
         * Stored instance for GameAnalytics
         *
         * @type {GameAnalytics}
         */
        public static instance: GameAnalytics = null;

        /**
         * The key of the game, provided by GameAnalytics
         */
        private gameKey: string;

        /**
         * The secret to sign the request, provided by GameAnalytics
         */
        private secretKey: string;

        /**
         * The build version of the game
         */
        private build: string;

        /**
         * The user
         */
        private user: User;

        /**
         * The current sesison of the playing user
         *
         * @type {string}
         */
        private sessionId: string = Utils.createUniqueId();

        /**
         * Queue of messages for GameAnalytics, will be drained every 15 seconds or when a user calls sendData
         *
         * @type {GA.MessageQueue}
         */
        private messageQueue: Utils.MessageQueue = new Utils.MessageQueue();

        /**
         * Used to check if events can be sent to the API, set based on the response of the init request
         *
         * @type {boolean}  events are only sendEvent of true
         */
        private enabled: boolean = false;

        /**
         * If the init call has ben processed or not. If not, we reschedule sendData() calls so we make sure data is send
         *
         * @type {boolean}
         */
        private initProcessed: boolean = false;

        /**
         * The message queue gets drained every 15 seconds, but we reset this time when sendData() was called manually
         *
         * @type {number}
         */
        private timeoutId: number = 0;

        /**
         * An integer timestamp of the current server time in UTC (seconds since EPOCH).
         * This is stored locally along with client timestamp to calculate an offset (if client clock is not configured correctly).
         *
         * @type {number}
         */
        private timeOffset: number = 0;

        /**
         * This initializes the GameAnalytics stuff with some important parameters
         * GA won't work without!
         *
         * @param gameKey       a Game's unique key
         * @param secretKey     secret key used to auth an message
         * @param build         The build version of your application
         * @param userId        The id of the user
         */
        public init(gameKey: string, secretKey: string, build: string, user: User): GameAnalytics
        {
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }

            this.gameKey = gameKey;
            this.secretKey = secretKey;
            this.build = build;
            this.user = user;

            var initEvent = new Events.Init(Utils.getBaseAnnotations());
            this.sendEvent(initEvent.toString(), 'init', (response: GA.Events.InitResponse) => {
                this.initProcessed = true;
                if (response.enabled === true) {
                    this.enabled = true;
                    this.timeOffset = (Date.now()/ 1000 | 0) - response.server_ts;
                }
            });

            //Start the interval. The queue should be emptied every 15 seconds
            this.scheduleSendData(GameAnalytics.SCHEDULE_TIME);

            //Also make sure the queue is empty before we leave the page
            window.addEventListener('beforeunload', () => {
               this.sendData();
            });

            return this;
        }

        /**
         * Adds an event to the message queue
         *
         * @param event
         */
        public addEvent(event: Events.Event): GameAnalytics
        {
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }

            var m = new Utils.Message(event, Utils.getDefaultAnnotations(this.user, this.sessionId, this.build, this.timeOffset));
            this.messageQueue.push(m);

            return this;
        }

        /**
         * Send data from the message queue
         */
        public sendData(): GameAnalytics
        {
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

            var data:Array<Object> = [];
            var d:string = '';

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
            } catch (e) {}

            this.sendEvent(d, 'events');

            //Reschedule this method
            this.scheduleSendData(GameAnalytics.SCHEDULE_TIME);
            return this;
        }

        /**
         * Schedules the next time for a sendData call
         *
         * @param time  The time in ms until the next sendData call
         */
        private scheduleSendData(time: number): void
        {
            //Reschedule this method
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.sendData();
            }, time);
        }

        /**
         * Sends a message to GA
         *
         * @param databag
         * @param event
         * @param responseHandler
         */
        private sendEvent(databag: string, event: string, responseHandler: (response: Events.Response) => void = null)
        {
            if (null === GameAnalytics.instance && null === this.gameKey) {
                throw new Error('No instance available!');
            }

            if (databag.length < 1) {
                return;
            }

            var encryptedMessage = CryptoJS.HmacSHA256(databag, this.secretKey);
            var authHeader:string = CryptoJS.enc.Base64.stringify(encryptedMessage);
            var url:string = GameAnalytics.API_URL + this.gameKey + '/' + event;

            GA.Utils.postRequest(
                url,
                databag,
                authHeader,
                (response: Utils.Response) => {
                    if (response.success === false) {
                        if (window.console) {
                            console.log(response.message);
                        }
                    }

                    if (responseHandler != null) {
                        var r = '';
                        try {
                            r = JSON.parse(response.message);
                        } catch(e) {}

                        responseHandler(r);
                    }
                }
            );
        }
    }
}
