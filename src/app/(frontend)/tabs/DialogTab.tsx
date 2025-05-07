"use client"
import { CardContent } from "@/libs/shadcn/components/ui/card"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/libs/shadcn/components/ui/card"
import { Button } from "@/libs/shadcn/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/libs/shadcn/components/ui/dialog"
import { Input } from "@/libs/shadcn/components/ui/input"
import { Label } from "@/libs/shadcn/components/ui/label"
import { Separator } from "@radix-ui/react-select"
import React from "react"
import CommonButton from "@/libs/common/button/CommonButton"
import {useState} from 'react'

export default function DialogTab() {
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle style={{ fontSize: '1.5rem' }}>Dialog component showcase counter</CardTitle>
                <CardDescription>Explore the <code>Dialog</code> component with usage examples</CardDescription>
            </CardHeader>
            <CardContent>
                <h2>Dialog variants</h2>

            {/* commonbtn not inside provider / dialog */}
            <CommonButton onClick={() => setOpenDialog(true)}>Open Dialog</CommonButton>

            
            <Dialog open={openDialog}
             onOpenChange={setOpenDialog}
            >
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Separator className="my-6" />
            </CardContent>
        </Card>
    )
}
