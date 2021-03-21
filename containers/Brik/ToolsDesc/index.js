import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/src/components/UI/Container';
import Link from 'common/src/components/Link';
import BlogPost from 'common/src/components/BlogPost';
import SectionHeading from 'containers/Brik/SectionHeading';
import Section from './toolsDesc.style';

import { data } from 'common/src/data/Brik';
import toolsView from 'common/src/assets/image/brik/toolsview.png';
import Image from 'next/image';

const ToolsDesc = () => {
  return (
    <div className="outil-description-container">
      {/* Zone screen saas */}

      <div className="tools-des">
        <h1>
          Une <strong>totale transparence</strong> sur les prix de l’immobilier.
        </h1>

        <p>
          Découvrez toutes les informations liées aux transactions, aux plus values et à l’évolution des prix pour les
          commerces, bureau, maison et appartement partout en France.
        </p>

        <a href="#" className="btn-blue">
          Tester notre outil <strong>Etudier</strong>
        </a>
      </div>

      <div className="tools-img">
        <Image src={toolsView} alt="Image de présentation saas" width={600} height={600} />
      </div>
    </div>
  );
};

export default ToolsDesc;
