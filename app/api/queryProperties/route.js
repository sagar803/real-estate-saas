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

  if (areaIds.length <= 0) return NextResponse.json({}, { status: 200 })

  let query = supabase.from('properties').select('*')
  query = query.in('area_id', areaIds)

  if (!isNaN(maxPrice) && !isNaN(minPrice) && maxPrice !== 0) {
    query = query.gte('meta->>price', minPrice)
    query = query.lte('meta->>price', maxPrice)
  }
  if (!isNaN(maxBedrooms) && !isNaN(minBedrooms) && maxBedrooms !== 0) {
    query = query.gte('meta->>bedrooms', `${minBedrooms} Bedrooms`)
    query = query.lte('meta->>bedrooms', `${maxBedrooms} Bedrooms`)
  }
  let { data, error } = await query

  if (error) {
    console.error('Error executing query:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Query Result:', data.length)
  data = data.slice(0, 6)

  return NextResponse.json({ data }, { status: 200 })
}
