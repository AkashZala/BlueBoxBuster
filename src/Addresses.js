import React, { useRef, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const Addresses = ({ addresses, createAddress })=> {
  const el = useRef();
useEffect(()=> {
  const options = {
        fields: [
          'formatted_address',
          'geometry'
        ]
};
     const autocomplete = new google.maps.places.Autocomplete(el.current, options);
      autocomplete.addListener('place_changed', async()=> {
        const place = autocomplete.getPlace();
        const address = { data: place };
        await createAddress(address); 
        el.current.value = '';
      });
    }, []);


  return (
    <div>
      <h3>Addresses</h3>
      <input ref={ el } />
      <ul>
        {
          addresses.map( address => {
            return (
              <li key={ address.id }>
                { address.data.formatted_address }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Addresses;