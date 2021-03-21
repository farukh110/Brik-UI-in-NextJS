import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/src/components/UI/Container';
import Link from 'common/src/components/Link';
import BlogPost from 'common/src/components/BlogPost';
import SectionHeading from 'containers/Brik/SectionHeading';
import Section, { ServiceWrapper } from './service.style';

import { data } from 'common/src/data/Brik';

const Service = () => {
  return (
    <Section id="service">
      <Container>
        <Zoom>
          <div className="services-header">
            {/* Faire ici le contenu text */}
            <h1>
              <strong>Gérez facilement vos biens</strong>, et plus encore
            </h1>
            <p>
              Appartements, commerces, bureaux, Brik vous propose le service le plus complet de gestion autonome.
              Incluant tous les outils habituels de gestion ainsi que d’autres fonctionnalités originales.
            </p>
          </div>
        </Zoom>
        <ServiceWrapper>
          {data.services.map((service) => (
            <Fade key={service.id} up delay={100 * service.id}>
              <BlogPost className="serviceItem" thumbUrl={service.icon} title={service.title} excerpt={service.desc} />
            </Fade>
          ))}
        </ServiceWrapper>
      </Container>
    </Section>
  );
};

export default Service;
