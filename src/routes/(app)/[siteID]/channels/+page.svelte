<script lang="ts">
	//@ts-nocheck
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { CircleAlert, Ellipsis, Mail, Megaphone, Plus } from 'lucide-svelte';
	import SimpleSocialIcons from '$lib/customComponents/SimpleSocialIcons.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { addChannel, removeChannel, updateChannelStatus } from '$lib/firebaseUtils';
	import * as Drawer from '$lib/components/ui/drawer';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";
	import { fade } from 'svelte/transition';

	export let data;
	let channelDrawer = false;
	let channels = data?.siteData?.channels || [
		{
			channel: '', //Phone, WhatsApp, LinkedIn, X, Facebook, Instagram, Email
			value: '',
			responseRate: 0,
			active: true
			// primary: false
		}
	];
	let acceptWhatsApp = false
	function identifyChannel(input: string) {
		// Helper function to validate email
		function isValidEmail(email: string) {
			// Check for a more realistic email structure
			if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return false;
			const [localPart, domain] = email.split('@');
			return localPart.length <= 64 && domain.length <= 255;
		}

		// Helper function to validate phone number
		function isValidPhone(phone: string) {
			// Remove all non-digit characters
			const digits = phone.replace(/\D/g, '');
			// Check if the number of digits is within a reasonable range
			return digits.length >= 10 && digits.length <= 15;
		}

		// Helper function to validate URL
		function isValidUrl(url: string) {
			try {
				new URL(url);
				return true;
			} catch {
				return false;
			}
		}

		// Regular expressions for initial pattern matching
		const patterns = {
			Phone: /^(\+\d{1,3}[-.\s]?)?(\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
			LinkedIn: /^https:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
			Twitter_X: /^https:\/\/(www\.)?(x|twitter)\.com\/[\w-]+\/?$/,
			Facebook: /^https:\/\/(www\.)?facebook\.com\/[\w.]+\/?$/,
			Instagram: /^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/,
			Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		};

		// Test the input against each pattern with additional validation
		for (const [type, pattern] of Object.entries(patterns)) {
			if (pattern.test(input)) {
				switch (type) {
					case 'Phone':
						return isValidPhone(input) ? 'Phone' : 'Unknown';
					case 'Email':
						return isValidEmail(input) ? 'Email' : 'Unknown';
					case 'LinkedIn':
					case 'Twitter_X':
					case 'Facebook':
					case 'Instagram':
						return isValidUrl(input) ? type : 'Unknown';
					default:
						return type;
				}
			}
		}

		// If no match is found
		return 'Unknown';
	}
	let channel = {
		channel: '', //Phone, Whatsapp, LinkedIn, X, Facebook, Instagram, Email
		value: '',
		responseRate: 0,
		active: true
		// primary: false
	};

	let addingChannel = false;
</script>

<div class="ml-2">
	<div class="flex flex-row items-start justify-between p-4">
		<div class="flex flex-row items-center justify-center gap-2">
			<div
				class="mr-2 flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground"
			>
				<Megaphone class="size-9" />
			</div>
			<div class="flex flex-col gap-0">
				<p class="text-lg font-semibold">Communication Channels</p>
				<p class="text-sm font-normal">How your Tandiika site visitors can reach you</p>
			</div>
		</div>

		<Button
			variant="secondary"
			on:click={() => {
				channelDrawer = true;
			}}
			>New Channel
			<Plus class="ml-2 size-5" />
		</Button>
	</div>
	<Separator />

	<Table.Root>
		<!-- <Table.Caption>A list of your recent channels.</Table.Caption> -->
		<Table.Header class="bg-muted px-4 text-muted-foreground">
			<Table.Row>
				<Table.Head class="w-20 pl-5"></Table.Head>
				<Table.Head class="">Channel</Table.Head>
				<Table.Head class="">Value</Table.Head>
				<Table.Head class="">Response Rate</Table.Head>
				<Table.Head class="pr-5"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each channels as channel, i (i)}
				<Table.Row
					class=""
					on:click={() => {
						//
					}}
				>
					<Table.Cell class="w-20 pl-5">
						<Switch
							bind:checked={channel.active}
							onCheckedChange={(e) => {
								//Update status
								toast.loading('Updating...', {
									description: 'Updating your communication channels.'
								});
								updateChannelStatus(data.siteID, channel, e)
									.then(() => {
										//refresh things
										invalidate('app:layout').then(() => {
											toast.dismiss();
											toast.success('Success', {
												description: 'Updated your communication channel.'
											});
										});
									})
									.catch((e) => {
										toast.dismiss();
										toast.error('Error', { description: 'Something went wrong!' });
										console.error(e);
									});
							}}
						/>
					</Table.Cell>
					<Table.Cell class="">
						<div class="flex items-center justify-start gap-3">
							<span
								class="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground"
							>
								<SimpleSocialIcons channel={channel.channel} class="size-4 " />
							</span>
							<span class="w-20">
								{#if channel.channel == 'Twitter_X'}
									X (Twitter)
								{:else}
									{channel.channel}
								{/if}
							</span>
							<!-- <Badge class="text-xs" variant="outline">PRIMARY</Badge> -->
						</div>
					</Table.Cell>
					<Table.Cell class="">{channel.value}</Table.Cell>
					<Table.Cell class="">{channel.responseRate}</Table.Cell>
					<Table.Cell class="pr-5">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="ghost">
									<Ellipsis class="size-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Item
									disabled
										on:click={() => {
											//Edit it
											// channel = channel;
											// channelDrawer = true;
											//
										}}>Edit</DropdownMenu.Item
									>
									<DropdownMenu.Item
										on:click={() => {
											toast.loading('Loading...', { description: 'Removing channel' });
											removeChannel(data.siteID, channel)
												.then(() => {
													invalidate('app:layout').then(() => {
														toast.dismiss();
														toast.success('Success', {
															description: 'Channel removed successfully.'
														});
														//remove it from array
														// channels = channels.filter((x) => {
														// 	return x.value != channel.value;
														// });
														channels = data?.siteData?.channels;
														channelDrawer = false;
														addingChannel = false;
													});
												})
												.catch((e) => {
													//
													toast.dismiss();
													toast.error('Error', { description: 'Something went wrong!' });
													console.error(e);
													addingChannel = false;
												});
										}}>Delete</DropdownMenu.Item
									>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<!-- Channel Drawer -->
<Drawer.Root bind:open={channelDrawer}>
	<Drawer.Content class="">
		<div class="mx-auto w-1/2 py-5">
			<Drawer.Header>
				<Drawer.Title>Add a New Channel</Drawer.Title>
				<Drawer.Description>
					<div class="mt-4 flex flex-row items-center gap-5">
						<span
							class="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground"
						>
							<SimpleSocialIcons channel={channel.channel} class="size-7 " />
						</span>
						<!-- <p>{channel.channel}</p> -->
						<Input
							type="text"
							placeholder="Paste or enter your social media URL, Phone Number or Email"
							bind:value={channel.value}
							on:keyup={() => {
								//Check value
								channel.channel = identifyChannel(channel.value);
							}}
							class="w-full"
						/>
						{#if channel.channel == "Phone"}

						<span class="ml-2" in:fade>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<CircleAlert class="size-6 " />
								</Tooltip.Trigger>
								<Tooltip.Content>
								  <p>Use International Formatting for phone numbers</p>
								</Tooltip.Content>
							  </Tooltip.Root>
						</span>
{/if}
					</div>

					{#if channel.channel == "Phone"}
					<div class="flex items-center justify-end mt-2 space-x-2" in:fade>
						<Checkbox id="whatsapp" 
						bind:checked={acceptWhatsApp}
						
						/>
						<Label
						  for="whatsapp"
						  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
						>
						  Add phone number to WhatsApp as well.
						</Label>
					  </div>
					{/if}

				</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer class="flex flex-row items-center justify-end gap-4">
				<Drawer.Close>Cancel</Drawer.Close>
				<Button
					disabled={addingChannel}
					on:click={() => {
						//Add a new channel
						addingChannel = true;
						let c = []
						if(acceptWhatsApp){
							c = [...c, channel, {...channel, channel: "WhatsApp"}]
						}else{
							c = [...c, channel ]
						}

						addChannel(data.siteID, c)
							.then(() => {
								invalidate('app:layout').then(() => {
									toast.dismiss();
									toast.success('Success', {
										description: 'Added a new communication channel.'
									});
									// channels = [...channels, channel];
									channels = data?.siteData?.channels;
									channelDrawer = false;
									addingChannel = false;
								});
							})
							.catch((e) => {
								//
								toast.dismiss();
								toast.error('Error', { description: 'Something went wrong!' });
								console.error(e);
								addingChannel = false;
							});
					}}
				>
					{#if addingChannel}
						<svg
							class="h-5 w-5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					{:else}
						Submit
					{/if}
				</Button>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
