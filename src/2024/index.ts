import { AdventFunction } from "../common/types";

import day1 from "./day1";
import day2 from "./day2";
import day3 from "./day3";
import day4 from "./day4";
import day5 from "./day5";
import day6 from "./day6";
import day7 from "./day7";
import day8 from "./day8";

const ADVENT_FUNCTIONS: Map<number, AdventFunction> = new Map();

ADVENT_FUNCTIONS.set(1, day1);
ADVENT_FUNCTIONS.set(2, day2);
ADVENT_FUNCTIONS.set(3, day3);
ADVENT_FUNCTIONS.set(4, day4);
ADVENT_FUNCTIONS.set(5, day5);
ADVENT_FUNCTIONS.set(6, day6);
ADVENT_FUNCTIONS.set(7, day7);
ADVENT_FUNCTIONS.set(8, day8);

export default ADVENT_FUNCTIONS;
