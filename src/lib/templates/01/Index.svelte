<script>
	//@ts-nocheck
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Contact from './Contact.svelte';
	import FaQs from './FAQs.svelte';
	import Features from './Features.svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero.svelte';
	import HowItWorks from './HowItWorks.svelte';
	import Problem from './Problem.svelte';
	import ProblemStats from './ProblemStats.svelte';
	import Solution from './Solution.svelte';
	import Team from './Team.svelte';
	import Testimonials from './Testimonials.svelte';
	export let editing = false;
	export let activeSection = null;
	export let siteData = {};

	function selectSection(section) {
		if (editing && activeSection != section) {
			activeSection = section;
		}
	}

	function deselectSection() {
		activeSection = null;
	}
	// $: console.log(schema, 'FROM INDEX');
</script>

<div class=" w-full">
	<ScrollArea class="h-[91vh] rounded-none  px-3">
		<Hero
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('hero');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<Problem
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('problem');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<ProblemStats
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('problemStats');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<Solution
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('solution');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Features
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('features');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<HowItWorks
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('howItWorks');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<Team
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('team');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<Contact
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('contact');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Separator />
		<FaQs
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('faqs');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Testimonials
			bind:siteData
			bind:editing
			bind:activeSection
			on:select={(e) => {
				selectSection('testimonials');
			}}
			on:deselect={() => {
				// console.log('deselect');
				activeSection = null;
			}}
		/>
		<Footer bind:siteData />
	</ScrollArea>
</div>
