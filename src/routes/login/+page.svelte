<script lang="ts">
	//@ts-nocheck
	let email: string;
	let password: string;

	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebaseConfig';
	import { authUser } from '$lib/stores/persistedAuthStore';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import GoogleSignBtn from '$lib/customComponents/GoogleSignBtn.svelte';
	import PasswordInput from '$lib/customComponents/PasswordInput.svelte';
	import { isValidEmail } from '$lib/customUtils';
	import Loader from '$lib/customComponents/Loader.svelte';
	let loggingIn: Boolean = false;
</script>

<svelte:head>
	<title>Login | Tandika</title>
</svelte:head>

<div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Welcome back</h1>

				<img src="/logo.png" class="h-24 mx-auto w-auto" alt="">
				<!-- <p class="text-balance text-muted-foreground">
					Login to <span class="underline underline-offset-2">Tandika</span>
				</p> -->
			</div>
			<form
				on:submit|preventDefault={() => {
					if (password == '') {
						toast.error('Warning', { description: 'Please enter a valid password' });
					} else if (!isValidEmail(email)) {
						toast.error('Warning', { description: 'Please enter a valid email' });
					} else {
						loggingIn = true;
						signInWithEmailAndPassword(auth, email, password) //Sign In
							.then(async (userCredential) => {
								const user = userCredential.user;
								let userSum = {
									displayName: user.displayName,
									phoneNumber: user.phoneNumber,
									photoURL: user.photoURL,
									email: user.email,
									uid: user.uid
								};
								await authUser.set(userSum);
								goto('/new/dashboard');
							})
							.catch((error) => {
								throw error;
							})
							.finally(() => {
								loggingIn = false;
							});
					}
				}}
			>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							bind:value={email}
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>

					<PasswordInput label="Password" bind:password />

					<Button type="submit" disabled={loggingIn} class="w-full">
						{#if loggingIn}
							<Loader />
						{:else}
							Login
						{/if}
					</Button>

					<!-- <GoogleSignBtn on:signIn={() => {}} /> -->
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/register" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="hidden h-full w-full items-center justify-center bg-muted/30 lg:flex">
		<img src="/vectors/12.svg" class="mx-auto h-[90vh]" alt="" />
	</div>
</div>
