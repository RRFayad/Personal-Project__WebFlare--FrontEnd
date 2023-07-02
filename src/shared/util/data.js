export const businessTypesOptions = [
  'Blog / Content',
  'E-Commerce',
  'Forum',
  'IG Profile',
  'MarketPlace',
  'SaaS',
  'Services',
  'Tik Tok Profile',
  'Others',
];

export const nichesOptions = [
  'Arts',
  'Automotive',
  'Beauty',
  'Education',
  'Entertainment / Games',
  'Fashion',
  'Food',
  'Health',
  'Home & Garden',
  'Hobbies',
  'Make Money Online',
  'Music',
  'Pet',
  'Real State',
  'Sports',
  'Technology',
  'Others',
];

export const DUMMY_BUSINESSES = [
  {
    id: '0001',
    title: 'Blog 1',
    imageUrl: 'https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg',
    type: 'Blog / Content',
    niche: 'Home & Garden',
    age: 3, // int
    monthlyRevenue: 40000,
    monthlyProfit: 8000,
    askingPrice: 96000,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.',
    ownerId: '0001',
  },
  {
    id: '0002',
    title: 'Travel Blog',
    imageUrl:
      'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
    type: 'Blog / Content',
    niche: 'Hobbies',
    age: 3, // int
    monthlyRevenue: 320000,
    monthlyProfit: 80000,
    askingPrice: 1000000,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.',
    ownerId: '0002',
  },
  {
    id: '0003',
    title: 'Store',
    imageUrl:
      'https://printify.com/wp-content/uploads/2022/05/The-Best-Shopify-Store-Examples-for-2022.png',
    type: 'E-Commerce',
    niche: 'Fashion',
    age: 3, // int
    monthlyRevenue: 40000,
    monthlyProfit: 11500,
    askingPrice: 832000,
    description:
      'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
    ownerId: '0001',
  },
  {
    id: '0004',
    title: 'Another Store',
    imageUrl: 'https://media.graphassets.com/53cwIkkyTGCGg2faP1WY',
    type: 'E-Commerce',
    niche: 'Fashion',
    age: 3, // int
    monthlyRevenue: 40000,
    monthlyProfit: 8000,
    askingPrice: 96000,
    description:
      'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
    ownerId: '0002',
  },
  {
    id: '0005',
    title: 'IG Profile',
    imageUrl:
      'https://res.cloudinary.com/webmaster-marke/image/upload/v1664999029/o-que-%C3%A9-digital-influencer.jpg',
    type: 'IG Profile',
    niche: 'Fashion',
    age: 3, // int
    monthlyRevenue: 40000,
    monthlyProfit: 8000,
    askingPrice: 96000,
    description:
      'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
    ownerId: '0001',
  },
  {
    id: '0006',
    title: 'Tik Tok Profile',
    imageUrl:
      'https://studiodamaart.com.br/wp-content/uploads/2022/08/photo-1592329347810-258afdd206bb.jpeg',

    type: 'Tik Tok Profile',
    niche: 'Fashion',
    age: 3, // int
    monthlyRevenue: 40000,
    monthlyProfit: 8000,
    askingPrice: 96000,
    description:
      'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
    ownerId: '0002',
  },
];

export const DUMMY_USERS = [
  {
    id: '0001',
    name: 'User1',
    imageUrl:
      'https://media.licdn.com/dms/image/C4E03AQH5HDkBly2nqg/profile-displayphoto-shrink_800_800/0/1655491533997?e=1689206400&v=beta&t=IJLCYRNDorVrUIW0of5ofS8kK13CjuLcKUN3gqtnZn0',
    country: 'Brazil',
    linkedinUrl: 'https://www.linkedin.com/in/rfayad/',
    email: 'test1@test.com',
    password: 'qweasd',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
    business: [DUMMY_BUSINESSES[0], DUMMY_BUSINESSES[2]],
  },
  {
    id: '0002',
    name: 'User2',
    imageUrl:
      'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.6435-9/46882033_2167690989948400_5943887528212824064_n.jpg?_nc_cat=100&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHPiT65MEyNkzv0A0mKlzzioNg9qA5fcIug2D2oDl9wi5rJQE4chjVs9SjD-RiiZ55xQPUzNlIM_HKwpXofIDx3&_nc_ohc=v3wQBd4y24UAX87VMKC&_nc_ht=scontent.fcgh7-1.fna&oh=00_AfA8aPNT8-e5pADTytVDVM4KyGZq8GRk2rVhTaigk7Z-4g&oe=64C922A3',
    country: 'Brazil',
    linkedinUrl: 'https://www.linkedin.com/in/rfayad/',
    email: 'test2@test.com',
    password: 'qweasd',
    description: 'lorem ipsum bla bla bla',
    business: [DUMMY_BUSINESSES[1]],
  },
];
