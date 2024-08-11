<script>
	// @ts-nocheck

	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import { authUser } from '$lib/stores/persistedAuthStore';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import Profile from './Profile.svelte';
	import Billing from './Billing.svelte';
	import Customization from './Customization.svelte';
	import Security from './Security.svelte';

	let tabs = ['Profile', 'Security', 'Billing', 'Customization'];
	let activeTab = 'Profile';
</script>

<svelte:head>
	<title>Profile | Tandika</title>
</svelte:head>

<main class="mx-4">
	<div>
		<div class="flex flex-row items-end justify-start gap-5 pb-3">
			<Avatar.Root class="size-24">
				<Avatar.Image src={$authUser?.photoURL || '/user.png'} alt={$authUser?.displayName} />
				<Avatar.Fallback>{$authUser?.displayName || 'TK'}</Avatar.Fallback>
			</Avatar.Root>

			<div class="flex flex-col gap-1 py-3">
				<p class="text-2xl font-semibold">{$authUser?.displayName || ''}</p>
				<p class="">
					<Badge variant="outline">
						{$authUser?.email || ''}
					</Badge>
				</p>
			</div>
		</div>

		<div class="flex flex-row gap-2 py-0">
			{#each tabs as tab}
				<Button
					class="rounded-none 
				{activeTab == tab ? 'border-b-2 border-primary font-bold text-primary' : ''} transition-all
				"
					variant="ghost"
					on:click={() => {
						activeTab = tab;
					}}>{tab}</Button
				>
			{/each}
		</div>
		<Separator />
	</div>

	<div class="p-4">
		{#if activeTab == 'Profile'}
			<Profile />
		{:else if activeTab == 'Billing'}
			<Billing />
		{:else if activeTab == 'Customization'}
			<Customization />
		{:else if activeTab == 'Security'}
			<Security />
		{/if}
	</div>
</main>
