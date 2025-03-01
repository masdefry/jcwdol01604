"use client";
import ClientCompopnent from '@/layouts/ClientComponent';
import Container from '@/layouts/Container';
import Empty from '@/utils/EmptyHandler';

export default function HomeViews() {
    //emptyhandler
    const isEmpty = true;

    if (isEmpty) {
        return (
            <ClientCompopnent>
                <Empty showReset />
            </ClientCompopnent>
        )
    }

    return (
        <ClientCompopnent>
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
        </ClientCompopnent>
    )
};
