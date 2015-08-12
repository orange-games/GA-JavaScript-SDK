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
        /**
         * Version showing in GameAnalytics, I prefer Javascript 2.x.x but docs state
         * //Custom solutions should ALWAYS use the string “rest api v2”
         *
         * @type {string}
         */
        //public static SDK_VERSION:string = 'Javascript 2.0.0';
        public static SDK_VERSION:string = 'rest api v2';

        private gameKey: string;
        private secretKey: string;
        private build: string;
        private userId: string;
        private sessionId: string = Utils.createUniqueId();

        private apiUrl:string = window.location.protocol + '//sandbox-api.gameanalytics.com/v2/';
        private messageQueue:MessageQueue = new MessageQueue();

        public static instance:GameAnalytics = null;

        /**
         * Used to check if events can be sent to the API, set based on the response of the init request
         *
         * @type {boolean}  events are only sendEvent of true
         */
        private enabled: boolean = false;

        private initProcessed: boolean = false;

        /**
         * An integer timestamp of the current server time in UTC (seconds since EPOCH).
         * This is stored locally along with client timestamp to calculate an offset (if client clock is not configured correctly).
         *
         * @type {number}
         */
        private serverTime: number = 0;

        /**
         * This initializes the GameAnalytics stuff with some important parameters
         * GA won't work without!
         *
         * @param gameKey       a Game's unique key
         * @param secretKey     secret key used to auth an message
         * @param build         The build version of your application
         * @param userId        The id of the user
         */
        public init(gameKey: string, secretKey: string, build: string, userId: string): GameAnalytics
        {
            if (null === GameAnalytics.instance) {
                throw new Error('No instance available!');
            }

            this.gameKey = gameKey;
            this.secretKey = secretKey;
            this.build = build;
            this.userId = userId;

            var initEvent = new Events.Init(Utils.getBaseAnnotations());
            this.sendEvent(initEvent.toString(), 'init', (response: GA.Events.InitResponse) => {
                this.initProcessed = true;
                if (response.enabled === true) {
                    this.enabled = true;
                }
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

            var m = new Message(event, Utils.getDefaultAnnotations(this.userId, this.sessionId, this.build));
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
                setTimeout(() => {
                    this.sendData();
                }, 1000);

                return;
            }

            if (this.enabled === false) {
                return;
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
                return;
            }

            try {
                d = JSON.stringify(data);
            } catch (e) {}

            this.sendEvent(d, 'events');

            return this;
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
            var url:string = this.apiUrl + this.gameKey + '/' + event;

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
