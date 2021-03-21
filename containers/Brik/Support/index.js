import React from 'react';
import { Icon } from 'react-icons-kit';
import { iosArrowThinRight } from 'react-icons-kit/ionicons/iosArrowThinRight';
import { rgba } from 'polished';

import Container from 'common/src/components/UI/Container';
import Image from 'common/src/components/Image';
import illustration from 'common/src/assets/image/brik/support_illustration.png';
import { data } from 'common/src/data/Brik';
import Section, { ContentWrapper, Content, HelpBlock, Illustration } from './support.style';

const Support = () => {
  return (
    <Section>
      <Container>
        <ContentWrapper>
          <Content>
            <h2>Do you need help? Our support team ready to help you</h2>
            <p>
              Get your tests delivered at let home collect sample from the victory of the managements that supplies best
              design system guidelines ever.
            </p>
            {data.helps.map((help) => (
              <HelpBlock key={help.id}>
                <div className="icon">
                  <Image src={help.icon} alt={help.title} />
                </div>
                <div className="content">
                  <h4>
                    {help.title}
                    <Icon icon={iosArrowThinRight} size={30} style={{ color: rgba('#0F2137', 0.3) }} />
                  </h4>
                  <p>{help.desc}</p>
                </div>
              </HelpBlock>
            ))}
          </Content>
          <Illustration>
            <Image src={illustration} alt="" />
          </Illustration>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Support;
