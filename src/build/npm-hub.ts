import { argv, exit } from 'process';
import { readFileSync } from 'fs';
import { UTF, begin, NpmHubType } from './util';
import Minify from './minify';
import Bundle from './bundle';
import 'colors';

const ERR_ARGV = 'argv'.bold + ' are invalid!';

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
const npmHubType: NpmHubType = TypeHandling.Verify(argv);

begin();

switch (npmHubType) {
  case 'bundle':
  case 'bundleDev':
    Bundle.run(npmHubType);
    break;
  case 'minify':
    Minify.run();
    break;
  default:
    console.error('ERR:'.red, ERR_ARGV);
}
