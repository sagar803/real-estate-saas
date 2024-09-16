import React from 'react'
import { locationMap } from '@/lib/propertyUtils'

type Props = {
    areaId : number
}

const PropertyMap = ( {areaId}: Props) => {
    const data = locationMap.get(areaId);
    console.log(data);
    if(!data) return
    const {location, iframeSrc} = data; 
    return <iframe src={iframeSrc} className='w-full h-72' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}

export default PropertyMap