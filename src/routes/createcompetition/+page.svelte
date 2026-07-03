<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Minus, Plus, RefreshCcw, X } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { execute } from '$lib/api.js';
	import { onDestroy } from 'svelte';
	import { selectReginon } from '../../store/store';


	let selectReginonChange = $state(null);
	let allKey = $state();
	const unsubscribe = selectReginon.subscribe(value => {
		selectReginonChange = value;
		allKey += 1;
	});

	onDestroy(() => {
		unsubscribe();
	});

	// Календарь

	let start = today(getLocalTimeZone());
	let startValue = $state(undefined);

	let end = start.add({ days: 7 });
	let value = $state({
		start,
		end
	});

	const df = new DateFormatter('ru-RU', {
		dateStyle: 'medium',
		locale: 'ru-RU'
	});

	function convert(date = '') {
		let spl = date.split('-');
		return {
			year: Number(spl[0]),
			month: Number(spl[1]),
			day: Number(spl[2])
		};
	}

	// Календарь

	let arrStandards = $state([]);
	let nameStandard = $state('');
	let members = $state([20]);
	let nameCompetition = $state('');
	let descriptionCompetition = $state('');
	let age_from = $state([0]);
	let age_to = $state([20]);
	let gender = $state('any');
	let address = $state('');

	let event_data = $state({
		federation_id: '',
		name: null,
		description: null,
		date_from: null,
		date_to: null,
		region: null,
		age_from: null,
		age_to: null,
		gender: null,
		address: null,
		members: null,
		criteria: []
	});
</script>

<div>
	<div>
		<Card.Root>
			<Card.Header>
				<Card.Title>Создание соревнования</Card.Title>
				<Card.Description>После успешного создания мероприятия автоматически отправляется запрос на одобрение в ФСП.
					Как только ваш запрос будет обработан, вы получите уведомление о статусе согласования.
				</Card.Description>
			</Card.Header>
			<Card.Content>

				<div class="space-y-1">
					<Label for="nameCompetiton">Название мероприятия</Label>
					<Input bind:value={nameCompetition} id="nameCompetiton" type="text"
								 placeholder="Продуктовое программирование" />
				</div>
				<div class="space-y-1">
					<Label for="descriptionCompetiton">Описание</Label>
					<Textarea bind:value={descriptionCompetition} id="descriptionCompetiton"
										placeholder="Это уникальная возможность для разработчиков, дизайнеров и продакт-менеджеров проявить свои навыки в создании современных IT-решений.." />
				</div>
				<div class="flex gap-6 mt-6 items-center flex-wrap">
					<!-- Календарь -->
					<div class=" flex flex-col gap-2">
						<Label>Выберите период проведения</Label>
						<Popover.Root>
							<Popover.Trigger
								class={cn(
                                buttonVariants({
                                variant: "outline",
                                class: "w-full justify-start text-left font-normal"
                                }),
                                !value && "text-muted-foreground"
                            )}
							>
								<CalendarIcon />
								{#if value && value.start}
									{#if value.end}
										{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
										value.end.toDate(getLocalTimeZone())
									)}
									{:else}
										{df.format(value.start.toDate(getLocalTimeZone()))}
									{/if}
								{:else if startValue}
									{df.format(startValue.toDate(getLocalTimeZone()))}
								{:else}
									Выберите дату или период
								{/if}

							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" align="start">
								<RangeCalendar
									bind:value
									onStartValueChange={(v) => {
                                startValue = v;                    
                                }}

									numberOfMonths={2}
									locale="ru"

								/>
							</Popover.Content>
						</Popover.Root>
					</div>
					<!-- Календарь -->
					<div class="grow space-y-1">
						<Label for="locationEvent">Место проведения</Label>
						<Input id="locationEvent" bind:value={address} />
					</div>
				</div>
				<div class="grow">
					<Label for="members">Участники от: 0 до: {members[0]}</Label>
					<Slider id="members" bind:value={members} max={1000} step={1} />
				</div>
				<div class="flex flex-wrap gap-6 mt-4">
					<div class="flex flex-col flex-wrap gap-2">
						<Label>Пол</Label>
						<div class="flex items-center gap-2">
							<RadioGroup.Root bind:value={gender}>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="any" id="option-three" />
									<Label for="option-three">Любой</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="male" id="option-one" />
									<Label for="option-one">Мужчины</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="female" id="option-two" />
									<Label for="option-two">Женщины</Label>
								</div>
							</RadioGroup.Root>
						</div>
					</div>
					<div class="flex flex-col flex-wrap grow gap-2 mt-4">
						<Label>Возраст</Label>
						<div class="flex flex-col flex-wrap gap-2">
							<div class="flex flex-row flex-wrap items-center gap-2 grow">
								<Label for="age_from">От: {age_from}</Label>
								<Slider id="age_from" bind:value={age_from} max={100} step={1} />
							</div>
							<div class="flex flex-row flex-wrap items-center gap-2 grow">
								<Label for="age_to">До: {age_to}</Label>
								<Slider id="age_to" bind:value={age_to} max={100} step={1} />
							</div>
						</div>
					</div>
				</div>
				<div class="space-y-1">
					<Label for="nameCompetiton">Название критерия</Label>
					<div class="flex flex-row gap-2">
						<Input bind:value={nameStandard} id="nameCompetiton" type="text" placeholder="UI/UX" />
						<Button
							onclick={() => {nameStandard == "" || arrStandards.includes(nameStandard) ? null : arrStandards.push(nameStandard)}}>
							Добавить критерий
						</Button>
					</div>
					<div class="flex gap-2 flex-wrap">
						{#each arrStandards as standard (standard)}
							<Badge class="flex justify-between"
										 onclick={() => {arrStandards.splice(arrStandards.indexOf(standard),1)}}>{standard}
								<X size={16} />
							</Badge>
						{/each}
					</div>

				</div>
			</Card.Content>
			<Card.Footer>
				<button
					class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2"
					onclick={async function() {
						let event_data = $state({
							name: nameCompetition,
							description: descriptionCompetition,
							date_from: String(value.start.year)+"-"+String(value.start.month)
							.padStart(2,"0")+"-"+String(value.start.day).padStart(2,"0"),
							date_to: String(value.end.year)+"-"+String(value.end.month)
							.padStart(2,"0")+"-"+String(value.end.day).padStart(2,"0"),
							region: selectReginonChange.region,
							age_from: age_from[0],
							age_to: age_to[0],
							gender: gender,
							members: members[0],
							address: address,
							criteria: arrStandards,
						});

						let res = await execute({
							method: "post",
							path: "/requests",
							data: {
								type: "event",
								payload: {
									federation_id: selectReginonChange.id,
									event_data: event_data
								},
							}
						});
					}}
				>
					Отправить
				</button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>