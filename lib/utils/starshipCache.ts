type StarshipDetails = {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
  url: string;
};

const starshipDetailCache = new Map<string, StarshipDetails>();

export async function getStarshipDetails(
  url: string
): Promise<StarshipDetails> {
  if (starshipDetailCache.has(url)) {
    return starshipDetailCache.get(url)!;
  }

  const res = await fetch(url);
  const data = await res.json();
  const fullDetails = data.result.properties;

  starshipDetailCache.set(url, fullDetails);
  return fullDetails;
}
