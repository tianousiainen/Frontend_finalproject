import type {Dayjs} from "dayjs";

export type Trainings={
    date: Dayjs;
    duration: number;
    activity: string;
    customer?: string;
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