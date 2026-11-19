import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import type { Calendar } from "../types/Calendar";
//import type { Customers } from "../types/Customers";
import type { Trainings } from "../types/Trainings";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TrainingCalendar.css";

const localizer = dayjsLocalizer(dayjs);
const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

function TrainingCalendar(){
    const [events, setEvents] = useState<Calendar[]>([]);
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
       const fetchData = async () => {
        try {
            const trainingResponse = await fetch(API_URL + "/trainings");
            
            if (!trainingResponse.ok){
                throw new Error("Error when fetching trainings:" + trainingResponse.status);
            }

            const trainingData = await trainingResponse.json();

            const trainingList: Trainings[] = trainingData._embedded?.trainings ?? [];

            const list: Calendar[] = await Promise.all(
                trainingList.map(async (t) =>{
                    let name = "Unknown";
                    const customerURL = t._links?.customer?.href;

                    if(customerURL){
                        try{
                            const res = await fetch (customerURL);
                            if (res.ok){
                                const c = await res.json();
                                name = `${c.firstname} ${c.lastname}`;
                            }
                        } catch{

                        }
                    }
                    return{
                        title: `${t.activity} / ${name}`,
                        start: dayjs(t.date).toDate(),
                        end: dayjs(t.date).add(t.duration, "minute").toDate(),
                        activity: t.activity,
                        customer: name,
                        duration: t.duration,
                    };
                })
            );


            setEvents(list);
        } catch (error) {
            console.error("Error when fetching data", error);
        }
       };
       fetchData();
    }, []);

    return(
        <>
        <h1>Training calendar</h1>

        <div style={{ height: 600, margin: 16}}>
            <BigCalendar<Calendar>
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                view={view as any}
                onView={(newView) => setView(newView)}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                tooltipAccessor={(e) =>
                    `${e.activity}, ${e.duration} min, ${e.customer}`
                }
            />
        </div>
        </>
    );
}

export default TrainingCalendar;