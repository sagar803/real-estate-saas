import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET(request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url)
  const maxPrice = searchParams.get('max_price')
  const areaId = parseInt(searchParams.get('area_id'), 10) // Ensure area_id is an integer
  const minBedrooms = searchParams.get('min_bedrooms')

  console.log('Query Parameters:', { maxPrice, areaId, minBedrooms })

  let query = supabase.from('properties').select('*')

  if (!isNaN(areaId)) {
    query = query.eq('area_id', areaId)
  }

  // if (maxPrice) {
  //   query = query.lte('meta->>price', `${maxPrice} Crore`);
  // }

  if (minBedrooms) {
    query = query.gte('meta->>bedrooms', `${minBedrooms} Bedrooms`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error executing query:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // console.log('Query Result:', data)

  return NextResponse.json({ data }, { status: 200 })
}
