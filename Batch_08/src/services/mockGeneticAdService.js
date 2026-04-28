// src/services/mockGeneticAdService.js
export async function evolveAdPopulation(ads, generations = 3) {
  let population = ads.map((ad, i) => ({ ...ad, fitness: 0 }));
  for (let gen = 0; gen < generations; gen++) {
    population = population.map(ad => ({
      ...ad,
      headline: `${ad.headline} v${gen}`,
      description: ad.description.replace('.', `! (Gen ${gen})`),
      fitness: ad.fitness + Math.random() * 10
    }));
    // cruzamento simulado
    population.sort((a, b) => b.fitness - a.fitness);
    const best = population[0];
    population[1] = { ...best, headline: best.headline.split('').reverse().join('') };
  }
  return population.sort((a, b) => b.fitness - a.fitness);
}
