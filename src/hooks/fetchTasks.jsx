import { useEffect, useState } from "react";
import { URL } from "../consts/consts";

export const getTasks = (storyId) => {
    const [tasks, setTasks] = useState({
        data: [],
        loading: true
    });

    const fetchTasks = async () => {
        try {
            const url = `${URL}/stories/${storyId}/tasks`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("token"),
                }
            });

            const { data } = await response.json();

            setTasks({
                data: data,
                loading: false,
            });
        } catch (error) {
            console.log(error);
            setTasks({
                data: null,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [storyId]); // Agregamos storyId como dependencia

    // Retornamos también la función para actualizar los datos
    return { ...tasks, refetch: fetchTasks };
};