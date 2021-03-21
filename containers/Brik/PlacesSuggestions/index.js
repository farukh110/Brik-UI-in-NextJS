import React, { Fragment, useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';
import { closeCircled } from 'react-icons-kit/ionicons/closeCircled';
import Container from 'common/src/components/UI/Container';
import Button from 'common/src/components/Button';
import SectionHeading from 'containers/Brik/SectionHeading';
import Link from 'common/src/components/Link';

import { actions } from 'store/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Routes
const requestType = 'randomPlaces'; // See README.md in /pages/values for request types

// Fetch
const fetchPlacesSugestions = async (dispatch) => {
  dispatch(actions.getPlacesSuggestion());

  const dataPlacesSuggestion = await axios.get(`${process.env.NEXT_PUBLIC_DVF_ROOT_URL}?requestType=${requestType}`);
  dispatch(actions.getPlacesSuggestionResponse(dataPlacesSuggestion));
};

const PlacesSuggestions = (props) => {
  const {
    api: { dataPlacesSuggestion: data }
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      fetchPlacesSugestions(dispatch);
    }

    return () => {};
  }, [data, dispatch]);

  function adressToPath(adr, cp, nc) {
    return (
      '/values/evolution/' +
      nc +
      '/' +
      cp +
      '/' +
      adr.replace(',', '').split(' ').join('+') +
      '/appartement+maison+bureau/quartier'
    );
  }

  // Tableau datas
  const itemsPlaces = data?.data.data.map((item, key) => (
    <div className="places-suggestion-item" key={key}>
      <a href={adressToPath(item.adresse, item.code_postal, item.nom_commune)}>
        <h3>
          {item.adresse}, {item.code_postal}, {item.nom_commune}
        </h3>
      </a>
    </div>
  ));

  return (
    <div className="places-suggestions-container">
      <h2 className={`${props.light ? 'places-light' : ''}`}>Dernières adresses consultées</h2>
      {itemsPlaces}
    </div>
  );
};

export default PlacesSuggestions;
