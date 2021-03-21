import React from 'react';
import { Icon } from 'react-icons-kit';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';

import Container from 'common/src/components/UI/Container';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Image from 'common/src/components/Image';
import List from 'common/src/components/List';

import SectionWrapper, { Section, Content, Illustration, ListGroup } from './customerSupport.style';
import { data } from 'common/src/data/Brik';
import illustration from 'common/src/assets/image/brik/illustration.png';

const CustomerSupport = () => {
  return (
    <SectionWrapper>
      <Container width="1440px">
        <Section>
          <Illustration>
            <Image src={illustration} alt="Illustration" />
          </Illustration>
          <Content>
            <Heading as="h2" content="Customer support is our main priority with their hundred percent satisfaction." />
            <Text content="Get your tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever." />
            <ListGroup>
              {data.workHardList.map((item) => (
                <List
                  className="list-item"
                  key={item.id}
                  text={item.title}
                  icon={<Icon icon={ic_check_circle} size={18} style={{ color: '#56BBD0' }} />}
                />
              ))}
            </ListGroup>
          </Content>
        </Section>
      </Container>
    </SectionWrapper>
  );
};

export default CustomerSupport;
