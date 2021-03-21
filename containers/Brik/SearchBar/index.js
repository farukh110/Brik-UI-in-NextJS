import Router from 'next/router';
import React, { useState, useRef, useLayoutEffect } from 'react';
import Geocode from 'react-geocode';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { actions as actionsApi } from 'store/actions/apiActions';
import { actions } from 'store/actions/searchActions';
import searchIcon from 'common/src/assets/image/brik/values/icons/search.svg';

// Reverse geocoding config :
Geocode.setApiKey('AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o');
Geocode.setLanguage('fr');
Geocode.setRegion('fr');

const SearchbarValue = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [areaFilterOpen, setareaFilterOpen] = useState(false);
  const [typeFilterOpen, settypeFilterOpen] = useState(false);
  const [currAdresse, setCurrAdresse] = useState(null);
  const [searchAdress, setSearchAdresse] = useState('');

  const dispatch = useDispatch();

  const { address, postal_code, filters, scope } = useSelector((state) => state.search);
  const [searchFiltersType, setSearchFiltersType] = useState(filters);
  const [searchFilterScope, setSearchFilterScope] = useState(scope);
  const inputRef = useRef();

  if (!searchAdress && address !== '') {
    setSearchAdresse(address);
  }

  const handleSearchbarClose = () => {
    if (searchOpen === false) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  };

  useLayoutEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  if (process.browser && address == '') {
    Router.push('/');
  }
  // Renew search
  function renewSearch(adress) {
    geocodeByAddress(adress).then((results) => {
      if (results[0].formatted_address.match(/([0-9]{4,6})\w+/) == null) {
        getLatLng(results[0]).then(({ lat, lng }) => {
          Geocode.fromLatLng(lat, lng).then((response) => {
            dispatch(
              actions.enterSearch(
                adress,
                response.results[0].formatted_address.match(/([0-9]{4,6})\w+/)[0], // Get postal code from formatted adress
                searchFiltersType, // Default all filters,
                searchFilterScope // Default scope
              )
            );
          });
        });
      } else {
        dispatch(
          actions.enterSearch(
            adress,
            results[0].formatted_address.match(/([0-9]{4,6})\w+/)[0], // Get postal code from formatted adress
            searchFiltersType, // Default all filters,
            searchFilterScope // Default scope
          )
        );
      }
      calculateFiltersSlug(searchFiltersType, searchFilterScope);
      dispatch(actionsApi.needsRefreshDone(false));
    });
  }

  function calculateFiltersSlug(filters, scope) {
    let currPath = window.location.pathname.split('/');
    currPath.pop();
    currPath.pop();
    let filtersSlug = [];
    let filtersName = {
      // We want them as string for SEO reasons.
      1: 'maison',
      4: 'bureau',
      2: 'appartement',
      3: 'dependance',
      999: 'terrain'
    };
    filters.forEach((filterId) => {
      filtersSlug.push(filtersName[filterId]);
    });
    let scopes = ['quartier', 'ville', 'departement'];

    currPath.push(filtersSlug.join('+'));
    currPath.push(scopes[scope - 1]);
    window.history.pushState('', '', currPath.join('/'));
  }

  // Functions to handle filter enabled or disable
  async function handleFilterTypeChange(filterID, e) {
    let newFilters = searchFiltersType;
    if (!e.target.checked) {
      // Deletes filter from array if selected
      newFilters = await newFilters.filter(function (filter) {
        return filter !== filterID;
      });
    } else {
      // push filter to array if not selected
      newFilters.push(filterID);
    }
    changeFilterType(newFilters);
  }
  function changeFilterType(typeFilters) {
    setSearchFiltersType(typeFilters);
  }

  function handleFilterScopeChange(newScope) {
    setSearchFilterScope(newScope);
  }

  function handleSetAreaFilterOpen() {
    setareaFilterOpen(!areaFilterOpen);
    settypeFilterOpen(false);
  }

  function handleSetTypeFilterOpen() {
    settypeFilterOpen(!typeFilterOpen);
    setareaFilterOpen(false);
  }

  function setSearchAdresseHandle(description) {
    setSearchAdresse(description);
    renewSearch(description);
    handleSearchbarClose();
  }

  return (
    <div className="searchbar-container">
      <div className={'searchbar-header ' + (!searchOpen ? 'mobile-only-nowrap' : '')}>
        
        <img src={searchIcon}/> <div className="vertical-border"></div>

        {!searchOpen && (
          <h1 className="searchCapitalize" onClick={handleSearchbarClose}>
          <p className="no-result"> 32 results </p>
          <br/>
            {address.replace(', France', '')}
          </h1>
        )}

        {searchOpen && (
          <div className="adresse-input-search searchCapitalize" onClick={(e) => e.stopPropagation()}>
            <GooglePlacesAutocomplete
              placeholder="Rechercher une adresse à étudier"
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['fr']
                }
              }}
              renderInput={(props) => (
                <input
                  autocomplete="off"
                  className="google-places-autocomplete__input"
                  id="react-google-places-autocomplete-input"
                  type="text"
                  {...props}
                  ref={inputRef}
                />
              )}
              onSelect={({ description }) => {
                setSearchAdresseHandle(description);
              }}
            />
            <div onClick={handleSearchbarClose} className="search-cancel">
              <i className="glyph-icon flaticon-plus-symbol"></i>
            </div>
          </div>
        )}

        {!searchOpen && (
          <div className="filters">
            <button className={areaFilterOpen ? 'filter-span-active' : ''} onClick={() => handleSetAreaFilterOpen()}>
              Périmètre
            </button>
            <button className={typeFilterOpen ? 'filter-span-active' : ''} onClick={() => handleSetTypeFilterOpen()}>
              Type de biens
            </button>
          </div>
        )}
      </div>

      {areaFilterOpen && (
        <div className="filter-area">
          <div className="position-relative">
            <div onClick={handleSetAreaFilterOpen} className="search-cancel">
              <i className="glyph-icon flaticon-plus-symbol"></i>
            </div>

            <label className="search-checkbox">
              <input type="checkbox" checked={searchFilterScope == 1} onChange={(e) => handleFilterScopeChange(1)} />{' '}
              <span>500m du quartier</span>
            </label>

            <label className="search-checkbox">
              <input type="checkbox" checked={searchFilterScope == 2} onChange={(e) => handleFilterScopeChange(2)} />{' '}
              <span>De la ville</span>
            </label>

            <label className="search-checkbox">
              <input type="checkbox" checked={searchFilterScope == 3} onChange={(e) => handleFilterScopeChange(3)} />{' '}
              <span>Du département</span>
            </label>

            <hr />

            <span
              className="btn-blue filter-btn"
              onClick={() => {
                renewSearch(searchAdress);
                handleSetAreaFilterOpen();
              }}
            >
              Appliquer
            </span>
          </div>
        </div>
      )}

      {typeFilterOpen && (
        <div className="filter-area filter-type-custom">
          <div className="position-relative">
            <div onClick={handleSetTypeFilterOpen} className="search-cancel">
              <i className="glyph-icon flaticon-plus-symbol"></i>
            </div>

            <label className="search-checkbox">
              <input
                type="checkbox"
                defaultChecked={searchFiltersType.includes('4')}
                onChange={(e) => handleFilterTypeChange('4', e)}
              />
              <span>Commerces & bureaux</span>
            </label>

            <label className="search-checkbox">
              <input
                type="checkbox"
                defaultChecked={searchFiltersType.includes('2')}
                onChange={(e) => handleFilterTypeChange('2', e)}
              />
              <span>Appartements</span>
            </label>

            <label className="search-checkbox">
              <input
                type="checkbox"
                defaultChecked={searchFiltersType.includes('1')}
                onChange={(e) => handleFilterTypeChange('1', e)}
              />
              <span>Maisons</span>
            </label>

            <label className="search-checkbox">
              <input
                type="checkbox"
                defaultChecked={searchFiltersType.includes('3')}
                onChange={(e) => handleFilterTypeChange('3', e)}
              />
              <span>Dépendances</span>
            </label>

            <label className="search-checkbox">
              <input
                type="checkbox"
                defaultChecked={searchFiltersType.includes('999')}
                onChange={(e) => handleFilterTypeChange('999', e)}
              />
              <span>Terrains</span>
            </label>

            <hr />

            <span
              className="btn-blue filter-btn"
              onClick={() => {
                renewSearch(searchAdress);
                handleSetTypeFilterOpen();
              }}
            >
              Appliquer
            </span>
          </div>
        </div>
      )}

      {searchOpen && true == false && (
        <div className="search-form">
          <div className="filter-buttons">
            <span className="btn-blue" onClick={renewSearch(searchAdress)}>
              Rechercher
            </span>
            <span className="btn-grey" onClick={handleSearchbarClose}>
              Annuler
            </span>
            <div className="margin-generator"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchbarValue;
