/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@/lib/data";
import axios from "axios";

export default function NewUser() {
    const router = useRouter();
    const {
        register,
        handleSubmit,

        formState: { errors },
        reset,
    } = useForm<Partial<User>>();

    const onSubmit: SubmitHandler<Partial<User>> = async (
        data: Partial<User>,
    ) => {
        const interest = data.interest
            ?.toString()
            .split(",")
            .map((i) => i.trim());
        const newUser: Partial<User> = {
            user: data.user,
            interest,
            age: parseInt(data.age?.toString() || "0"),
            mobile: parseInt(data.mobile?.toString() || "0"),
            email: data.email,
        };

        try {
            const res = await axios.post("/api/users", newUser);

            console.log(res.data);
            reset();
            toast.success("User created successfully");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Failed to create user",
            );
        }
    };

    console.log(errors);

    return (
        <div className="container mx-auto p-10">
            <Card>
                <CardHeader>
                    <CardTitle>Create New User</CardTitle>
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
                                    required: "Name is required",
                                })}
                            />
                            {errors.user && (
                                <div style={{ color: "red" }}>
                                    {errors.user.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="interest">
                                Interests (comma-separated)
                            </Label>
                            <Input
                                id="interest"
                                {...register("interest", {
                                    required: "Interest is required",
                                })}
                                placeholder="Comics, Sports"
                            />
                            {errors.interest && (
                                <div style={{ color: "red" }}>
                                    {errors.interest.message}
                                </div>
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
                                        value: 18,
                                        message: "Age must be at least 0",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Age cannot exceed 150",
                                    },
                                })}
                            />
                            {errors.age && (
                                <div style={{ color: "red" }}>
                                    {errors.age.message}
                                </div>
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
                                        value: /^[0-9]{10}$/, // 10 digits
                                        message: "Invalid mobile number",
                                    },
                                })}
                            />
                            {errors.mobile && (
                                <div style={{ color: "red" }}>
                                    {errors.mobile.message}
                                </div>
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
                                <div style={{ color: "red" }}>
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Create User</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
