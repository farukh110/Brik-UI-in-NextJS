import React from 'react';
import { useRequestUser } from 'common/src/hooks/useRequestUser';
import TagManager from 'react-gtm-module';

const LetsStart = () => {
  const { fetchResponse, isFetchingUser, fetchError } = useRequestUser();

  const handleClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'gaEvent',
        eventCategory: 'Compte',
        eventAction: 'Création',
        eventLabel: 'Login'
      }
    });
  };

  if (!isFetchingUser && (!fetchResponse || fetchError)) {
    return (
      <div className="lets-start-container">
        <div className="lets-start-content">
          <h1>On commence ?</h1>

          <p>
            Grâce a Brik, économisez du temps sur votre gestion locative et{' '}
            <strong>consacrez le à trouver d’autre biens.</strong>
          </p>

          <a href="/register" className="btn-white-big" onClick={handleClick}>
            <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default LetsStart;
