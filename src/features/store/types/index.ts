export interface CategoryCard {
  id: string
  name: string
  image: string
  link: string
}

export interface PromoBanner {
  id: string
  title: string
  image: string
  link: string
}

export interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  link: string
  warranty?: string
  isBestseller?: boolean
}

export interface Brand {
  id: string
  name: string
  image: string
  link: string
}

export const categoryCards: CategoryCard[] = [
    {
    id: 'servers',
    name: 'Сервера',
    image: new URL('../assets/product-categories/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
    link: '/store/servers'
    },
    {
    id: 'storage',
    name: 'СХД',
    image: new URL('../assets/product-categories/eaf7ece79bbc58e58c35a0c177db2a6d0c706139.png', import.meta.url).href,
    link: '/store/storage'
    },
    {
    id: 'switches',
    name: 'Коммутаторы',
    image: new URL('../assets/product-categories/711e594c888b7442a07d42b260dd0e0e33a055cf.png', import.meta.url).href,
    link: '/store/switches'
    },
    {
    id: 'ups',
    name: 'ИБП',
    image: new URL('../assets/product-categories/c26643e51be38c6e105e515f464f7be54ffb6046.png', import.meta.url).href,
    link: '/store/ups'
    },
    {
    id: 'monitors',
    name: 'Мониторы',
    image: new URL('../assets/product-categories/c76d3bd5d24b79c30ff2233c3a0d6be1638b807a.png', import.meta.url).href,
    link: '/store/monitors'
    },
    {
    id: 'processors',
    name: 'Процессоры',
    image: new URL('../assets/product-categories/39c468b679ca60bdae20ede6a4e2cb28c8d751c4.png', import.meta.url).href,
    link: '/store/processors'
    },
    {
    id: 'ram',
    name: 'ОЗУ',
    image: new URL('../assets/product-categories/35362449031dcf0e83e82af2655a71ff05ac9cbc.png', import.meta.url).href,
    link: '/store/ram'
    },
    {
        id: 'servers',
        name: 'Сервера',
        image: new URL('../assets/product-categories/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        link: '/store/servers'
    },
    {
        id: 'storage',
        name: 'СХД',
        image: new URL('../assets/product-categories/eaf7ece79bbc58e58c35a0c177db2a6d0c706139.png', import.meta.url).href,
        link: '/store/storage'
    },
    {
        id: 'switches',
        name: 'Коммутаторы',
        image: new URL('../assets/product-categories/711e594c888b7442a07d42b260dd0e0e33a055cf.png', import.meta.url).href,
        link: '/store/switches'
    },
    {
        id: 'ups',
        name: 'ИБП',
        image: new URL('../assets/product-categories/c26643e51be38c6e105e515f464f7be54ffb6046.png', import.meta.url).href,
        link: '/store/ups'
    },
    {
        id: 'monitors',
        name: 'Мониторы',
        image: new URL('../assets/product-categories/c76d3bd5d24b79c30ff2233c3a0d6be1638b807a.png', import.meta.url).href,
        link: '/store/monitors'
    },
    {
        id: 'processors',
        name: 'Процессоры',
        image: new URL('../assets/product-categories/39c468b679ca60bdae20ede6a4e2cb28c8d751c4.png', import.meta.url).href,
        link: '/store/processors'
    },
    {
        id: 'ram',
        name: 'ОЗУ',
        image: new URL('../assets/product-categories/35362449031dcf0e83e82af2655a71ff05ac9cbc.png', import.meta.url).href,
        link: '/store/ram'
    }
]

export const promoBanners: PromoBanner[] = [
    {
        id: "1",
        title: 'dell-cashback',
        image: new URL('../assets/ddea76344e58ca1c35dcc0c6697ff418cab4f077.png', import.meta.url).href,
        link: '/store/servers'
    },
    {
        id: "2",
        title: 'dell-systems',
        image: new URL('../assets/f1db2125d63856add6322e80f1d48466c5e32926.png', import.meta.url).href,
        link: '/store/storage'
    },
    {
        id: "3",
        title: 'dell-cashback',
        image: new URL('../assets/ddea76344e58ca1c35dcc0c6697ff418cab4f077.png', import.meta.url).href,
        link: '/store/servers'
    },
    {
        id: "4",
        title: 'dell-systems',
        image: new URL('../assets/f1db2125d63856add6322e80f1d48466c5e32926.png', import.meta.url).href,
        link: '/store/storage'
    }
]

export const popularProducts: Product[] = [
    {
        id: "1",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1xIntel Xeon 4210R 2.4GHz',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/1',
        warranty: '5 лет',
        isBestseller: true
    },
    {
        id: "2",
        name: 'Dell PowerEdge R740 Server 2x Intel Xeon Gold 6226R 16-Core',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 425300,
        originalPrice: 580000,
        link: '/store/products/2',
        warranty: '3 года',
        isBestseller: false
    },
    {
        id: "3",
        name: 'Сервер HPE ProLiant DL380 Gen10 Plus 2x Xeon Silver 4314',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 385900,
        originalPrice: 490000,
        link: '/store/products/3',
        warranty: '5 лет',
        isBestseller: true
    },
    {
        id: "4",
        name: 'Lenovo ThinkSystem SR650 V2 Server 2x Intel Xeon Gold 5318Y',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 298500,
        originalPrice: 420000,
        link: '/store/products/4',
        warranty: '3 года',
        isBestseller: false
    },
    {
        id: "5",
        name: 'Сервер Dell PowerEdge R640 2x Intel Xeon Silver 4210R',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 275600,
        originalPrice: 360000,
        link: '/store/products/5',
        warranty: '5 лет',
        isBestseller: false
    },
    {
        id: "6",
        name: 'HPE ProLiant ML110 Gen10 Plus Intel Xeon Silver 4310',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 195400,
        originalPrice: 285000,
        link: '/store/products/6',
        warranty: '3 года',
        isBestseller: true
    },
    {
        id: "7",
        name: 'Сервер Supermicro SuperServer 1029P-WTR Dual Intel Xeon Scalable',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 356700,
        originalPrice: 475000,
        link: '/store/products/7',
        warranty: '5 лет',
        isBestseller: false
    },
    {
        id: "8",
        name: 'Dell EMC PowerEdge R740xd Server 2x Xeon Gold 6240R',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 445800,
        originalPrice: 610000,
        link: '/store/products/8',
        warranty: '3 года',
        isBestseller: true
    }
]

export const saleProducts: Product[] = [
    {
        id: "s1",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s1',
        warranty: '5 лет'
    },
    {
        id: "s2",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s2',
        warranty: '5 лет'
    },
    {
        id: "s3",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s3',
        warranty: '5 лет',
        isBestseller: true
    },
    {
        id: "s4",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s4',
        warranty: '5 лет'
    },
    {
        id: "s5",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s5',
        warranty: '5 лет',
        isBestseller: true
    }
]

export const recentProducts: Product[] = [
    {
        id: "s1",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s1',
        warranty: '5 лет'
    },
    {
        id: "s2",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s2',
        warranty: '5 лет'
    },
    {
        id: "s3",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s3',
        warranty: '5 лет',
        isBestseller: true
    },
    {
        id: "s4",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s4',
        warranty: '5 лет'
    },
    {
        id: "s5",
        name: 'Сервер HPE ML350 Gen10 P21786-421/1 (Tower, Xeon Bronze 3206R, 1900 МГц, 8, 11, 1 x 64 ГБ, LFF 3.5", 12)',
        image: new URL('../assets/popular-products/5800e5af6705928628bf4b8855b40ad7445d3d1e.png', import.meta.url).href,
        price: 322600,
        originalPrice: 520000,
        link: '/store/products/s5',
        warranty: '5 лет',
        isBestseller: true
    }
]

export const brands: Brand[] = [
    {
        id: 'dell',
        name: 'Dell',
        image: new URL('../assets/brands/1da9db30f1ad6009300698610198d7f3d3dcc078.png', import.meta.url).href,
        link: '/store/brands/dell'
    },
    {
        id: 'huawei',
        name: 'Huawei',
        image: new URL('../assets/brands/cabeb9b733bc2ac985048fa12c9d114866e595e8.png', import.meta.url).href,
        link: '/store/brands/huawei'
    },
    {
        id: 'ibm',
        name: 'IBM',
        image: new URL('../assets/brands/984bed8e6c004fa5e6f8fae0d6d2170b3a42f178.png', import.meta.url).href,
        link: '/store/brands/ibm'
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        image: new URL('../assets/brands/6c6c9c5d3cc5c1c446ffcb50841f12486d6c357e.png', import.meta.url).href,
        link: '/store/brands/microsoft'
    },
    {
        id: 'hpe',
        name: 'HPE',
        image: new URL('../assets/brands/e12444751c732cd1c813d95d7074f761b0847520.png', import.meta.url).href,
        link: '/store/brands/hpe'
    },
    {
        id: 'cisco',
        name: 'Cisco',
        image: new URL('../assets/brands/7ab8ef93eb1ed045cefc3df32ca40f6979bf0f43.png', import.meta.url).href,
        link: '/store/brands/cisco'
    },
    {
        id: 'lenovo',
        name: 'Lenovo',
        image: new URL('../assets/brands/3ba7f1ff376edf7d7911a82785468b5be77d45e6.png', import.meta.url).href,
        link: '/store/brands/lenovo'
    },
    {
        id: 'supermicro',
        name: 'Supermicro',
        image: new URL('../assets/brands/d4e5d349cb903286fdd011f05dd74a541f7cce2a.png', import.meta.url).href,
        link: '/store/brands/supermicro'
    }
]
