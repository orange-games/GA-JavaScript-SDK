/// <reference path="references.ts" />

/**
 * Message
 * It's a wrapper for an event that can be send to GA. It can be constructed normally
 * or from a single string
 */
class Message
{
    private e: GameAnalyticsEvent;
    private build: string;
    private sessionId: string;
    private userId: string;

    constructor(e: GameAnalyticsEvent, userId: string, sessionId: string, build: string)
    {
        this.e = e;
        this.userId = userId;
        this.sessionId = sessionId;
        this.build = build;
    }

    /**
     * Load a Message from string, needed for localStorage recovery
     *
     * @param event
     * @param data
     * @returns {*}
     */
    public static fromString(event:string, data: string)
    {
        try {
            var d = JSON.parse(data);
            var e = new GameAnalyticsEvent(event, d.eventId, d.value, d.area, d.x , d.y, d.z);

            return new Message(e, d.userId, d.sessionId, d.build);
        } catch (e) {}

        return null;
    }

    /**
     * Returns the data that should be send over the wire
     *
     * @returns {{eventId: string, value: number, area: string, x: number, y: number, z: number, userId: string, sessionId: string, build: string}}
     */
    get data(): Object
    {
        var data:any =  {
            event_id: this.e.eventId,
            user_id: this.userId,
            session_id: this.sessionId,
            build: this.build
        };

        if (null !== this.e.value) {
            data.value = this.e.value;
        }

        if (null !== this.e.area) {
            data.area = this.e.area;
        }

        if (null !== this.e.x) {
            data.x = this.e.x;
        }

        if (null !== this.e.y) {
            data.y = this.e.y;
        }

        if (null !== this.e.z) {
            data.z = this.e.z;
        }

        return data;
    }

    /**
     * Returns the event category to where we want to post the event
     *
     * @returns {string}
     */
    get event(): string
    {
        return this.e.event;
    }
}
