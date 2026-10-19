import {signIn, signUp} from '@/app/auth/actions'

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {AlertCircleIcon, InfoIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import Image from "next/image";
import logo from '../public/logo.png'
import React from "react";

type Props = {
    searchParams: Promise<{
        error?: string
        message?: string
    }>
}

export const instant = false;

async function checkLogin() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (!error && data?.claims?.sub) {
        redirect('/dash');
    }
}

export default async function Home({searchParams}: Props) {
    const {error, message} = await searchParams;

    await checkLogin();

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    {error && <>
                        <Alert>
                            <AlertCircleIcon/>
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </>}
                    {message && <>
                        <Alert>
                            <InfoIcon/>
                            <AlertTitle>Message</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    </>}

                    <h1 className="flex items-strecth gap-2 text-4xl">
                        <Image src={logo} alt={"Logo"} placeholder="blur"
                               width={100} height={100} className="w-auto self-stretch object-contain" />
                        Welcome to the CRHS Computer Science Club&#39;s CTF Hub!
                    </h1>
                    <p>CTFs are cybersecurity puzzles/challenges where you find a hidden string of text
                        (the &#34;flag&#34;).
                        Finding the flag involves putting your cybersecurity knowledge to good use: cryptography,
                        digital forensics, reverse engineering, and more.</p>
                    <p>Anyone may participate and submit a solution.</p>
                    <div className="flex gap-4">
                        <Dialog>
                            <DialogTrigger render={
                                <Button className="h-12 px-8 text-xl">Sign Up</Button>
                            }>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Sign Up</DialogTitle>
                                    <DialogDescription>
                                        Sign up for an account here.
                                    </DialogDescription>
                                </DialogHeader>
                                <form action={signUp}>
                                    <FieldGroup>
                                        <Field>
                                            <Label htmlFor="signup-email">Email
                                                <span className={"text-destructive"}>*</span>
                                            </Label>
                                            <Input id="signup-email" name="email" placeholder="JohnDoe@gmail.com"
                                                   required/>
                                        </Field>
                                        <Field>
                                            <Label htmlFor="signup-password">Password
                                                <span className={"text-destructive"}>*</span>
                                            </Label>
                                            <Input id="signup-password" type="password" name="password"
                                                   placeholder="Password" required/>
                                        </Field>
                                    </FieldGroup>
                                    <DialogFooter>
                                        <Button type="submit">Sign Up</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger render={
                                <Button className="h-12 px-8 text-xl" variant="secondary">Log In</Button>
                            }>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Log In</DialogTitle>
                                    <DialogDescription>
                                        Log in to your existing account.
                                    </DialogDescription>
                                </DialogHeader>
                                <form action={signIn}>
                                    <FieldGroup>
                                        <Field>
                                            <Label htmlFor="login-email">Email
                                                <span className={"text-destructive"}>*</span>
                                            </Label>
                                            <Input id="login-email" name="email" placeholder="JohnDoe@gmail.com"
                                                   required/>
                                        </Field>
                                        <Field>
                                            <Label htmlFor="login-password">Password
                                                <span className={"text-destructive"}>*</span>
                                            </Label>
                                            <Input id="login-password" type="password" name="password"
                                                   placeholder="Password" required/>
                                        </Field>
                                    </FieldGroup>
                                    <DialogFooter>
                                        <Button type="submit" formAction={signIn}>Log In</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </main>
        </div>
    );
}
