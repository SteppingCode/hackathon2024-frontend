<script>
	import { execute } from '$lib/api';
	import * as Select from '$lib/components/ui/select/index.js';
	import { onDestroy } from 'svelte';
	import { selectReginon } from '../../../store/store';

	let selectReginonChange = null;

	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let regions = $state();
	let { idRegion = $bindable(), region = $bindable() } = $props();
	let value = $state();

	async function getRegions() {
		let res = await execute({
			path: '/regions',
			secure: false
		});
		if (res) {
			regions = res;
		}
	}

	async function getMyRegions() {
		let res = await execute({
			path: '/federations/my',
			method: 'get'
		});
		if (res) {
			getRegions();
			return res;
		}
	}


</script>
{#await getMyRegions()}
	Loading...
{:then myRegions}
	<Select.Root type="single" name="favoriteFruit" bind:value>
		<Select.Trigger class="w-[180px]">
			{value ? regions[value] || "Выберите регион" : "Выберите регион"}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>Мои регионы</Select.GroupHeading>
				{#each myRegions as myRegion}
					<Select.Item value={myRegion.region} onclick={()=> {
              if (value)
              {
                idRegion=myRegion.id; region=myRegion.region
                selectReginon.set(myRegion)
              }
            else {
              idRegion=null; region=null
              selectReginon.set(null)
            }
            }} label={regions[myRegion.region]}
					>{regions[myRegion.region]}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{/await}
