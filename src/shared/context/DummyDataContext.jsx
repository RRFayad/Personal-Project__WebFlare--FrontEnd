/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';

const DataContext = React.createContext({
  businessesList: [],
  usersList: [],
  formatCurrency: () => {},
});

export function DataContextProvider(props) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const DUMMY_BUSINESSES_LIST = useMemo(
    () => [
      {
        id: '0001',
        title: 'Store 1',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'E-Commerce',
        niche: 'Beauty',
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
        title: 'Store 2',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'E-Commerce',
        niche: 'Beauty',
        age: 3, // int
        monthlyRevenue: 40000,
        monthlyProfit: 8000,
        askingPrice: 96000,
        description:
          'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
        ownerId: '0002',
      },
      {
        id: '0003',
        title: 'Store 3',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'E-Commerce',
        niche: 'beauty',
        age: 3, // int
        monthlyRevenue: 40000,
        monthlyProfit: 8000,
        askingPrice: 96000,
        description:
          'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
        ownerId: '0001',
      },
    ],
    []
  );

  const DUMMY_USERS_LIST = useMemo(
    () => [
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
        business: [DUMMY_BUSINESSES_LIST[0], DUMMY_BUSINESSES_LIST[2]],
      },
      {
        id: '0002',
        name: 'User2',
        imageUrl:
          'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.6435-9/46882033_2167690989948400_5943887528212824064_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHPiT65MEyNkzv0A0mKlzzioNg9qA5fcIug2D2oDl9wi5rJQE4chjVs9SjD-RiiZ55xQPUzNlIM_HKwpXofIDx3&_nc_ohc=DMeiQlE5fw0AX8aFiML&_nc_ht=scontent.fcgh7-1.fna&oh=00_AfBr7ffrytKfIMlL5CuVoJYnXADFduEPZT0K2R9Nz7dKJQ&oe=648110A3',
        country: 'Brazil',
        linkedinUrl: 'https://www.linkedin.com/in/rfayad/',
        email: 'test2@test.com',
        password: 'qweasd',
        description: 'lorem ipsum bla bla bla',
        business: [DUMMY_BUSINESSES_LIST[1]],
      },
    ],
    []
  );

  return (
    <DataContext.Provider
      value={{
        businessesList: DUMMY_BUSINESSES_LIST,
        usersList: DUMMY_USERS_LIST,
        formatCurrency,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
