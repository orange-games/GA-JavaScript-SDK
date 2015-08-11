/// <reference path="../../references.ts" />

/**
 * Generic event, all event types inherit from this
 */
class GameAnalyticsEvent
{
    public static DESIGN_EVENT:string = 'design';
    public static BUSINESS_EVENT:string = 'business';
    public static ERROR_EVENT:string = 'error';
    public static USER_EVENT:string = 'user';
    public static INIT_EVENT:string = 'init';

    public event:string;

    public constructor(event:string)
    {
        this.event = event;
    }

    public getData():any {}
}


interface IGameAnalyticsEvent
{
    event: string;
    toString(): string;
}
