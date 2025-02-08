/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@/lib/data";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditUser() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<User>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/users/${id}`,
                );
                const user = res.data.data;

                if (user) {
                    setValue("user", user.user);
                    setValue("interest", user.interest.join(", "));
                    setValue("age", user.age);
                    setValue("mobile", user.mobile);
                    setValue("email", user.email);
                } else {
                    toast.error("User not found.");
                    router.back();
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id, router, setValue]);

    const onSubmit = async (data: any) => {
        console.log(data);
        const interest = data?.interest.split(",").map((i: string) => i.trim());
        const updatedData: Partial<User> = {
            user: data.user,
            interest,
            age: parseInt(data.age.toString()),
            mobile: parseInt(data.mobile.toString()),
            email: data.email,
        };
        try {
            await axios.put(
                `http://localhost:5000/api/users/${id}`,
                updatedData,
            );
            toast.success("User updated successfully!");
            router.push("/");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error updating user.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-10">
            <Card>
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="user">Username</Label>
                            <Input
                                id="user"
                                {...register("user", {
                                    required: "Username is required",
                                })}
                            />
                            {errors.user && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.user.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="interest">
                                Interests (comma-separated)
                            </Label>
                            <Input
                                id="interest"
                                {...register("interest", {
                                    required: "Interests are required",
                                })}
                                placeholder="Comics, Sports"
                            />
                            {errors.interest && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.interest.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                {...register("age", {
                                    required: "Age is required",
                                    min: {
                                        value: 0,
                                        message: "Age must be at least 0",
                                    },
                                })}
                            />
                            {errors.age && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.age.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="mobile">Mobile</Label>
                            <Input
                                id="mobile"
                                type="number"
                                {...register("mobile", {
                                    required: "Mobile is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Invalid mobile number",
                                    },
                                })}
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.mobile.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update User"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
