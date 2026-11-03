// Registry: skill.game -> template.
import * as L from './language.js';
import * as S from './sounds.js';
import * as P from './letters.js';
import * as M from './math.js';
import * as T from './thinking.js';
import * as H from './hindi-games.js';

export const GAMES = {
  showme: L.showme,
  colours: L.colours,
  bigsmall: L.bigsmall,
  category: L.category,
  feelings: L.feelings,
  prepositions: L.prepositions,
  syllables: S.syllables,
  rhyme: S.rhyme,
  firstsound: S.firstsound,
  blend: S.blend,
  namefind: P.namefind,
  casematch: P.casematch,
  lettersound: P.lettersound,
  readword: P.readword,
  tricky: P.tricky,
  build: P.build,
  compare: M.compare,
  subitize: M.subitize,
  howmany: M.howmany,
  numeral: M.numeral_,
  onemore: M.onemore,
  bonds: M.bonds,
  addstory: M.addstory,
  pattern: M.pattern,
  shapes: M.shapes,
  feed: M.feed,
  race: M.race,
  match: T.match,
  oddone: T.oddone,
  rotate: T.rotate,
  dccs: T.dccs,
  memory: T.memory,
  gonogo: T.gonogo,
  hiletter: H.hiletter,
  hiword: H.hiword,
};
