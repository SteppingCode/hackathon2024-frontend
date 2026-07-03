<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Minus, Plus, RefreshCcw } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onDestroy } from 'svelte';
	import { execute } from '$lib/api';
	import { selectReginon } from '../../store/store';

	let selectReginonChange = $state(null);
	let allKey = $state(0);
	let tabKey = $state(0);
	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let userId = $state('');
	let arr = $derived(selectReginonChange ? selectReginonChange.admins.map(item => item.id) : null);

	async function setFederation() {
		let res = await execute({
			path: '/federations/' + String(selectReginonChange.id),
			method: 'put',
			data: {
				'description': null,
				'logo': null,
				'region': selectReginonChange.region,
				'admins': arr
			}
		});
		if (res) {
			tabKey += 1;
		}
	}
</script>

<div>
	<div class="h-full flex flex-col gap-6">
		<Card.Root>
			<Card.Header>
				<Card.Title>Добавить администратора</Card.Title>
				<Card.Description>Добавляя администратора вы даёте пользователю возможность управлять федерацией !
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-1">
					<Label for="id">id пользователя</Label>
					<div class="flex flex-wrap gap-2">
						<div class="grow"><Input bind:value={userId} id="id" type="text" placeholder="sqr2l4ldi9fr9ef9d9ejkc0za" />
						</div>
						<div>
							<Button onclick={()=> {arr.push(userId);setFederation()}}>Добавить</Button>
						</div>

					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Список администрации</Card.Title>
				<Card.Description>Здесь отображаются все администраторы.</Card.Description>
			</Card.Header>
			<Card.Content>
				<ScrollArea class="h-[500px]">
					<Table.Root>
						<Table.Caption>Все администраторы</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-[200px]">ID</Table.Head>
								<Table.Head>ФИО</Table.Head>
								<Table.Head class="text-right">Почта</Table.Head>
							</Table.Row>
						</Table.Header>
						{#key tabKey}
							<Table.Body>
								{#each selectReginonChange.admins as admin}
									<Table.Row>
										<Table.Cell class="font-medium">{admin.id}</Table.Cell>
										<Table.Cell>{admin.name}</Table.Cell>
										<Table.Cell class="text-right">{admin.email}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						{/key}

					</Table.Root>
				</ScrollArea>

			</Card.Content>
		</Card.Root>
	</div>

</div>