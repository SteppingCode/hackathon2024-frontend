<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { selectReginon } from '../../store/store';

	import Stats from '$lib/components/custom_ui/Stats.svelte';

	import { execute } from '$lib/api';
	import { onDestroy } from 'svelte';

	let selectReginonChange = $state(null);
	let allKey = $state();

	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
		allKey += 1;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let idRegion = selectReginonChange.region;

	async function getRegionState(id) {
		return await execute({
			path: `/federations/${id}/stats`,
			method: 'get',
		});
	}
</script>

<div class="w-full flex justify-center">
	<div class="w-full">
		<div class="w-full">
			{#await getRegionState(idRegion)}
				Loading..
			{:then regionState}
				{#if regionState}
					<Card.Root>
						<Card.Content>
							<div class="flex flex-col gap-6 p-4">
								<div class="flex gap-6 max-sm:flex-wrap">
									<div class="p-4"><img src="{regionState.img}" alt=""></div>
									<div class="flex flex-col border rounded-2xl p-6 w-full gap-2">
										<div class="flex gap-2 flex-wrap">
											<Badge class="bg-blue-500 p-2" variant="secondary">{regionState.city}</Badge>
											<Badge>Федерация</Badge>
										</div>
										<div>
											<h1 class="text-2xl text-wrap">Список ответственных лиц</h1>
											<Separator class="mt-2 mb-2" />
											{#each regionState.head as head}
												<div class="flex flex-col sm:text-2xl font-extralight text-wrap flex-wrap">
													<p>{regionState.name}</p>
													<p>{regionState.contact}</p>
												</div>
											{/each}
										</div>
									</div>
								</div>
								<div class="flex flex-col flex-wrap gap-2">
									<h1 class="text-2xl text-wrap text-center">Статистика региона</h1>
									<Stats competitions={regionState.competitions} />
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				{:else}
					Ничего не найдено...
				{/if}
			{/await}
		</div>
	</div>
</div>