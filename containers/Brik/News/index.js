import React from 'react';
import Masonry from 'react-masonry-component';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/src/components/UI/Container';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import SectionHeading from 'containers/Brik/SectionHeading';
import Section, { ContentWrapper, BlogPost } from './news.style';

import { data } from '';

const masonryOptions = {
  originTop: false
};

const News = () => {
  return (
    <Section id="blog">
      <Container>
        <SectionHeading slogan="Ideal solutions for you" title="Go beyond ultimate features" />
        <ContentWrapper>
          <Masonry className="masonryGrid" options={masonryOptions}>
            {data.newsFeed.map((news, i) => {
              return (
                <BlogPost key={news.id}>
                  <figure>
                    <Image src={news.image} alt={news.title} />
                  </figure>
                  <h4>{news.title}</h4>
                  {news.desc && <p>{news.desc}</p>}
                  {news.link && (
                    <Link href={news.link} className="learnMore">
                      Learn More <Icon icon={chevronRight} />
                    </Link>
                  )}
                </BlogPost>
              );
            })}
          </Masonry>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default News;
