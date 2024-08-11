<script>
	import SimpleSocialIcons from '$lib/customComponents/SimpleSocialIcons.svelte';
	import SocialIcons from '$lib/customComponents/SocialIcons.svelte';
	import { colorClass } from '$lib/customUtils';
	// export let socials = []
	export let siteData;
	let footer = siteData.footer || {
		locationInfo: '',
		copyright: ''
	};
	// $: console.log(siteData);
</script>

<footer
	class="relative {colorClass(
		siteData.primaryColor,
		siteData.primaryColorForeground
	)} py-8 md:px-8 md:py-7"
>
	<div class="container">
		<p class="text-balance text-center text-sm leading-loose">
			<span class="font-medium underline underline-offset-4">
				{footer.copyright}
			</span>
		</p>

		<div class="mt-3 flex flex-row items-center justify-center gap-6">
			{#each siteData.channels as channel, i}
				<span class="flex flex-wrap items-center justify-center gap-2">
					<SimpleSocialIcons channel={channel.channel} class="size-6 " />
					{#if channel.channel == 'Phone'}
						<a href="tel:{channel.value}" target="_blank">{channel.value}</a>
					{:else if channel.channel == 'Email'}
						<a href="mailto:{channel.value}" target="_blank">{channel.value}</a>
					{/if}
				</span>
				{#if i + 1 != siteData.channels.length}
					<span> | </span>
				{/if}
			{/each}
		</div>
	</div>
</footer>

<div class="w-full rounded-none bg-black px-4 py-3 text-white">
	<p class="text-center">Made using <span class="underline underline-offset-2">Tandiika</span></p>
</div>
