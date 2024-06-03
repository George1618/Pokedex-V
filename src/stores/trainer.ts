import { defineStore } from "pinia";
import { ref } from "vue";

const useTrainerStore = defineStore('trainer', () => {
    const trainer = ref({
        name: "George",
        description: "Nascido em 2001, sou natural de Iguatu - Ce"+
            ", e me mudei para Fortaleza em 2019 para iniciar a graduação em Ciência da Computação"+
            " na UFC (Universidade Federal do Ceará). Apesar de não ter conhecido muito da programação"+
            " e do desenvolvimento de Software quando entrei na área, participei de alguns projetos"+
            " de programação para a Web durante a graduação, mas este é o primeiro em que trabalho com Vue."+
            " Registro, assim, com este aplicativo web o grande prazer ter trabalhado com essa ferramenta"+
            " durante o curso do Juventude Digital.",
        image: 'https://github.com/George1618.png',
        social: {
            github: 'https://github.com/George1618',
            linkedin: 'https://www.linkedin.com/in/george-h-8929481b4/',
            instagram: 'https://www.instagram.com/george.ham.01/'
        },
        party: [468, 260, 448, 407, 405, 242]
    })

    return {trainer}
});

export default useTrainerStore;