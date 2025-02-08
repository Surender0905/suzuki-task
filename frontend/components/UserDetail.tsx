"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/data";
import axios from "axios";
import { useEffect, useState } from "react";

const UserDetail = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>UserId : {user?._id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Username: {user?.user}</p>
                    <p>Interests: {user?.interest.join(", ")}</p>
                    <p>Age: {user?.age}</p>
                    <p>Mobile: {user?.mobile}</p>
                    <p>Email: {user?.email}</p>
                </CardContent>
            </Card>
        </>
    );
};

export default UserDetail;
