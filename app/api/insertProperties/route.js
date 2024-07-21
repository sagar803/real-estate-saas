// app/api/insertProperties/route.js
import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient.js'
import { propertyData } from '../../../data.js'

export async function POST(request) {
  const { data, error } = await supabase.from('properties').insert(
    propertyData.map(property => ({
      area_id: property.areaId,
      meta: property.meta,
      images: property.images,
      ratings: property.ratings,
      furnishing_details: property.furnishingDetails,
      features: property.features
    }))
  )

  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}
