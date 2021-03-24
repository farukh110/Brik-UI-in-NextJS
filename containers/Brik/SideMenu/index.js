import locationIcon from 'common/src/assets/image/brik/Groupe 181@2x.png';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import evolutionIcon from '../../../common/src/assets/image/brik/sidemenu/evolution.svg';
import fullaccessIcon from '../../../common/src/assets/image/brik/sidemenu/fullaccess.svg';
import mapIcon from '../../../common/src/assets/image/brik/sidemenu/map.svg';
import plusvalueIcon from '../../../common/src/assets/image/brik/sidemenu/plusvalue.svg';
import transactionIcon from '../../../common/src/assets/image/brik/sidemenu/transactions.svg';

const SideMenu = (props) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  let currSlug = null;
  if (process.browser && router.query.slug !== undefined) {
    currSlug = '/' + window.location.pathname.split('/').splice(3, 5).join('/');
  }

  const valuesUrl = '/';
  const valuesEvolutionUrl = '/values/evolution' + currSlug;
  const valuesTransactionUrl = '/values/transactions' + currSlug;
  const valuesPlusvalueUrl = '/values/plusvalue' + currSlug;
  const valuesCarteeUrl = '/values/carte' + currSlug;
  const valuesFullaccessUrl = '/values/fullaccess' + currSlug;
  return (
    <div className="values-sidebar">
      <ul>
        <NextLink href={valuesEvolutionUrl}>
          <li className={router.pathname == valuesEvolutionUrl.replace(currSlug, '/[...slug]') ? 'menu-active' : ''}>
            <img className="sidemenu-icon" src={evolutionIcon}></img>
            Evolution
          </li>
        </NextLink>

        <NextLink href={valuesTransactionUrl}>
          <li className={router.pathname == valuesTransactionUrl.replace(currSlug, '/[...slug]') ? 'menu-active' : ''}>
            <img className="sidemenu-icon" src={transactionIcon}></img>
            Transactions
          </li>
        </NextLink>

        <NextLink href={valuesPlusvalueUrl}>
          <li className={router.pathname == valuesPlusvalueUrl.replace(currSlug, '/[...slug]') ? 'menu-active' : ''}>
            <img className="sidemenu-icon" src={plusvalueIcon}></img>
            Plus value
          </li>
        </NextLink>

        <NextLink href={valuesCarteeUrl}>
          <li className={router.pathname == valuesCarteeUrl.replace(currSlug, '/[...slug]') ? 'menu-active' : ''}>
            <img className="sidemenu-icon" src={mapIcon}></img>
            Carte
          </li>
        </NextLink>

        <NextLink href={valuesFullaccessUrl}>
          <li className={router.pathname == valuesFullaccessUrl.replace(currSlug, '/[...slug]') ? 'menu-active' : ''}>
            <img className="sidemenu-icon" src={fullaccessIcon}></img>
            Accès complet
          </li>
        </NextLink>
      </ul>

      <div className="action-manage-asset">
        <h1>Gérer ce bien ?</h1>
        <p>Si ce bien vous appartient, vous pouvez le gérer sur notre outil de gestion.</p>
        <a href={process.env.NEXT_PUBLIC_WEBAPP_URL} className="btn-blue">
          <img src={locationIcon} alt="Location" /> Gérer ce bien
        </a>
      </div>
    </div>
  );
};

export default SideMenu;
