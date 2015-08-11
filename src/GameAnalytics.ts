/// <reference path="references.ts" />

/**
 * GameAnalytics lib
 */
class GameAnalytics
{
    /**
     * Version showing in gameanalytics, I prefer Javascript 2.x.x but docs state
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
    private sessionId: string = GAUniqueidUtil.createUniqueId();

    private apiUrl:string = window.location.protocol + '//sandbox-api.gameanalytics.com/v2/';
    private messageQueue:MessageQueue = new MessageQueue();

    private static instance:GameAnalytics = null;

    /**
     * Used to check if events can be sent to the API, set based on the response of the init request
     *
     * @type {boolean}  events are only send of true
     */
    private enabled: boolean = false;

    /**
     * Fetches an created instance
     *
     * @returns {GameAnalytics}
     */
    public static getInstance() {
        if (null === GameAnalytics.instance) {
            GameAnalytics.instance = new GameAnalytics();
        }
        return GameAnalytics.instance;
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
    public init(gameKey: string, secretKey: string, build: string, userId: string)
    {
        if (null === GameAnalytics.instance) {
            throw new Error('No instance available!');
        }

        this.gameKey = gameKey;
        this.secretKey = secretKey;
        this.build = build;
        this.userId = userId;

        //this.sendEvent(new UserEvent(GADeviceUtil.createUserEventDeviceObject(GameAnalytics.SDK_VERSION)));
        var initEvent = new InitEvent(GADeviceUtil.createInitEventDeviceObject(GameAnalytics.SDK_VERSION));
        this.send(initEvent.toString(), GameAnalyticsEvent.INIT_EVENT, (response: string) => {

        });
    }

    /**
     * Adds an event to the message queue
     *
     * @param e
     */
    public addEvent(e:GameAnalyticsEvent)
    {
        if (null === GameAnalytics.instance) {
            throw new Error('No instance available!');
        }

        var m = new Message(e, this.userId, this.sessionId, this.build);
        this.messageQueue.push(m);
    }

    /**
     * Combination of addEvent and sendData in one go
     * Sends events immediatly
     *
     * @param e
     */
    public sendEvent(e:GameAnalyticsEvent)
    {
        if (this.enabled === false) {
            return;
        }

        if (null === GameAnalytics.instance) {
            throw new Error('No instance available!');
        }
        var m = new Message(e, this.userId, this.sessionId, this.build);
        var d:string = '';

        try {
            d = JSON.stringify(m.data)
        }
        catch (e) {}
        this.send(d, m.event);
    }

    /**
     * Send data from the message queue
     */
    public sendData()
    {
        if (this.enabled === false) {
            return;
        }

        if (null === GameAnalytics.instance) {
            throw new Error('No instance available!');
        }

        [GameAnalyticsEvent.BUSINESS_EVENT, GameAnalyticsEvent.DESIGN_EVENT, GameAnalyticsEvent.ERROR_EVENT]. forEach((event) => {
            var data:Array<Object> = [];
            var d:string = '';

            while (this.messageQueue.length(event) > 0) {
                var m = this.messageQueue.pop(event);
                data.push(m.data);
            }

            if (0 === data.length) {
                return;
            }

            try {
                d = JSON.stringify(data);
            } catch (e) {}

            this.send(d, event);
        });
    }

    /**
     * Sends a message to GA
     *
     * @param databag
     * @param event
     * @param responseHandler
     */
    private send(databag:string, event:string, responseHandler: (response: string) => void = null)
    {
        if (null === GameAnalytics.instance && null === this.gameKey) {
            throw new Error('No instance available!');
        }

        if (databag.length < 1) {
            return;
        }
        console.log('data', databag);
        var encryptedMessage = CryptoJS.HmacSHA256(databag, this.secretKey);
        var authHeader:string = CryptoJS.enc.Base64.stringify(encryptedMessage);
        var url:string = this.apiUrl + this.gameKey + '/' + event;

        console.log('Authheader', authHeader);
        console.log('url', url);

        GARequest.post(
            url,
            databag,
            authHeader,
            (response) => {
                if (response.success === false) {
                    if (window.console) {
                        console.log(response.message);
                    }

                    if (responseHandler != null) {
                        responseHandler(response);
                    }
                }
            }
        );
    }
}