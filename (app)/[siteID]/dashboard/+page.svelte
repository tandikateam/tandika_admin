<script>
	import { Button } from '$lib/components/ui/button';

	import {
		Activity,
		ArrowUpRight,
		CreditCard,
		DollarSign,
		MonitorSmartphone,
		MousePointerClick,
		Share2,
		Users
	} from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
	export let data;
	$: siteData = data.siteData;
	// $: console.log(siteData);
</script>

<svelte:head>
	<title>Dashboard | {siteData?.startup_name || ''} | Tandika</title>
</svelte:head>

<main class="">
	{#if !siteData}
		<div class="flex min-h-[80vh] flex-col items-center justify-center gap-2">
			<p>No site found</p>
			<Button>Create a new site</Button>
		</div>
	{:else}
		<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
			<div class="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
				<!-- Site Visits  -->
				<Card.Root class="shadow-none">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-0">
						<Card.Title class="text-sm font-medium">Site Visits</Card.Title>
						<div class="flex size-8 items-center justify-center rounded-full bg-primary">
							<MonitorSmartphone class="size-4 text-primary-foreground" />
						</div>
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">500</div>
						<p class="text-xs text-muted-foreground">+20% from last month</p>
					</Card.Content>
				</Card.Root>
				<!-- Site Visits End -->
				<!-- CTA Click Rate  -->
				<Card.Root class="shadow-none">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-0">
						<Card.Title class="text-sm font-medium">CTA Click Rate</Card.Title>
						<div class="flex size-8 items-center justify-center rounded-full bg-primary">
							<MousePointerClick class="size-4 text-primary-foreground" />
						</div>
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">10%</div>
						<p class="text-xs text-muted-foreground">+0% from last month</p>
					</Card.Content>
				</Card.Root>
				<!-- CTA Click Rate End -->
				<!-- Shares Rate  -->
				<Card.Root class="shadow-none">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-0">
						<Card.Title class="text-sm font-medium">Shares</Card.Title>
						<div class="flex size-8 items-center justify-center rounded-full bg-primary">
							<Share2 class="size-4 text-primary-foreground" />
						</div>
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">10%</div>
						<p class="text-xs text-muted-foreground">+0% from last month</p>
					</Card.Content>
				</Card.Root>
				<!-- Shares Rate End -->
			</div>
			<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card.Root class="shadow-none xl:col-span-2">
					<Card.Header class="flex flex-row items-center">
						<div class="grid gap-2">
							<Card.Title>Correspondence</Card.Title>
							<Card.Description>Recent transactions from your store.</Card.Description>
						</div>
						<Button href="##" size="sm" class="ml-auto gap-1">
							View All
							<ArrowUpRight class="h-4 w-4" />
						</Button>
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>Customer</Table.Head>
									<Table.Head class="xl:table.-column hidden">Type</Table.Head>
									<Table.Head class="xl:table.-column hidden">Status</Table.Head>
									<Table.Head class="xl:table.-column hidden">Date</Table.Head>
									<Table.Head class="text-right">Amount</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>
										<div class="font-medium">Liam Johnson</div>
										<div class="hidden text-sm text-muted-foreground md:inline">
											liam@example.com
										</div>
									</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">
										<Badge class="text-xs" variant="outline">Approved</Badge>
									</Table.Cell>
									<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
										2023-06-23
									</Table.Cell>
									<Table.Cell class="text-right">$250.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>
										<div class="font-medium">Olivia Smith</div>
										<div class="hidden text-sm text-muted-foreground md:inline">
											olivia@example.com
										</div>
									</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">
										<Badge class="text-xs" variant="outline">Declined</Badge>
									</Table.Cell>
									<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
										2023-06-24
									</Table.Cell>
									<Table.Cell class="text-right">$150.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>
										<div class="font-medium">Noah Williams</div>
										<div class="hidden text-sm text-muted-foreground md:inline">
											noah@example.com
										</div>
									</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">Subscription</Table.Cell>
									<Table.Cell class="xl:table.-column hidden">
										<Badge class="text-xs" variant="outline">Approved</Badge>
									</Table.Cell>
									<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
										2023-06-25
									</Table.Cell>
									<Table.Cell class="text-right">$350.00</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>
					</Card.Content>
				</Card.Root>
				<Card.Root class="shadow-none">
					<Card.Header>
						<Card.Title>Recent Sales</Card.Title>
					</Card.Header>
					<Card.Content class="grid gap-8">
						<div class="flex items-center gap-4">
							<Avatar.Root class="hidden h-9 w-9 sm:flex">
								<Avatar.Image src="/avatars/01.png" alt="Avatar" />
								<Avatar.Fallback>OM</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid gap-1">
								<p class="text-sm font-medium leading-none">Olivia Martin</p>
								<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
							</div>
							<div class="ml-auto font-medium">+$1</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</main>
	{/if}
</main>
