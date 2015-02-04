/// <reference path="references.ts" />

/**
 * A message queue that stores messages that need to be send to GA
 * Saves the queue's to local storage and can be loaded from localStorage
 */
class MessageQueue
{
    private designQueue:Array<Message> = [];
    private businessQueue:Array<Message> = [];
    private errorQueue:Array<Message> = [];

    /**
     * Load possible old queue from localStorage
     */
    constructor()
    {
        this.load();
    }

    public push(m: Message): void
    {
        var queue = this.getQueue(m.event);
        queue.push(m);
        this.save(m.event);
    }

    public pop(event:string): Message
    {
        var queue = this.getQueue(event);
        var m = queue.pop();
        this.save(m.event);
        return m;
    }

    public length(event:string) : number
    {
        var queue = this.getQueue(event);
        return queue.length;
    }

    private getQueue(event:string): Array<Message>
    {
        switch (event) {
            case GameAnalyticsEvent.BUSINESS_EVENT:
                return this.businessQueue;
            case GameAnalyticsEvent.ERROR_EVENT:
                return this.errorQueue;
            case GameAnalyticsEvent.DESIGN_EVENT:
            default:
                return this.designQueue;
        }
    }

    /**
     * Load the queue from localStorage
     */
    private load()
    {

    }

    /**
     * Save the queue to local storage
     */
    private save(event:string)
    {
        switch (event) {
            case GameAnalyticsEvent.BUSINESS_EVENT:
            case GameAnalyticsEvent.DESIGN_EVENT:
            case GameAnalyticsEvent.ERROR_EVENT:
                break;
        }
    }
}
