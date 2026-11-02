import type {Dayjs} from "dayjs";

export type Trainings={
    date: Dayjs;
    duration: number;
    activity: string;
    customerName?: string;
    _links?: {
        self:{
            href: string;
        }
        training:{
            href: string;
        }
        customer:{
            href: string;
        }
    }
}