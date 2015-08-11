/// <reference path="../../references.ts" />

/**
 * Generic event, all event types inherit from this
 */
class GeneralEvent extends GameAnalyticsEvent
{
    public eventId:string;
    public value:number;
    public area:string;
    public x:number;
    public y:number;
    public z:number;

    public constructor(event:string, eventId:string = null, value:number = null, area: string = null, x:number = null, y:number = null, z:number = null)
    {
        super(event);
        this.event = event;
        this.eventId = eventId
        this.value = value;
        this.area = area;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getData():any
    {
        return {
            event_id: this.eventId,
            value: this.value,
            area: this.area,
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
