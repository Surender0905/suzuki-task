"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/lib/data";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/users",
                );
                const users = response.data.data;

                setUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    console.log(users);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            toast.success("User deleted successfully");
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.user}</TableCell>
                            <TableCell>{user.interest.join(", ")}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.mobile}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Link href={`/users/${user._id}`}>
                                        <Button variant="outline" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/users/edit/${user._id}`}>
                                        <Button variant="outline" size="icon">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
