import { useEffect, useState } from "react";
import axios from "axios";

export function useProfile() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("Không tìm thấy ID người dùng");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:3001/users/${userId}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { data, isLoading: loading, error };
}
