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
	import { fade } from 'svelte/transition';
	import { Globe, Building2Icon, PlugZap, Rocket, ThumbsUpIcon, Users, ChartBar, Phone, MapPin,  } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SimpleSocialIcons from '$lib/customComponents/SimpleSocialIcons.svelte';
	let actions = ['start up', 'stand out', 'stand strong', 'start now'];


	let index = 0;
	setInterval(() => {
		if (index == actions.length - 1) {
			index = 0;
		} else {
			index++;
		}
		// action = actions[randomEl(actions)];
	}, 5000);

	let routes = [
		{route: "Home", id: "hero"},
		{route: "About", id: "about"},
		{route: "What we do", id: "services"},
		{route: "Contact Us", id: "contact"},


	]


</script>

<svelte:head>
	<title>
		Tandika | Let's startup
	</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-20 px-4 md:px-6">
		<nav
			class="hidden lg:flex-row flex-row gap-6 text-lg font-medium md:flex md:flex-row md:items-center 
			md:gap-5 md:text-sm "
		>

		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base mr-8">
			<img src="/logo.png" class="h-40 w-auto object-contain" alt="">

		</a>

		{#each routes as {route, id}}
		<a href="#{id}" class="text-foreground transition-colors hover:text-foreground inline whitespace-nowrap"> {route} </a>
		{/each}


		
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
					<a href="/" class="flex items-center gap-2 text-lg font-semibold">
						<h2 class="text-3xl font-bold lg:text-4xl">Tandika</h2>

					</a>
					{#each routes as {route, id}}
					<a href="#{id}" class="hover:text-foreground inline whitespace-nowrap"> {route} </a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<Button 
			href="/nosite/dashboard"
			class="ml-auto">Build your site Now

				<Rocket class="ml-2 size-4" />

			</Button>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<!-- Hero -->
	
				<div class="relative overflow-hidden pt-8">
				  <div class="container">
					<div class="max-w-3xl text-center mx-auto">
					  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl">
						Helping African Startups 
						<br>
						{#key index}
						<span in:fade class="lg:text-8xl text-5xl text-[#69306D]">
							{actions[index]}.
						</span>
					{/key}
					  </h1>
					  <p class="mt-3 lg:text-3xl text-xl  text-muted-foreground">
						We're on a mission to amplify African innovation, one startup at a
						time.
					  </p>
					</div>
					<div class="mt-10 relative max-w-5xl mx-auto">
					  <img
						src="/vectors/14.svg"
						class="max-h-96 mx-auto rounded-xl"
						alt="ImageDescription"
						
					  />
					  <div class="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
						<div class="w-48 h-48 rounded-lg bg-background/10" />
					  </div>
					  <div class="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
						<div class="w-48 h-48 rounded-full bg-background/10" />
					  </div>
					</div>
				  </div>
				</div>
		<!-- Hero End -->
		

		<Separator class="w-3/4 mx-auto my-5" />


		<!-- About Section -->

		<div class="container pt-8">
			<div class="max-w-2xl mx-auto">
			  <div class="grid gap-12">
				<div>
				  <h2 class="text-3xl font-bold lg:text-4xl">Our Origin Story</h2>
				  <p class="mt-3 text-muted-foreground">
					Born from our experiences in Africa's entrepreneurial landscape,
					 we recognized the need for a solution that empowers African startups 
					 with a strong online presence. Our AI-powered platform transforms the way 
					 startups build their digital identity, making professional web presence accessible to all.
				  </p>
				</div>
				<div class="space-y-6 lg:space-y-10">
				  <div class="flex">
					<Rocket class="flex-shrink-0 mt-2 h-6 w-6" />
					<div class="ms-5 sm:ms-8">
					  <h3 class="text-base sm:text-lg font-semibold">
						AI-Powered Website Creation
					  </h3>
					  <p class="mt-1 lg:text-lg font-normal">
						Turn your pitch deck into a professional website using AI technology. 
						It's like having a local web developer at your fingertips, without the
						 hassle or high costs and unreliability.
					  </p>
					</div>
				  </div>
				  <div class="flex">
					<Users class="flex-shrink-0 mt-2 h-6 w-6" />
					<div class="ms-5 sm:ms-8">
					  <h3 class="text-base sm:text-lg font-semibold">
						Supporting African Entrepreneurs
					  </h3>
					  <p class="mt-1 lg:text-lg font-normal">
						We're more than just a tool - we're a support system for African startups.
						 Our mission is to solve local problems and help businesses thrive across the continent.
					  </p>
					</div>
				  </div>
				  <div class="flex">
					<PlugZap class="flex-shrink-0 mt-2 h-6 w-6" />
					<div class="ms-5 sm:ms-8">
					  <h3 class="text-base sm:text-lg font-semibold">
						Comprehensive Startup Solutions
					  </h3>
					  <p class="mt-1 lg:text-lg font-normal">
						From online presence to analytics and customer management, we provide the
						 tools startups need to establish, grow, and succeed in the digital age.
					  </p>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		
		<!-- About Section End -->


		<Separator />

		<!-- Features -->
		
		  
		  <div class="container py-6 lg:py-8 bg-[#69306D] text-neutral-100 rounded-md mb-8">
			<div class="">
				<div class="grid gap-12">
				  <div>
					<h2 class="text-3xl font-bold lg:text-4xl">What we offer</h2>
					<p class="mt-3 ">
					 With founders in mind, and as founders a ourselves, we're looking at bring African Entrepreneurship to the World</p>
				  </div>
				  </div>
				  </div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12 mt-12">
			  <!-- AI-Powered Website Creation -->
			  <div class="text-center">
				<div class="flex justify-center items-center w-12 h-12 bg-primary border-2 rounded-full mx-auto">
				  <Rocket class="flex-shrink-0 w-5 h-5 text-primary-foreground" />
				</div>
				<div class="mt-3">
				  <h3 class="text-xl font-semibold">AI-Powered Creation</h3>
				  <p class="mt-1 lg:text-lg font-normal">
					Transform your pitch deck into a professional website using AI
				  </p>
				</div>
			  </div>
		  
			  <!-- African-Focused -->
			  <div class="text-center">
				<div class="flex justify-center items-center w-12 h-12 bg-primary border-2 rounded-full mx-auto">
				  <Globe class="flex-shrink-0 w-5 h-5 text-primary-foreground" />
				</div>
				<div class="mt-3">
				  <h3 class="text-xl font-semibold">African-Focused</h3>
				  <p class="mt-1 lg:text-lg font-normal">
					Tailored solutions for the unique needs of African startups
				  </p>
				</div>
			  </div>
		  
			  <!-- Comprehensive Tools -->
			  <div class="text-center">
				<div class="flex justify-center items-center w-12 h-12 bg-primary border-2 rounded-full mx-auto">
				  <ChartBar class="flex-shrink-0 w-5 h-5 text-primary-foreground" />
				</div>
				<div class="mt-3">
				  <h3 class="text-xl font-semibold">Comprehensive Tools</h3>
				  <p class="mt-1 lg:text-lg font-normal">
					Analytics, CRM, and more to help your startup grow
				  </p>
				</div>
			  </div>
		  
			  <!-- Entrepreneurial Support -->
			  <div class="text-center">
				<div class="flex justify-center items-center w-12 h-12 bg-primary border-2 rounded-full mx-auto">
				  <Users class="flex-shrink-0 w-5 h-5 text-primary-foreground" />
				</div>
				<div class="mt-3">
				  <h3 class="text-xl font-semibold">Entrepreneurial Support</h3>
				  <p class="mt-1 lg:text-lg font-normal">
					More than a tool - a support system for your startup journey
				  </p>
				</div>
			  </div>
			</div>
		  </div>
		<!-- Features End -->

		<Separator class="my-8" />

		<!-- Contact Us -->

	

		<!-- Contact Us End -->


	</main>
</div>
<div class="container py-8 bg-neutral-950 text-neutral-100">
	<div class="max-w-5xl mx-auto">
	  <div class="grid grid-cols-4 gap-12">
		<div class="col-span-1">
			<img src="/logo_light.png" class="h-44 w-auto object-contain" alt="">
		  <!-- <h2 class="text-3xl font-bold lg:text-4xl">Tandika</h2> -->
		  <p class="mt-3 text-muted-foreground">
		  </p>
		</div>
		<div class="space-y-1 lg:space-y-2 col-span-3 flex flex-col text-end  justify-end items-end">
			<p class="text-2xl font-bold ">
				Reach out to us.
			</p>
			<!-- <p class="flex flex-row gap-2 items-center justify-center">
				<Phone class="size-5" />
				<a href="tel:+256787253360">+256 (0) 78-7-253360</a>
			</p> -->
			<p class="flex flex-row gap-2 items-center justify-center">
				<SimpleSocialIcons channel='Whatsapp' class="size-5" />
				<a href="tel:+256787253360">+256 (0) 78-7-253360</a>
			</p>
			<p class="flex flex-row gap-2 items-center justify-center">
				<SimpleSocialIcons channel='Email' class="size-5" />
				<a href="mailto:tandika.app@gmail.com">tandika.app@gmail.com</a>
			</p>
			<!-- <p class="flex flex-row gap-2 items-center justify-center">
				<MapPin class="size-5" />
				<span>Kampala, Uganda</span>
			</p> -->
		</div>
	  </div>
	</div>
  </div>
