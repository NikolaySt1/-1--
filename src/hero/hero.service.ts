import { Injectable } from '@nestjs/common';
import {Hero} from './hero.model';

@Injectable()
export class HeroService {
    marvelHeroes: Hero[] = [
        {name: "Spiderman", powers:["web"], universe: "Marvel"},
        {name: "Black Panther", powers:["strength"], universe: "Marvel"},
        {name: "Thor", powers:["thunder"], universe:"Marvel"}

    ];

    dcHeroes: Hero[] = [
        {name: "Batman", powers: ["billionare"], universe: "DC"},
        {name: "Flash", powers:["speed"], universe: "DC"},
        {name: "Aquaman", powers:["water"], universe: "DC"}
    ];

    getAllHeroes(): Hero[] {
       const heroes = [...this.marvelHeroes, ...this.dcHeroes];
       return heroes;
    }

    getHeroesByUniverse(universes:string[]): Hero[] {
       const heroes = [...this.marvelHeroes, ...this.dcHeroes].filter(
        hero => universes.some((universe) => universe === hero.universe.toLocaleLowerCase())
       );
       return heroes;
    }

    getFilteredHeroes(filters): Hero[] {

		const heroes = [...this.marvelHeroes, ...this.dcHeroes].filter((hero) => {
            // setting the the boolean true by default
            let isUniverseIncluded = true;
            let isPowersIncluded = true;
            // check if universe is presented in query params, if it exists on database as a param and return true or false
            if(filters.universe) {
                isUniverseIncluded = hero.universe.toLocaleLowerCase() === filters.universe.toLocaleLowerCase();
            }
            // check if powers is presented in query params, if it exists on database as a param and return true or false
            if(filters.powers) {
                isPowersIncluded = hero.powers.some(power => filters.powers.split(",")
                .map(power => power.toLocaleLowerCase())
                .includes(power.toLocaleLowerCase()));
            }

            //if both are presented as params and exists on database
            // or if either universe or powers is presented show result
            return isUniverseIncluded && isPowersIncluded; 
		});

		return heroes;
	}

}

