import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Controller("hero")
export class HeroController {
    constructor(private heroService: HeroService) {};

    @Get('filters')
    getFilteredHeroes(@Query() params) {
        return this.heroService.getFilteredHeroes(params);
    }
    
    @Get()
    getHeroesByUniverse(@Param('universe') universe: string) : Hero[] {
        const universearr = universe.split(',');
        return this.heroService.getHeroesByUniverse(universearr);
    }

}