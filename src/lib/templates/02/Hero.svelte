<script>
	export let schema;
	$: hero = schema.hero || {
		tagline: '',
		heroImageURL: null,
		cta_main: '',
		headline: ''
	};
</script>

<div class="border-4 border-dashed border-primary p-6">
	<div class="relative overflow-hidden py-20 lg:py-24">
		<div class="container">
			<div class="mx-auto max-w-2xl text-center">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{hero.headline}
				</h1>
				<p class="mt-3 text-xl text-muted-foreground">
					{hero.tagline}
				</p>
			</div>
			<div class="relative mx-auto mt-10 max-w-5xl">
				<img src="https://placehold.co/1024x480" class="rounded-xl" alt="Image_Description" />
				<div
					class="absolute -start-20 bottom-12 -z-[1] h-48 w-48 rounded-lg bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px"
				>
					<div class="h-48 w-48 rounded-lg bg-background/10" />
				</div>
				<div
					class="absolute -end-20 -top-12 -z-[1] h-48 w-48 rounded-full bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px"
				>
					<div class="h-48 w-48 rounded-full bg-background/10" />
				</div>
			</div>
		</div>
	</div>
</div>
