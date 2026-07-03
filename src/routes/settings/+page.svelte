<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
	import { execute } from '$lib/api';
	import { selectReginon } from '../../store/store';
	import { onDestroy } from 'svelte';

	let selectReginonChange = $state(null);
	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let description = $state('');

	async function setFederation() {
		let res = await execute({
			path: '/federations/' + String(selectReginonChange.id),
			method: 'put',
			data: {
				'description': description,
				'logo': null,
				'region': selectReginonChange.region,
				'admins': []
			}
		});
	}
</script>

<div>
	<div class="h-full">
		<Card.Root>
			<Card.Header>
				<Card.Title>Настройки</Card.Title>
				<Card.Description>Здесь вы изменяеет публичную информацию о огранизации.</Card.Description>
			</Card.Header>
			<div>
				<Card.Content>
					<div class="flex flex-wrap gap-6 mb-6">
						<div class="w-[250px]">
							<AspectRatio ratio={1 / 1} class="bg-muted rounded-full">
								<img src="..." alt="" class="rounded-md object-cover" />
							</AspectRatio>
						</div>
						<div class="space-y-1 grow">
							<Label for="descriptionCompetiton">Описание</Label>
							<Textarea class="h-full" bind:value={description} id="descriptionCompetiton"
												placeholder="Мы гордимся тем, что наш регион занимает одну из самых прогрессивных позиций в сфере IT-соревнований..." />
						</div>
					</div>
				</Card.Content>
				<Card.Footer>
					<button onclick={()=>{setFederation()}}
									class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2">
						Сохранить
					</button>
				</Card.Footer>
			</div>
		</Card.Root>
	</div>
</div>