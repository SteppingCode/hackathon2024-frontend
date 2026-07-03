<script lang="js">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import { execute } from '$lib/api.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { LandPlot, Trophy } from 'lucide-svelte';
	import { onMount } from 'svelte';

	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { onDestroy } from 'svelte';
	import { profile } from '../../store/store';
	import CompetitionCard from '$lib/components/custom_ui/CompetitionCard.svelte';

	let profileValue = $state(null);

	const unsubscribe = profile.subscribe(value => {
		profileValue = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	async function getEvents() {
		let res = await execute({
			method: 'get',
			path: '/events',
			params: {
				federation_id: '675353bd28dd2916efe84fb2'
			}
		});

		return res;
	}

	let member_name = $state('');
	let member_birth = $state('');
	let member_role = $state('');
	let team_name = $state('');
</script>

<div class="h-full">
	<Card.Root>
		<Card.Header />
		<Card.Content>
			<ScrollArea class="h-full">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[200px]">
								<div class="flex gap-2">
									<LandPlot />
									Регион
								</div>
							</Table.Head>
							<Table.Head>
								<div class="flex gap-2">
									<Trophy />
									Соревнование
								</div>
							</Table.Head>
							<Table.Head></Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#await getEvents()}
							{#each [2, 2, 2, 2, 2] as a}
								<Table.Row>
									<Table.Cell class="h-4 w-40">
										<Skeleton class="h-4 w-40" />
									</Table.Cell>
									<Table.Cell class="h-4 w-60">
										<Skeleton class="h-4 w-60" />
									</Table.Cell>
									<Table.Cell class="h-4 w-20">
										<Skeleton class="h-4 w-20" />
									</Table.Cell>
								</Table.Row>
							{/each}
						{:then events}
							{#each events as event}
								<Table.Row>
									<Table.Cell class="font-medium h-4 w-40">{event.region}</Table.Cell>
									<Table.Cell class="h-4 w-60">{event.name}</Table.Cell>
									<Table.Cell class="h-4 w-20"><CompetitionCard event={event}/></Table.Cell>
								</Table.Row>
							{/each}
						{/await}
					</Table.Body>
				</Table.Root>
			</ScrollArea>
		</Card.Content>
		<Card.Footer />
	</Card.Root>
</div>