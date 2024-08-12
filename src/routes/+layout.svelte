<script>
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import { WifiOff } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	//Offline Indicator
	$: isOffline = false;

function updateOnlineStatus() {
  isOffline = !navigator.onLine;
}
</script>

<slot></slot>
<Toaster />

{#if isOffline}
	<div class="h-screen w-screen z-[55] fixed top-0 left-0 bg-primary opacity-35">
	</div>
	<div class="bg-primary p-4 fixed w-full bottom-0 left-0 z-[56] text-center
	flex items-center justify-center gap-5
	text-primary-foreground"
	in:fly={{duration:1000, y:200 }}
	>
		<WifiOff class="size-6" />
		<p>Looks like you're offline.</p>
	</div>
{/if}


<svelte:window
  on:online={updateOnlineStatus}
  on:offline={updateOnlineStatus}
/>