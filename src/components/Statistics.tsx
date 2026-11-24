import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState, useMemo } from 'react';
import type { Trainings } from '../types/Trainings';
import type { ActivityTotal } from '../types/ActivityStatis';
import { Box, Paper} from '@mui/material';

function Statistics(){
    const [trainings, setTrainings] = useState<Trainings[]>([]);
    const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");


    useEffect(() =>{
        fetch(`${API_URL}/trainings`)
        .then((res) => res.json())
        .then((data) => setTrainings(data._embedded?.trainings ?? data))
        .catch((err) => console.error(err));

    },[]);

    const stast = useMemo<ActivityTotal[]>(() => {
        const groups: Record<string, ActivityTotal> = {};

        trainings.forEach(({activity, duration}) => {
            groups[activity] ??= {activity, minutes: 0, count: 0};
            groups[activity].minutes += duration;
            groups[activity].count += 1;
        });
        return Object.values(groups).sort((a, b) => b.minutes -a.minutes);
    }, [trainings]);


    return(
        <>
            <h1>Statistics</h1>
            <Box sx={{p: 3}}>
                <Paper sx={{p: 2}}>
                   <BarChart
                        dataset={stast}
                        height={400}
                        xAxis={[{ scaleType: "band", dataKey: "activity" }]}
                        yAxis={[{ label: "Duration (min)" }]}
                        series={[
                        {
                            dataKey: "minutes",
                            label: "slot",
                            valueFormatter: (value, context) =>
                                `${value ?? 0} min (${stast[context.dataIndex].count} trainings)`,
                        },
                    ]}
                   />
                </Paper>
            </Box>
        </>
    );
}

export default Statistics;