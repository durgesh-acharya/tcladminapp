// components/CardGrid.tsx
import Link from 'next/link';

type CardGridProps = {
  packageId: string | string[] | undefined; // because useParams can return different types
};

const CardGrid = ({ packageId }: CardGridProps) => {
  const id = Array.isArray(packageId) ? packageId[0] : packageId;
  const items = [
    { title: 'Itinerary Highlights', href: `/packages/editdetails/itineraryhighlights?packageid=${id}` },
    { title: 'Include Tags', href: `/packages/editdetails/includetags?packageid=${id}` },
    { title: 'Itinerary', href: `/packages/editdetails/itinerary?packageid=${id}` },
    { title: 'Stay', href: `/packages/editdetails/stay?packageid=${id}` },
    { title: 'Transfer', href: `/packages/editdetails/transfers?packageid=${id}` },
    { title: 'Activity', href: `/packages/editdetails/packageactivity?packageid=${id}` },
    { title: 'Trip Highlights', href: `/packages/editdetails/triphighlights?packageid=${id}`},
    { title: 'Inclusion', href: `/packages/editdetails/packageinclusions?packageid=${id}` },
    { title: 'Exclusion', href: `/packages/editdetails/packageexclusions?packageid=${id}` },
    { title: 'Know before you go', href: `/packages/editdetails/knowbeforeyougo?packageid=${id}`  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {items.map((item, index) => (
        <Link href={item.href} key={index}>
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center cursor-pointer">
            <h2 className="text-lg text-gray-800">{item.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;
