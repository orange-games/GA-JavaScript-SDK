/// <reference path="../references.ts" />

/**
 * Generic event, all event types inherit from this
 */
class GameAnalyticsEvent
{
    public static DESIGN_EVENT:string = 'design';
    public static BUSINESS_EVENT:string = 'business';
    public static ERROR_EVENT:string = 'error';

    public event:string;
    public eventId:string;
    public value:number;
    public area:string;
    public x:number;
    public y:number;
    public z:number;

    public constructor(event:string, eventId:string = null, value:number = null, area: string = null, x:number = null, y:number = null, z:number = null)
    {
        this.event = event;
        this.eventId = eventId
        this.value = value;
        this.area = area;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
