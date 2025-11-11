export interface CategoryCard {
  id: string
  name: string
  image: string
  link: string
}

export const categoryCards: CategoryCard[] = [
    {
    id: 'servers',
    name: 'Сервера',
    image: new URL('../assets/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
    link: '/store/servers'
    },
    {
    id: 'storage',
    name: 'СХД',
    image: new URL('../assets/eaf7ece79bbc58e58c35a0c177db2a6d0c706139.png', import.meta.url).href,
    link: '/store/storage'
    },
    {
    id: 'switches',
    name: 'Коммутаторы',
    image: new URL('../assets/711e594c888b7442a07d42b260dd0e0e33a055cf.png', import.meta.url).href,
    link: '/store/switches'
    },
    {
    id: 'ups',
    name: 'ИБП',
    image: new URL('../assets/c26643e51be38c6e105e515f464f7be54ffb6046.png', import.meta.url).href,
    link: '/store/ups'
    },
    {
    id: 'monitors',
    name: 'Мониторы',
    image: new URL('../assets/c76d3bd5d24b79c30ff2233c3a0d6be1638b807a.png', import.meta.url).href,
    link: '/store/monitors'
    },
    {
    id: 'processors',
    name: 'Процессоры',
    image: new URL('../assets/39c468b679ca60bdae20ede6a4e2cb28c8d751c4.png', import.meta.url).href,
    link: '/store/processors'
    },
    {
    id: 'ram',
    name: 'ОЗУ',
    image: new URL('../assets/35362449031dcf0e83e82af2655a71ff05ac9cbc.png', import.meta.url).href,
    link: '/store/ram'
    },
    {
        id: 'servers',
        name: 'Сервера',
        image: new URL('../assets/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        link: '/store/servers'
    },
    {
        id: 'storage',
        name: 'СХД',
        image: new URL('../assets/eaf7ece79bbc58e58c35a0c177db2a6d0c706139.png', import.meta.url).href,
        link: '/store/storage'
    },
    {
        id: 'switches',
        name: 'Коммутаторы',
        image: new URL('../assets/711e594c888b7442a07d42b260dd0e0e33a055cf.png', import.meta.url).href,
        link: '/store/switches'
    },
    {
        id: 'ups',
        name: 'ИБП',
        image: new URL('../assets/c26643e51be38c6e105e515f464f7be54ffb6046.png', import.meta.url).href,
        link: '/store/ups'
    },
    {
        id: 'monitors',
        name: 'Мониторы',
        image: new URL('../assets/c76d3bd5d24b79c30ff2233c3a0d6be1638b807a.png', import.meta.url).href,
        link: '/store/monitors'
    },
    {
        id: 'processors',
        name: 'Процессоры',
        image: new URL('../assets/39c468b679ca60bdae20ede6a4e2cb28c8d751c4.png', import.meta.url).href,
        link: '/store/processors'
    },
    {
        id: 'ram',
        name: 'ОЗУ',
        image: new URL('../assets/35362449031dcf0e83e82af2655a71ff05ac9cbc.png', import.meta.url).href,
        link: '/store/ram'
    }
]
