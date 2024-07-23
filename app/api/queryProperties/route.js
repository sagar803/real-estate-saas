import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET(request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url)
  const maxPrice = parseInt(searchParams.get('max_price'), 10)
  const areaId = parseInt(searchParams.get('area_id'), 10)
  const minBedrooms = parseInt(searchParams.get('min_bedrooms'), 10)

  // console.log('Query Parameters:', { maxPrice, areaId, minBedrooms })

  let query = supabase.from('properties').select('*').limit(6)

  if (!isNaN(areaId)) query = query.eq('area_id', areaId)
  if (Boolean(maxPrice)) query = query.lte('meta->>price', `${maxPrice} Crore`)
  if (Boolean(minBedrooms))
    query = query.gte('meta->>bedrooms', `${minBedrooms} Bedrooms`)

  const { data, error } = await query

  if (error) {
    console.error('Error executing query:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Query Result:', data.length)

  return NextResponse.json({ data }, { status: 200 })
}
