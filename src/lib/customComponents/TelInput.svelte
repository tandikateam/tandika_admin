<script lang="ts">
	//@ts-nocheck

	// let loading = true;
	onMount(async () => {
		// let locationISO = $page.data.locationData;
		// if (locationISO) {
		// 	selectedCountry =
		// 		countries.find((el) => el.iso2 === locationISO.country.iso_code).name || null;
		// } else {
		// 	selectedCountry = null;
		// }
		// console.log(selectedCountry);
	});
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { TelInput, normalizedCountries, isSelected, clickOutsideAction } from 'svelte-tel-input';
	import 'svelte-tel-input/styles/flags.css';
	import { cn } from '$lib/utils.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	export { className as class };
	let className: $$Props['class'] = undefined;
	const countries = normalizedCountries;
	export let detailedValue = null;
	export let options = { invalidateOnCountryChange: true };

	let open = false;
	export let valid = true;
	let searchValue = '';
	export let phone = '';
	let selectedCountry = {
		id: 'UG',
		label: 'Uganda +256',
		name: 'Uganda',
		iso2: 'UG',
		dialCode: '256',
		priority: 0,
		areaCodes: null
	};
	$: selectedCountryiso2 = selectedCountry?.iso2 || 'UG';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div
	in:fade
	class="flex w-full items-center {valid
		? ''
		: 'rounded-md ring-2 ring-destructive/20 ring-offset-2'}"
>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" class="w-32 justify-start rounded-r-none">
				<!-- {selectedCountry ? `+${selectedCountry.dialCode}` : 'Select Country'} -->

				{#if selectedCountry}
					<div class="inline-flex items-center text-left">
						<span class="flag flag-{selectedCountry.iso2.toLowerCase()} mr-3 flex-shrink-0" />
						<span class="text-balance">+{selectedCountry.dialCode}</span>
					</div>
				{:else}
					<div class="inline-flex items-center text-left">
						<span class="text-balance">Country </span>
					</div>
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="bottom">
			<Command.Root>
				<Command.Input placeholder="Filter..." />
				<Command.List class="max-h-56">
					<ScrollArea class="h-56 pr-2">
						<Command.Empty>No Countries found.</Command.Empty>
						<Command.Group>
							{#each countries as country (country.id)}
								<Command.Item
									value={country.label}
									onSelect={(currentValue) => {
										searchValue = currentValue;
										selectedCountry = countries.find((s) => s.label === searchValue) ?? null;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<div class="inline-flex items-center text-left">
										<span class="flag flag-{country.iso2.toLowerCase()} mr-3 flex-shrink-0" />
										<span class="mr-2">{country.name}</span>
										<span class="text-balance">+{country.dialCode}</span>
									</div>
								</Command.Item>
							{/each}
						</Command.Group>
					</ScrollArea>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	<TelInput
		id="tel-input"
		bind:country={selectedCountryiso2}
		bind:detailedValue
		bind:value={phone}
		bind:valid
		{options}
		placeholder="Phone"
		required={true}
		class={cn(
			'flex h-9 w-full min-w-44 rounded-md rounded-l-none border border-input border-l-transparent bg-transparent px-3 py-3 text-base shadow-sm transition-colors     placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
	/>
</div>
