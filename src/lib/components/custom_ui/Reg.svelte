<script>
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
	import { goto } from "$app/navigation";
    import ConfirmEmail from "./ConfirmEmail.svelte";
	import { execute } from "$lib/api";

    let fullName = $state('')
    let email = $state('')
    let password = $state('')
    let codePanel = $state(false)

    async function reg() {
        let res = await execute({
            path: "/register",
            method: "post",
            data: {
                "name":fullName,
                "email": email,
                "password": password,
            },
            secure: false,
        })
        if (res){
            codePanel = true
        }
    }
</script>

<Tabs.Content value="reg">
{#if codePanel}
    <ConfirmEmail bind:codePanel={codePanel} fullName={fullName} email={email} password={password}/>
    {:else}
    <Card.Root>
        <Card.Header>
         <Card.Title>Регистрация</Card.Title>
         <Card.Description>
          Зарегистрируйтесь, чтобы начать пользоваться:
         </Card.Description>
        </Card.Header>
        <form onsubmit={() => {reg()}}>
           <Card.Content class="space-y-2">
           <div class="space-y-1">
            <Label for="full name">ФИО</Label>
            <Input bind:value={fullName} id="full name" type="text" placeholder="Иван Иванович Иванов"/>
           </div>
           <div class="space-y-1">
           <Label for="email">Почта</Label>
           <Input bind:value={email} id="email" type="email" placeholder="email@email.com"/>
           </div>
           <div class="space-y-1">
           <Label for="password">Пароль</Label>
           <Input bind:value={password} id="password" type="password" placeholder="*************"/>
           </div>
           </Card.Content>
           <Card.Footer>
               <button class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2">
                   Зарегистрироваться</button>
           </Card.Footer>
        </form>
    </Card.Root>
{/if}

</Tabs.Content>
