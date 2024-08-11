<script>
	import { Button } from '$lib/components/ui/button';

	export let data;
	let siteData = data.siteData;
	import * as Card from '$lib/components/ui/card';
	import {
		ListFilter,
		File,
		Ellipsis,
		Package,
		Package2,
		PanelLeft,
		CirclePlus,
		Search,
		Settings,
		ShoppingCart,
		UsersRound,
		Megaphone,
		MessageCircle
	} from 'lucide-svelte';

	import { Badge } from '$lib/components/ui/badge';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';
</script>

<main class="">
	{#if !siteData}
		<div class="flex min-h-[80vh] flex-col items-center justify-center gap-2">
			<p>No site found</p>
			<Button>Create a new site</Button>
		</div>
	{:else}
		<main class="ml-2">
			<div class="flex flex-row items-start justify-between p-4">
				<div class="flex flex-row items-center justify-center gap-2">
					<div
						class="mr-2 flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground"
					>
						<MessageCircle class="size-8" />
					</div>
					<div class="flex flex-col gap-0">
						<p class="text-lg font-semibold">Correspondence</p>
						<p class="text-sm font-normal">Messages from your Tandiika site visitors</p>
					</div>
				</div>
			</div>
			<Separator />

			<Table.Root>
				<Table.Header class="bg-muted text-muted-foreground">
					<Table.Row>
						<Table.Head class="hidden w-[100px] md:table-cell">Type</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Phone Number</Table.Head>
						<Table.Head class="">Email</Table.Head>
						<Table.Head class="">Message</Table.Head>
						<Table.Head class="">Created at</Table.Head>
						<Table.Head>
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="table-cell">
							<Badge variant="outline">Draft</Badge>
						</Table.Cell>
						<Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Draft</Badge>
						</Table.Cell>
						<Table.Cell class="">$499.99</Table.Cell>
						<Table.Cell class="">25</Table.Cell>
						<Table.Cell class="">2023-07-12 10:42 AM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</main>
	{/if}
</main>
