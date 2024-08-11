<script>
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Eye, EyeOff } from 'lucide-svelte';
	export let password = '';
	export let label = 'Password';
	let viewing = false;
</script>

<div class="grid gap-2">
	<Label for="password">{label}</Label>
	<div class="flex flex-row gap-2">
		<Input
			id="password"
			bind:value={password}
			autocomplete="pass"
			type={viewing ? 'text' : 'password'}
		/>
		<Button
			variant="outline"
			class="text-border"
			on:click={() => {
				viewing = !viewing;
			}}
		>
			{#if viewing}
				<EyeOff class="size-5" />
			{:else}
				<Eye class="size-5" />
			{/if}
		</Button>
	</div>
</div>
