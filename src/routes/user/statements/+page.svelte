<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RegionSelecter from '$lib/components/custom_ui/RegionSelecter.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { execute } from '$lib/api';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Chat from '$lib/components/custom_ui/Chat.svelte';
	import { onDestroy } from 'svelte';
	import { profile } from '../../../store/store';

	let profileValue = $state(null);
	const unsubscribe = profile.subscribe(value => {
		profileValue = value;
	});
	let idRegion = $state();

	let description = $state();

	function convertDate(date) {
		const dat = new Date(date);

		let formattedDate = dat.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

		return formattedDate;
	}

	async function getRequests(state) {
		let res = await execute({
			path: '/requests/' + state
		});
		if (res) {
			return res;
		}
	}

	async function load(params) {

	}

	let helpKey = $state(0);
</script>

<div class="h-full">
	<h1 class="mb-6 text-2xl font-bold">Мои заявления</h1>
	<div class="flex">
		<Tabs.Root value="pending_answer" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				{#if profileValue && profileValue.superadmin}
					<Tabs.Trigger value="pending_answer">Требуют ответа</Tabs.Trigger>
				{:else}
					<Tabs.Trigger value="pending_review">На рассмотрении</Tabs.Trigger>

				{/if}
				<Tabs.Trigger value="closed">Закрыты</Tabs.Trigger>

			</Tabs.List>
			<Tabs.Content value="pending_answer">
				<Card.Root>
					<Card.Header>
						<Card.Title>Требуют вашего ответа</Card.Title>
						<Card.Description>
						</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<ScrollArea class="h-[400px]">
							{#await getRequests("pending_answer")}
								Loading...
							{:then requests}
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head class="w-[200px]">Тип</Table.Head>
											<Table.Head>Дата создания</Table.Head>
											<Table.Head class="text-right"></Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{#if requests.length != 0}
											{#each requests as request (request.id)}
												<Table.Row>
													<Table.Cell
														class="font-medium">{request.type == "federation" ? "Создание федерации" : "Создание соревнования"}</Table.Cell>
													<Table.Cell>{convertDate(request.created)}</Table.Cell>
													<Table.Cell class="text-right">
														<Chat ChatId={request.id} superAdmin={profileValue.superadmin} />
													</Table.Cell>
												</Table.Row>
											{/each}
										{:else}
											<br />
											Здесь ничего нет..
										{/if}
									</Table.Body>
								</Table.Root>
							{/await}
						</ScrollArea>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="pending_review">
				<Card.Root>
					<Card.Header>
						<Card.Title>На рассмотрении</Card.Title>
						<Card.Description>

						</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<ScrollArea class="h-[400px]">
							{#await getRequests("pending_review")}
								Loading...
							{:then requestsp}
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head class="w-[200px]">Тип</Table.Head>
											<!-- <Table.Head>Дата создания</Table.Head> -->
											<Table.Head class="text-right"></Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{#if requestsp.length != 0}
											{#each requestsp as requestp}
												<Table.Row>
													<Table.Cell
														class="font-medium">{requestp.type == "federation" ? "Создание федерации" : "Создание соревнования"}</Table.Cell>
													<!-- <Table.Cell>{convertDate(request.access.user.created)}</Table.Cell> -->
													<Table.Cell class="text-right">
														<Chat ChatId={requestp.id} superAdmin={profileValue.superadmin} />
													</Table.Cell>
												</Table.Row>
											{/each}
										{:else}
											<br />
											Здесь ничего нет..
										{/if}
									</Table.Body>
								</Table.Root>
							{/await}
						</ScrollArea>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="closed">
				<Card.Root>
					<Card.Header>
						<Card.Title>Закрыты</Card.Title>
						<Card.Description>

						</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<ScrollArea class="h-[400px]">
							{#await getRequests("closed")}
								Loading...
							{:then requestsc}
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head class="w-[200px]">Тип</Table.Head>
											<Table.Head>Дата закрытия</Table.Head>
											<Table.Head class="text-right"></Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{#if requestsc.length != 0}
											{#each requestsc as requestc}
												<Table.Row>
													<Table.Cell
														class="font-medium">{requestc.type == "federation" ? "Создание федерации" : "Создание соревнования"}</Table.Cell>
													<Table.Cell>{convertDate(requestc.created)}</Table.Cell>
													<Table.Cell class="text-right">
														<Chat ChatId={requestc.id} superAdmin={profileValue.superadmin} />
													</Table.Cell>
												</Table.Row>
											{/each}
										{:else}
											<br />
											Здесь ничего нет..
										{/if}
									</Table.Body>
								</Table.Root>
							{/await}
						</ScrollArea>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>