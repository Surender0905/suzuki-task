import { Button } from "@/components/ui/button";
import UserDetail from "@/components/UserDetail";
import Link from "next/link";
import React from "react";

async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    if (!id) {
        return <div>No user found</div>;
    }

    return (
        <div className="w-[800px] mx-auto p-10 flex flex-col gap-5">
            <Link href="/">
                <Button> Back </Button>
            </Link>
            <UserDetail userId={id as string} />
        </div>
    );
}

export default UserDetailPage;
