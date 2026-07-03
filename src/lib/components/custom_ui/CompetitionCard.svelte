<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { addNotify } from "$lib/notify.svelte";
	import axios from "axios";
    import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { execute } from "$lib/api";

 let {event} = $props()

 
    function uploadFile() {
    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    if (fileInput.files[0]) {
        console.log(fileInput.files)
        formData.append("file", fileInput.files[0]);
        
        axios({
                method: 'post',
                url: 'https://hack2024-back.vladyalk.ru/events/getTeamsByExcel',
                data: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer "+String(localStorage.getItem("Authorization")),
                },
            })
            .then(response => {
              if(response.data.detail){
                addNotify({
                    code: response.status, 
                    text: response.data.detail
                });
            }   
            })
            .catch(error => {
              if(error.response){
                //from back
                console.log(`ERROR: ${error.response.code}`);
                if(error.response.data){
                    console.log(error.response.data.detail);
                    if (error.response.status == 422 && typeof(error.response.data.detail) == "object"){
                        error.response.data.detail = "Произошла ошибка при проверке введенных Вами данных.";
                    }                 

                    addNotify({
                        code: error.response.status, 
                        text: error.response.data.detail
                    });
                }
            }else{
                //sgorel server
                console.log("ERROR: unexcepted");
                addNotify({
                    code: 500, 
                    text: "Произошла ошибка сервера! Попробуйте позже."
                });
            }
            });
    }
}

async function start() {
    let res = await execute({
        path: `/events/${event.id}/start`,
        method: "post",

    })
}

 let des = $state('')
async function geeNereateDesc() {
    let res = await execute({
        path: "/events/createDescription",
        method: "post",
        data: {
            "name": event.name,
            "date_from": event.date_from,
            "date_to": event.date_to,
            "region": event.region,
            "age_from": event.age_from,
            "age_to": event.age_to,
            "address": event.address
        }
    })
    if (res){
        des = res
    }
}

</script>
 
<Dialog.Root>
    <Dialog.Trigger>Подробнее</Dialog.Trigger>
    <Dialog.Content>

    {#if event.state == "waiting"}
        <Dialog.Header>
         <Dialog.Title>Загрузите команды</Dialog.Title>
         <a class="underline underline-offset-2" href="https://hack2024-storage.vladyalk.ru/hackdata/template.xlsx">Шаблон .xlsx файла</a>
         <Dialog.Description>
          <Input type="file" id="fileInput" class="mb-2"/>
          <div class="flex flex-row gap-2">
              <Button class="grow" onclick={()=> {uploadFile()}}>Загрузить команду</Button>
              <Button class="grow" variant="outline" onclick={()=> {start()}}>Начать соревнование</Button>
          </div>
         </Dialog.Description>
        </Dialog.Header>
    {/if}
    <div>
        {des}
    </div>
    <Button onclick={geeNereateDesc()}>Сгенирировать описание</Button>
</Dialog.Content>
</Dialog.Root>