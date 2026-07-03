<script>
	import { page } from "$app/stores";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import {AlignJustify,Settings,Moon, SunMoon, House, Bell} from 'lucide-svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { toggleMode } from "mode-watcher";
	import { execute } from "$lib/api";
	import Button from "../ui/button/button.svelte";
	import { goto } from "$app/navigation";

    let path = $derived($page.url.pathname);
    let title = "Title"
    let links = $state([
        {href: '/app',name:'Главная', icon: "<House/>"},
        {href: '/app/region',name:'Регионы', icon: "<House/>"},
        {href: '/admin/fsp',name:'ФСП', icon: "<House/>"},
        {href: '/admin/region',name:'Управление регионом', icon: "<House/>"},
    ])

    let root = $state("useыr")

    async function getUser() {
        let res = await execute({
            path: '/profile',
            method: 'get',
        })
        if (res){
            return res
        } 
    }
</script>

<nav class="w-full h-[60px] text border-b-2">
    <div class="mx-6  h-full">
        <div class="flex justify-between h-full">
            
            <div class="flex gap-12 h-full">
                <!-- PC -->
                <div class="flex hidden sm:flex  items-center">
                    <!-- <img/> -->
                     <p class="font-bold text-lg ">{title}</p>
                </div>
                <div class="h-full gap-6 hidden sm:flex">
                    {#each links as link (link.href)}
                    <div class="flex items-center h-full border-b-2 hover:border-slate-200 transition-all duration-200 {path == link.href ? "border-sky-600" : "border-transparent"}">
                        <a href={link.href}>{link.name}</a>
                    </div>
                    {/each}
                </div>
                <!-- Mobile -->
                <div class="sm:hidden flex">
                    <Sheet.Root>    
                        <Sheet.Trigger> <AlignJustify/> </Sheet.Trigger>
                        <Sheet.Content side={"left"}>
                            <Sheet.Description><p class="font-medium text-lg">{title}</p></Sheet.Description>
                            
                            <div class=" ml-2 mt-2 flex flex-col gap-3">
                                {#each links as link}
                                    <a class="hover:text-slate-900 transition-all duration-100 {path == link.href ? "" : "text-slate-400"}" href={link.href}>{link.name}</a>
                                {/each}
                            </div>
                        </Sheet.Content>
                    </Sheet.Root>
                </div>
            </div>
            <div class="sm:hidden flex items-center">
                <p class="font-bold text-lg ">{title}</p>
            </div> 
            {#await getUser()}
                Loading...
            {:then user}                 
                {#if root!="user"}
                    <div class="flex gap-3 h-full items-center ">
                        <div class="flex h-full items-center">
                            <Bell size={16}/>
                        </div>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar.Root>
                                    <Avatar.Image src="" alt="@shadcn" />
                                    <Avatar.Fallback>TS</Avatar.Fallback>
                                </Avatar.Root>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                            <DropdownMenu.Group>
                                <DropdownMenu.GroupHeading>Мой аккаунт</DropdownMenu.GroupHeading>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item onclick={()=>{goto('/app/settings')}}><Settings/>Личный кабинет</DropdownMenu.Item>
                                <DropdownMenu.Separator />

                                <DropdownMenu.Item onclick={toggleMode}><SunMoon/>Сменить тему</DropdownMenu.Item>
                            </DropdownMenu.Group>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                {:else}
                    <div class="flex gap-3 h-full items-center ">
                        <Button onclick={() => {goto('/enter')}}>Зарегистрироваться</Button>
                    </div>
                {/if}     
            {/await}
        </div>
    </div>
</nav>