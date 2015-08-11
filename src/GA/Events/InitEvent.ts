/// <reference path="../../references.ts" />

/**
 * Init event, should be called when a new session starts
 */
class InitEvent implements IGameAnalyticsEvent
{
    public event: string = GameAnalyticsEvent.INIT_EVENT;

    public data: DeviceObject;

    constructor(data: DeviceObject)
    {
        this.data = data;
    }

    public toString()
    {
        return JSON.stringify(this.data);
    }
}
