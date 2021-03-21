import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';
import { closeCircled } from 'react-icons-kit/ionicons/closeCircled';
import Container from 'common/src/components/UI/Container';
import Button from 'common/src/components/Button';
import SectionHeading from 'containers/Brik/SectionHeading';
import Section, { ContentWrapper, PriceTable, PricingFeature, FeatureItem } from './pricing.style';
import { data } from 'common/src/data/Brik';

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
}

function useWindowSize() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

const Pricing = () => {
  const size = process.browser && useWindowSize();
  const isTablet = Boolean(size.innerWidth <= 768);

  return (
    <Section id="pricing">
      <Container>
        <SectionHeading slogan="Deal for your business" title="Meet our pricing plan that suit you" mb="80px" />
        <ContentWrapper>
          {!isTablet && (
            <PricingFeature>
              <FeatureItem>Full Access Library</FeatureItem>
              <FeatureItem>Multiple user</FeatureItem>
              <FeatureItem>Refund Policy</FeatureItem>
              <FeatureItem>Google Analytics</FeatureItem>
              <FeatureItem>24/7 support</FeatureItem>
            </PricingFeature>
          )}

          {data.pricing.map((priceTable) => (
            <PriceTable key={priceTable.id} className={priceTable.isRecommended && 'isRecommended'}>
              {priceTable.isRecommended && <div className="recommended">Recommended</div>}

              <h2 className="title">{priceTable.package_name}</h2>
              <div className="price">
                ${priceTable.price}/<span>per mo.</span>
              </div>
              <ul className="featureList">
                {priceTable.features.map((feature) => (
                  <FeatureItem key={feature.id}>
                    {isTablet ? (
                      feature.isAvailable && feature.name
                    ) : feature.isAvailable ? (
                      <Icon icon={ic_check_circle} size={18} style={{ color: '#3CC68A' }} />
                    ) : (
                      <Icon icon={closeCircled} size={18} style={{ color: '#CED7E1' }} />
                    )}
                  </FeatureItem>
                ))}
              </ul>
              <Button title="Choose Plan" className={`${!priceTable.isRecommended && 'primaryOutlined'} choosePlan`} />
              <p className="trial">{priceTable.trial_day} days free trial</p>
            </PriceTable>
          ))}
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Pricing;
