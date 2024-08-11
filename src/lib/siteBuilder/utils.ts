export let schema = {
	//Navigation
	navigationItems: [{ title: 'Home', section: 'hero', active: 'boolean' }], //Add according to sections
	//Hero Section
	hero: {
		headline: 'string', //Main Text
		tagline: 'string', //Secondary Text
		cta_main: 'string', //main  Contact Us, Pre-Order, Join Waitlist, Watch Demo, Request Demo, Request a Call Back
		heroImageURL: 'URL' //URL of Hero Image
	},
	//Problem Solution Section
	problems: [
		{
			title: 'string', // Section Title
			description: 'string', // Outline
			stat: '', // Statistic
			imageURL: '' //Icon
		}
	],
	solutions: {
		title: 'Solution Section Title', //What we do
		subtitle: '', //
		solutions: [
			{
				title: 'string', //Product/ Solution
				description: 'rts', // Outline
				pricing: '', //Product Price - If available
				imageURL: '' //Icon
			}
		]
	},
	//Traction / Impact Section
	traction: [
		{
			description: 'string', // Section Title
			statistic: '' // Statistic
		}
	],
	// Product / Solution Features (Benefits) Section
	productFeatures: {
		title: 'Features',
		subtitle: '',
		features: [
			{
				title: 'string',
				description: 'rts',
				icon: 'string'
			}
		]
	},
	// How it works Section
	howItWorks: {
		title: 'How it Works',
		subtitle: '',
		steps: [
			{
				stepNumber: 'number',
				title: 'string',
				description: 'rts',
				imageURL: '' //Could also be icon
			}
		]
	},
	//Testimonies
	testimonials: {
		title: 'Testimonials',
		subtitle: '',
		quotes: [
			{
				quote: 'rts',
				author: 'string',
				imageURL: 'URL'
			}
		]
	},

	// FAQs
	faqs: {
		title: 'Frequently Asked Questions',
		subtitle: '',
		faqs: [
			{
				question: 'string',
				answer: 'rts'
			}
		]
	},
	// Team
	team: {
		title: 'Team',
		subtitle: '',
		members: [
			{
				name: 'string',
				bio: 'rts', //Position or Bio
				socials: [{ social: '', url: 'url' }],
				imageURL: ''
			}
		]
	},
	// Partners (Trusted By) Logos
	partners: [{ partner: '', imageURL: 'URL' }],
	// Call to Action
	ctas: [
		{
			title: 'string',
			subtitle: 'rts',
			type: 'contact', //Contact, Waitlist, Preorder, Newsletter, Request Demo, Watch Video, Call Back
			buttonText: 'string',
			content: ''
		}
	],

	//Contact
	contact: {
		title: 'string',
		subtitle: 'rts',
		mainContact: 'tel',
		mainEmail: 'email'
	},
	//Footer
	footer: {
		locationInfo: 'rts',
		phoneInfo: ['tel'],
		emailInfo: ['emails'],
		socialMediaLinks: [{ social: '', url: '' }],
		copyright: 'rts',
		privacyPolicyLink: 'string'
	}
};
