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
	import { onDestroy } from 'svelte';
	import { profile } from '../../../store/store';

	let profileValue = $state(null);

	const unsubscribe = profile.subscribe(value => {
		profileValue = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let fullName = $state('');
	let password = $state('');
	let repassword = $state('');
	let regions = $state([]);

	let idRegion = $state();

	let description = $state();

	async function createFedStat() {
		let res = await execute({
			path: '/requests',
			method: 'post',
			data: {
				'type': 'federation',
				'payload': {
					'description': description,
					'logo': null,
					'region': idRegion
				}
			}
		});
		if (res) {

		}
	}

	async function settings() {
		let res = await execute({
			path: '/update_profile',
			method: 'put',
			data: {
				'name': fullName,
				'password': password,
				'password_confirmation': repassword
			}
		});
	}
</script>

<div class="h-full">
	<div class="mb-6 ">
		<h1 class="text-2xl font-bold">Личный кабинет</h1> <span class="text-sm text-slate-700">ID:{profileValue ? profileValue.id : "loading.."}</span>
	</div>

	<div class="flex flex-col gap-6">
		<div class="flex flex-wrap w-full grow gap-6">
			<!-- Настройки -->
			<div class="grow">
				<Card.Root class="h-full">
					<Card.Header>
						<Card.Title>Настройки</Card.Title>
						<Card.Description>Вы можеет изменять данные своего аккаунта</Card.Description>
					</Card.Header>
					<form onsubmit={() => {settings()}}>
						<Card.Content>
							<div class="space-y-1">
								<Label for="full name">ФИО</Label>
								<Input bind:value={fullName} id="full name" type="text" placeholder="Иван Иванович Иванов" />
							</div>
							<div class="space-y-1">
								<Label for="password">Новый пароль</Label>
								<Input bind:value={password} id="password" type="password" placeholder="*************" />
							</div>
							<div class="space-y-1">
								<Label for="repassword">Повторите пароль</Label>
								<Input bind:value={repassword} id="repassword" type="password" placeholder="*************" />
							</div>
						</Card.Content>
						<Card.Footer>
							<button
								class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2"
							>Сохранить изменения
							</button>
						</Card.Footer>
					</form>
				</Card.Root>
			</div>
			<!-- Настройки -->
			<!-- Заявление на создание федерации -->
			<div class="grow ">
				<Card.Root>
					<Card.Header>
						<Card.Title>Заявления на роль администратора</Card.Title>
						<Card.Description>Ваши заявления на роль администратора</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-wrap gap-6 mb-6">
							<div class="w-[150px]">
								<AspectRatio ratio={1 / 1} class="bg-muted rounded-full">
									<img src="..." alt="" class="rounded-md object-cover" />
								</AspectRatio>
							</div>
							<div class="space-y-1 grow">
								<Label for="descriptionCompetiton">Описание</Label>
								<Textarea class="h-[150px]" bind:value={description} id="descriptionCompetiton"
													placeholder="Мы гордимся тем, что наш регион занимает одну из самых прогрессивных позиций в сфере IT-соревнований..." />
							</div>
						</div>
						<div class="space-y-1">
							<Label for="region">Выберите регион</Label>
							<div class="flex flex-wrap gap-2">
								<div class="grow">
									<RegionSelecter bind:idRegion={idRegion} id="region" />
								</div>
								<div>
									<Button onclick={()=> {createFedStat()}}>Отправить заявления</Button>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
			<!-- Заявление на создание федерации -->
		</div>
	</div>
</div>