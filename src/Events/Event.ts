module GA
{
    export module Events
    {
        export interface Response {}

        export interface Event
        {
            category: Category;
        }

        export interface IdEvent extends Event
        {
            event_id: string;
        }

        export enum Category
        {
            design,
            business,
            error,
            user,
            session_end,
            progression,
            resource
        }
    }
}