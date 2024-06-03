<script setup lang='ts'>
import strings from '@/assets/strings';
import useTrainerStore from '@/stores/trainer';
import Card from 'primevue/card';

const trainer = useTrainerStore().trainer;

// ícones para os links de redes sociais
const socialIcons = {
    github: 'GitHub_icon.png',
    linkedin: 'Linkedin_icon.png',
    instagram: 'Instagram_icon.png'
}

</script>
<template>
    <Card id="trainercard">
        <template #header>
            <img :src="trainer.image" />
        </template>
        <template #title>
            {{ trainer.name }}
        </template>
        <template #subtitle>
            <p>{{ trainer.description }}</p>
        </template>
        <template #content>
            {{ strings.trainercard.favorite }}
            <Card id="trainerparty">
                <template #content>
                    <img v-for="id in trainer.party" 
                        :src='`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`' />
                </template>
            </Card>
        </template>
        <template #footer>
            <a v-for="(app, key) in trainer.social" :href="app"
            ><img :src="'src/assets/'+socialIcons[key]" />{{ key }}</a>
        </template>
    </Card>
</template>
<style scoped>
    #trainercard {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    :deep(.p-card-header) {
        min-width: fit-content;
    }
    :deep(.p-card-header > img) {
        padding: 10px;
        height: 20vw;
        width: 20vw;
    }

    :deep(#trainerparty .p-card-content) {
        display: flex;
    }
    :deep(#trainerparty) {
        background: rgba(0, 27, 197, 0.2);
    }
    :deep(#trainerparty img) {
        width: 15vw;
    }

    :deep(.p-card-footer) {
        display: flex;
        justify-content: space-around;
    }
    :deep(.p-card-footer > a > img) {
        display: inline-block;
        height: 5vh;
        width: 5vh;
    } 

</style>