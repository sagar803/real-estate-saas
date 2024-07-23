import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET(request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url)
  const areaIds = searchParams.getAll('area_id').map(id => parseInt(id, 10))
  const maxPrice = parseInt(searchParams.get('max_price'), 10)
  const minPrice = parseInt(searchParams.get('min_price'), 10)
  const minBedrooms = parseInt(searchParams.get('min_bedrooms'), 10)
  const maxBedrooms = parseInt(searchParams.get('max_bedrooms'), 10)

  console.log('Query Parameters:', {
    minPrice,
    maxPrice,
    areaIds,
    minBedrooms,
    maxBedrooms
  })

  let query = supabase.from('properties').select('*').limit(6)

  if (areaIds.length > 0) query = query.in('area_id', areaIds)
  if (Boolean(maxPrice)) query = query.lte('meta->>price', maxPrice)
  if (Boolean(minPrice)) query = query.gte('meta->>price', minPrice)
  if (Boolean(minBedrooms))
    query = query.gte('meta->>bedrooms', `${minBedrooms} Bedrooms`)
  if (Boolean(maxBedrooms))
    query = query.lte('meta->>bedrooms', `${maxBedrooms} Bedrooms`)

  const { data, error } = await query

  if (error) {
    console.error('Error executing query:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Query Result:', data.length)

  return NextResponse.json({ data }, { status: 200 })
}
