import { AdventFunction } from "../../common/types";
import {
  posEqual,
  posToStr,
  countInstances,
  Position,
} from "../../common/arrayUtils";
import { loadEntireFile } from "../../common/processFile";

export interface Robot {
  position: Position;
  velocity: Position;
}

export function robotsToStr(robots: Robot[], dimension: Position): string {
  let asStr = "";

  for (let y = 0; y < dimension[1]; y++) {
    let row = "";
    for (let x = 0; x < dimension[0]; x++) {
      const count = robots.filter(({ position }) =>
        posEqual([x, y], position),
      ).length;
      if (count > 0) {
        row += count.toString();
      } else {
        row += ".";
      }
    }
    asStr += row + "\n";
  }

  return asStr;
}

export function robotToStr(robot: Robot, dimension: Position): string {
  let asStr = "";

  for (let y = 0; y < dimension[1]; y++) {
    let row = "";
    for (let x = 0; x < dimension[0]; x++) {
      if (posEqual([x, y], robot.position)) {
        row += "X";
      } else {
        row += ".";
      }
    }
    asStr += row + "\n";
  }

  return asStr;
}

export function scalarMultiply(vector: Position, factor: number): Position {
  return vector.map((v) => v * factor) as Position;
}

export function vectorAdd(a: Position, b: Position): Position {
  return a.map((av, i) => av + b[i]) as Position;
}

export function vectorWrap(vector: Position, bounds: Position): Position {
  return vector.map((v, i) => {
    if (v < 0) {
      return bounds[i] + (v % bounds[i]);
    } else {
      return v % bounds[i];
    }
  }) as Position;
}

export function iterateRobot(
  { position, velocity }: Robot,
  iterations: number,
  dimension: Position,
): Robot {
  const shift = scalarMultiply(velocity, iterations);
  const pos = vectorAdd(position, shift);
  return {
    velocity, 
    position: vectorWrap(pos, dimension)
  }
}

export function identifySegment(pos: number, segmentLength: number): number {
  const posWithinSegment = pos % (segmentLength + 1);
  if (posWithinSegment === segmentLength) return NaN;

  return Math.floor(pos / segmentLength);
}

export function identifyQuadrant(
  position: Position,
  segmentSize: Position,
): Position {
  return position.map((pos, i) =>
    identifySegment(pos, segmentSize[i]),
  ) as Position;
}

export function parseNamedCoordinate(input: string): Position {
  const parts = input.split("=");
  return parts[1].split(",").map((p) => parseInt(p)) as Position;
}

export function parseRobot(line: string): Robot {
  const parts = line.split(" ");

  return {
    position: parseNamedCoordinate(parts[0]),
    velocity: parseNamedCoordinate(parts[1]),
  };
}

export async function loadRobotsFile(filename: string): Promise<Robot[]> {
  return (await loadEntireFile(filename)).map(parseRobot);
}

export function processRobots(
  robots: Robot[],
  quadrantSize: Position,
  segments: number,
  iterations: number,
): number {
  const segmentSize: Position = quadrantSize
    .map((r) => r + 1)
    .map((r) => Math.floor(r / segments)) as Position;

  robots = robots.map((robot) =>
    iterateRobot(robot, iterations, quadrantSize),
  );

  const quadrants = robots
  .map(({position}) => identifyQuadrant(position, segmentSize))
  .filter(([r, c]) => !isNaN(r) && !isNaN(c))
  .map(posToStr);

  const counts = countInstances(quadrants);
  return [...counts.values()].reduce((acc, curr) => acc * curr, 1);
}

const QUADRANT_SIZE: Position = [103, 101];
const SEGMENTS = 2;
const ITERATIONS = 100;

const day14: AdventFunction = async (
  filename = "./src/2024/day14/input.txt",
) => {
  const robots = await loadRobotsFile(filename);

  const part1 = processRobots(robots, QUADRANT_SIZE, SEGMENTS, ITERATIONS);
  return [part1, 1];
};

export default day14;
