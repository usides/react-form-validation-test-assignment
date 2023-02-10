export function formatDate(dateObj: Date) {
  const date = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
    .format(dateObj)
    .slice(0, -2)
    .trim();

  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObj);

  return `${date} в ${time}`;
}

export function prepareCities(cities: { city: string; population: string }[]) {
  const filteredCities = cities
    .map((elem) => ({ ...elem, population: Number(elem.population) }))
    .filter((elem: { city: string; population: number }) => Number(elem.population) > 50000)
    .sort((a, b) => a.city.localeCompare(b.city));

  const populations = filteredCities.map((elem) => elem.population);

  const biggestPopulationCityInx = filteredCities.findIndex((elem) => elem.population === Math.max(...populations));

  const biggestPopulationCity = filteredCities.splice(biggestPopulationCityInx, 1);
  filteredCities.splice(0, 0, ...biggestPopulationCity);
  return filteredCities;
}
