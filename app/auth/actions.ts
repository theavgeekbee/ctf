'use server'

import {createClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import {connection} from "next/server";

export async function signUp(formData: FormData) {
    await connection();

    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    if (!email || password.length < 8) {
        redirect('/?error=Use%20a%20valid%20email%20and%208%2B%20character%20password')
    }

    const supabase = await createClient()

    const {error} = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        redirect('/?error=Could%20not%20create%20account')
    }

    // Email confirmation may be required by your project.
    redirect('/?message=Check%20your%20email%20to%20continue')
}

export async function signIn(formData: FormData) {
    await connection();
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    const supabase = await createClient()

    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/?error=Invalid%20email%20or%20password')
    }

    redirect('/dash')
}

export async function signOut() {
    await connection();
    const supabase = await createClient()

    await supabase.auth.signOut()

    redirect('/')
}