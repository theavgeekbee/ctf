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
import {createClient} from "@/lib/supabase/server";

export default async function Home() {
    const supabase = await createClient();
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="text-4xl">
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
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="signup-username">Username</Label>
                                        <Input id="signup-username" name="username" placeholder="Username"/>
                                    </Field>
                                    <Field>
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input id="signup-password" type="password" name="password"
                                               placeholder="Password"/>
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
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
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="login-username">Username</Label>
                                        <Input id="login-username" name="username" placeholder="Username"/>
                                    </Field>
                                    <Field>
                                        <Label htmlFor="login-password">Password</Label>
                                        <Input id="login-password" type="password" name="password"
                                               placeholder="Password"/>
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </main>
        </div>
    );
}
