import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import UserList from "@/components/UserList";

export default function Home() {
    return (
        <div className="container mx-auto p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">
                    User Management
                </h1>
                <Link href="/users/create">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </Link>
            </div>
            <Suspense fallback={<div>Loading users...</div>}>
                <UserList />
            </Suspense>
        </div>
    );
}
