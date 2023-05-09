/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';

const DataContext = React.createContext({
  fakeBusinesses: [],
  fakeUsers: [],
});

export function DataContextProvider(props) {
  const DUMMY_BUSINESSES_LIST = useMemo(
    () => [
      {
        title: 'Store 1',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'e-commerce',
        monthlyRevenue: '40000',
        monthlyProfit: '8000',
        askingPrice: '96000',
        description:
          'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
        owner: 'u1',
      },
      {
        title: 'Store 2',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'e-commerce',
        monthlyRevenue: '40000',
        monthlyProfit: '8000',
        askingPrice: '96000',
        description:
          'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
        owner: 'u2',
      },
      {
        title: 'Store 3',
        imageUrl:
          'https://www.civitatis.com/f/hungria/budapest/galeria/parlamento-budapest.jpg',
        type: 'e-commerce',
        monthlyRevenue: '40000',
        monthlyProfit: '8000',
        askingPrice: '96000',
        description:
          'This is a e-commerce created using Shopify, that has some own products, but also make upsells via dropshipping model',
        owner: 'u1',
      },
    ],
    []
  );

  const DUMMY_USERS_LIST = useMemo(
    () => [
      {
        name: 'User1',
        imageUrl:
          'https://media.licdn.com/dms/image/C4E03AQH5HDkBly2nqg/profile-displayphoto-shrink_800_800/0/1655491533997?e=1689206400&v=beta&t=IJLCYRNDorVrUIW0of5ofS8kK13CjuLcKUN3gqtnZn0',
        country: 'Brazil',
        linkedinUrl: 'https://www.linkedin.com/in/rfayad/',
        email: 'test1@test.com',
        password: 'qweasd',
        description: 'lorem ipsum bla bla bla',
        business: [DUMMY_BUSINESSES_LIST[0], DUMMY_BUSINESSES_LIST[2]],
      },
      {
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
        fakeBusinesses: DUMMY_BUSINESSES_LIST,
        fakeUsers: DUMMY_USERS_LIST,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
