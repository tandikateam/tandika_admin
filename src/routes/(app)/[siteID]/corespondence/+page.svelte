<script>
// @ts-nocheck

	import { Button } from '$lib/components/ui/button';

	export let data;
	let siteData = data.siteData;
	let correspondence = data?.correspondence || []
	import * as Card from '$lib/components/ui/card';
	import {
		Ellipsis,
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
	import { toggleViewed } from '$lib/firebaseUtils';
	import { toast } from 'svelte-sonner';
	import { invalidate } from '$app/navigation';

	function formatDate(dateObject) {
    if (!dateObject || !dateObject.seconds) {
      return 'Invalid Date';
    }
    const jsDate = new Date(dateObject.seconds * 1000); // Convert seconds to milliseconds
    
    // Using built-in Date methods:
    return jsDate.toLocaleDateString();
    
    // Or, if you prefer using date-fns:
    // return format(jsDate, 'PP'); // Format as 'Apr 29, 2021'
  }

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
						<Table.Head class="hidden w-[100px] md:table-cell pl-5">Type</Table.Head>
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
					{#each correspondence as cor}
					<Table.Row class="{cor.viewed ? '': 'bg-muted/40 text-muted-foreground'}">
						<Table.Cell class="table-cell pl-5">
							<Badge variant="outline" class="uppercase">{cor?.cta}</Badge>
						</Table.Cell>
						<Table.Cell class="font-medium">{cor?.name}</Table.Cell>
						<Table.Cell>
							{cor?.tel}
						</Table.Cell>
						<Table.Cell class="">{cor?.email} </Table.Cell>
						<Table.Cell class="max-w-56">{cor?.message}</Table.Cell>
						<Table.Cell class="">{formatDate(cor?.createdAt)}</Table.Cell>
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
									<DropdownMenu.Item on:click={async ()=>{
										toast.loading('Updating', {description: `Marking as ${cor.viewed ? 'unread': 'read'}`})
										//toggle viewed
										toggleViewed(cor.id, !cor.viewed).then(()=>{
										invalidate('app:layout').then(()=>{
											toast.dismiss()
											// correspondence = data?.correspondence || []
											cor.viewed = !cor.viewed
											toast.success("Success", {description: "Updated successfully"})
											})
										}).catch((e)=>{
											console.error(e)
											toast.success("Error", {description: "Something went wrong"})
										})
									}}>Mark as {cor.viewed ? 'Unread': 'Read'}</DropdownMenu.Item>
									<DropdownMenu.Item
									class="" disabled>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</main>
	{/if}
</main>
