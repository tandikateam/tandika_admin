<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';

	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="h-6 w-6" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a href="##" class="text-foreground transition-colors hover:text-foreground"> Dashboard </a>
			<a href="##" class="text-muted-foreground transition-colors hover:text-foreground">
				Orders
			</a>
			<a href="##" class="text-muted-foreground transition-colors hover:text-foreground">
				Products
			</a>
			<a href="##" class="text-muted-foreground transition-colors hover:text-foreground">
				Customers
			</a>
			<a href="##" class="text-muted-foreground transition-colors hover:text-foreground">
				Analytics
			</a>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Analytics </a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<Button class="ml-auto">Get Started</Button>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<p class="text-3xl">Landing page</p>
	</main>
</div>
