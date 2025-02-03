import Image from 'next/image'
import styles from './page.module.css'
import ClienComp from '@/components/ClienComp'
import Container from '@/components/Container'
import Empty from '@/components/utility/Empty';
import { property } from 'cypress/types/lodash';

export default function Home() {
  //emptyhandler
  const isEmpty = true;

  if (isEmpty) {
    return (
      <ClienComp>
        <Empty showReset />
      </ClienComp>
    )
  }

  return (
    <ClienComp>
      <Container>

        <div className='
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        '>
          {/* {property.map(property) => {
            return (
              <ListingCard
              key={property.id}
              data={property}
              />
            )
          }} */}

        </div>

      </Container>
    </ClienComp>
  )
}
