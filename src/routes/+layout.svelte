<script>
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NavBar from '$lib/components/custom_ui/NavBar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { toast } from 'svelte-sonner';
	import AppSidebar from '$lib/components/custom_ui/AppSidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	toast.info('Info');
	import { onDestroy } from 'svelte';
	import { selectReginon } from '../store/store';
	import { page } from '$app/stores';


	let selectReginonChange = $state(null);
	let allKey = $state();
	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
		allKey += 1;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let { children } = $props();
</script>

<Toaster position="bottom-right" />
<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<div class="w-full">
		<Sidebar.Trigger class="m-2" />
		<hr />
		{#key allKey}
			{#if selectReginonChange !== null || ["/enter", "/user/settings", "/user/statements", "/", "/competitions"].includes($page.route.id)}
				<div class="p-6">
					{@render children()}
				</div>
			{:else}
				<div class="flex h-full items-center justify-center text-3xl">
					Выберите регион
				</div>
			{/if}
		{/key}
	</div>
</Sidebar.Provider>