<script lang="ts">
    import Calendar from "lucide-svelte/icons/calendar";
    import House from "lucide-svelte/icons/house";
    import Inbox from "lucide-svelte/icons/inbox";
    import Search from "lucide-svelte/icons/search";
    import Settings from "lucide-svelte/icons/settings";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import {
      ChevronUp,
      LogOut,
      SunMoon,
      User,
      Bell,
      Trophy,
      UserPlus,
      Users,
      DiamondPlus,
      NotebookPen,
      LogIn,
      Building
    } from 'lucide-svelte';
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { toggleMode } from "mode-watcher";
	  import { goto } from "$app/navigation";
	import SelectMyRegion from "./SelectMyRegion.svelte";
	import { execute } from "$lib/api";
  import { onDestroy } from "svelte";
	import { profile } from "../../../store/store";
 
  let profileValue = null
  
  const unsubscribe = profile.subscribe(value => {
    profileValue = value
  })

  onDestroy(() =>{
    unsubscribe()
  })


  let {region=$bindable(),idRegion=$bindable()} = $props()
  $inspect(region)
  $inspect(idRegion)
    const items = [
      {
        title: "Соревнования",
        url: "/competitions",
        icon: Trophy,
      },
     {
      title: "Администрация",
      url: "/administration",
      icon: Users,
     },
     {
      title: "Добавить соревнование",
      url: "/createcompetition",
      icon: DiamondPlus,
     },
    //  {
    //   title: "Уведомления",
    //   url: "/admin/region/notify",
    //   icon: Bell,
    //  },
     {
      title: "Организация",
      url: "/settings",
      icon: Building,
     },
    ]


    async function getProfil() {
      let res = await execute({
        path: "/profile",
        method: "get",

      })
      if (res){
        profile.set(res)
        return res
      }
      return false

    }

    function exit(){
      localStorage.setItem("Authorization",null)
      window.location.replace("/enter")
    }
   </script>
    
   <Sidebar.Root collapsible="icon">
    <Sidebar.Content>
     <Sidebar.Group>
      <Sidebar.GroupLabel class="mb-2">

        <SelectMyRegion bind:region={region} bind:idRegion={idRegion}/>

      </Sidebar.GroupLabel>
      <Sidebar.GroupContent>
       <Sidebar.Menu>
        {#each items as item (item.title)}
         <Sidebar.MenuItem>
          <Sidebar.MenuButton>
           {#snippet child({ props })}
            <a href={item.url} {...props}>
             <item.icon />
             <span>{item.title}</span>
            </a>
           {/snippet}
          </Sidebar.MenuButton>
         </Sidebar.MenuItem>
        {/each}
       </Sidebar.Menu>
      </Sidebar.GroupContent>
     </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            {#await getProfil()}
              Loading...
            {:then profile}
            {#if profile != false}
              <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {#snippet child({ props })}
                  <Sidebar.MenuButton
                    {...props}
                    class="h-12 justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                  <User/><span>{profile.name}</span>
                        <Avatar.Root>
                            <Avatar.Image src="" alt="@shadcn" />
                            <Avatar.Fallback>{profile.name.slice(0,2).toUpperCase()}</Avatar.Fallback>
                        </Avatar.Root>
                  </Sidebar.MenuButton>
                {/snippet}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                side="top"
                class="w-[--bits-dropdown-menu-anchor-width]"
              >
                <DropdownMenu.Item onclick={toggleMode}>
                    <SunMoon/>
                    <span>Сменить тему</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onclick={()=>{goto('/user/statements')}}>
                  <NotebookPen/>
                  <span>Заявления</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onclick={() =>{
                  window.location.replace("https://t.me/dfjgodijgdfgbuydfgbuysgfodgbot?start="+profileValue.id)
              }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                </svg>
                Телеграм
                </DropdownMenu.Item>
                <DropdownMenu.Item onclick={()=>{goto('/user/settings')}}>
                  <Settings/>
                  <span>Личный кабинет</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onclick={()=>{exit()}}>
                    <LogOut/>
                    <span>Выйти</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
              </DropdownMenu.Root>
              {:else}
              <Sidebar.MenuButton onclick={()=>{goto('/enter')}}>
                <LogIn/>Войти
              </Sidebar.MenuButton>
            {/if}               
            {/await}

          </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Footer>
</Sidebar.Root>