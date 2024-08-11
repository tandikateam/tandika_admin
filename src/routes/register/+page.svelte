<script lang="ts">
	//@ts-nocheck
	import { goto, invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import TelInput from '$lib/customComponents/TelInput.svelte';
	import GoogleSignBtn from '$lib/customComponents/GoogleSignBtn.svelte';
	import PasswordInput from '$lib/customComponents/PasswordInput.svelte';
	import { register, saveUser, updateUser } from '$lib/firebaseUtils';
	import { isValidEmail } from '$lib/customUtils';
	import Loader from '$lib/customComponents/Loader.svelte';
	import { authUser } from '$lib/stores/persistedAuthStore';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebaseConfig';

	let email: string;
	let password: string;
	let displayName: string;
	let registering: Boolean = false;
	let phone: string = null;
	let valid: Boolean;
</script>

<svelte:head>
	<title>Register | Tandika</title>
</svelte:head>

<div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
	<div class="hidden h-full w-full items-center justify-center bg-muted/30 lg:flex">
		<img src="/vectors/14.svg" class="mx-auto h-[90vh]" alt="" />
	</div>

	<div class="flex flex-row items-center justify-center py-8">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">
					Let your Startup, <span class="text-primary">Standout</span>
				</h1>
				<p class="text-balance text-muted-foreground">Let's get started</p>
			</div>
			<form
				class="max-w-md"
				on:submit|preventDefault={async () => {
					// Validation
					if (displayName == '') {
						toast.error('Warning', { description: 'Please enter a valid name' });
						return;
					}
					if (password == '') {
						toast.error('Warning', { description: 'Please enter a valid password' });
						return;
					}
					if (!valid) {
						toast.error('Warning', { description: 'Please enter a valid phone number' });
						return;
					}
					if (!isValidEmail(email)) {
						toast.error('Warning', { description: 'Please enter a valid email' });
						return;
					}

					// All validations passed
					try {
						registering = true;

						// Register user
						const user = await register(email, password);

						// Save user to db
						await saveUser(displayName, user.email, phone, user.uid);

						// Login User
						await signInWithEmailAndPassword(auth, email, password);

						// Update user information
						await updateUser(displayName, phone, null);

						// Set auth user
						await authUser.set({
							displayName: user.displayName,
							phoneNumber: user.phoneNumber,
							photoURL: user.photoURL,
							email: user.email,
							uid: user.uid
						});

						// Redirect to dashboard
						goto('/new/dashboard');
					} catch (error) {
						toast.error('Something went wrong!', { description: error.message });
						throw error;
					} finally {
						registering = false;
					}
				}}
			>
				<div class="grid w-full gap-4">
					<div class="grid gap-2">
						<Label for="first-name">Name</Label>
						<Input id="first-name" bind:value={displayName} placeholder="John Doe" required />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							bind:value={email}
							type="email"
							placeholder="name@example.com"
							required
						/>
					</div>
					<TelInput bind:phone bind:valid />
					<PasswordInput bind:password label="Create a Password" />
					<Button type="submit" disabled={registering} class="w-full">
						{#if registering}
							<Loader />
						{:else}
							Create an account
						{/if}
					</Button>

					<GoogleSignBtn on:signIn={() => {}} />
				</div>

				<div class="mt-4 text-center text-sm">
					Already have an account?
					<a href="/login" class="underline"> Sign in </a>
				</div>
			</form>
		</div>
	</div>
</div>
