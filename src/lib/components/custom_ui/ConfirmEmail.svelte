<script>
    import { execute } from "$lib/api";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as InputOTP from "$lib/components/ui/input-otp/index.js";
    import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";

    let {fullName,email,password,codePanel=$bindable()} = $props()

    let code = $state('')
    async function confirmEmail(){
        let res = await execute({
            path:"/verify",
            method: "post",
            secure: false,
            data:  {"code":code},
        })
        if (res){
            log()
        }
    }

    async function resendCode(){
        let res = await execute({
            path:"/resend",
            method: "post",
            secure: false,
            data:  {"email":email},
        })
    }


    async function log() {
        let res = await execute({
            path: "/auth",
            method: "post",
            data: {
                "email": email,
                "password": password,
            },
            secure: false,
        })
        if (res){
            localStorage.setItem("Authorization",res.access_token);
            window.location.replace('/')
        }
    }
</script>
    
<Card.Root>
    <Card.Header>
        <Card.Title>Подтверждение почты</Card.Title>
        <Card.Description>Введите код, пришедший на вашу почту</Card.Description>
    </Card.Header>
        <Card.Content>
            <InputOTP.Root bind:value={code} maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                {#snippet children({ cells })}
                    <InputOTP.Group>
                    {#each cells as cell}
                        <InputOTP.Slot {cell} />
                    {/each}
                    </InputOTP.Group>
                {/snippet}
            </InputOTP.Root>
            <Card.Description><button class="text-blue-700" onclick={() => {resendCode()}}>Отправить еще раз</button></Card.Description>
        </Card.Content>
        <Card.Footer>
            <Button onclick={()=>{confirmEmail()}}>Подтвердить</Button>
            <Button class="ml-2" variant="outline" onclick={() => {codePanel=false}}>Вернуться</Button>
        </Card.Footer>
</Card.Root>
    