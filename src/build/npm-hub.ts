import { argv, exit } from 'process';
import { readFileSync } from 'fs';
import { LINE, UTF, ERR_ARGV, newDateMagenta, begin, NpmHubType } from './util';
import Minify from './minify';
import Bundle from './bundle';

class VerHandling {
  static Verify(argv: string[]) {
    if (argv.find(x => x === 'v' || x === '--v')) { // `v` Might be Temp
      const readFile = readFileSync('./package.json', UTF);
      const { version: v } = JSON.parse(readFile);
      console.log(`v` + v);

      exit();
    }
  }
}

class TypeHandling {
  static Verify(argv: string[]): NpmHubType {
    const type = argv.find(x => x.startsWith('--type='));

    if (!type) throw new Error(ERR_ARGV);

    return <NpmHubType>type.replace('--type=', '');
  }
}

// ...

VerHandling.Verify(argv);
const type: NpmHubType = TypeHandling.Verify(argv);

begin();

switch (type) {
  case 'bundle':
  case 'bundleDev':
    Bundle.run(type);
    break;
  case 'minify':
    Minify.run();
    break;
  default:
    throw new Error(ERR_ARGV);
}
