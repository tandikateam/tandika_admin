<script lang="ts">
	//@ts-nocheck
	import {
		Triangle,
		ChevronsUpDown,
		Check,
		Settings,
		Plus,
		Layout,
		File,
		ChartSpline,
		EllipsisVertical,
		Pointer,
		Send,
		Bolt,
		Link2,
		Blocks,
		MessageCircle,
		Megaphone
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';
	import Index from '$lib/siteBuilder/Index.svelte';
	import { authUser } from '$lib/stores/persistedAuthStore';
	import { goto, invalidateAll } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import ModeToggle from '$lib/customComponents/ModeToggle.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	export let data;
	$: siteID = data?.siteID;
	let siteDrawer = false;

	//
	let routes = [
		{ href: 'dashboard', route: 'Dashboard', icon: Layout },
		{ href: 'corespondence', route: 'Corespondence', icon: MessageCircle },
		{ href: 'builder', route: 'Builder', icon: Blocks },
		{ href: 'analytics', route: 'Analytics', icon: ChartSpline },
		{ href: 'channels', route: 'Channels', icon: Megaphone },
		{ href: 'settings', route: 'Settings', icon: Settings }
	];

	let userSites = data.userSites || [];

	let open = false;

	$: selectedValue =
		userSites.find((f) => f.site_id === siteID)?.startup_name ?? 'Select your site...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	// $: console.log(data?.userSites);
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class="grid h-screen w-full md:pl-56 lg:pl-56">
	<aside class="inset-y fixed left-0 z-20 hidden h-full min-w-56 flex-col border-r md:flex lg:flex">
		<div class="border-b p-2">
			<Button variant="outline" size="icon" aria-label="Home">
				<Bolt class="size-5 fill-foreground" />
			</Button>
		</div>
		<nav class="grid gap-0">
			<div class="p-4">
				<Popover.Root bind:open let:ids>
					<Popover.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							role="combobox"
							aria-expanded={open}
							class="w-[200px] justify-between"
						>
							{selectedValue}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-[200px] p-0">
						<Command.Root>
							<Command.Input placeholder="Search site..." />
							<Command.Empty>
								<small>No websites found.</small>
							</Command.Empty>
							<Command.Group>
								{#each userSites as site}
									<Command.Item
										value={site.site_id}
										onSelect={() => {
											// value = currentValue;
											closeAndFocusTrigger(ids.trigger);
											siteID = site.siteID;
											invalidateAll().then(() => {
												goto(`/${site.site_id}/dashboard`);
											});
										}}
									>
										{site.startup_name}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</div>

			{#each routes as { href, route, icon }, index}
				{@const isActive =
					$page.url.pathname.startsWith(`/${siteID}/${href}`) ||
					($page.url.pathname === `/${siteID}` && index === 0)}

				<Button
					href="/{siteID}/{href}"
					variant="ghost"
					class="relative flex w-full flex-row items-center
					justify-start
					rounded-none  hover:bg-primary/10
				
				"
					aria-label={siteID}
				>
					{#if isActive}
						<div
							class="absolute inset-0 rounded-none bg-primary"
							in:send={{ key: 'activetab' }}
							out:receive={{ key: 'activetab' }}
						/>
					{/if}
					<span class="z-10 flex flex-row items-center">
						<span
							class="mr-2 flex size-6 items-center justify-center rounded-md
							{isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
							transition-colors delay-75"
						>
							<svelte:component this={icon} class="  size-4" />
						</span>

						<span class:text-primary-foreground={isActive}>
							{route}
						</span>

						<!-- {#if route == 'Builder'}
							<Badge
								class="ml-2 text-xs {isActive ? 'text-primary-foreground' : ''}"
								variant="outline">Gemini AI</Badge
							>
						{/if} -->
						{#if route == 'Corespondence'}
							<Badge
								class="ml-2 rounded-full text-xs
							{isActive ? 'text-primary-foreground' : ''}
							"
								variant="default">2</Badge
							>
						{/if}
					</span>
				</Button>
			{/each}
		</nav>
		<nav class="mt-auto grid gap-1">
			<div class="flex w-full flex-row gap-0 border-t">
				<Button
					href="/{siteID}/profile"
					variant="ghost"
					class="flex w-full flex-row items-center justify-start rounded-none !py-7"
					aria-label="Playground"
				>
					<Avatar.Root class="mr-2 size-8">
						<Avatar.Image src={$authUser?.photoURL || '/user.png'} alt={$authUser?.displayName} />
						<Avatar.Fallback>{$authUser?.displayName || 'TK'}</Avatar.Fallback>
					</Avatar.Root>
					Account
				</Button>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost" class="rounded-none border-l !py-7">
							<EllipsisVertical class="size-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Find Help</DropdownMenu.Item>
							<DropdownMenu.Item
								on:click={() => {
									authUser.clear().then(() => {
										goto('/login');
									});
								}}
								class="bg-destructive text-destructive-foreground hover:bg-destructive/80"
								>Logout</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</nav>
	</aside>
	<div class="flex flex-col">
		<header
			class="sticky top-0 z-10 flex h-[53px] w-full items-center gap-1 border-b bg-background px-4"
		>
			<!-- <h1 class="text-lg font-bold">Playground</h1> -->
			<Drawer.Root>
				<Drawer.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="icon" class="md:hidden">
						<Settings class="size-4" />
						<span class="sr-only">Settings</span>
					</Button>
				</Drawer.Trigger>
				<Drawer.Content class="max-h-[80vh]">
					<Drawer.Header>
						<Drawer.Title>Configuration</Drawer.Title>
						<Drawer.Description>
							Configure the settings for the model and messages.
						</Drawer.Description>
					</Drawer.Header>
					here
				</Drawer.Content>
			</Drawer.Root>

			<div class="ml-auto flex flex-row items-center gap-3">
				<Button
					variant="default"
					size="lg"
					class=" gap-1.5 "
					on:click={() => {
						siteDrawer = true;
					}}
				>
					<Plus class="size-4" />
					Create a New Site
				</Button>

				<ModeToggle />
			</div>
		</header>
		<main class="p-0">
			<slot />
		</main>
	</div>
</div>
<ModeWatcher />

<Drawer.Root bind:open={siteDrawer}>
	<Drawer.Content>
		<div class="h-[75vh] max-h-[80vh]">
			<Index
				on:finish={(e) => {
					invalidateAll().then(() => {
						goto(`/${e.detail.id}/dashboard`);
						siteDrawer = false;
					});
				}}
			/>
		</div>
	</Drawer.Content>
</Drawer.Root>
