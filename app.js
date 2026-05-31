const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const PLAYER_COUNTS = [1, 2, 3, 4];
const PLAY_MINUTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PLAY_MODES = Object.freeze([
  { id: 'solo', label: '각자 풀기' },
  { id: 'coop', label: '함께 풀기' }
]);
const DISPLAY_MODES = Object.freeze([
  { id: 'auto', label: '자동' },
  { id: 'mobile', label: '모바일' },
  { id: 'tablet', label: '태블릿' },
  { id: 'board', label: '전자칠판' },
  { id: 'web', label: '웹' }
]);
const DISPLAY_MODE_PLAYER_LIMITS = Object.freeze({
  mobile: 1,
  tablet: 2,
  board: 4,
  web: 4
});
const RESOLUTION_PLAYER_LIMITS = Object.freeze([
  { limit: 1, maxWidth: 699, maxHeight: 619, maxArea: 360000 },
  { limit: 2, maxWidth: 979, maxHeight: 699, maxArea: 700000 },
  { limit: 3, maxWidth: 1199, maxHeight: 699, maxArea: 900000 }
]);
const UPGRADE_ACTIONS = ['heal', 'speed', 'power', 'projectile', 'penetration', 'explosion', 'hull'];

const QUIZ_PACKS = [
  {
    id: 'gugudan',
    label: '구구단',
    kind: 'csv',
    path: './assets/quiz/data/gugudan-2to9.csv'
  },
  {
    id: 'facecolor',
    label: '전개도: 평행한 면',
    kind: 'json',
    path: './assets/quiz/data/facecolor-questions.json'
  },
  {
    id: 'edgecolor',
    label: '전개도: 맞물리는 모서리',
    kind: 'json',
    path: './assets/quiz/data/edgecolor-questions.json'
  },
  {
    id: 'validity',
    label: '전개도: 올바른 전개도',
    kind: 'json',
    path: './assets/quiz/data/validity-questions.json'
  }
];

const ENEMY_DEFINITIONS = Object.freeze([
  { tier: 1, code: '01', name: '도깨비불', file: 'battleship-01ddokaebibul.png', baseHp: 24, baseSpeed: 58, baseTouchDamage: 8, baseSize: 56 },
  { tier: 2, code: '02', name: '물귀신', file: 'battleship-02mulguisin.png', baseHp: 32, baseSpeed: 62, baseTouchDamage: 9, baseSize: 58 },
  { tier: 3, code: '03', name: '창귀', file: 'battleship-03chang-gwi.png', baseHp: 40, baseSpeed: 65, baseTouchDamage: 10, baseSize: 60 },
  { tier: 4, code: '04', name: '어둑시니', file: 'battleship-04eoduksini.png', baseHp: 52, baseSpeed: 68, baseTouchDamage: 11, baseSize: 62 },
  { tier: 5, code: '05', name: '영노', file: 'battleship-05yeongno.png', baseHp: 64, baseSpeed: 71, baseTouchDamage: 13, baseSize: 64 },
  { tier: 6, code: '06', name: '묘두사', file: 'battleship-06myodusa.png', baseHp: 78, baseSpeed: 74, baseTouchDamage: 14, baseSize: 66 },
  { tier: 7, code: '07', name: '그슨대', file: 'battleship-07geuseundae.png', baseHp: 92, baseSpeed: 78, baseTouchDamage: 16, baseSize: 68 },
  { tier: 8, code: '08', name: '불가사리', file: 'battleship-08bulgasari.png', baseHp: 108, baseSpeed: 82, baseTouchDamage: 18, baseSize: 70 },
  { tier: 9, code: '09', name: '두억시니', file: 'battleship-09dueoksini.png', baseHp: 126, baseSpeed: 86, baseTouchDamage: 20, baseSize: 72 },
  { tier: 10, code: '10', name: '이무기', file: 'battleship-10imugi.png', baseHp: 146, baseSpeed: 90, baseTouchDamage: 23, baseSize: 74 }
]);

const ENEMY_ROLE_CONFIG = Object.freeze({
  1: Object.freeze({ role: 'swarm', label: '무리형' }),
  2: Object.freeze({ role: 'haste-support', label: '속도형' }),
  3: Object.freeze({ role: 'charger', label: '돌진형' }),
  4: Object.freeze({ role: 'shield-support', label: '보호형' }),
  5: Object.freeze({ role: 'armored', label: '장갑형' }),
  6: Object.freeze({ role: 'splitter', label: '분열형' }),
  7: Object.freeze({ role: 'healer', label: '회복형' }),
  8: Object.freeze({ role: 'adaptive', label: '적응형' }),
  9: Object.freeze({ role: 'commander', label: '지휘형' }),
  10: Object.freeze({ role: 'summoner', label: '소환형' })
});

const ENEMY_STRENGTH_VARIANTS = Object.freeze({
  hardened: Object.freeze({
    label: '강화',
    hpMulBase: 1.55,
    hpMulTierStep: 0.03,
    speedMul: 0.92,
    touchMulBase: 1.52,
    touchMulTierStep: 0.03,
    visual: Object.freeze({
      label: '강화',
      hpColor: '#f59e0b',
      fill: 'rgba(146, 64, 14, 0.92)',
      stroke: 'rgba(254, 240, 138, 0.62)',
      color: '#fef3c7',
      tintLayers: Object.freeze(['rgba(255, 160, 30, 0.36)', 'rgba(92, 48, 0, 0.14)']),
      outline: 'rgba(255, 230, 132, 0.86)',
      outerOutline: 'rgba(146, 64, 14, 0.68)',
      aura: 'rgba(255, 184, 82, 0.22)',
      shadowColor: 'rgba(255, 184, 82, 0.52)',
      fallbackFill: '#d97706'
    })
  }),
  elite: Object.freeze({
    label: '특수',
    hpMulBase: 1.9,
    hpMulTierStep: 0.12,
    hpTier10MulBase: 1.08,
    hpTier10MulStep: 0.1,
    speedMulBase: 1.14,
    speedMulTierStep: 0.03,
    speedTier10MulBase: 1.02,
    speedTier10MulStep: 0.03,
    touchMulBase: 1.45,
    touchMulTierStep: 0.1,
    touchTier10MulBase: 1.08,
    touchTier10MulStep: 0.11,
    renderSizeAdd: 8,
    renderSizeMulBase: 1.12,
    renderSizeMulTierStep: 0.03,
    visual: Object.freeze({
      label: '특수',
      hpColor: '#dc2626',
      fill: 'rgba(127, 29, 29, 0.94)',
      stroke: 'rgba(254, 202, 202, 0.66)',
      color: '#fee2e2',
      tintLayers: Object.freeze(['rgba(255, 30, 30, 0.6)']),
      outline: 'rgba(254, 202, 202, 0.9)',
      outerOutline: 'rgba(127, 29, 29, 0.78)',
      aura: 'rgba(255, 66, 66, 0.26)',
      shadowColor: 'rgba(255, 66, 66, 0.62)',
      fallbackFill: '#dc2626',
      max: Object.freeze({
        tintLayers: Object.freeze(['rgba(255, 24, 24, 0.74)', 'rgba(85, 0, 0, 0.34)']),
        outline: 'rgba(255, 236, 153, 0.95)',
        outerOutline: 'rgba(95, 0, 0, 0.84)',
        aura: 'rgba(95, 0, 0, 0.34)',
        shadowColor: 'rgba(122, 0, 0, 0.66)'
      })
    })
  })
});

const SHIP_SRC = './assets/battleship/battleship-ship.png';
const ENEMY_ASSET_BASE = './assets/battleship/';
const SHIP_SPRITE_CROP = Object.freeze({ x: 354, y: 43, width: 316, height: 482 });

const ELITE_UNLOCK_TIME_SEC = 180;
const ENEMY_TIER_UNLOCK_STEP_SEC = 18;
const ELITE_TIER_UNLOCK_STEP_SEC = 24;
const SPAWN_START_COOLDOWN_MS = 1700;
const SPAWN_MIN_COOLDOWN_MS = 460;
const SPAWN_DECAY_PER_SEC = 5.6;
const HP_GROWTH_STEP_SEC = 24;
const HP_GROWTH_PER_STEP = 0.12;
const SPEED_GROWTH_STEP_SEC = 34;
const SPEED_GROWTH_PER_STEP = 0.09;
const TOUCH_GROWTH_STEP_SEC = 40;
const TOUCH_GROWTH_PER_STEP = 0.09;
const SIZE_GROWTH_STEP_SEC = 75;
const FLOW_CYCLE_SEC = 54;
const FLOW_LULL_START_SEC = 10;
const FLOW_LULL_END_SEC = 20;
const FLOW_SURGE_START_SEC = 32;
const FLOW_SURGE_END_SEC = 40;
const FLOW_AFTERSHOCK_END_SEC = 46;
const EARLY_ONE_SHOT_WINDOW_SEC = 55;
const EARLY_EASE_WINDOW_SEC = 120;
const EARLY_SOFTCAP_T1 = 9;
const EARLY_SOFTCAP_T2 = 14;
const EARLY_SOFTCAP_T3 = 21;
const BATTLE_QUIZ_WORLD_SLOW_RATIO = 0.35;
const SHIP_BASE_MAX_HP = 300;
const SHIP_BASE_ATTACK_POWER = 14;
const SHIP_BASE_ATTACK_COOLDOWN_MS = 620;
const SHIP_ATTACK_SPEED_LEVEL_STEP = 0.085;
const SHIP_ATTACK_POWER_LEVEL_STEP = 0.13;
const SHIP_HULL_HP_STEP = 40;
const SHIP_HULL_DAMAGE_REDUCTION_STEP = 0.045;
const SHIP_DAMAGE_REDUCTION_MAX = 0.32;
const SHIP_MAX_PROJECTILE_COUNT = 6;
const SHIP_MAX_PENETRATION_LEVEL = 4;
const SHIP_MAX_EXPLOSION_LEVEL = 5;
const SHIP_MAX_HULL_LEVEL = 6;
const SHIP_PENETRATION_DAMAGE_FALLOFF = 0.88;
const SHIP_RENDER_SCALE = 0.92;
const SHIP_COLLISION_RADIUS_SCALE = 0.95;
const ENEMY_RENDER_SCALE = 0.91;
const ENEMY_COLLISION_RADIUS_SCALE = 0.94;
const SHIP_EXPLOSION_BASE_RADIUS = 52;
const SHIP_EXPLOSION_RADIUS_STEP = 11;
const SHIP_EXPLOSION_BASE_DAMAGE_RATIO = 0.34;
const SHIP_EXPLOSION_DAMAGE_RATIO_STEP = 0.065;
const SHIP_EXPLOSION_DAMAGE_RATIO_MAX = 0.66;
const SHIP_EXPLOSION_EFFECT_MS = 520;
const EXPLOSION_FRAME_COUNT = 10;
const EXPLOSION_SEED_BUCKETS = 8;
const EXPLOSION_FRAME_CACHE_LIMIT = 520;
const MAX_ACTIVE_BATTLE_EFFECTS = 36;
const EXPLOSION_EFFECT_POOL_SIZE = 48;
const PROJECTILE_POOL_SIZE = 96;
const ENEMY_POOL_SIZE = 72;
const BATTLESHIP_RESPAWN_DELAY_MS = 3000;
const BATTLESHIP_RESPAWN_INVULN_MS = 1200;
const BATTLESHIP_DEFEAT_FLASH_MS = 1150;
const BATTLESHIP_DEFEAT_SPAWN_RESTART_MS = 420;
const BATTLESHIP_DEFEAT_PENALTY_MIN = 180;
const BATTLESHIP_DEFEAT_PENALTY_SCORE_RATIO = 0.12;
const BATTLESHIP_DEFEAT_PENALTY_WAVE_STEP = 45;
const PROJECTILE_RENDER_RADIUS_RATIO = 0.66;
const PROJECTILE_RENDER_STROKE_WIDTH = 1.35;
const EARLY_ATTACK_SLOW_WINDOW_SEC = 70;
const EARLY_ATTACK_SLOW_MAX_RATIO = 1.22;
const QUIZ_SCORE_BASE = 120;
const QUIZ_SCORE_DIFFICULTY_STEP = 35;
const QUIZ_COMBO_SCORE_STEP = 0.06;
const QUIZ_COMBO_SCORE_MAX = 0.72;
const QUIZ_BURST_QUESTION_COUNT = 3;
const QUIZ_AUTO_NEXT_DELAY_MS = 760;
const QUIZ_AUTO_CLOSE_DELAY_MS = 920;
const HUD_REFRESH_INTERVAL_MS = 140;
const CANVAS_SYNC_INTERVAL_MS = 220;
const MIN_START_LOADING_MS = 850;
const SPAWN_PLAN_BUFFER = 96;
const ENEMY_SPATIAL_CELL_SIZE = 96;
const BUSY_RENDER_ENEMY_COUNT = 14;
const BUSY_RENDER_PROJECTILE_COUNT = 26;
const VERY_BUSY_RENDER_ENEMY_COUNT = 22;
const VERY_BUSY_RENDER_PROJECTILE_COUNT = 42;
const PERFORMANCE_LAG_ENTER_SCORE = 2.5;
const PERFORMANCE_LAG_EXIT_SCORE = 0.5;
const PERFORMANCE_LAG_HARD_FRAME_MS = 38;
const PERFORMANCE_LAG_SOFT_FRAME_MS = 25;
const KILL_SCORE_BASE = 25;
const KILL_SCORE_TIER_STEP = 14;
const KILL_SCORE_COMBO_STEP = 0.015;
const KILL_SCORE_COMBO_MAX = 0.36;
const projectileAngleOffsetCache = new Map();
const explosionFrameCache = new Map();
const warmedExplosionLevels = new Set();
let explosionWarmupTail = Promise.resolve();

const elements = {
  setupScreen: $('#setup-screen'),
  playScreen: $('#play-screen'),
  resultScreen: $('#result-screen'),
  quizPack: $('#quiz-pack'),
  playMinutes: $('#play-minutes'),
  modeOptions: $('#mode-options'),
  displayModeToggle: $('#display-mode-toggle'),
  playerOptions: $('#player-options'),
  startButton: $('#start-button'),
  setupError: $('#setup-error'),
  startLoading: $('#start-loading'),
  startLoadingText: $('#start-loading-text'),
  startLoadingFill: $('#start-loading-fill'),
  startLoadingPercent: $('#start-loading-percent'),
  tabletPromoButton: $('#tablet-promo-button'),
  exitButton: $('#exit-button'),
  playTitle: $('#play-title'),
  timerPill: $('#timer-pill'),
  gameStage: $('#game-stage'),
  questionArea: $('#question-area'),
  resultTitle: $('#result-title'),
  resultSubtitle: $('#result-subtitle'),
  resultTimePill: $('#result-time-pill'),
  resultGrid: $('#result-grid'),
  playerResults: $('#player-results'),
  gugudanRecordPanel: $('#gugudan-record-panel'),
  gugudanStudentId: $('#gugudan-student-id'),
  gugudanDownloadCurrentButton: $('#gugudan-download-current-button'),
  gugudanMergeCsvButton: $('#gugudan-merge-csv-button'),
  gugudanRecordFile: $('#gugudan-record-file'),
  gugudanRecordStatus: $('#gugudan-record-status'),
  restartSameButton: $('#restart-same-button'),
  backSetupButton: $('#back-setup-button')
};

const packCache = new Map();
const imageDecodeCache = new Map();
const enemyImages = new Map();
const enemyVariantSpriteCache = new Map();
const shipImage = new Image();
shipImage.src = SHIP_SRC;
ENEMY_DEFINITIONS.forEach((def) => {
  const image = new Image();
  image.src = `${ENEMY_ASSET_BASE}${def.file}`;
  enemyImages.set(def.tier, image);
});

let selectedPackId = 'gugudan';
let selectedMode = 'solo';
let selectedDisplayMode = 'auto';
let selectedPlayers = 1;
let selectedMinutes = 3;
let setupMessageKind = '';
let startLoading = false;
let combatAssetsWarmed = false;
let session = null;
let battleCanvas = null;
let battleCtx = null;
let battleViews = [];
let currentBattleIndex = 0;
let battleAnimationId = 0;
let lastPointerActionButton = null;
let lastPointerActionAtMs = 0;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function shuffle(list) {
  const result = list.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function hashSeed(value) {
  let hash = 2166136261;
  const text = String(value ?? '');
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = (Number(seed) >>> 0) || 0x6d2b79f5;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function createBattleRandomState(sessionSeed) {
  return {
    spawn: createSeededRandom(hashSeed(`${sessionSeed}:balanced-spawn`))
  };
}

function battleRandom(channel = 'spawn') {
  const generator = session?.battle?.random?.[channel] || session?.battle?.random?.spawn;
  return typeof generator === 'function' ? generator() : Math.random();
}

function createSpawnEnemyPlan(random) {
  return {
    sideRoll: random(),
    laneRoll: random(),
    definitionRoll: random(),
    eliteRoll: random(),
    hardenedRoll: random(),
    hpRoll: random(),
    speedRoll: random(),
    wobbleRoll: random()
  };
}

function createSpawnEventPlan(random) {
  return {
    burstRoll: random(),
    enemies: [
      createSpawnEnemyPlan(random),
      createSpawnEnemyPlan(random)
    ]
  };
}

function getSpawnPlanSize(durationSec) {
  const spawnTicks = Math.ceil((Math.max(60, Number(durationSec) || 60) * 1000) / SPAWN_MIN_COOLDOWN_MS);
  return spawnTicks + SPAWN_PLAN_BUFFER;
}

function createSpawnPlan(sessionSeed, playerIndex, durationSec) {
  const random = createSeededRandom(hashSeed(`${sessionSeed}:spawn-plan:${playerIndex}:${durationSec}`));
  return Array.from({ length: getSpawnPlanSize(durationSec) }, () => createSpawnEventPlan(random));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function distanceSq(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatAccuracy(correct, attempts) {
  const safeCorrect = Math.max(0, Number(correct) || 0);
  const safeAttempts = Math.max(0, Number(attempts) || 0);
  const accuracy = safeAttempts > 0 ? Math.round((safeCorrect / safeAttempts) * 100) : 0;
  return `${accuracy}% (${safeCorrect}/${safeAttempts})`;
}

function formatCsvAccuracy(correct, attempts) {
  const safeCorrect = Math.max(0, Number(correct) || 0);
  const safeAttempts = Math.max(0, Number(attempts) || 0);
  return safeAttempts > 0 ? `${Math.round((safeCorrect / safeAttempts) * 1000) / 10}%` : '0%';
}

function formatFileTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hour}${minute}${second}`;
}

function formatCsvDateTime(date = new Date()) {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseCsvTable(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const source = String(text || '').replace(/^\uFEFF/, '');
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char !== '\r') {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((items) => items.some((item) => String(item).trim()));
}

function csvRowsToObjects(text) {
  const rows = parseCsvTable(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => String(header || '').trim());
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? '';
    });
    return record;
  });
}

function getCsvNumber(value) {
  const parsed = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function getSafeStudentId(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^0-9A-Za-z_-]/g, '')
    .slice(0, 24);
}

function getGugudanFact(question) {
  const text = String(question?.text || question?.prompt || '').trim();
  const match = text.match(/(\d+)\s*(?:x|×|\*)\s*(\d+)/i);
  if (!match) return null;
  const dan = Number(match[1]);
  const multiplier = Number(match[2]);
  if (!Number.isFinite(dan) || !Number.isFinite(multiplier)) return null;
  return {
    dan,
    multiplier,
    key: `${dan}x${multiplier}`,
    expression: `${dan}x${multiplier}`,
    label: `${dan} x ${multiplier}`
  };
}

function createEmptyGugudanAggregate(fact) {
  return {
    dan: fact.dan,
    multiplier: fact.multiplier,
    expression: fact.expression,
    attempts: 0,
    correct: 0,
    wrong: 0,
    lastWrongAt: ''
  };
}

function addGugudanAggregate(map, fact, values = {}) {
  if (!fact?.key) return null;
  if (!map.has(fact.key)) {
    map.set(fact.key, createEmptyGugudanAggregate(fact));
  }
  const item = map.get(fact.key);
  item.attempts += Math.max(0, Number(values.attempts) || 0);
  item.correct += Math.max(0, Number(values.correct) || 0);
  item.wrong += Math.max(0, Number(values.wrong) || 0);
  if (values.lastWrongAt) item.lastWrongAt = String(values.lastWrongAt);
  return item;
}

function createGugudanAggregateFromRecords(records = []) {
  const factMap = new Map();
  records.forEach((record) => {
    const fact = {
      dan: record.dan,
      multiplier: record.multiplier,
      key: record.factKey,
      expression: record.expression
    };
    addGugudanAggregate(factMap, fact, {
      attempts: 1,
      correct: record.correct ? 1 : 0,
      wrong: record.correct ? 0 : 1,
      lastWrongAt: record.correct ? '' : record.answeredAt
    });
  });
  return factMap;
}

function parseGugudanCsvAggregate(text) {
  const rows = csvRowsToObjects(text);
  const factMap = new Map();
  const studentIds = new Set();
  rows.forEach((row) => {
    const studentId = String(row['학생번호'] || '').trim();
    if (studentId) studentIds.add(studentId);
    const rowType = String(row['행구분'] || '').trim();
    const expression = String(row['식'] || row['문항'] || '').trim();
    if (rowType && rowType !== '문항') return;
    if (!expression) return;
    const fact = getGugudanFact({ text: expression });
    if (!fact) return;
    addGugudanAggregate(factMap, fact, {
      attempts: getCsvNumber(row['시도']),
      correct: getCsvNumber(row['정답']),
      wrong: getCsvNumber(row['오답']),
      lastWrongAt: row['최근오답시각']
    });
  });
  return { factMap, studentIds };
}

function getSortedGugudanFacts(factMap) {
  return Array.from(factMap.values()).sort((left, right) => (
    left.dan - right.dan || left.multiplier - right.multiplier
  ));
}

function getGugudanDanSummary(factMap) {
  const danMap = new Map();
  getSortedGugudanFacts(factMap).forEach((item) => {
    if (!danMap.has(item.dan)) {
      danMap.set(item.dan, { dan: item.dan, attempts: 0, correct: 0, wrong: 0 });
    }
    const dan = danMap.get(item.dan);
    dan.attempts += item.attempts;
    dan.correct += item.correct;
    dan.wrong += item.wrong;
  });
  return Array.from(danMap.values()).sort((left, right) => left.dan - right.dan);
}

function buildGugudanCsv(studentId, factMap, options = {}) {
  const createdAt = options.createdAt || new Date();
  const createdText = formatCsvDateTime(createdAt);
  const minutes = options.minutes || session?.minutes || '';
  const sourceLabel = options.sourceLabel || '구구단';
  const rows = [[
    '행구분',
    '학생번호',
    '생성일시',
    '퀴즈팩',
    '선택시간분',
    '단',
    '식',
    '시도',
    '정답',
    '오답',
    '정답률',
    '최근오답시각'
  ]];
  getGugudanDanSummary(factMap).forEach((item) => {
    rows.push([
      '단요약',
      studentId,
      createdText,
      sourceLabel,
      minutes,
      `${item.dan}단`,
      '',
      item.attempts,
      item.correct,
      item.wrong,
      formatCsvAccuracy(item.correct, item.attempts),
      ''
    ]);
  });
  getSortedGugudanFacts(factMap).forEach((item) => {
    rows.push([
      '문항',
      studentId,
      createdText,
      sourceLabel,
      minutes,
      `${item.dan}단`,
      item.expression,
      item.attempts,
      item.correct,
      item.wrong,
      formatCsvAccuracy(item.correct, item.attempts),
      item.lastWrongAt || ''
    ]);
  });
  return rows.map((row) => row.map(escapeCsv).join(',')).join('\n');
}

function downloadCsvFile(filename, csvText) {
  const blob = new Blob([`\uFEFF${csvText}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function isQuizImageAsset(value) {
  return /\.(svg|png|jpe?g|webp|gif)$/i.test(String(value || '').trim());
}

function toQuizImageSrc(value) {
  return `./assets/quiz/nets/${String(value || '').trim()}`;
}

function isChoiceOnlyImageQuestion(question) {
  const type = String(question?.type || '').trim().toLowerCase();
  const tags = Array.isArray(question?.tags) ? question.tags.map((tag) => String(tag).toLowerCase()) : [];
  const prompt = String(question?.prompt || '');
  return type === 'validity'
    || tags.includes('validity')
    || prompt.includes('올바른 전개도')
    || prompt.includes('올바르지 않은 전개도');
}

function showScreen(name) {
  document.body.dataset.screen = name;
  elements.setupScreen.classList.toggle('is-hidden', name !== 'setup');
  elements.playScreen.classList.toggle('is-hidden', name !== 'play');
  elements.resultScreen.classList.toggle('is-hidden', name !== 'result');
}

function getPackLabel(packId) {
  return QUIZ_PACKS.find((pack) => pack.id === packId)?.label || '퀴즈팩';
}

function getModeLabel(modeId = selectedMode, options = {}) {
  const resolvedMode = options.resolvedMode || session?.displayMode || getResolvedDisplayMode();
  const playerCount = options.playerCount || session?.players?.length || selectedPlayers;
  if (modeId === 'coop' && resolvedMode === 'tablet' && playerCount === 2) {
    return '함께 2명(마주보기)';
  }
  return PLAY_MODES.find((mode) => mode.id === modeId)?.label || '각자 풀기';
}

function getPlayerCountLabel(count, resolvedMode = getResolvedDisplayMode()) {
  if (resolvedMode === 'tablet' && count === 2) return '함께 2명(마주보기)';
  return `${count}명`;
}

function detectDisplayMode() {
  const width = Math.max(0, window.innerWidth || document.documentElement.clientWidth || 0);
  const height = Math.max(0, window.innerHeight || document.documentElement.clientHeight || 0);
  const minSide = Math.min(width, height);
  const maxSide = Math.max(width, height);
  const hasTouch = Boolean(
    navigator.maxTouchPoints > 0
    || window.matchMedia?.('(pointer: coarse)')?.matches
  );
  if (minSide <= 520 || width <= 700) return 'mobile';
  if (minSide >= 900 && maxSide >= 1600) return 'board';
  if ((hasTouch && minSide >= 600 && maxSide <= 1500) || (minSide >= 700 && maxSide <= 1180)) {
    return 'tablet';
  }
  return 'web';
}

function getResolvedDisplayMode(displayModeId = selectedDisplayMode) {
  return displayModeId === 'auto' ? detectDisplayMode() : displayModeId;
}

function getDisplayModeLabel(displayModeId = selectedDisplayMode, resolvedMode = getResolvedDisplayMode(displayModeId)) {
  const baseLabel = DISPLAY_MODES.find((mode) => mode.id === displayModeId)?.label || '자동';
  if (displayModeId !== 'auto') return baseLabel;
  const resolvedLabel = DISPLAY_MODES.find((mode) => mode.id === resolvedMode)?.label || '웹';
  return `${baseLabel}:${resolvedLabel}`;
}

function getDisplayModeButtonLabel(displayModeId = selectedDisplayMode, resolvedMode = getResolvedDisplayMode(displayModeId)) {
  const resolvedLabel = DISPLAY_MODES.find((mode) => mode.id === resolvedMode)?.label || '웹';
  if (displayModeId === 'auto') return `화면 자동:${resolvedLabel}`;
  return `화면 ${resolvedLabel}`;
}

function getViewportMetrics() {
  const width = Math.max(0, window.innerWidth || document.documentElement.clientWidth || 0);
  const height = Math.max(0, window.innerHeight || document.documentElement.clientHeight || 0);
  return {
    width,
    height,
    minSide: Math.min(width, height),
    maxSide: Math.max(width, height),
    area: width * height
  };
}

function syncTabletFaceLayoutBasis() {
  const active = Boolean(session && isTabletFaceToFaceSession());
  document.body.dataset.tabletFace = String(active);
  if (!active) {
    document.documentElement.style.removeProperty('--tablet-face-portrait-ratio');
    return;
  }
  const { minSide, maxSide } = getViewportMetrics();
  const measuredRatio = maxSide > 0 ? minSide / maxSide : 0.695;
  const portraitRatio = measuredRatio >= 0.63 && measuredRatio <= 0.78
    ? measuredRatio
    : 0.695;
  document.documentElement.style.setProperty('--tablet-face-portrait-ratio', portraitRatio.toFixed(3));
}

function selectNextDisplayMode() {
  const index = DISPLAY_MODES.findIndex((mode) => mode.id === selectedDisplayMode);
  selectedDisplayMode = DISPLAY_MODES[(index + 1 + DISPLAY_MODES.length) % DISPLAY_MODES.length]?.id || 'auto';
  updateSetupSummary();
}

function getDisplayModePlayerLimit(resolvedMode = getResolvedDisplayMode()) {
  return DISPLAY_MODE_PLAYER_LIMITS[resolvedMode] || 4;
}

function getResolutionPlayerLimit() {
  const metrics = getViewportMetrics();
  const matchedLimit = RESOLUTION_PLAYER_LIMITS.find((rule) => (
    metrics.width <= rule.maxWidth
    || metrics.height <= rule.maxHeight
    || metrics.area <= rule.maxArea
  ));
  return matchedLimit?.limit || 4;
}

function getPlayerLimitInfo(resolvedMode = getResolvedDisplayMode()) {
  const displayLimit = getDisplayModePlayerLimit(resolvedMode);
  const resolutionLimit = getResolutionPlayerLimit();
  const recommendedLimit = Math.min(displayLimit, resolutionLimit);
  const reason = recommendedLimit < 4
    ? `현재 화면에서는 ${recommendedLimit}명까지 권장합니다. 더 많은 인원은 비추천이지만 시작할 수 있습니다.`
    : '';
  return { limit: 4, recommendedLimit, displayLimit, resolutionLimit, reason };
}

function getDisplayPlayerLimit(resolvedMode = getResolvedDisplayMode()) {
  return getPlayerLimitInfo(resolvedMode).limit;
}

function setSetupMessage(message = '', kind = '') {
  setupMessageKind = kind;
  elements.setupError.textContent = message;
  elements.setupError.classList.toggle('is-note', kind === 'note');
  elements.setupError.classList.toggle('is-error', kind === 'error');
}

function setStartLoading(active, message = '게임 자산을 미리 불러오고 있습니다', progress = 0) {
  startLoading = Boolean(active);
  const safeProgress = clamp(Number(progress) || 0, 0, 1);
  elements.startLoading?.classList.toggle('is-hidden', !startLoading);
  elements.startLoading?.setAttribute('aria-hidden', String(!startLoading));
  if (elements.startLoadingText) elements.startLoadingText.textContent = message;
  if (elements.startLoadingFill) elements.startLoadingFill.style.width = `${Math.round(safeProgress * 100)}%`;
  if (elements.startLoadingPercent) elements.startLoadingPercent.textContent = `${Math.round(safeProgress * 100)}%`;
  elements.startButton.disabled = startLoading || !selectedMinutes;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}

function nextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function enforceDisplayModeRules() {
  const resolvedMode = getResolvedDisplayMode();
  const playerLimit = getDisplayPlayerLimit(resolvedMode);
  selectedPlayers = clamp(selectedPlayers, 1, playerLimit);
  if (resolvedMode === 'tablet' && selectedPlayers > 1) {
    selectedMode = 'coop';
  }
  return resolvedMode;
}

function updateSetupSummary(options = {}) {
  const resolvedMode = enforceDisplayModeRules();
  const limitInfo = getPlayerLimitInfo(resolvedMode);
  document.body.dataset.displayModeChoice = selectedDisplayMode;
  document.body.dataset.displayMode = resolvedMode;
  if (elements.displayModeToggle) {
    const buttonLabel = getDisplayModeButtonLabel(selectedDisplayMode, resolvedMode);
    elements.displayModeToggle.textContent = buttonLabel;
    elements.displayModeToggle.dataset.displayMode = selectedDisplayMode;
    elements.displayModeToggle.dataset.resolvedDisplayMode = resolvedMode;
    elements.displayModeToggle.setAttribute('aria-label', `${buttonLabel}. 누르면 화면 모드가 바뀝니다.`);
    elements.displayModeToggle.title = '화면 모드 전환: 자동 → 모바일 → 태블릿 → 전자칠판 → 웹';
  }
  if (elements.playMinutes) {
    elements.playMinutes.value = selectedMinutes ? String(selectedMinutes) : '';
  }
  elements.startButton.disabled = startLoading || !selectedMinutes;

  $$('.option-button', elements.modeOptions).forEach((button) => {
    const forcedTabletCoop = resolvedMode === 'tablet' && selectedPlayers > 1 && button.dataset.mode === 'solo';
    const unavailable = forcedTabletCoop;
    const modeId = button.dataset.mode;
    button.textContent = getModeLabel(modeId, { resolvedMode, playerCount: selectedPlayers });
    button.disabled = unavailable;
    button.title = forcedTabletCoop ? '태블릿에서 여러 명이 플레이할 때는 함께 풀기로 진행합니다.' : '';
    button.classList.toggle('is-disabled', unavailable);
    button.classList.toggle('is-long-label', modeId === 'coop' && resolvedMode === 'tablet' && selectedPlayers === 2);
    button.classList.toggle('is-selected', modeId === selectedMode);
    button.setAttribute('aria-pressed', String(modeId === selectedMode));
  });
  $$('.option-button', elements.playerOptions).forEach((button) => {
    const players = Number(button.dataset.players);
    const notRecommended = players > limitInfo.recommendedLimit;
    const label = getPlayerCountLabel(players, resolvedMode);
    button.innerHTML = `${escapeHtml(label)}${notRecommended ? ' <small class="option-warning">비추천</small>' : ''}`;
    button.disabled = false;
    button.title = notRecommended ? limitInfo.reason : '';
    button.classList.remove('is-disabled');
    button.classList.toggle('is-not-recommended', notRecommended);
    button.classList.toggle('is-long-label', resolvedMode === 'tablet' && players === 2);
    button.classList.toggle('is-selected', players === selectedPlayers);
    button.setAttribute('aria-pressed', String(players === selectedPlayers));
    button.setAttribute('aria-disabled', 'false');
  });

  if (!(options.keepError && setupMessageKind === 'error')) {
    const recommendationMessage = selectedPlayers > limitInfo.recommendedLimit ? limitInfo.reason : '';
    setSetupMessage(recommendationMessage, recommendationMessage ? 'note' : '');
  }
}

function renderSetupControls() {
  elements.quizPack.innerHTML = QUIZ_PACKS
    .map((pack) => `<option value="${pack.id}">${escapeHtml(pack.label)}</option>`)
    .join('');
  elements.quizPack.value = selectedPackId;

  elements.playMinutes.innerHTML = [
    '<option value="">시간 선택</option>',
    ...PLAY_MINUTES.map((minutes) => `<option value="${minutes}">${minutes}분</option>`)
  ].join('');
  elements.playMinutes.value = selectedMinutes ? String(selectedMinutes) : '';

  elements.modeOptions.innerHTML = PLAY_MODES
    .map((mode) => (
      `<button class="option-button" type="button" data-mode="${mode.id}" aria-pressed="${mode.id === selectedMode}">
        ${escapeHtml(mode.label)}
      </button>`
    ))
    .join('');

  elements.playerOptions.innerHTML = PLAYER_COUNTS
    .map((count) => (
      `<button class="option-button" type="button" data-players="${count}" aria-pressed="${count === selectedPlayers}">
        ${count}명
      </button>`
    ))
    .join('');

  updateSetupSummary();
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line, index) => {
    const columns = line.split(',').map((value) => value.trim());
    const choices = columns.slice(1, 5).filter(Boolean);
    const answerIndex = Math.max(0, Number(columns[5]) - 1);
    return {
      id: `gugudan-${index + 1}`,
      prompt: '정답을 고르세요',
      text: columns[0],
      choices,
      answer: choices[answerIndex],
      difficulty: 1,
      asset: false,
      hasQuestionImage: false,
      hasChoiceImages: false
    };
  }).filter((question) => question.text && question.choices.length >= 2 && question.answer);
}

function normalizeJsonQuestions(payload) {
  const questions = Array.isArray(payload?.questions) ? payload.questions : [];
  return questions.map((question, index) => {
    const rawQuestion = String(question.question || question.image || '').trim();
    const choices = Array.isArray(question.choices) ? question.choices.slice(0, 4) : [];
    const choiceOnlyImageQuestion = isChoiceOnlyImageQuestion(question);
    const hasQuestionImage = !choiceOnlyImageQuestion && isQuizImageAsset(rawQuestion);
    const hasChoiceImages = choices.some(isQuizImageAsset);
    const fallbackText = String(question.text || question.title || question.prompt || '정답을 고르세요');
    return {
      id: String(question.id || `json-${index + 1}`),
      prompt: String(question.prompt || '정답을 고르세요'),
      text: hasQuestionImage || choiceOnlyImageQuestion ? '' : (rawQuestion || fallbackText),
      image: hasQuestionImage ? toQuizImageSrc(rawQuestion) : '',
      choices,
      answer: question.answer,
      difficulty: Math.max(1, Math.round(Number(question.difficulty) || 1)),
      asset: hasQuestionImage || hasChoiceImages,
      hasQuestionImage,
      choiceOnlyImageQuestion,
      hasChoiceImages
    };
  }).filter((question) => (
    (question.hasQuestionImage || question.text || question.prompt)
    && question.choices.length >= 2
    && question.answer
  ));
}

function loadInlinePack(packId, pack) {
  const inlinePack = window.KNOLQUIZ_INLINE_PACKS?.[packId];
  if (!inlinePack) return [];
  return pack.kind === 'csv'
    ? parseCsv(inlinePack.text || '')
    : normalizeJsonQuestions(inlinePack.json || inlinePack);
}

async function loadPack(packId) {
  if (packCache.has(packId)) return packCache.get(packId);
  const pack = QUIZ_PACKS.find((item) => item.id === packId);
  if (!pack) throw new Error('퀴즈팩을 찾을 수 없습니다.');
  let questions = [];
  try {
    const response = await fetch(pack.path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${pack.label} 데이터를 불러오지 못했습니다.`);
    questions = pack.kind === 'csv'
      ? parseCsv(await response.text())
      : normalizeJsonQuestions(await response.json());
  } catch (error) {
    questions = loadInlinePack(packId, pack);
    if (!questions.length) throw error;
  }
  if (!questions.length) throw new Error(`${pack.label}에 사용할 문제가 없습니다.`);
  packCache.set(packId, questions);
  return questions;
}

function decodeImageElement(image) {
  if (!image) return Promise.resolve();
  const src = image.currentSrc || image.src || '';
  if (src && imageDecodeCache.has(src)) return imageDecodeCache.get(src);
  const promise = new Promise((resolve) => {
    if (image.complete && image.naturalWidth) {
      if (typeof image.decode === 'function') {
        image.decode().then(resolve).catch(resolve);
      } else {
        resolve();
      }
      return;
    }
    const done = () => resolve();
    image.addEventListener('load', done, { once: true });
    image.addEventListener('error', done, { once: true });
  });
  if (src) imageDecodeCache.set(src, promise);
  return promise;
}

function preloadImageSrc(src) {
  const safeSrc = String(src || '').trim();
  if (!safeSrc) return Promise.resolve();
  if (imageDecodeCache.has(safeSrc)) return imageDecodeCache.get(safeSrc);
  const image = new Image();
  image.decoding = 'async';
  image.src = safeSrc;
  const promise = decodeImageElement(image);
  imageDecodeCache.set(safeSrc, promise);
  return promise;
}

function collectQuizImageSources(questions) {
  const sources = new Set();
  questions.forEach((question) => {
    if (question?.image) sources.add(question.image);
    (question?.choices || []).forEach((choice) => {
      if (isQuizImageAsset(choice)) sources.add(toQuizImageSrc(choice));
    });
  });
  return Array.from(sources);
}

function getWarmupEnemyVariantStyles() {
  const hardened = {
    ...ENEMY_STRENGTH_VARIANTS.hardened.visual,
    cacheKey: 'hardened'
  };
  const elite = {
    ...ENEMY_STRENGTH_VARIANTS.elite.visual,
    cacheKey: 'elite'
  };
  const eliteMax = {
    ...ENEMY_STRENGTH_VARIANTS.elite.visual,
    ...ENEMY_STRENGTH_VARIANTS.elite.visual.max,
    cacheKey: 'elite-max'
  };
  return [hardened, elite, eliteMax];
}

function warmupEnemyVariantSprites() {
  getWarmupEnemyVariantStyles().forEach((style) => {
    enemyImages.forEach((image) => {
      if (!image?.naturalWidth) return;
      getTintedEnemySprite(image, style);
      if (style.outline) getEnemySilhouetteSprite(image, style.outline);
      if (style.outerOutline) getEnemySilhouetteSprite(image, style.outerOutline);
      getCompositeEnemySprite(image, style);
    });
  });
}

function warmupCanvasPrimitives() {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawBackground(ctx, canvas.width, canvas.height, null);
  if (shipImage.complete && shipImage.naturalWidth) {
    ctx.drawImage(
      shipImage,
      SHIP_SPRITE_CROP.x,
      SHIP_SPRITE_CROP.y,
      SHIP_SPRITE_CROP.width,
      SHIP_SPRITE_CROP.height,
      126,
      88,
      68,
      104
    );
  }
  let enemyX = 18;
  let enemyY = 206;
  enemyImages.forEach((image) => {
    if (!image?.complete || !image.naturalWidth) return;
    ctx.drawImage(image, enemyX, enemyY, 32, 32);
    enemyX += 36;
    if (enemyX > 278) {
      enemyX = 18;
      enemyY += 36;
    }
  });
  for (let count = 1; count <= SHIP_MAX_PROJECTILE_COUNT; count += 1) {
    getProjectileAngleOffsets(count);
  }
  ctx.fillStyle = '#fb923c';
  ctx.beginPath();
  ctx.arc(212, 152, 8, 0, Math.PI * 2);
  ctx.fill();
}

function getExplosionRadiusForLevel(level) {
  const safeLevel = Math.max(1, Math.round(Number(level) || 1));
  return SHIP_EXPLOSION_BASE_RADIUS + Math.max(0, safeLevel - 1) * SHIP_EXPLOSION_RADIUS_STEP;
}

async function warmupExplosionFramesForLevel(level) {
  const safeLevel = Math.max(1, Math.round(Number(level) || 1));
  if (warmedExplosionLevels.has(safeLevel)) return;
  warmedExplosionLevels.add(safeLevel);
  const effect = createPooledExplosionEffect();
  effect.active = true;
  effect.removed = false;
  effect.radius = getExplosionRadiusForLevel(safeLevel);
  effect.level = safeLevel;
  let warmed = 0;
  for (let seedBucket = 0; seedBucket < EXPLOSION_SEED_BUCKETS; seedBucket += 1) {
    effect.seed = (seedBucket + 0.5) / EXPLOSION_SEED_BUCKETS;
    for (let frameIndex = 0; frameIndex < EXPLOSION_FRAME_COUNT; frameIndex += 1) {
      getExplosionFrameSprite(effect, (frameIndex + 0.5) / EXPLOSION_FRAME_COUNT);
      warmed += 1;
      if (warmed % 20 === 0) await nextPaint();
    }
  }
}

async function warmupExplosionFrames(levels = [1, 2, 3, 4, 5]) {
  for (const level of levels) {
    await warmupExplosionFramesForLevel(level);
  }
}

function queueExplosionFrameWarmup(level) {
  const safeLevel = Math.max(1, Math.round(Number(level) || 1));
  if (warmedExplosionLevels.has(safeLevel)) return;
  explosionWarmupTail = explosionWarmupTail
    .then(() => warmupExplosionFramesForLevel(safeLevel))
    .catch(() => {});
}

async function warmupCombatAssets(updateProgress) {
  if (combatAssetsWarmed) return;
  updateProgress('거북선과 적 이미지를 불러오는 중', 0.18);
  await Promise.allSettled([
    decodeImageElement(shipImage),
    ...Array.from(enemyImages.values()).map(decodeImageElement)
  ]);
  updateProgress('강화 적 표시 효과를 미리 준비하는 중', 0.42);
  warmupEnemyVariantSprites();
  await nextPaint();
  updateProgress('전장 캔버스를 준비하는 중', 0.52);
  warmupCanvasPrimitives();
  await nextPaint();
  updateProgress('폭발 효과를 미리 준비하는 중', 0.58);
  await warmupExplosionFrames([1, 2, 3, 4, 5]);
  await nextPaint();
  combatAssetsWarmed = true;
}

async function warmupQuizAssets(questions, updateProgress) {
  const sources = collectQuizImageSources(questions);
  if (!sources.length) {
    updateProgress('퀴즈 문제를 준비하는 중', 0.9);
    await nextPaint();
    return;
  }
  const chunkSize = 18;
  for (let index = 0; index < sources.length; index += chunkSize) {
    const chunk = sources.slice(index, index + chunkSize);
    await Promise.allSettled(chunk.map(preloadImageSrc));
    const doneRatio = Math.min(1, (index + chunk.length) / sources.length);
    updateProgress(`퀴즈 이미지를 미리 불러오는 중 (${index + chunk.length}/${sources.length})`, 0.62 + doneRatio * 0.3);
    await nextPaint();
  }
}

async function prepareGameStart() {
  const startedAtMs = performance.now();
  const updateProgress = (message, progress) => setStartLoading(true, message, progress);
  updateProgress('퀴즈 데이터를 불러오는 중', 0.06);
  const questions = await loadPack(selectedPackId);
  updateProgress('전투 자산을 점검하는 중', 0.12);
  await warmupCombatAssets(updateProgress);
  await warmupQuizAssets(questions, updateProgress);
  updateProgress('전장 배치를 최종 준비하는 중', 0.96);
  const remainingMs = MIN_START_LOADING_MS - (performance.now() - startedAtMs);
  if (remainingMs > 0) await wait(remainingMs);
  updateProgress('전장 준비 완료', 1);
  await nextPaint();
  return questions;
}

function createPlayers(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `플레이어 ${index + 1}`,
    correct: 0,
    wrong: 0,
    quizGold: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    quickAnswers: 0
  }));
}

function createBattleState(playerIndex = 0) {
  return {
    playerIndex,
    running: false,
    lastFrameMs: performance.now(),
    lastDrawMs: 0,
    spawnCooldownMs: SPAWN_START_COOLDOWN_MS,
    nextSpawnMs: 650,
    nextShotMs: 0,
    spawnSerial: 0,
    effectSerial: 0,
    hudDirty: true,
    lastHudRefreshMs: 0,
    lastUpgradeRenderSignature: '',
    lastCanvasSyncMs: 0,
    canvasShellSize: 0,
    worldElapsedMs: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    quizOpen: false,
    questionQueue: [],
    currentQuestion: null,
    answerLocked: false,
    selectedChoice: '',
    questionStartedAtMs: 0,
    feedback: '',
    feedbackKind: '',
    statusText: '전장 진행 중',
    statusTone: '',
    defeatFlashUntilMs: 0,
    lastDeathPenalty: 0,
    lastDeathClearedEnemies: 0,
    flow: {
      label: '보통',
      spawnCooldownMul: 1,
      speedMul: 1,
      capBonus: 0,
      hardenedBonus: 0
    },
    ship: {
      x: 0,
      y: 0,
      radius: 38,
      maxHp: SHIP_BASE_MAX_HP,
      hp: SHIP_BASE_MAX_HP,
      attackPower: SHIP_BASE_ATTACK_POWER,
      attackSpeedLevel: 0,
      attackPowerLevel: 0,
      projectileLevel: 0,
      penetrationLevel: 0,
      explosionLevel: 0,
      hullLevel: 0,
      projectileCount: 1,
      goldSpent: 0,
      respawnUntilMs: 0,
      invulnerableUntilMs: 0,
      deathCount: 0
    },
    score: {
      points: 0,
      kills: 0,
      killPoints: 0,
      gold: 0,
      quizSolved: 0,
      quizAttempts: 0,
      combo: 0,
      maxCombo: 0,
      bonusPoints: 0,
      hardenedKills: 0,
      eliteKills: 0
    },
    waves: {
      level: 1,
      elapsedSec: 0
    },
    backgroundCache: null,
    enemies: [],
    enemiesNeedCompact: false,
    enemyPool: createEnemyPool(),
    projectiles: [],
    projectilesNeedCompact: false,
    projectilePool: createProjectilePool(),
    effects: [],
    effectsNeedCompact: false,
    effectPool: createEffectPool(),
    effectRecycleIndex: 0,
    performanceLagScore: 0,
    performanceMode: false,
    performanceVeryBusy: false,
    random: null,
    spawnPlan: [],
    spawnPlanIndex: 0
  };
}

function createQuizState(playerIndex = 0, questions = []) {
  return {
    playerIndex,
    quizOpen: false,
    questionQueue: shuffle(questions),
    currentQuestion: null,
    answerLocked: false,
    selectedChoice: '',
    questionStartedAtMs: 0,
    feedback: '',
    feedbackKind: '',
    quizBurstAnswered: 0,
    autoAdvanceTimerId: 0
  };
}

function buildSession(questions) {
  const startedAt = new Date();
  const resolvedDisplayMode = enforceDisplayModeRules();
  const sharedBattle = selectedMode === 'coop';
  const combatSeed = hashSeed(`${selectedPackId}:${selectedPlayers}:${selectedMinutes}:${startedAt.getTime()}:${Math.random()}`);
  const sessionState = {
    packId: selectedPackId,
    packLabel: getPackLabel(selectedPackId),
    playMode: selectedMode,
    modeLabel: getModeLabel(selectedMode, { resolvedMode: resolvedDisplayMode, playerCount: selectedPlayers }),
    displayModeChoice: selectedDisplayMode,
    displayMode: resolvedDisplayMode,
    displayModeLabel: getDisplayModeLabel(selectedDisplayMode, resolvedDisplayMode),
    sharedBattle,
    combatSeed,
    minutes: selectedMinutes,
    durationSec: selectedMinutes * 60,
    startedAt,
    deadlineAt: Date.now() + selectedMinutes * 60 * 1000,
    endedAt: null,
    players: createPlayers(selectedPlayers),
    activePlayerIndex: 0,
    questions,
    queue: shuffle(questions),
    currentQuestion: null,
    answerLocked: false,
    selectedChoice: '',
    questionStartedAtMs: 0,
    answerTimerId: 0,
    quizOpen: false,
    timerId: null,
    feedback: '',
    feedbackKind: '',
    playerQuizStates: Array.from({ length: selectedPlayers }, (_, index) => createQuizState(index, questions)),
    battles: Array.from({ length: sharedBattle ? 1 : selectedPlayers }, (_, index) => createBattleState(index)),
    gugudanRecords: [],
    battle: null
  };
  sessionState.battle = sessionState.battles[0];
  sessionState.battles.forEach((battle) => {
    battle.random = createBattleRandomState(combatSeed);
    battle.spawnPlan = createSpawnPlan(combatSeed, battle.playerIndex, sessionState.durationSec);
    battle.spawnPlanIndex = 0;
    battle.questionQueue = shuffle(questions);
  });
  return sessionState;
}

function getActivePlayer() {
  return session?.players[session.activePlayerIndex] || null;
}

function isSharedBattleSession() {
  return Boolean(session?.sharedBattle);
}

function isTabletFaceToFaceSession() {
  return Boolean(
    session?.displayMode === 'tablet'
    && session?.sharedBattle
    && session.players.length === 2
  );
}

function getSafePlayerIndex(index = currentBattleIndex) {
  if (!session) return null;
  return clamp(Number(index) || 0, 0, Math.max(0, session.players.length - 1));
}

function getGameplayBattleIndex(index = currentBattleIndex) {
  if (!session) return 0;
  return isSharedBattleSession()
    ? 0
    : clamp(Number(index) || 0, 0, Math.max(0, session.battles.length - 1));
}

function getQuizState(index = currentBattleIndex) {
  if (!session) return null;
  const safeIndex = getSafePlayerIndex(index);
  return isSharedBattleSession()
    ? session.playerQuizStates?.[safeIndex] || null
    : session.battles[safeIndex] || null;
}

function updateSharedBattleQuizFlag() {
  if (!isSharedBattleSession()) return;
  const battle = session.battles[0];
  if (battle) battle.quizOpen = false;
}

function getBattle(index = currentBattleIndex) {
  if (!session) return null;
  const battleIndex = getGameplayBattleIndex(index);
  return session.battles[battleIndex] || null;
}

function setBattleContext(index = currentBattleIndex) {
  if (!session) return null;
  const safePlayerIndex = getSafePlayerIndex(index);
  const battleIndex = getGameplayBattleIndex(safePlayerIndex);
  const battle = session.battles[battleIndex];
  if (!battle) return null;
  currentBattleIndex = safePlayerIndex;
  session.battle = battle;
  battleCanvas = battleViews[battleIndex]?.canvas || null;
  battleCtx = battleViews[battleIndex]?.ctx || null;
  return battle;
}

function withBattleContext(index, callback) {
  const previousIndex = currentBattleIndex;
  const previousBattle = session?.battle || null;
  const previousCanvas = battleCanvas;
  const previousCtx = battleCtx;
  const battle = setBattleContext(index);
  if (!battle) return undefined;
  try {
    return callback(battle, index);
  } finally {
    currentBattleIndex = previousIndex;
    if (session && previousBattle) session.battle = previousBattle;
    battleCanvas = previousCanvas;
    battleCtx = previousCtx;
  }
}

function getBattleRoot(index = currentBattleIndex) {
  const battleIndex = getGameplayBattleIndex(index);
  return battleViews[battleIndex]?.panel || elements.gameStage;
}

function getBattleIndexFromElement(node) {
  const panel = node?.closest?.('[data-battle-index]');
  if (!panel) return currentBattleIndex;
  return clamp(Number(panel.dataset.battleIndex) || 0, 0, Math.max(0, (session?.battles?.length || 1) - 1));
}

function getPlayerIndexFromElement(node) {
  const ownedNode = node?.closest?.('[data-player-index]');
  if (ownedNode) {
    return clamp(Number(ownedNode.dataset.playerIndex) || 0, 0, Math.max(0, (session?.players?.length || 1) - 1));
  }
  return getBattleIndexFromElement(node);
}

function getQuizOwnerIndexFromElement(node) {
  const ownerNode = node?.closest?.('[data-quiz-owner], [data-player-index]');
  if (!ownerNode) return getPlayerIndexFromElement(node);
  const rawOwner = ownerNode.dataset.quizOwner ?? ownerNode.dataset.playerIndex;
  return clamp(Number(rawOwner) || 0, 0, Math.max(0, (session?.players?.length || 1) - 1));
}

function nextQuestion(quizState = getQuizState(currentBattleIndex)) {
  if (!session || !quizState) return null;
  if (!Array.isArray(quizState.questionQueue)) {
    quizState.questionQueue = shuffle(session.questions);
  }
  if (!quizState.questionQueue.length) {
    quizState.questionQueue = shuffle(session.questions);
  }
  const base = quizState.questionQueue.shift();
  quizState.currentQuestion = {
    ...base,
    choices: shuffle(base.choices)
  };
  quizState.answerLocked = false;
  quizState.selectedChoice = '';
  quizState.questionStartedAtMs = 0;
  quizState.feedback = '';
  quizState.feedbackKind = '';
  session.currentQuestion = quizState.currentQuestion;
  return quizState.currentQuestion;
}

function clearQuizAutoAdvance(quizState) {
  if (!quizState?.autoAdvanceTimerId) return;
  window.clearTimeout(quizState.autoAdvanceTimerId);
  quizState.autoAdvanceTimerId = 0;
}

function resetQuizBurst(quizState) {
  if (!quizState) return;
  clearQuizAutoAdvance(quizState);
  quizState.quizBurstAnswered = 0;
  quizState.currentQuestion = null;
  quizState.answerLocked = false;
  quizState.selectedChoice = '';
  quizState.questionStartedAtMs = 0;
  quizState.feedback = '';
  quizState.feedbackKind = '';
}

function startQuizBurst(quizState) {
  if (!quizState) return null;
  clearQuizAutoAdvance(quizState);
  quizState.quizBurstAnswered = 0;
  return nextQuestion(quizState);
}

function getQuizBurstProgress(quizState) {
  const answered = clamp(Number(quizState?.quizBurstAnswered) || 0, 0, QUIZ_BURST_QUESTION_COUNT);
  const current = clamp(answered + (quizState?.answerLocked ? 0 : 1), 1, QUIZ_BURST_QUESTION_COUNT);
  return { answered, current, total: QUIZ_BURST_QUESTION_COUNT };
}

function getQuizAutoProgressText(quizState) {
  const progress = getQuizBurstProgress(quizState);
  return progress.answered >= progress.total
    ? `${progress.total}문제 완료 · 전장으로 복귀합니다`
    : `${progress.answered}/${progress.total} 완료 · 다음 문제로 이동합니다`;
}

function renderQuizSurface(battleIndex = currentBattleIndex) {
  if (!session) return;
  if (isSharedBattleSession()) {
    renderCoopQuizOverlay();
    return;
  }
  renderQuestion(battleIndex);
}

function scheduleQuizAutoProgress(battleIndex = currentBattleIndex) {
  if (!session) return;
  const quizState = getQuizState(battleIndex);
  if (!quizState) return;
  clearQuizAutoAdvance(quizState);
  const complete = quizState.quizBurstAnswered >= QUIZ_BURST_QUESTION_COUNT;
  const delayMs = complete ? QUIZ_AUTO_CLOSE_DELAY_MS : QUIZ_AUTO_NEXT_DELAY_MS;
  quizState.autoAdvanceTimerId = window.setTimeout(() => {
    quizState.autoAdvanceTimerId = 0;
    if (!session || session.endedAt) return;
    if (Date.now() >= session.deadlineAt) {
      finishSession();
      return;
    }
    setBattleContext(battleIndex);
    const nextQuizState = getQuizState(battleIndex);
    if (!nextQuizState?.quizOpen) return;
    if (nextQuizState.quizBurstAnswered >= QUIZ_BURST_QUESTION_COUNT) {
      closeQuizModal(battleIndex, { completedBurst: true });
      return;
    }
    nextQuestion(nextQuizState);
    renderQuizSurface(battleIndex);
    refreshBattleHud(battleIndex);
  }, delayMs);
}

function rotatePlayer() {
  session.activePlayerIndex = (session.activePlayerIndex + 1) % session.players.length;
}

function getEnemyRoleConfig(tier) {
  return ENEMY_ROLE_CONFIG[Math.max(1, Math.min(10, Number(tier) || 1))] || ENEMY_ROLE_CONFIG[1];
}

function getUnlockedEnemyTier(elapsedSec) {
  const tier = 2 + Math.floor(Math.max(0, elapsedSec) / ENEMY_TIER_UNLOCK_STEP_SEC);
  return clamp(tier, 2, 10);
}

function getEliteUnlockedTier(elapsedSec) {
  if (elapsedSec < ELITE_UNLOCK_TIME_SEC) return 0;
  const tier = 1 + Math.floor((elapsedSec - ELITE_UNLOCK_TIME_SEC) / ELITE_TIER_UNLOCK_STEP_SEC);
  return clamp(tier, 1, 10);
}

function shouldSpawnEliteEnemy(elapsedSec, eliteTier, roll01 = null) {
  if (eliteTier <= 0) return false;
  const chance = clamp(0.08 + ((elapsedSec - ELITE_UNLOCK_TIME_SEC) / 280) * 0.5, 0.08, 0.55);
  return ((roll01 ?? battleRandom()) || 0) < chance;
}

function getLateWavePressure(elapsedSec) {
  if (elapsedSec >= 420) return 2;
  if (elapsedSec >= 260) return 1;
  return 0;
}

function getFlowState(elapsedSec) {
  const cyclePos = ((elapsedSec % FLOW_CYCLE_SEC) + FLOW_CYCLE_SEC) % FLOW_CYCLE_SEC;
  const pulse = Math.sin(elapsedSec * 0.45) * 0.08;
  const latePressure = getLateWavePressure(elapsedSec);
  let flow = {
    label: '보통',
    spawnCooldownMul: 1,
    speedMul: 1,
    capBonus: 0,
    hardenedBonus: 0
  };

  if (cyclePos >= FLOW_LULL_START_SEC && cyclePos < FLOW_LULL_END_SEC) {
    flow = {
      label: '완급-완',
      spawnCooldownMul: 1.35,
      speedMul: 0.9,
      capBonus: -2,
      hardenedBonus: -0.03
    };
  } else if (cyclePos >= FLOW_SURGE_START_SEC && cyclePos < FLOW_SURGE_END_SEC) {
    flow = {
      label: '러시',
      spawnCooldownMul: 0.68,
      speedMul: 1.18,
      capBonus: 5,
      hardenedBonus: 0.12
    };
  } else if (cyclePos >= FLOW_SURGE_END_SEC && cyclePos < FLOW_AFTERSHOCK_END_SEC) {
    flow = {
      label: '압박',
      spawnCooldownMul: 0.84,
      speedMul: 1.08,
      capBonus: 2,
      hardenedBonus: 0.06
    };
  }

  if (latePressure >= 1) {
    flow = {
      ...flow,
      label: flow.label === '보통' ? '후반 압박' : `${flow.label} · 후반`,
      spawnCooldownMul: flow.spawnCooldownMul * 0.94,
      speedMul: flow.speedMul * 1.03,
      capBonus: flow.capBonus + 2,
      hardenedBonus: flow.hardenedBonus + 0.04
    };
  }
  if (latePressure >= 2) {
    flow = {
      ...flow,
      label: flow.label.includes('후반') ? '최종 압박' : `${flow.label} · 최종`,
      spawnCooldownMul: flow.spawnCooldownMul * 0.9,
      speedMul: flow.speedMul * 1.04,
      capBonus: flow.capBonus + 2,
      hardenedBonus: flow.hardenedBonus + 0.05
    };
  }

  return {
    ...flow,
    spawnCooldownMul: clamp(flow.spawnCooldownMul * (1 - pulse * 0.45), 0.55, 1.55),
    speedMul: clamp(flow.speedMul * (1 + pulse), 0.82, 1.3)
  };
}

function getShipAttackSpeedMultiplier() {
  return 1 + session.battle.ship.attackSpeedLevel * SHIP_ATTACK_SPEED_LEVEL_STEP;
}

function getAttackCooldownMs() {
  const speedMultiplier = getShipAttackSpeedMultiplier();
  const earlyProgress = clamp(session.battle.waves.elapsedSec / EARLY_ATTACK_SLOW_WINDOW_SEC, 0, 1);
  const earlySlowRatio = EARLY_ATTACK_SLOW_MAX_RATIO - ((EARLY_ATTACK_SLOW_MAX_RATIO - 1) * earlyProgress);
  return (SHIP_BASE_ATTACK_COOLDOWN_MS * earlySlowRatio) / speedMultiplier;
}

function getShipPenetrationHits() {
  return clamp(Math.max(0, session.battle.ship.penetrationLevel), 0, SHIP_MAX_PENETRATION_LEVEL);
}

function getShipExplosionRadius() {
  return session.battle.ship.explosionLevel > 0
    ? SHIP_EXPLOSION_BASE_RADIUS + Math.max(0, session.battle.ship.explosionLevel - 1) * SHIP_EXPLOSION_RADIUS_STEP
    : 0;
}

function getShipExplosionDamageRatio() {
  return session.battle.ship.explosionLevel > 0
    ? clamp(
      SHIP_EXPLOSION_BASE_DAMAGE_RATIO + Math.max(0, session.battle.ship.explosionLevel - 1) * SHIP_EXPLOSION_DAMAGE_RATIO_STEP,
      SHIP_EXPLOSION_BASE_DAMAGE_RATIO,
      SHIP_EXPLOSION_DAMAGE_RATIO_MAX
    )
    : 0;
}

function getShipDamageReductionRatio() {
  return clamp(session.battle.ship.hullLevel * SHIP_HULL_DAMAGE_REDUCTION_STEP, 0, SHIP_DAMAGE_REDUCTION_MAX);
}

function getHealCost() {
  return 24 + Math.floor(session.battle.ship.goldSpent / 45) * 4;
}

function getSpeedUpgradeCost() {
  return Math.round(12 * Math.pow(1.38, session.battle.ship.attackSpeedLevel));
}

function getPowerUpgradeCost() {
  return Math.round(14 * Math.pow(1.42, session.battle.ship.attackPowerLevel));
}

function getBulletUpgradeCost() {
  return Math.round(24 * Math.pow(1.58, session.battle.ship.projectileLevel));
}

function getPenetrationUpgradeCost() {
  return Math.round(24 * Math.pow(1.62, session.battle.ship.penetrationLevel));
}

function getExplosionUpgradeCost() {
  return Math.round(28 * Math.pow(1.68, session.battle.ship.explosionLevel));
}

function getHullUpgradeCost() {
  return Math.round(22 * Math.pow(1.48, session.battle.ship.hullLevel));
}

function setBattleStatus(text, tone = '') {
  if (!session) return;
  const battle = session.battle;
  battle.statusText = String(text || '').trim();
  battle.statusTone = tone;
  battle.hudDirty = true;
}

function renderPlayerChips() {
  if (!session) return '';
  return session.players.map((player, index) => `
    <div class="score-chip ${index === session.activePlayerIndex ? 'active-player' : ''}">
      <b>${escapeHtml(player.name)}</b>
      <span>${player.score.toLocaleString('ko-KR')}점 · ${player.streak}연속</span>
    </div>
  `).join('');
}

function renderUpgradeButtons() {
  return UPGRADE_ACTIONS
    .map((action) => `<button class="upgrade-button" type="button" data-action="${action}"></button>`)
    .join('');
}

function renderBattlePanel(player, index) {
  return `
    <article class="battle-panel" data-battle-index="${index}">
      <div class="battle-player-head">
        <div>
          <b>${escapeHtml(player.name)}</b>
          <span data-ref="player-summary">0점 · 0연속</span>
        </div>
        <em>${index + 1}P</em>
      </div>
      <div class="battlefield-slot">
        <div class="battlefield-shell">
          <canvas class="battle-canvas" aria-label="${escapeHtml(player.name)} 거북선 전투 전장"></canvas>
        </div>
      </div>
      <div class="battle-command">
        <div class="battle-stat-grid">
          <div class="battle-stat ship-hp-stat">
            <b>내구도</b>
            <span data-ref="ship-hp">300/300</span>
            <div class="hud-hp-bar" aria-hidden="true"><i data-ref="ship-hp-fill"></i></div>
          </div>
          <div class="battle-stat"><b>Wave/전장</b><span data-ref="wave-level">Lv.1</span></div>
          <div class="battle-stat score-stat"><b>점수</b><span data-ref="score-points">0</span></div>
          <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
          <div class="battle-stat"><b>GOLD</b><span data-ref="resource-score">0</span></div>
          <div class="battle-stat"><b>화력</b><span data-ref="attack-stat">14</span></div>
        </div>
        <div class="battle-control-row">
          <button class="quiz-open-button" type="button" data-action="quiz">퀴즈 열기</button>
          <div class="battle-status" data-ref="battle-status">전장 진행 중</div>
        </div>
        <div class="upgrade-grid">
          ${renderUpgradeButtons()}
        </div>
      </div>
      <div class="battle-quiz-layer is-hidden" data-ref="battle-quiz-layer" aria-label="${escapeHtml(player.name)} 퀴즈"></div>
    </article>
  `;
}

function renderCoopPlayerControls() {
  return `
    <div class="coop-player-control-grid player-count-${session.players.length}" aria-label="플레이어별 조작 화면">
      ${session.players.map((player, index) => `
        <section class="coop-player-control-card" data-player-index="${index}" aria-label="${escapeHtml(player.name)} 조작 화면">
          <div class="coop-player-control-head">
            <span>${index + 1}P</span>
            <b>${escapeHtml(player.name)}</b>
          </div>
          <button class="quiz-open-button player-control-quiz" type="button" data-action="quiz" aria-label="${escapeHtml(player.name)} 퀴즈 풀기">
            <span>${index + 1}P</span>
            <b>퀴즈 풀기</b>
          </button>
          <div class="upgrade-grid player-upgrade-grid">
            ${renderUpgradeButtons()}
          </div>
        </section>
      `).join('')}
    </div>
  `;
}

function renderTabletTeamHud() {
  return `
    <div class="tablet-team-hud" aria-label="팀 전장 상태">
      <div class="battle-stat ship-hp-stat">
        <b>팀 내구도</b>
        <span data-ref="ship-hp">300/300</span>
        <div class="hud-hp-bar" aria-hidden="true"><i data-ref="ship-hp-fill"></i></div>
      </div>
      <div class="battle-stat"><b>Wave/전장</b><span data-ref="wave-level">Lv.1</span></div>
      <div class="battle-stat score-stat"><b>팀 점수</b><span data-ref="score-points">0</span></div>
      <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
      <div class="battle-stat"><b>공유 GOLD</b><span data-ref="resource-score">0</span></div>
      <div class="battle-stat"><b>화력</b><span data-ref="attack-stat">14</span></div>
      <div class="battle-status" data-ref="battle-status">태블릿 대면 전장 진행 중</div>
    </div>
  `;
}

function renderTabletPlayerZone(player, index, flipped = false) {
  return `
    <section class="tablet-player-zone ${flipped ? 'is-flipped' : ''}" data-player-index="${index}" aria-label="${escapeHtml(player.name)} 태블릿 조작 화면">
      ${renderTabletTeamHud()}
      <div class="tablet-player-control-card">
        <div class="tablet-player-head">
          <span>${index + 1}P</span>
          <b>${escapeHtml(player.name)}</b>
        </div>
        <button class="quiz-open-button player-control-quiz tablet-quiz-button" type="button" data-action="quiz" aria-label="${escapeHtml(player.name)} 퀴즈 풀기">
          <span>${index + 1}P</span>
          <b>퀴즈 풀기</b>
        </button>
        <div class="upgrade-grid tablet-upgrade-grid">
          ${renderUpgradeButtons()}
        </div>
      </div>
    </section>
  `;
}

function renderTabletQuizLayer(player, index, side, flipped = false) {
  return `
    <div class="tablet-player-quiz-layer tablet-quiz-${side} ${flipped ? 'is-flipped' : ''} is-hidden" data-ref="tablet-player-quiz-layer" data-player-index="${index}" aria-label="${escapeHtml(player.name)} 퀴즈"></div>
  `;
}

function renderTabletCoopBattlePanel() {
  const topPlayer = session.players[1];
  const bottomPlayer = session.players[0];
  return `
    <article class="battle-panel battle-panel-coop battle-panel-tablet" data-battle-index="0">
      ${renderTabletPlayerZone(topPlayer, 1, true)}
      <div class="tablet-battle-core">
        <div class="battlefield-slot">
          <div class="battlefield-shell">
            <canvas class="battle-canvas" aria-label="태블릿 함께 풀기 거북선 전투 전장"></canvas>
          </div>
        </div>
      </div>
      ${renderTabletPlayerZone(bottomPlayer, 0)}
      ${renderTabletQuizLayer(topPlayer, 1, 'top', true)}
      ${renderTabletQuizLayer(bottomPlayer, 0, 'bottom')}
    </article>
  `;
}

function renderCoopBattlePanel() {
  return `
    <article class="battle-panel battle-panel-coop" data-battle-index="0">
      <div class="battle-player-head">
        <div>
          <b>함께 풀기</b>
          <span data-ref="player-summary">팀 공유 전장 · 0점</span>
        </div>
        <em>TEAM</em>
      </div>
      <div class="battlefield-slot">
        <div class="battlefield-shell">
          <canvas class="battle-canvas" aria-label="함께 풀기 거북선 전투 전장"></canvas>
        </div>
      </div>
      <div class="battle-command">
        <div class="battle-stat-grid">
          <div class="battle-stat ship-hp-stat">
            <b>팀 내구도</b>
            <span data-ref="ship-hp">300/300</span>
            <div class="hud-hp-bar" aria-hidden="true"><i data-ref="ship-hp-fill"></i></div>
          </div>
          <div class="battle-stat"><b>Wave/전장</b><span data-ref="wave-level">Lv.1</span></div>
          <div class="battle-stat score-stat"><b>팀 점수</b><span data-ref="score-points">0</span></div>
          <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
          <div class="battle-stat"><b>공유 GOLD</b><span data-ref="resource-score">0</span></div>
          <div class="battle-stat"><b>화력</b><span data-ref="attack-stat">14</span></div>
        </div>
        <div class="battle-control-row">
          <div class="battle-status" data-ref="battle-status">팀 전장 진행 중</div>
        </div>
        ${renderCoopPlayerControls()}
      </div>
      <div class="coop-quiz-split-layer is-hidden player-count-${session.players.length}" data-ref="coop-quiz-split-layer" aria-label="함께 풀기 퀴즈 분할 화면"></div>
    </article>
  `;
}

function renderStageShell() {
  const tabletFaceToFace = isTabletFaceToFaceSession();
  const stageClass = isSharedBattleSession()
    ? `stage-panel stage-panel-coop split-count-1 ${tabletFaceToFace ? 'stage-panel-tablet-face' : ''}`
    : `stage-panel split-count-${session.players.length}`;
  const gridClass = isSharedBattleSession()
    ? `split-battle-grid split-count-1 coop-battle-grid ${tabletFaceToFace ? 'tablet-face-grid' : ''}`
    : `split-battle-grid split-count-${session.players.length}`;
  const panelHtml = isSharedBattleSession()
    ? (tabletFaceToFace ? renderTabletCoopBattlePanel() : renderCoopBattlePanel())
    : session.players.map((player, index) => renderBattlePanel(player, index)).join('');
  elements.gameStage.innerHTML = `
      <div class="${stageClass}">
        <div class="${gridClass}">
          ${panelHtml}
        </div>
      </div>
  `;

  battleViews = $$('.battle-panel', elements.gameStage).map((panel, index) => {
    const canvas = $('.battle-canvas', panel);
    return {
      index,
      panel,
      canvas,
      ctx: canvas.getContext('2d')
    };
  });
  elements.gameStage.onclick = handleBattleAction;
  setBattleContext(0);
  syncAllCanvasSizes();
  refreshAllBattleHuds();
}

function setUpgradeButton(button, disabled, title, meta, cost) {
  if (!button) return;
  const compact = Boolean(button.closest('.battle-panel-tablet'));
  const detail = compact ? cost : `${meta} · ${cost}`;
  const nextDisabled = Boolean(disabled);
  if (button.disabled) button.disabled = false;
  button.classList.toggle('is-disabled', nextDisabled);
  button.setAttribute('aria-disabled', String(nextDisabled));
  const ariaLabel = `${title} ${meta} ${cost}`;
  if (button.getAttribute('aria-label') !== ariaLabel) {
    button.setAttribute('aria-label', ariaLabel);
  }
  const signature = `${nextDisabled}|${title}|${detail}`;
  if (button.dataset.renderSignature !== signature) {
    button.dataset.renderSignature = signature;
    button.innerHTML = `
      <span>${escapeHtml(title)}</span>
      <small>${escapeHtml(detail)}</small>
    `;
  }
}

function setUpgradeButtons(root, action, disabled, title, meta, cost) {
  $$(`[data-action="${action}"]`, root).forEach((button) => {
    setUpgradeButton(button, disabled, title, meta, cost);
  });
}

function refreshBattleHud(index = currentBattleIndex, options = {}) {
  if (!session) return;
  setBattleContext(index);
  const battle = session.battle;
  const nowMs = Number(options.nowMs) || performance.now();
  if (
    options.passive
    && nowMs - (Number(battle.lastHudRefreshMs) || 0) < HUD_REFRESH_INTERVAL_MS
  ) {
    return;
  }
  battle.lastHudRefreshMs = nowMs;
  battle.hudDirty = false;
  const ship = battle.ship;
  const player = session.players[isSharedBattleSession() ? getSafePlayerIndex(index) : battle.playerIndex] || session.players[0];
  const root = getBattleRoot(index);
  const setText = (ref, text) => {
    $$(`[data-ref="${ref}"]`, root).forEach((node) => {
      if (node.textContent !== text) node.textContent = text;
    });
  };

  setText(
    'player-summary',
    isSharedBattleSession()
      ? `팀 공유 전장 · ${battle.score.points.toLocaleString('ko-KR')}점 · ${session.players.length}명`
      : `${player.score.toLocaleString('ko-KR')}점 · ${player.streak}연속`
  );

  setText('ship-hp', `${Math.max(0, Math.round(ship.hp))}/${ship.maxHp}`);
  setText('wave-level', `Lv.${battle.waves.level} · ${battle.flow.label}`);
  setText('score-points', battle.score.points.toLocaleString('ko-KR'));
  setText('kill-combo', `${battle.score.kills} / x${battle.score.combo}`);
  setText('resource-score', battle.score.gold.toLocaleString('ko-KR'));
  setText('attack-stat', `${ship.attackPower} · ${ship.projectileCount}발`);
  $$('[data-ref="battle-status"]', root).forEach((toast) => {
    if (toast.textContent !== battle.statusText) toast.textContent = battle.statusText;
    const className = `battle-status ${battle.statusTone || ''}`;
    if (toast.className !== className) toast.className = className;
  });
  const hpRatio = ship.maxHp > 0 ? clamp(ship.hp / ship.maxHp, 0, 1) : 0;
  $$('.ship-hp-stat', root).forEach((hpStatNode) => {
    hpStatNode.classList.toggle('is-warning', hpRatio <= 0.48 && hpRatio > 0.22);
    hpStatNode.classList.toggle('is-danger', hpRatio <= 0.22);
  });
  $$('[data-ref="ship-hp-fill"]', root).forEach((hpFill) => {
    const width = `${Math.round(hpRatio * 100)}%`;
    if (hpFill.style.width !== width) hpFill.style.width = width;
  });

  const quizButtons = $$('[data-action="quiz"]', root);
  if (quizButtons.length) {
    quizButtons.forEach((quizButton) => {
      const playerIndex = getPlayerIndexFromElement(quizButton);
      const quizState = getQuizState(playerIndex);
      quizButton.disabled = Boolean(quizState?.quizOpen || session.endedAt);
      if (isSharedBattleSession()) {
        const quizPlayer = session.players[playerIndex] || session.players[0];
        quizButton.classList.toggle('is-active', Boolean(quizState?.quizOpen));
        const ariaLabel = `${quizPlayer.name} ${quizState?.quizOpen ? '퀴즈 풀이 중' : '퀴즈 풀기'}`;
        if (quizButton.getAttribute('aria-label') !== ariaLabel) {
          quizButton.setAttribute('aria-label', ariaLabel);
        }
        const signature = `${playerIndex}|${quizState?.quizOpen ? 'open' : 'idle'}`;
        if (quizButton.dataset.renderSignature !== signature) {
          quizButton.dataset.renderSignature = signature;
          quizButton.innerHTML = `
          <span>${playerIndex + 1}P</span>
          <b>${quizState?.quizOpen ? '풀이 중' : '퀴즈 풀기'}</b>
        `;
        }
      } else {
        const text = quizState?.quizOpen
          ? '퀴즈 진행 중'
          : '퀴즈 열기';
        if (quizButton.textContent !== text) quizButton.textContent = text;
      }
    });
  }

  const healCost = getHealCost();
  const upgradeRenderSignature = [
    battle.score.gold,
    Math.round(ship.hp),
    ship.maxHp,
    isShipRespawning() ? 1 : 0,
    ship.attackSpeedLevel,
    ship.attackPowerLevel,
    ship.projectileLevel,
    ship.projectileCount,
    ship.penetrationLevel,
    ship.explosionLevel,
    ship.hullLevel
  ].join('|');
  if (upgradeRenderSignature !== battle.lastUpgradeRenderSignature) {
    battle.lastUpgradeRenderSignature = upgradeRenderSignature;
    const speedCost = getSpeedUpgradeCost();
    const powerCost = getPowerUpgradeCost();
    const bulletCost = getBulletUpgradeCost();
    const penetrationCost = getPenetrationUpgradeCost();
    const explosionCost = getExplosionUpgradeCost();
    const hullCost = getHullUpgradeCost();
    const projectileMaxed = ship.projectileCount >= SHIP_MAX_PROJECTILE_COUNT;
    const penetrationMaxed = ship.penetrationLevel >= SHIP_MAX_PENETRATION_LEVEL;
    const explosionMaxed = ship.explosionLevel >= SHIP_MAX_EXPLOSION_LEVEL;
    const hullMaxed = ship.hullLevel >= SHIP_MAX_HULL_LEVEL;
    setUpgradeButtons(
      root,
      'heal',
      ship.hp >= ship.maxHp || battle.score.gold < healCost || isShipRespawning(),
      '회복',
      '+44 HP',
      `${healCost}G`
    );
    setUpgradeButtons(
      root,
      'speed',
      battle.score.gold < speedCost,
      '연사',
      `Lv.${ship.attackSpeedLevel}`,
      `${speedCost}G`
    );
    setUpgradeButtons(
      root,
      'power',
      battle.score.gold < powerCost,
      '화력',
      `Lv.${ship.attackPowerLevel}`,
      `${powerCost}G`
    );
    setUpgradeButtons(
      root,
      'projectile',
      projectileMaxed || battle.score.gold < bulletCost,
      '포탄',
      `${ship.projectileCount}발`,
      projectileMaxed ? 'MAX' : `${bulletCost}G`
    );
    setUpgradeButtons(
      root,
      'penetration',
      penetrationMaxed || battle.score.gold < penetrationCost,
      '관통',
      `Lv.${ship.penetrationLevel}`,
      penetrationMaxed ? 'MAX' : `${penetrationCost}G`
    );
    setUpgradeButtons(
      root,
      'explosion',
      explosionMaxed || battle.score.gold < explosionCost,
      '폭발',
      `Lv.${ship.explosionLevel}`,
      explosionMaxed ? 'MAX' : `${explosionCost}G`
    );
    setUpgradeButtons(
      root,
      'hull',
      hullMaxed || battle.score.gold < hullCost,
      '선체',
      `Lv.${ship.hullLevel}`,
      hullMaxed ? 'MAX' : `${hullCost}G`
    );
  }
}

function refreshAllBattleHuds() {
  if (!session) return;
  const previousIndex = currentBattleIndex;
  session.battles.forEach((battle) => {
    battle.hudDirty = true;
    refreshBattleHud(battle.playerIndex);
  });
  setBattleContext(previousIndex);
}

function runBattleActionFromButton(button) {
  if (!button || !session) return false;
  const action = button.dataset.action;
  if (!action || (action === 'quiz' && button.disabled)) return false;
  const battleIndex = getPlayerIndexFromElement(button);
  setBattleContext(battleIndex);
  session.activePlayerIndex = battleIndex;
  const battle = session.battle;
  const ship = battle.ship;
  if (action === 'quiz') {
    openQuizModal(battleIndex);
    return true;
  }
  if (action === 'heal') {
    const cost = getHealCost();
    if (battle.score.gold < cost || ship.hp >= ship.maxHp || isShipRespawning()) {
      refreshBattleHud(battleIndex);
      return false;
    }
    battle.score.gold -= cost;
    ship.goldSpent += cost;
    ship.hp = clamp(ship.hp + 44, 0, ship.maxHp);
    setBattleStatus(`체력 회복 +44 (GOLD -${cost})`, 'success');
  } else if (!runShipUpgrade(action)) {
    refreshBattleHud(battleIndex);
    return false;
  }
  refreshBattleHud(battleIndex);
  return true;
}

function handleBattleAction(event) {
  const quizControl = event.target.closest('[data-choice], [data-quiz-close]');
  if (quizControl && session) {
    event.preventDefault();
    event.stopPropagation();
    const battleIndex = getQuizOwnerIndexFromElement(quizControl);
    if (quizControl.matches('[data-choice]')) {
      submitAnswer(quizControl.dataset.choice || '', battleIndex);
    } else {
      closeQuizModal(battleIndex);
    }
    return;
  }

  const button = event.target.closest('[data-action]');
  if (!button || !session) return;
  if (button === lastPointerActionButton && performance.now() - lastPointerActionAtMs < 650) return;
  runBattleActionFromButton(button);
}

function handleBattlePointerDown(event) {
  const quizControl = event.target.closest('[data-choice], [data-quiz-close]');
  if (quizControl && session) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const battleIndex = getQuizOwnerIndexFromElement(quizControl);
    if (quizControl.matches('[data-choice]')) {
      submitAnswer(quizControl.dataset.choice || '', battleIndex);
    } else {
      closeQuizModal(battleIndex);
    }
    return;
  }

  const button = event.target.closest('[data-action]');
  if (!button || !session || (button.dataset.action === 'quiz' && button.disabled)) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  runBattleActionFromButton(button);
  lastPointerActionButton = button;
  lastPointerActionAtMs = performance.now();
}

function runShipUpgrade(action) {
  const battle = session.battle;
  const ship = battle.ship;
  if (action === 'projectile' && ship.projectileCount >= SHIP_MAX_PROJECTILE_COUNT) return false;
  if (action === 'penetration' && ship.penetrationLevel >= SHIP_MAX_PENETRATION_LEVEL) return false;
  if (action === 'explosion' && ship.explosionLevel >= SHIP_MAX_EXPLOSION_LEVEL) return false;
  if (action === 'hull' && ship.hullLevel >= SHIP_MAX_HULL_LEVEL) return false;
  const costMap = {
    speed: getSpeedUpgradeCost,
    power: getPowerUpgradeCost,
    projectile: getBulletUpgradeCost,
    penetration: getPenetrationUpgradeCost,
    explosion: getExplosionUpgradeCost,
    hull: getHullUpgradeCost
  };
  const getCost = costMap[action];
  if (!getCost) return false;
  const cost = getCost();
  if (battle.score.gold < cost) return false;
  battle.score.gold -= cost;
  ship.goldSpent += cost;

  if (action === 'speed') {
    ship.attackSpeedLevel += 1;
    setBattleStatus(`공격속도 Lv.${ship.attackSpeedLevel} 강화`, 'success');
  } else if (action === 'power') {
    ship.attackPowerLevel += 1;
    ship.attackPower = Math.round(ship.attackPower * (1 + SHIP_ATTACK_POWER_LEVEL_STEP));
    setBattleStatus(`공격력 Lv.${ship.attackPowerLevel} 강화`, 'success');
  } else if (action === 'projectile') {
    ship.projectileLevel += 1;
    ship.projectileCount = Math.min(SHIP_MAX_PROJECTILE_COUNT, ship.projectileCount + 1);
    setBattleStatus(`포탄 수 ${ship.projectileCount}발`, 'success');
  } else if (action === 'penetration') {
    ship.penetrationLevel += 1;
    setBattleStatus(`관통 Lv.${ship.penetrationLevel} 강화`, 'success');
  } else if (action === 'explosion') {
    ship.explosionLevel += 1;
    queueExplosionFrameWarmup(ship.explosionLevel);
    setBattleStatus(`폭발탄 Lv.${ship.explosionLevel} · 범위 ${getShipExplosionRadius()} · 주변 피해 ${Math.round(getShipExplosionDamageRatio() * 100)}%`, 'success');
  } else if (action === 'hull') {
    const hpGain = Math.round(SHIP_HULL_HP_STEP * (1 + ship.hullLevel * 0.08));
    ship.hullLevel += 1;
    ship.maxHp += hpGain;
    ship.hp = Math.min(ship.maxHp, ship.hp + Math.round(hpGain * 0.75));
    setBattleStatus(`선체 강화 · 최대 HP +${hpGain}`, 'success');
  }
  return true;
}

function renderChoiceButton(choice, index, question, battle, playerIndex = currentBattleIndex) {
  const choiceValue = String(choice);
  const hasImageChoice = isQuizImageAsset(choiceValue);
  const isLocked = Boolean(battle?.answerLocked);
  const isAnswer = choiceValue === String(question.answer);
  const isSelected = choiceValue === String(battle?.selectedChoice || '');
  const choiceClasses = ['choice-button'];
  if (hasImageChoice) choiceClasses.push('has-image-choice');
  if (isLocked && isAnswer) {
    choiceClasses.push('is-correct');
  } else if (isLocked && isSelected) {
    choiceClasses.push('is-wrong');
  }
  const choiceBody = hasImageChoice
    ? `<span class="choice-media"><img src="${toQuizImageSrc(escapeHtml(choiceValue))}" alt="선택지 ${index + 1}" /></span>`
    : `<span class="choice-text">${escapeHtml(choiceValue)}</span>`;
  return `
    <button class="${choiceClasses.join(' ')}" type="button" data-choice="${escapeHtml(choiceValue)}" data-player-index="${playerIndex}" data-quiz-owner="${playerIndex}" ${isLocked ? 'disabled' : ''}>
      <span class="choice-index">${index + 1}</span>
      ${choiceBody}
    </button>
  `;
}

function advanceQuestionAfterAnswer(battleIndex = currentBattleIndex) {
  if (!session) return;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }
  setBattleContext(battleIndex);
  nextQuestion(getQuizState(battleIndex));
  refreshBattleHud(battleIndex);
}

function openQuizModal(battleIndex = currentBattleIndex) {
  if (!session || session.endedAt) return;
  setBattleContext(battleIndex);
  session.activePlayerIndex = battleIndex;
  if (isSharedBattleSession()) {
    const quizState = getQuizState(battleIndex);
    if (!quizState) return;
    if (!quizState.quizOpen) {
      startQuizBurst(quizState);
    } else if (!quizState.currentQuestion) {
      nextQuestion(quizState);
    }
    quizState.quizOpen = true;
    updateSharedBattleQuizFlag();
    renderCoopQuizOverlay();
    const openCount = session.playerQuizStates.filter((item) => item.quizOpen).length;
    setBattleStatus(`${openCount}명 퀴즈 풀이 중 · 팀 전장 계속 진행`, '');
    refreshBattleHud(battleIndex);
    return;
  }
  const quizState = getQuizState(battleIndex);
  if (!quizState.quizOpen) {
    startQuizBurst(quizState);
  } else if (!quizState.currentQuestion) {
    nextQuestion(quizState);
  }
  quizState.quizOpen = true;
  renderQuestion(battleIndex);
  setBattleStatus('퀴즈 풀이 중 · 전장 속도 감소', '');
  refreshBattleHud(battleIndex);
}

function closeQuizModal(battleIndex = currentBattleIndex, options = {}) {
  if (!session) {
    elements.questionArea.classList.add('is-hidden');
    elements.questionArea.innerHTML = '';
    return;
  }
  setBattleContext(battleIndex);
  const quizState = getQuizState(battleIndex);
  const completedBurst = Boolean(options.completedBurst);
  if (quizState) {
    quizState.quizOpen = false;
    resetQuizBurst(quizState);
  }
  if (isSharedBattleSession()) {
    updateSharedBattleQuizFlag();
    renderCoopQuizOverlay();
    const openCount = session.playerQuizStates.filter((item) => item.quizOpen).length;
    setBattleStatus(
      openCount > 0 ? `${openCount}명 퀴즈 풀이 중 · 강화/회복 가능` : (completedBurst ? '3문제 완료 · 전장 복귀' : '전장 진행 중'),
      completedBurst ? 'success' : ''
    );
    refreshBattleHud(battleIndex);
    return;
  } else {
    const root = getBattleRoot(battleIndex);
    const layer = $('[data-ref="battle-quiz-layer"]', root);
    if (layer) {
      layer.classList.add('is-hidden');
      layer.innerHTML = '';
    }
  }
  setBattleStatus(completedBurst ? '3문제 완료 · 전장 복귀' : '전장 진행 중', completedBurst ? 'success' : '');
  refreshBattleHud(battleIndex);
}

function showNextQuestionInModal(battleIndex = currentBattleIndex) {
  if (!session) return;
  setBattleContext(battleIndex);
  const quizState = getQuizState(battleIndex);
  if (!quizState?.answerLocked) return;
  clearQuizAutoAdvance(quizState);
  if (quizState.quizBurstAnswered >= QUIZ_BURST_QUESTION_COUNT) {
    closeQuizModal(battleIndex, { completedBurst: true });
    return;
  }
  advanceQuestionAfterAnswer(battleIndex);
  if (!session || session.endedAt) return;
  renderQuizSurface(battleIndex);
}

function renderQuizPlaceholder(player, playerIndex) {
  return `
    <div class="quiz-placeholder-card">
      <span>${playerIndex + 1}P</span>
      <b>${escapeHtml(player?.name || '플레이어')}</b>
      <p>이 칸에서 바로 문제를 풀 수 있습니다.</p>
      <button class="quiz-open-button" type="button" data-action="quiz" data-player-index="${playerIndex}">퀴즈 열기</button>
    </div>
  `;
}

function buildQuizCardHtml(playerIndex = currentBattleIndex) {
  const quizState = getQuizState(playerIndex);
  if (!quizState?.currentQuestion) return '';
  if (!quizState.answerLocked && !quizState.questionStartedAtMs) {
    quizState.questionStartedAtMs = Date.now();
  }
  const question = quizState.currentQuestion;
  const activePlayer = session.players[playerIndex] || getActivePlayer();
  const burstProgress = getQuizBurstProgress(quizState);
  const autoProgressText = getQuizAutoProgressText(quizState);
  const hasQuestionImage = Boolean(question.hasQuestionImage && question.image);
  const hasChoiceImages = question.choices.some(isQuizImageAsset);
  const modalClasses = [
    'quiz-modal-card',
    'battle-quiz-card',
    hasQuestionImage ? 'has-question-image' : 'no-question-image',
    hasChoiceImages ? 'has-choice-images' : 'has-text-choices',
    question.choiceOnlyImageQuestion ? 'choice-only-image-question' : ''
  ];
  const questionBody = question.choiceOnlyImageQuestion
    ? ''
    : (hasQuestionImage
    ? `<div class="question-image-wrap"><img src="${question.image}" alt="${escapeHtml(question.prompt)}" /></div>`
    : `<p class="question-text">${escapeHtml(question.text || question.prompt)}</p>`);

  return `
    <div class="${modalClasses.join(' ')}" data-player-index="${playerIndex}" data-quiz-owner="${playerIndex}" role="dialog" aria-labelledby="quiz-modal-title-${playerIndex}">
      <div class="quiz-modal-head">
        <div class="quiz-title-block">
          <div class="question-kicker">${escapeHtml(activePlayer?.name || '플레이어')} · ${burstProgress.current}/${burstProgress.total}</div>
          <h3 id="quiz-modal-title-${playerIndex}">${escapeHtml(question.prompt || '정답을 고르세요')}</h3>
        </div>
        <button class="quiz-close-button" type="button" data-quiz-close>닫기</button>
      </div>
      <div class="quiz-question-body">
        ${questionBody}
      </div>
      <div class="choice-grid">
        ${question.choices.map((choice, index) => renderChoiceButton(choice, index, question, quizState, playerIndex)).join('')}
      </div>
      <div class="quiz-modal-foot">
        <div class="feedback-line ${quizState.feedbackKind}">${escapeHtml(quizState.feedback)}</div>
        <div class="quiz-actions ${quizState.answerLocked ? '' : 'is-hidden'}">
          <div class="quiz-auto-progress" data-ref="quiz-auto-progress">${escapeHtml(autoProgressText)}</div>
        </div>
      </div>
    </div>
  `;
}

function renderCoopQuizOverlay() {
  if (!session || !isSharedBattleSession()) return;
  const root = getBattleRoot(0);
  if (isTabletFaceToFaceSession()) {
    $$('[data-ref="tablet-player-quiz-layer"]', root).forEach((layer) => {
      const playerIndex = getPlayerIndexFromElement(layer);
      const quizState = getQuizState(playerIndex);
      const isOpen = Boolean(quizState?.quizOpen);
      layer.classList.toggle('is-hidden', !isOpen);
      layer.innerHTML = isOpen ? buildQuizCardHtml(playerIndex) : '';
      $(`.tablet-player-zone[data-player-index="${playerIndex}"]`, root)?.classList.toggle('is-quiz-open', isOpen);
    });
    return;
  }
  const overlay = $('[data-ref="coop-quiz-split-layer"]', root);
  if (!overlay) return;
  const hasOpenQuiz = session.playerQuizStates.some((quizState) => quizState.quizOpen);
  overlay.classList.toggle('is-hidden', !hasOpenQuiz);
  $$('.coop-player-control-card', root).forEach((card) => {
    const playerIndex = getPlayerIndexFromElement(card);
    card.classList.toggle('is-quiz-open', Boolean(getQuizState(playerIndex)?.quizOpen));
  });
  if (!hasOpenQuiz) {
    overlay.innerHTML = '';
    return;
  }
  overlay.innerHTML = `
    <div class="coop-quiz-split-grid player-count-${session.players.length}">
      ${session.players.map((player, index) => {
        const quizState = getQuizState(index);
        const isOpen = Boolean(quizState?.quizOpen);
        return `
          <section class="coop-quiz-split-slot ${isOpen ? 'is-active' : 'is-idle'}" data-player-index="${index}" aria-label="${escapeHtml(player.name)} 퀴즈 화면">
            ${isOpen ? buildQuizCardHtml(index) : ''}
          </section>
        `;
      }).join('')}
    </div>
  `;
}

function renderQuestion(battleIndex = currentBattleIndex) {
  if (!session) return;
  setBattleContext(battleIndex);
  const quizState = getQuizState(battleIndex);
  if (!quizState?.currentQuestion) return;
  if (isSharedBattleSession()) {
    renderCoopQuizOverlay();
    return;
  }
  const root = getBattleRoot(battleIndex);
  const layer = $('[data-ref="battle-quiz-layer"]', root);
  if (!layer) return;
  layer.classList.remove('is-hidden');
  layer.innerHTML = buildQuizCardHtml(battleIndex);
}

function renderPlay() {
  if (!session) return;
  const tabletFace = isTabletFaceToFaceSession();
  syncTabletFaceLayoutBasis();
  document.body.dataset.displayMode = session.displayMode;
  document.body.dataset.displayModeChoice = session.displayModeChoice;
  document.body.dataset.tabletFace = String(tabletFace);
  elements.playTitle.textContent = `거북선 디펜스 · ${session.packLabel} · ${session.modeLabel} · ${session.displayModeLabel} · ${session.players.length}명`;
  elements.questionArea.classList.add('is-hidden');
  elements.questionArea.innerHTML = '';
  updateTimer();
}

function calculateQuizReward(question, battle = session?.battle, quizState = battle) {
  const difficulty = Math.max(1, Number(question?.difficulty) || 1);
  const startedAtMs = quizState?.questionStartedAtMs || battle?.questionStartedAtMs;
  const elapsedSec = startedAtMs
    ? (Date.now() - startedAtMs) / 1000
    : 20;
  const quickBonus = elapsedSec <= 5
    ? 100
    : (elapsedSec <= 10 ? 60 : (elapsedSec <= 16 ? 30 : 0));
  const nextCombo = battle.score.combo + 1;
  const comboMultiplier = 1 + Math.min(QUIZ_COMBO_SCORE_MAX, nextCombo * QUIZ_COMBO_SCORE_STEP);
  const basePoints = QUIZ_SCORE_BASE + difficulty * QUIZ_SCORE_DIFFICULTY_STEP + quickBonus;
  return {
    gold: 5 + difficulty * 2,
    points: Math.round(basePoints * comboMultiplier),
    quickBonus,
    combo: nextCombo,
    comboMultiplier
  };
}

function applyQuizRewards(player, question, correct, quizState = session?.battle) {
  const battle = session.battle;
  battle.score.quizAttempts += 1;
  if (!correct) {
    battle.score.combo = 0;
    player.streak = 0;
    setBattleStatus('오답 · 콤보 초기화, 전장은 계속 진행', 'danger');
    return { gold: 0, points: 0, quickBonus: 0, combo: 0 };
  }
  const reward = calculateQuizReward(question, battle, quizState);
  battle.score.combo = reward.combo;
  battle.score.maxCombo = Math.max(battle.score.maxCombo, battle.score.combo);
  battle.score.points += reward.points;
  battle.score.bonusPoints += reward.quickBonus;
  battle.score.gold += reward.gold;
  battle.score.quizSolved += 1;
  player.score += reward.points;
  player.streak += 1;
  player.maxStreak = Math.max(player.maxStreak, player.streak);
  if (reward.quickBonus > 0) player.quickAnswers += 1;
  player.quizGold += reward.gold;
  const comboText = battle.score.combo >= 2 ? ` · x${battle.score.combo} 콤보` : '';
  const quickText = reward.quickBonus > 0 ? ` · 빠른 보너스 +${reward.quickBonus}` : '';
  setBattleStatus(`정답 · +${reward.points}점${comboText}${quickText}`, 'success');
  return reward;
}

function recordGugudanAnswer(question, choice, correct, quizState) {
  if (!session || session.packId !== 'gugudan' || session.sharedBattle || session.players.length !== 1) return;
  const fact = getGugudanFact(question);
  if (!fact) return;
  const startedAtMs = Number(quizState?.questionStartedAtMs) || 0;
  session.gugudanRecords.push({
    factKey: fact.key,
    dan: fact.dan,
    multiplier: fact.multiplier,
    expression: fact.expression,
    questionText: question.text || '',
    answer: String(question.answer),
    selectedChoice: String(choice),
    correct: Boolean(correct),
    responseMs: startedAtMs ? Math.max(0, Date.now() - startedAtMs) : 0,
    answeredAt: new Date().toISOString()
  });
}

function submitAnswer(choice, battleIndex = currentBattleIndex) {
  if (!session) return;
  setBattleContext(battleIndex);
  const battle = session.battle;
  const quizState = getQuizState(battleIndex);
  if (!quizState?.quizOpen || quizState.answerLocked || !quizState.currentQuestion) return;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }

  session.activePlayerIndex = battleIndex;
  quizState.answerLocked = true;
  quizState.selectedChoice = choice;
  const activePlayer = session.players[battleIndex] || getActivePlayer();
  const correct = choice === String(quizState.currentQuestion.answer);
  recordGugudanAnswer(quizState.currentQuestion, choice, correct, quizState);
  if (correct) {
    activePlayer.correct += 1;
    const reward = applyQuizRewards(activePlayer, quizState.currentQuestion, true, quizState);
    quizState.feedback = `정답 · +${reward.points}점 · GOLD +${reward.gold}`;
    quizState.feedbackKind = 'correct';
  } else {
    activePlayer.wrong += 1;
    applyQuizRewards(activePlayer, quizState.currentQuestion, false, quizState);
    quizState.feedback = '오답 · 보상 없음';
    quizState.feedbackKind = 'wrong';
  }
  quizState.quizBurstAnswered = Math.min(
    QUIZ_BURST_QUESTION_COUNT,
    (Number(quizState.quizBurstAnswered) || 0) + 1
  );

  const root = isSharedBattleSession()
    ? (
      isTabletFaceToFaceSession()
        ? $(`[data-ref="tablet-player-quiz-layer"][data-player-index="${battleIndex}"]`, getBattleRoot(0))
        : $(`.coop-quiz-split-slot[data-player-index="${battleIndex}"]`, getBattleRoot(0))
    ) || getBattleRoot(0)
    : getBattleRoot(battleIndex);
  const layer = isSharedBattleSession() ? root : $('[data-ref="battle-quiz-layer"]', root);
  $$('.choice-button', layer || root).forEach((button) => {
    button.disabled = true;
    if (button.dataset.choice === String(quizState.currentQuestion.answer)) {
      button.classList.add('is-correct');
    } else if (button.dataset.choice === choice) {
      button.classList.add('is-wrong');
    }
  });
  const feedbackLine = $('.feedback-line', layer || root);
  if (feedbackLine) {
    feedbackLine.textContent = quizState.feedback;
    feedbackLine.className = `feedback-line ${quizState.feedbackKind}`;
  }
  $('.quiz-actions', layer || root)?.classList.remove('is-hidden');
  const autoProgress = $('[data-ref="quiz-auto-progress"]', layer || root);
  if (autoProgress) autoProgress.textContent = getQuizAutoProgressText(quizState);
  refreshBattleHud(battleIndex);
  scheduleQuizAutoProgress(battleIndex);
}

function syncCanvasSize(options = {}) {
  if (!battleCanvas || !session) return;
  const battle = session.battle;
  const nowMs = Number(options.nowMs) || performance.now();
  const force = Boolean(options.force);
  if (
    !force
    && battle.canvasWidth > 0
    && nowMs - (Number(battle.lastCanvasSyncMs) || 0) < CANVAS_SYNC_INTERVAL_MS
  ) {
    return;
  }
  battle.lastCanvasSyncMs = nowMs;
  const shell = battleCanvas.closest('.battlefield-shell');
  const slot = shell?.parentElement;
  if (shell && slot) {
    const slotRect = slot.getBoundingClientRect();
    const availableSize = Math.floor(Math.min(slotRect.width || 0, slotRect.height || 0));
    if (availableSize > 0 && (force || Math.abs(availableSize - (Number(battle.canvasShellSize) || 0)) >= 1)) {
      battle.canvasShellSize = availableSize;
      shell.style.width = `${availableSize}px`;
      shell.style.height = `${availableSize}px`;
    }
  }
  const rect = battleCanvas.getBoundingClientRect();
  const size = Math.max(120, Math.round(Math.min(rect.width || 0, rect.height || 0) || rect.width || rect.height || 0));
  const width = size;
  const height = size;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  if (battleCanvas.width !== Math.round(width * dpr) || battleCanvas.height !== Math.round(height * dpr)) {
    battleCanvas.width = Math.round(width * dpr);
    battleCanvas.height = Math.round(height * dpr);
    battleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    session.battle.canvasWidth = width;
    session.battle.canvasHeight = height;
    session.battle.backgroundCache = null;
    session.battle.ship.x = width * 0.5;
    session.battle.ship.y = height * 0.5;
    session.battle.ship.radius = clamp(Math.min(width, height) * 0.07 * SHIP_COLLISION_RADIUS_SCALE, 16, 42);
  }
}

function syncAllCanvasSizes() {
  if (!session) return;
  session.battles.forEach((battle) => {
    withBattleContext(battle.playerIndex, () => syncCanvasSize({ force: true }));
  });
}

function getNextSpawnEventPlan() {
  const battle = session.battle;
  if (!Array.isArray(battle.spawnPlan)) battle.spawnPlan = [];
  if (!Number.isFinite(battle.spawnPlanIndex)) battle.spawnPlanIndex = 0;
  if (battle.spawnPlanIndex >= battle.spawnPlan.length) {
    const random = battle.random?.spawn || Math.random;
    battle.spawnPlan.push(createSpawnEventPlan(random));
  }
  return battle.spawnPlan[battle.spawnPlanIndex++];
}

function getEnemySpawnPoint(radius, plan = null) {
  const battle = session.battle;
  const width = battle.canvasWidth;
  const height = battle.canvasHeight;
  const offset = Math.max(48, Math.round(radius + 24));
  const baseSide = Math.floor(((plan?.sideRoll ?? battleRandom()) || 0) * 4);
  const side = (baseSide + (battle.playerIndex % 4)) % 4;
  const rawLane = 0.08 + ((plan?.laneRoll ?? battleRandom()) || 0) * 0.84;
  const lane = battle.playerIndex % 2 === 0 ? rawLane : 1 - rawLane;
  if (side === 0) return { x: lane * width, y: -offset };
  if (side === 1) return { x: width + offset, y: lane * height };
  if (side === 2) return { x: lane * width, y: height + offset };
  return { x: -offset, y: lane * height };
}

function pickSpawnDefinition(maxTier, preferHigh = false, roll01 = null) {
  const defs = ENEMY_DEFINITIONS.filter((def) => def.tier <= maxTier);
  const totalWeight = defs.reduce((sum, def) => (
    sum + (preferHigh ? (1 + (def.tier - 1) * 0.42) : (1 + (maxTier - def.tier) * 0.35))
  ), 0);
  let roll = ((roll01 ?? battleRandom()) || 0) * totalWeight;
  for (let index = 0; index < defs.length; index += 1) {
    const def = defs[index];
    roll -= preferHigh ? (1 + (def.tier - 1) * 0.42) : (1 + (maxTier - def.tier) * 0.35);
    if (roll <= 0) return def;
  }
  return defs[defs.length - 1] || ENEMY_DEFINITIONS[0];
}

function createEnemyFromDefinition(def, elapsedSec, options = {}) {
  const battle = session.battle;
  const elite = options.elite === true;
  const hardened = options.hardened === true;
  const flowSpeedMul = Number(options.flowSpeedMul) > 0 ? Number(options.flowSpeedMul) : 1;
  const plan = options.plan || null;
  const roleConfig = getEnemyRoleConfig(def.tier);
  const hpScale = 1 + Math.floor(elapsedSec / HP_GROWTH_STEP_SEC) * HP_GROWTH_PER_STEP;
  const speedScale = 1 + Math.floor(elapsedSec / SPEED_GROWTH_STEP_SEC) * SPEED_GROWTH_PER_STEP;
  const touchScale = 1 + Math.floor(elapsedSec / TOUCH_GROWTH_STEP_SEC) * TOUCH_GROWTH_PER_STEP;
  const tierStrengthStep = def.tier - 1;
  let hp = Math.round((def.baseHp + ((plan?.hpRoll ?? battleRandom()) || 0) * 8) * hpScale);
  let speed = (def.baseSpeed + ((plan?.speedRoll ?? battleRandom()) || 0) * 14) * speedScale;
  let touchDamage = Math.round(def.baseTouchDamage * touchScale);
  let renderSize = (def.baseSize + Math.floor(elapsedSec / SIZE_GROWTH_STEP_SEC)) * ENEMY_RENDER_SCALE;

  if (elite) {
    const variant = ENEMY_STRENGTH_VARIANTS.elite;
    const tier10Def = ENEMY_DEFINITIONS[ENEMY_DEFINITIONS.length - 1];
    const tier10Hp = tier10Def.baseHp * hpScale;
    const tier10Speed = tier10Def.baseSpeed * speedScale;
    const tier10TouchDamage = tier10Def.baseTouchDamage * touchScale;
    hp = Math.round(Math.max(
      hp * (variant.hpMulBase + tierStrengthStep * variant.hpMulTierStep),
      tier10Hp * (variant.hpTier10MulBase + tierStrengthStep * variant.hpTier10MulStep)
    ));
    speed = Math.max(
      speed * (variant.speedMulBase + tierStrengthStep * variant.speedMulTierStep),
      tier10Speed * (variant.speedTier10MulBase + tierStrengthStep * variant.speedTier10MulStep)
    );
    touchDamage = Math.round(Math.max(
      touchDamage * (variant.touchMulBase + tierStrengthStep * variant.touchMulTierStep),
      tier10TouchDamage * (variant.touchTier10MulBase + tierStrengthStep * variant.touchTier10MulStep)
    ));
    renderSize = Math.round(
      (renderSize + variant.renderSizeAdd) * (variant.renderSizeMulBase + tierStrengthStep * variant.renderSizeMulTierStep)
    );
  } else {
    const earlyProgress = clamp(elapsedSec / EARLY_EASE_WINDOW_SEC, 0, 1);
    const oneShotTargetHp = Math.max(1, Math.round(battle.ship.attackPower * (0.7 + def.tier * 0.06)));
    hp = Math.max(1, Math.round(hp * earlyProgress + oneShotTargetHp * (1 - earlyProgress)));
    speed *= (0.7 + 0.3 * earlyProgress);
    touchDamage = Math.max(1, Math.round(touchDamage * (0.65 + 0.35 * earlyProgress)));
    if (elapsedSec <= EARLY_ONE_SHOT_WINDOW_SEC && def.tier === 1 && battle.ship.attackPower <= SHIP_BASE_ATTACK_POWER) {
      hp = Math.min(hp, Math.max(1, SHIP_BASE_ATTACK_POWER - 1));
    }
    if (def.tier > 1 && battle.ship.attackPower <= SHIP_BASE_ATTACK_POWER) {
      hp = Math.max(hp, SHIP_BASE_ATTACK_POWER + 2);
    }
  }

  if (hardened && !elite) {
    const variant = ENEMY_STRENGTH_VARIANTS.hardened;
    hp = Math.round(hp * (variant.hpMulBase + tierStrengthStep * variant.hpMulTierStep));
    speed *= variant.speedMul;
    touchDamage = Math.max(1, Math.round(touchDamage * (variant.touchMulBase + tierStrengthStep * variant.touchMulTierStep)));
  }

  if (roleConfig.role === 'swarm') {
    hp = Math.max(12, Math.round(hp * 0.78));
    speed *= 1.2;
  } else if (roleConfig.role === 'charger') {
    speed *= 1.12;
    touchDamage = Math.max(1, Math.round(touchDamage * 1.18));
  } else if (roleConfig.role === 'armored') {
    hp = Math.max(26, Math.round(hp * 1.56));
    speed *= 0.7;
  } else if (roleConfig.role === 'splitter') {
    speed *= 1.04;
  } else if (roleConfig.role === 'commander' || roleConfig.role === 'summoner') {
    hp = Math.max(28, Math.round(hp * 1.2));
    speed *= 0.86;
  }
  speed *= flowSpeedMul;

  const radius = Math.max(12, Math.round(renderSize * (elite ? 0.31 : 0.27) * ENEMY_COLLISION_RADIUS_SCALE));
  const spawnPoint = getEnemySpawnPoint(radius, plan);
  battle.spawnSerial += 1;
  const enemy = acquireEnemy(battle);
  Object.assign(enemy, {
    id: `enemy-${battle.playerIndex}-${battle.spawnSerial}`,
    active: true,
    removed: false,
    tier: def.tier,
    typeCode: def.code,
    typeName: def.name,
    role: roleConfig.role,
    roleLabel: roleConfig.label,
    elite,
    hardened,
    x: spawnPoint.x,
    y: spawnPoint.y,
    radius,
    speed,
    hp,
    maxHp: hp,
    touchDamage,
    renderSize,
    hasBeenVisible: false,
    wobbleSeed: ((plan?.wobbleRoll ?? battleRandom()) || 0) * Math.PI * 2
  });
  return enemy;
}

function shouldSpawnHardenedEnemy(elapsedSec, flow, def, roll01 = null) {
  if (elapsedSec < 45) return false;
  const tierBonus = Math.max(0, def.tier - 1) * 0.008;
  const elapsedBonus = clamp((elapsedSec - 45) / 360, 0, 1) * 0.18;
  const flowBonus = Number(flow?.hardenedBonus) || 0;
  const chance = clamp(0.045 + tierBonus + elapsedBonus + flowBonus, 0.01, 0.42);
  return ((roll01 ?? battleRandom()) || 0) < chance;
}

function spawnEnemy(flow) {
  const battle = session.battle;
  const elapsedSec = battle.waves.elapsedSec;
  const softCap = elapsedSec < 60
    ? EARLY_SOFTCAP_T1
    : (elapsedSec < 140 ? EARLY_SOFTCAP_T2 : (elapsedSec < 240 ? EARLY_SOFTCAP_T3 : 34));
  const cap = Math.max(5, softCap + (Number(flow?.capBonus) || 0) + getLateWavePressure(elapsedSec));
  if (battle.enemies.length >= cap) return;

  const spawnPlan = getNextSpawnEventPlan();
  const burstChance = clamp(0.16 + (elapsedSec / 960) + getLateWavePressure(elapsedSec) * 0.03, 0.16, 0.5);
  const spawnCount = ((spawnPlan?.burstRoll ?? battleRandom()) || 0) < burstChance ? 2 : 1;
  for (let index = 0; index < spawnCount; index += 1) {
    if (battle.enemies.length >= cap) break;
    const enemyPlan = spawnPlan?.enemies?.[index] || null;
    const eliteTier = getEliteUnlockedTier(elapsedSec);
    const elite = shouldSpawnEliteEnemy(elapsedSec, eliteTier, enemyPlan?.eliteRoll);
    const maxTier = elite ? eliteTier : getUnlockedEnemyTier(elapsedSec);
    const def = pickSpawnDefinition(maxTier, elite, enemyPlan?.definitionRoll);
    const enemy = createEnemyFromDefinition(def, elapsedSec, {
      elite,
      hardened: !elite && shouldSpawnHardenedEnemy(elapsedSec, flow, def, enemyPlan?.hardenedRoll),
      flowSpeedMul: Number(flow?.speedMul) || 1,
      plan: enemyPlan
    });
    battle.enemies.push(enemy);
  }
}

function isEnemyTargetable(enemy, battle = session?.battle) {
  if (!enemy || enemy.removed || !battle) return false;
  if (!enemy.hasBeenVisible) return false;
  return isDrawAreaVisible(enemy.x, enemy.y, enemy.radius, battle.canvasWidth, battle.canvasHeight, 2);
}

function getNearestEnemy() {
  const battle = session.battle;
  let nearest = null;
  let nearestDistSq = Number.POSITIVE_INFINITY;
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!isEnemyTargetable(enemy, battle)) continue;
    const distSq = distanceSq(battle.ship.x, battle.ship.y, enemy.x, enemy.y);
    if (distSq < nearestDistSq) {
      nearest = enemy;
      nearestDistSq = distSq;
    }
  }
  return nearest;
}

function getProjectileAngleOffsets(count) {
  const total = Math.max(1, Number(count) || 1);
  if (projectileAngleOffsetCache.has(total)) return projectileAngleOffsetCache.get(total);
  if (total <= 1) {
    projectileAngleOffsetCache.set(total, [0]);
    return projectileAngleOffsetCache.get(total);
  }
  const offsets = [0];
  const maxOffset = total === 2 ? 0.065 : 0.13;
  const sidePairs = Math.ceil((total - 1) / 2);
  const step = maxOffset / Math.max(1, sidePairs);
  for (let level = 1; offsets.length < total; level += 1) {
    const offset = step * level;
    if (offsets.length < total) offsets.push(offset);
    if (offsets.length < total) offsets.push(-offset);
  }
  projectileAngleOffsetCache.set(total, offsets);
  return offsets;
}

function createPooledEnemy(index = 0) {
  return {
    poolIndex: index,
    active: false,
    removed: true,
    id: '',
    tier: 1,
    typeCode: '',
    typeName: '',
    role: '',
    roleLabel: '',
    elite: false,
    hardened: false,
    x: 0,
    y: 0,
    radius: 0,
    speed: 0,
    hp: 0,
    maxHp: 0,
    touchDamage: 0,
    renderSize: 0,
    hasBeenVisible: false,
    wobbleSeed: 0
  };
}

function createEnemyPool(size = ENEMY_POOL_SIZE) {
  return Array.from({ length: size }, (_, index) => createPooledEnemy(index));
}

function acquireEnemy(battle = session?.battle) {
  if (!battle) return createPooledEnemy();
  if (!Array.isArray(battle.enemyPool) || !battle.enemyPool.length) {
    battle.enemyPool = createEnemyPool();
  }
  const pooled = battle.enemyPool.find((enemy) => enemy && !enemy.active);
  if (pooled) return pooled;
  const overflow = createPooledEnemy(battle.enemyPool.length);
  battle.enemyPool.push(overflow);
  return overflow;
}

function createPooledProjectile(index = 0) {
  return {
    poolIndex: index,
    active: false,
    removed: true,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0,
    damage: 0,
    remainingHits: 0,
    explosionLevel: 0,
    explosionRadius: 0,
    explosionDamageRatio: 0,
    trackHits: false,
    hitEnemyIds: []
  };
}

function createProjectilePool(size = PROJECTILE_POOL_SIZE) {
  return Array.from({ length: size }, (_, index) => createPooledProjectile(index));
}

function acquireProjectile(battle = session?.battle) {
  if (!battle) return createPooledProjectile();
  if (!Array.isArray(battle.projectilePool) || !battle.projectilePool.length) {
    battle.projectilePool = createProjectilePool();
  }
  const pooled = battle.projectilePool.find((projectile) => projectile && !projectile.active);
  if (pooled) return pooled;
  const overflow = createPooledProjectile(battle.projectilePool.length);
  battle.projectilePool.push(overflow);
  return overflow;
}

function shootAt(target) {
  const battle = session.battle;
  const count = Math.max(1, battle.ship.projectileCount);
  const baseAngle = Math.atan2(target.y - battle.ship.y, target.x - battle.ship.x);
  const penetrationHits = getShipPenetrationHits();
  const explosionLevel = Math.max(0, battle.ship.explosionLevel);
  const explosionRadius = getShipExplosionRadius();
  const explosionDamageRatio = getShipExplosionDamageRatio();
  getProjectileAngleOffsets(count).forEach((offset) => {
    const angle = baseAngle + offset;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const projectile = acquireProjectile(battle);
    projectile.active = true;
    projectile.removed = false;
    projectile.x = battle.ship.x + cos * 34;
    projectile.y = battle.ship.y + sin * 34;
    projectile.vx = cos * 430;
    projectile.vy = sin * 430;
    projectile.radius = 6.5 + Math.min(2, battle.ship.attackPowerLevel * 0.18);
    projectile.damage = battle.ship.attackPower;
    projectile.remainingHits = penetrationHits;
    projectile.explosionLevel = explosionLevel;
    projectile.explosionRadius = explosionRadius;
    projectile.explosionDamageRatio = explosionDamageRatio;
    projectile.trackHits = penetrationHits > 0;
    projectile.hitEnemyIds.length = 0;
    battle.projectiles.push(projectile);
  });
}

function addKillReward(enemy) {
  const battle = session.battle;
  const tier = Math.max(1, Number(enemy?.tier) || 1);
  const eliteBonus = enemy?.elite ? 2 : 0;
  const isHardened = Boolean(enemy?.hardened && !enemy?.elite);
  const waveBonus = Math.max(0, battle.waves.level - 1) * 3;
  const roleBonus = ['commander', 'summoner', 'armored', 'adaptive'].includes(enemy?.role) ? 35 : 0;
  const variantBonus = enemy?.elite ? (120 + tier * 12) : (isHardened ? 45 : 0);
  const comboMultiplier = 1 + Math.min(KILL_SCORE_COMBO_MAX, battle.score.combo * KILL_SCORE_COMBO_STEP);
  const points = Math.round((KILL_SCORE_BASE + tier * KILL_SCORE_TIER_STEP + waveBonus + roleBonus + variantBonus) * comboMultiplier);
  battle.score.kills += 1;
  battle.score.points += points;
  battle.score.killPoints += points;
  const owner = session.players[battle.playerIndex];
  if (owner) owner.score += points;
  if (isHardened) battle.score.hardenedKills += 1;
  if (enemy?.elite) battle.score.eliteKills += 1;
  battle.score.gold += 2 + tier + eliteBonus;
  battle.hudDirty = true;
  if (enemy?.elite || isHardened) {
    setBattleStatus(`${enemy.elite ? '특수' : '강화'} 적 격퇴 · +${points}점`, 'success');
  }
  if (battle.score.kills % 10 === 0) {
    const rushBonus = 180 + battle.waves.level * 12;
    battle.score.points += rushBonus;
    battle.score.bonusPoints += rushBonus;
    battle.score.gold += 4;
    setBattleStatus(`격퇴 러시 보너스 · +${rushBonus}점 · GOLD +4`, 'success');
  }
}

function applyDamageToEnemy(enemy, rawDamage, fromExplosion = false) {
  let damage = Math.max(1, Math.round(Number(rawDamage) || 0));
  let reduction = 0;
  if (enemy.role === 'armored') reduction += 0.34;
  if (enemy.role === 'adaptive') reduction += 0.18;
  if (enemy.hardened) reduction += 0.08;
  if (fromExplosion && (enemy.role === 'splitter' || enemy.role === 'summoner')) {
    damage = Math.round(damage * 1.28);
  }
  const finalDamage = Math.max(1, Math.round(damage * (1 - clamp(reduction, 0, 0.82))));
  enemy.hp -= finalDamage;
  return enemy.hp <= 0;
}

function markEnemyRemoved(enemy) {
  if (!enemy) return;
  enemy.active = false;
  enemy.removed = true;
}

function removeEnemyAt(_index, enemy) {
  const battle = session?.battle;
  markEnemyRemoved(enemy);
  if (battle) battle.enemiesNeedCompact = true;
}

function compactRemovedEnemies(battle = session?.battle) {
  if (!battle?.enemiesNeedCompact) return;
  battle.enemies = battle.enemies.filter((enemy) => enemy && !enemy.removed);
  battle.enemiesNeedCompact = false;
}

function projectileHasHitEnemy(projectile, enemyId) {
  if (!projectile?.trackHits) return false;
  const hitEnemyIds = projectile?.hitEnemyIds;
  if (!hitEnemyIds) return false;
  if (Array.isArray(hitEnemyIds)) return hitEnemyIds.includes(enemyId);
  return typeof hitEnemyIds.has === 'function' && hitEnemyIds.has(enemyId);
}

function addProjectileHitEnemy(projectile, enemyId) {
  if (!projectile?.trackHits) return;
  const hitEnemyIds = projectile?.hitEnemyIds;
  if (!hitEnemyIds) return;
  if (Array.isArray(hitEnemyIds)) {
    hitEnemyIds.push(enemyId);
  } else if (typeof hitEnemyIds.add === 'function') {
    hitEnemyIds.add(enemyId);
  }
}

function markProjectileRemoved(projectile) {
  if (!projectile) return;
  projectile.active = false;
  projectile.removed = true;
  if (Array.isArray(projectile.hitEnemyIds)) projectile.hitEnemyIds.length = 0;
  projectile.trackHits = false;
  if (session?.battle) session.battle.projectilesNeedCompact = true;
}

function compactRemovedProjectiles(battle = session?.battle) {
  if (!battle?.projectilesNeedCompact) return;
  battle.projectiles = battle.projectiles.filter((projectile) => projectile && !projectile.removed);
  battle.projectilesNeedCompact = false;
}

function buildEnemySpatialGrid(battle) {
  const cellSize = ENEMY_SPATIAL_CELL_SIZE;
  const buckets = new Map();
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const cellX = Math.floor(enemy.x / cellSize);
    const cellY = Math.floor(enemy.y / cellSize);
    const key = `${cellX}:${cellY}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(enemy);
    } else {
      buckets.set(key, [enemy]);
    }
  }
  return { cellSize, buckets };
}

function forEachEnemySpatialCandidate(grid, x, y, radius, callback) {
  if (!grid?.buckets?.size || typeof callback !== 'function') return;
  const cellSize = grid.cellSize || ENEMY_SPATIAL_CELL_SIZE;
  const safeRadius = Math.max(1, Number(radius) || 1);
  const minX = Math.floor((x - safeRadius) / cellSize);
  const maxX = Math.floor((x + safeRadius) / cellSize);
  const minY = Math.floor((y - safeRadius) / cellSize);
  const maxY = Math.floor((y + safeRadius) / cellSize);
  for (let cellY = minY; cellY <= maxY; cellY += 1) {
    for (let cellX = minX; cellX <= maxX; cellX += 1) {
      const bucket = grid.buckets.get(`${cellX}:${cellY}`);
      if (!bucket) continue;
      for (let index = 0; index < bucket.length; index += 1) {
        callback(bucket[index]);
      }
    }
  }
}

function createPooledExplosionEffect(index = 0) {
  return {
    poolIndex: index,
    id: '',
    type: 'explosion',
    active: false,
    removed: true,
    x: 0,
    y: 0,
    radius: 0,
    level: 1,
    damage: 0,
    startedAtMs: 0,
    durationMs: SHIP_EXPLOSION_EFFECT_MS,
    seed: 0
  };
}

function createEffectPool(size = EXPLOSION_EFFECT_POOL_SIZE) {
  return Array.from({ length: size }, (_, index) => createPooledExplosionEffect(index));
}

function countActiveEffects(battle = session?.battle) {
  if (!Array.isArray(battle?.effects)) return 0;
  let count = 0;
  for (let index = 0; index < battle.effects.length; index += 1) {
    const effect = battle.effects[index];
    if (effect && effect.active && !effect.removed) count += 1;
  }
  return count;
}

function markEffectRemoved(effect, battle = session?.battle) {
  if (!effect) return;
  effect.active = false;
  effect.removed = true;
  if (battle) battle.effectsNeedCompact = true;
}

function compactRemovedEffects(battle = session?.battle) {
  if (!battle?.effectsNeedCompact) return;
  battle.effects = battle.effects.filter((effect) => effect && effect.active && !effect.removed);
  battle.effectsNeedCompact = false;
}

function acquireExplosionEffect(battle = session?.battle) {
  if (!battle) return null;
  if (!Array.isArray(battle.effects)) battle.effects = [];
  if (!Array.isArray(battle.effectPool) || !battle.effectPool.length) {
    battle.effectPool = createEffectPool();
  }

  const reusableRemoved = battle.effects.find((effect) => effect && effect.removed);
  if (reusableRemoved) return reusableRemoved;

  if (battle.effects.length >= MAX_ACTIVE_BATTLE_EFFECTS) {
    const recycleIndex = clamp(Math.round(Number(battle.effectRecycleIndex) || 0), 0, Math.max(0, battle.effects.length - 1));
    battle.effectRecycleIndex = (recycleIndex + 1) % Math.max(1, battle.effects.length);
    return battle.effects[recycleIndex] || battle.effectPool[0] || null;
  }

  const pooled = battle.effectPool.find((effect) => effect && !effect.active);
  if (pooled) {
    battle.effects.push(pooled);
    return pooled;
  }

  return battle.effects[0] || null;
}

function addExplosionEffect(x, y, radius, level = 1, damage = 0) {
  const battle = session?.battle;
  if (!battle || radius <= 0) return;
  const effect = acquireExplosionEffect(battle);
  if (!effect) return;
  battle.effectSerial += 1;
  effect.id = `explosion-${battle.playerIndex}-${battle.effectSerial}`;
  effect.type = 'explosion';
  effect.active = true;
  effect.removed = false;
  effect.x = x;
  effect.y = y;
  effect.radius = radius;
  effect.level = Math.max(1, Number(level) || 1);
  effect.damage = Math.max(0, Math.round(Number(damage) || 0));
  effect.startedAtMs = performance.now();
  effect.durationMs = SHIP_EXPLOSION_EFFECT_MS;
  effect.seed = battleRandom();
}

function applyProjectileExplosion(projectile, sourceEnemyId, enemyGrid = null) {
  const battle = session.battle;
  const radius = Math.max(0, Number(projectile?.explosionRadius) || 0);
  const damageRatio = clamp(Number(projectile?.explosionDamageRatio) || 0, 0, 1);
  if (radius <= 0 || damageRatio <= 0) return;
  const impactX = Number(projectile?.x) || 0;
  const impactY = Number(projectile?.y) || 0;
  const splashDamage = Math.max(1, Math.round((Number(projectile?.damage) || 0) * damageRatio));
  const explosionLevel = Math.max(1, Number(projectile?.explosionLevel) || 1);
  addExplosionEffect(impactX, impactY, radius, explosionLevel, splashDamage);
  const applySplashToEnemy = (enemy) => {
    if (!enemy || enemy.removed || enemy.id === sourceEnemyId) return;
    const maxDistance = radius + enemy.radius;
    const centerDistanceSq = distanceSq(impactX, impactY, enemy.x, enemy.y);
    if (centerDistanceSq > maxDistance * maxDistance) return;
    const centerDistance = Math.sqrt(centerDistanceSq);
    const edgeDistance = Math.max(0, centerDistance - enemy.radius);
    if (edgeDistance > radius) return;
    const falloff = 1 - clamp(edgeDistance / Math.max(1, radius), 0, 1);
    const explosionDamage = Math.max(1, Math.round(splashDamage * (0.48 + falloff * 0.52)));
    const vectorLength = Math.max(0.0001, centerDistance);
    const knockback = (8 + explosionLevel * 2.6) * (0.3 + falloff * 0.64);
    enemy.x += ((enemy.x - impactX) / vectorLength) * knockback;
    enemy.y += ((enemy.y - impactY) / vectorLength) * knockback;
    if (applyDamageToEnemy(enemy, explosionDamage, true)) {
      removeEnemyAt(-1, enemy);
      addKillReward(enemy);
    }
  };
  if (enemyGrid) {
    forEachEnemySpatialCandidate(enemyGrid, impactX, impactY, radius + 80, applySplashToEnemy);
  } else {
    for (let index = battle.enemies.length - 1; index >= 0; index -= 1) {
      applySplashToEnemy(battle.enemies[index]);
    }
  }
}

function triggerHullShockwave(touchEnemy, touchDamage) {
  const battle = session.battle;
  const hullLevel = Math.max(0, Number(battle.ship.hullLevel) || 0);
  if (hullLevel <= 0) return;
  const radius = battle.ship.radius + 30 + hullLevel * 7;
  const baseDamage = Math.max(4, Math.round((Number(touchDamage) || 0) * 0.14 + hullLevel * 1.8));
  for (let index = battle.enemies.length - 1; index >= 0; index -= 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed || enemy.id === touchEnemy?.id) continue;
    const maxDistance = radius + enemy.radius;
    const distSq = distanceSq(battle.ship.x, battle.ship.y, enemy.x, enemy.y);
    if (distSq > maxDistance * maxDistance) continue;
    const dist = Math.sqrt(distSq);
    if (dist > radius + enemy.radius) continue;
    const falloff = 1 - clamp(dist / Math.max(radius, 1), 0, 0.78);
    const shockDamage = Math.max(1, Math.round(baseDamage * Math.max(0.3, falloff)));
    const dx = enemy.x - battle.ship.x;
    const dy = enemy.y - battle.ship.y;
    const vectorLength = Math.max(0.0001, Math.hypot(dx, dy));
    enemy.x += (dx / vectorLength) * (14 + hullLevel * 3);
    enemy.y += (dy / vectorLength) * (14 + hullLevel * 3);
    if (applyDamageToEnemy(enemy, shockDamage)) {
      removeEnemyAt(index, enemy);
      addKillReward(enemy);
    }
  }
}

function isShipRespawning(nowMs = performance.now()) {
  return Boolean(session?.battle?.ship?.respawnUntilMs) && Number(session.battle.ship.respawnUntilMs) > Number(nowMs);
}

function isShipInvulnerable(nowMs = performance.now()) {
  return Number(session?.battle?.ship?.invulnerableUntilMs || 0) > Number(nowMs);
}

function clearBattlefieldForRespawn(battle = session?.battle) {
  if (!battle) return 0;
  const clearedEnemies = Array.isArray(battle.enemies)
    ? battle.enemies.filter((enemy) => enemy && !enemy.removed).length
    : 0;
  if (Array.isArray(battle.enemies)) {
    battle.enemies.forEach((enemy) => markEnemyRemoved(enemy));
  }
  battle.enemies = [];
  battle.enemiesNeedCompact = false;
  if (Array.isArray(battle.projectiles)) {
    battle.projectiles.forEach((projectile) => markProjectileRemoved(projectile));
  }
  battle.projectiles = [];
  battle.projectilesNeedCompact = false;
  if (Array.isArray(battle.effects)) {
    battle.effects.forEach((effect) => markEffectRemoved(effect, battle));
    compactRemovedEffects(battle);
  }
  return clearedEnemies;
}

function applyShipDeathScorePenalty(battle = session?.battle) {
  if (!battle) return 0;
  const currentPoints = Math.max(0, Math.round(Number(battle.score.points) || 0));
  if (currentPoints <= 0) return 0;
  const scaledPenalty = Math.round(currentPoints * BATTLESHIP_DEFEAT_PENALTY_SCORE_RATIO);
  const wavePenalty = Math.max(1, Math.round(Number(battle.waves.level) || 1)) * BATTLESHIP_DEFEAT_PENALTY_WAVE_STEP;
  const penalty = Math.min(currentPoints, Math.max(BATTLESHIP_DEFEAT_PENALTY_MIN, scaledPenalty, wavePenalty));
  battle.score.points = Math.max(0, currentPoints - penalty);
  if (!isSharedBattleSession()) {
    const owner = session.players[battle.playerIndex];
    if (owner) owner.score = Math.max(0, Math.round(Number(owner.score) || 0) - penalty);
  }
  battle.hudDirty = true;
  return penalty;
}

function triggerShipRespawn(nowMs = performance.now()) {
  const battle = session.battle;
  const ship = battle.ship;
  const clearedEnemies = clearBattlefieldForRespawn(battle);
  const penalty = applyShipDeathScorePenalty(battle);
  ship.hp = 0;
  ship.deathCount += 1;
  ship.respawnUntilMs = nowMs + BATTLESHIP_RESPAWN_DELAY_MS;
  ship.invulnerableUntilMs = 0;
  battle.nextSpawnMs = BATTLESHIP_RESPAWN_DELAY_MS + BATTLESHIP_DEFEAT_SPAWN_RESTART_MS;
  battle.nextShotMs = battle.worldElapsedMs + BATTLESHIP_RESPAWN_DELAY_MS;
  battle.defeatFlashUntilMs = nowMs + BATTLESHIP_DEFEAT_FLASH_MS;
  battle.lastDeathPenalty = penalty;
  battle.lastDeathClearedEnemies = clearedEnemies;
  const penaltyText = penalty > 0 ? ` · 점수 -${penalty.toLocaleString('ko-KR')}` : '';
  const clearText = clearedEnemies > 0 ? ` · 적 ${clearedEnemies} 싹쓸이` : ' · 전장 정리';
  setBattleStatus(`거북선 격침${penaltyText}${clearText} · ${Math.ceil(BATTLESHIP_RESPAWN_DELAY_MS / 1000)}초 재정비`, 'danger');
}

function completeShipRespawn(nowMs = performance.now()) {
  const ship = session.battle.ship;
  if (!ship.respawnUntilMs || ship.respawnUntilMs > nowMs) return;
  ship.respawnUntilMs = 0;
  ship.invulnerableUntilMs = nowMs + BATTLESHIP_RESPAWN_INVULN_MS;
  ship.hp = ship.maxHp;
  session.battle.nextShotMs = session.battle.worldElapsedMs + 300;
  session.battle.nextSpawnMs = BATTLESHIP_DEFEAT_SPAWN_RESTART_MS;
  setBattleStatus('재정비 완료 · 다시 전투 참여', 'success');
}

function updateBattle(dtSec, nowMs) {
  if (!session || session.endedAt) return;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }
  syncCanvasSize({ nowMs });
  const battle = session.battle;
  const ship = battle.ship;
  const worldDtSec = battle.quizOpen ? dtSec * BATTLE_QUIZ_WORLD_SLOW_RATIO : dtSec;

  completeShipRespawn(nowMs);
  battle.worldElapsedMs += worldDtSec * 1000;
  battle.waves.elapsedSec += worldDtSec;
  battle.waves.level = 1 + Math.floor(battle.waves.elapsedSec / 20);
  battle.spawnCooldownMs = Math.max(
    SPAWN_MIN_COOLDOWN_MS,
    SPAWN_START_COOLDOWN_MS - battle.waves.elapsedSec * SPAWN_DECAY_PER_SEC
  );
  battle.flow = getFlowState(battle.waves.elapsedSec);
  const activeSpawnCooldown = clamp(
    battle.spawnCooldownMs * battle.flow.spawnCooldownMul,
    Math.max(280, SPAWN_MIN_COOLDOWN_MS * 0.55),
    SPAWN_START_COOLDOWN_MS * 1.75
  );
  if (isShipRespawning(nowMs)) {
    battle.nextSpawnMs = Math.max(battle.nextSpawnMs, BATTLESHIP_DEFEAT_SPAWN_RESTART_MS);
  } else {
    battle.nextSpawnMs -= worldDtSec * 1000;
    while (battle.nextSpawnMs <= 0) {
      spawnEnemy(battle.flow);
      battle.nextSpawnMs += activeSpawnCooldown;
    }
  }

  if (!isShipRespawning(nowMs) && battle.worldElapsedMs >= battle.nextShotMs) {
    const nearestEnemy = getNearestEnemy();
    if (nearestEnemy) {
      shootAt(nearestEnemy);
      battle.nextShotMs = battle.worldElapsedMs + getAttackCooldownMs();
    }
  }

  let enemyGrid = buildEnemySpatialGrid(battle);
  for (let index = battle.projectiles.length - 1; index >= 0; index -= 1) {
    const projectile = battle.projectiles[index];
    if (!projectile || projectile.removed) continue;
    projectile.x += projectile.vx * worldDtSec;
    projectile.y += projectile.vy * worldDtSec;
    if (
      projectile.x < -30
      || projectile.x > battle.canvasWidth + 30
      || projectile.y < -30
      || projectile.y > battle.canvasHeight + 30
    ) {
      markProjectileRemoved(projectile);
      continue;
    }
    let hit = false;
    let hitEnemy = null;
    let hitEnemyDistanceSq = Number.POSITIVE_INFINITY;
    forEachEnemySpatialCandidate(enemyGrid, projectile.x, projectile.y, projectile.radius + 80, (enemy) => {
      if (!enemy || enemy.removed || projectileHasHitEnemy(projectile, enemy.id)) return;
      const hitRadius = projectile.radius + enemy.radius;
      const projectileDistanceSq = distanceSq(projectile.x, projectile.y, enemy.x, enemy.y);
      if (projectileDistanceSq > hitRadius * hitRadius || projectileDistanceSq >= hitEnemyDistanceSq) return;
      hitEnemy = enemy;
      hitEnemyDistanceSq = projectileDistanceSq;
    });
    if (hitEnemy) {
      addProjectileHitEnemy(projectile, hitEnemy.id);
      const killed = applyDamageToEnemy(hitEnemy, projectile.damage);
      applyProjectileExplosion(projectile, hitEnemy.id, enemyGrid);
      if (killed) {
        removeEnemyAt(-1, hitEnemy);
        addKillReward(hitEnemy);
      }
      if (projectile.remainingHits > 0) {
        projectile.remainingHits -= 1;
        projectile.damage = Math.max(1, Math.round(projectile.damage * SHIP_PENETRATION_DAMAGE_FALLOFF));
      } else {
        hit = true;
      }
    }
    if (hit) markProjectileRemoved(projectile);
  }
  compactRemovedProjectiles(battle);
  compactRemovedEnemies(battle);

  for (let index = battle.effects.length - 1; index >= 0; index -= 1) {
    const effect = battle.effects[index];
    if (!effect || effect.removed || !effect.active) continue;
    const durationMs = Math.max(1, Number(effect?.durationMs) || 1);
    if (nowMs - (Number(effect?.startedAtMs) || 0) >= durationMs) {
      markEffectRemoved(effect, battle);
    }
  }
  compactRemovedEffects(battle);

  for (let index = battle.enemies.length - 1; index >= 0; index -= 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const shipDx = ship.x - enemy.x;
    const shipDy = ship.y - enemy.y;
    const shipDistanceSq = shipDx * shipDx + shipDy * shipDy;
    const baseAngle = Math.atan2(shipDy, shipDx);
    let angle = baseAngle;
    if (enemy.role === 'swarm' || enemy.role === 'splitter') {
      angle += Math.sin(battle.worldElapsedMs * 0.004 + enemy.wobbleSeed) * 0.42;
    }
    let speedMultiplier = 1;
    if (enemy.role === 'swarm') speedMultiplier *= 1.1;
    if (enemy.role === 'armored') speedMultiplier *= 0.94;
    if (enemy.role === 'charger' && shipDistanceSq < 165 * 165) speedMultiplier *= 1.7;
    enemy.x += Math.cos(angle) * enemy.speed * speedMultiplier * worldDtSec;
    enemy.y += Math.sin(angle) * enemy.speed * speedMultiplier * worldDtSec;

    const viewportMargin = enemy.radius + 6;
    if (
      enemy.x >= -viewportMargin
      && enemy.x <= battle.canvasWidth + viewportMargin
      && enemy.y >= -viewportMargin
      && enemy.y <= battle.canvasHeight + viewportMargin
    ) {
      enemy.hasBeenVisible = true;
    }
    if (!enemy.hasBeenVisible) continue;
    const touchRadius = enemy.radius + ship.radius;
    if (distanceSq(enemy.x, enemy.y, ship.x, ship.y) > touchRadius * touchRadius) continue;
    if (isShipRespawning(nowMs) || isShipInvulnerable(nowMs)) continue;
    const touchDamage = Math.max(
      1,
      Math.round(enemy.touchDamage * 3 * (1 - getShipDamageReductionRatio()))
    );
    ship.hp = Math.max(0, ship.hp - touchDamage);
    removeEnemyAt(index, enemy);
    triggerHullShockwave(enemy, touchDamage);
    setBattleStatus(`거북선 피격 · HP -${touchDamage}`, 'danger');
    if (ship.hp <= 0) triggerShipRespawn(nowMs);
  }
  compactRemovedEnemies(battle);

  refreshBattleHud(currentBattleIndex, { passive: true, nowMs });
}

function drawStaticBattleBackground(ctx, width, height) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#d2f0ff');
  sky.addColorStop(0.42, '#eefaff');
  sky.addColorStop(0.43, '#6daed4');
  sky.addColorStop(1, '#145f87');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255,255,255,0.42)';
  for (let y = height * 0.5; y < height; y += 24) {
    const offset = y % 64;
    for (let x = -64; x < width + 64; x += 92) {
      ctx.beginPath();
      ctx.ellipse(x + offset, y, 28, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function createBattleBackgroundCache(width, height) {
  const cacheWidth = Math.max(1, Math.round(width));
  const cacheHeight = Math.max(1, Math.round(height));
  const canvas = document.createElement('canvas');
  canvas.width = cacheWidth;
  canvas.height = cacheHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  drawStaticBattleBackground(ctx, cacheWidth, cacheHeight);
  return {
    canvas,
    width: cacheWidth,
    height: cacheHeight
  };
}

function drawBackground(ctx, width, height, battle = session?.battle) {
  const cacheWidth = Math.max(1, Math.round(width));
  const cacheHeight = Math.max(1, Math.round(height));
  if (battle) {
    const cache = battle.backgroundCache;
    if (!cache || cache.width !== cacheWidth || cache.height !== cacheHeight) {
      battle.backgroundCache = createBattleBackgroundCache(cacheWidth, cacheHeight);
    }
    if (battle.backgroundCache?.canvas) {
      ctx.drawImage(battle.backgroundCache.canvas, 0, 0, width, height);
      return;
    }
  }
  drawStaticBattleBackground(ctx, width, height);
}

function getBattleVisualScale(battle = session?.battle) {
  const width = Number(battle?.canvasWidth) || 0;
  const height = Number(battle?.canvasHeight) || 0;
  const mapSize = Math.min(width, height);
  if (!mapSize) return 1;
  return clamp(mapSize / 420, 0.46, 1);
}

function drawHpBar(ctx, x, y, width, hp, maxHp, color, height = 6) {
  const ratio = maxHp > 0 ? clamp(hp / maxHp, 0, 1) : 0;
  ctx.fillStyle = 'rgba(16, 24, 39, 0.28)';
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width * ratio, height);
}

function getShipHpTone(ratio) {
  if (ratio <= 0.22) return {
    fill: '#dc2626',
    glow: 'rgba(220,38,38,0.36)',
    label: '위험'
  };
  if (ratio <= 0.48) return {
    fill: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    label: '주의'
  };
  return {
    fill: '#22c55e',
    glow: 'rgba(34,197,94,0.28)',
    label: '안정'
  };
}

function drawShipHpGauge(ctx, ship, width) {
  const ratio = ship.maxHp > 0 ? clamp(ship.hp / ship.maxHp, 0, 1) : 0;
  const tone = getShipHpTone(ratio);
  const visualScale = getBattleVisualScale();
  const compact = width < 360;
  const margin = Math.round(compact ? clamp(12 * visualScale, 7, 12) : 0);
  const barWidth = compact
    ? Math.max(88, width - margin * 2)
    : clamp(width * 0.56, 240, 440);
  const barHeight = Math.round(clamp(22 * visualScale, 10, 22));
  const frameHeight = Math.round(clamp(52 * visualScale, 28, 52));
  const frameRadius = Math.round(clamp(8 * visualScale, 5, 8));
  const innerPad = Math.round(clamp(4 * visualScale, 2, 4));
  const labelFontSize = Math.round(clamp(13 * visualScale, 8, 13));
  const toneFontSize = Math.round(clamp(11 * visualScale, 7, 11));
  const x = (width - barWidth) / 2;
  const y = Math.round(clamp(15 * visualScale, 6, 15));
  const fillWidth = Math.max(0, (barWidth - innerPad * 2) * ratio);
  const textY = y + Math.round(clamp(14 * visualScale, 8, 14));
  const barY = y + Math.round(clamp(25 * visualScale, 16, 25));
  ctx.save();
  ctx.shadowColor = tone.glow;
  ctx.shadowBlur = (ratio <= 0.22 ? 18 : 10) * visualScale;
  ctx.fillStyle = 'rgba(5, 18, 35, 0.82)';
  ctx.beginPath();
  ctx.roundRect(x, y, barWidth, frameHeight, frameRadius);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#e0f2fe';
  ctx.font = `900 ${labelFontSize}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('거북선 내구도', x + Math.round(clamp(14 * visualScale, 8, 14)), textY);
  ctx.textAlign = 'right';
  ctx.fillText(`${Math.max(0, Math.round(ship.hp))} / ${ship.maxHp}`, x + barWidth - Math.round(clamp(14 * visualScale, 8, 14)), textY);

  ctx.fillStyle = 'rgba(226, 232, 240, 0.28)';
  ctx.beginPath();
  ctx.roundRect(x + innerPad, barY, barWidth - innerPad * 2, barHeight, Math.round(clamp(7 * visualScale, 4, 7)));
  ctx.fill();
  ctx.fillStyle = tone.fill;
  ctx.beginPath();
  ctx.roundRect(x + innerPad, barY, fillWidth, barHeight, Math.round(clamp(7 * visualScale, 4, 7)));
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.58)';
  ctx.lineWidth = clamp(2 * visualScale, 1, 2);
  ctx.beginPath();
  ctx.roundRect(x + innerPad, barY, barWidth - innerPad * 2, barHeight, Math.round(clamp(7 * visualScale, 4, 7)));
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.88)';
  ctx.font = `900 ${toneFontSize}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(tone.label, x + barWidth / 2, barY + barHeight / 2);
  ctx.restore();
}

function drawShip(ctx, ship, nowMs) {
  const invulnerable = isShipInvulnerable(nowMs);
  const respawning = isShipRespawning(nowMs);
  const mapSize = Math.min(session.battle.canvasWidth, session.battle.canvasHeight);
  const longEdge = clamp(mapSize * 0.24 * SHIP_RENDER_SCALE, 31, 114);
  const drawHeight = longEdge;
  const drawWidth = drawHeight * (SHIP_SPRITE_CROP.width / SHIP_SPRITE_CROP.height);
  ctx.save();
  ctx.globalAlpha = respawning ? 0.26 : (invulnerable ? 0.62 + Math.sin(nowMs * 0.02) * 0.2 : 1);
  ctx.shadowColor = 'rgba(9, 24, 56, 0.28)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;
  if (shipImage.complete && shipImage.naturalWidth) {
    ctx.drawImage(
      shipImage,
      SHIP_SPRITE_CROP.x,
      SHIP_SPRITE_CROP.y,
      SHIP_SPRITE_CROP.width,
      SHIP_SPRITE_CROP.height,
      ship.x - drawWidth / 2,
      ship.y - drawHeight / 2,
      drawWidth,
      drawHeight
    );
  } else {
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.ellipse(ship.x, ship.y, drawWidth * 0.52, drawHeight * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function getDrawSizeByLongEdge(image, longEdge) {
  const naturalWidth = Number(image?.naturalWidth) || 0;
  const naturalHeight = Number(image?.naturalHeight) || 0;
  if (!naturalWidth || !naturalHeight) return null;
  const scale = Number(longEdge) / Math.max(naturalWidth, naturalHeight);
  return {
    width: naturalWidth * scale,
    height: naturalHeight * scale
  };
}

function getEnemyVariantVisual(enemy) {
  if (enemy?.elite) {
    const base = ENEMY_STRENGTH_VARIANTS.elite.visual;
    const isMaxElite = getEliteUnlockedTier(session?.battle?.waves?.elapsedSec || 0) >= 10;
    return {
      ...base,
      ...(isMaxElite ? base.max : null),
      cacheKey: isMaxElite ? 'elite-max' : 'elite'
    };
  }
  if (enemy?.hardened) {
    return {
      ...ENEMY_STRENGTH_VARIANTS.hardened.visual,
      cacheKey: 'hardened'
    };
  }
  return null;
}

function getEnemyVariantCacheKey(image, purpose, detail) {
  const imageKey = image?.currentSrc || image?.src || `${image?.naturalWidth || 0}x${image?.naturalHeight || 0}`;
  return `${imageKey}:${purpose}:${detail}`;
}

function getTintedEnemySprite(image, style) {
  const tintLayers = Array.isArray(style?.tintLayers) ? style.tintLayers : [];
  if (!image || !image.naturalWidth || !image.naturalHeight || !tintLayers.length) return image;
  const cacheKey = getEnemyVariantCacheKey(image, 'tint', `${style.cacheKey}:${tintLayers.join('|')}`);
  const cached = enemyVariantSpriteCache.get(cacheKey);
  if (cached) return cached;

  const offscreen = document.createElement('canvas');
  offscreen.width = image.naturalWidth;
  offscreen.height = image.naturalHeight;
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return image;
  offCtx.drawImage(image, 0, 0);
  tintLayers.forEach((fillStyle) => {
    offCtx.globalCompositeOperation = 'source-atop';
    offCtx.fillStyle = fillStyle;
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  });
  offCtx.globalCompositeOperation = 'source-over';
  enemyVariantSpriteCache.set(cacheKey, offscreen);
  return offscreen;
}

function getEnemySilhouetteSprite(image, color) {
  if (!image || !image.naturalWidth || !image.naturalHeight || !color) return null;
  const cacheKey = getEnemyVariantCacheKey(image, 'silhouette', color);
  const cached = enemyVariantSpriteCache.get(cacheKey);
  if (cached) return cached;

  const offscreen = document.createElement('canvas');
  offscreen.width = image.naturalWidth;
  offscreen.height = image.naturalHeight;
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return null;
  offCtx.drawImage(image, 0, 0);
  offCtx.globalCompositeOperation = 'source-in';
  offCtx.fillStyle = color;
  offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  offCtx.globalCompositeOperation = 'source-over';
  enemyVariantSpriteCache.set(cacheKey, offscreen);
  return offscreen;
}

function drawEnemySilhouetteOutline(ctx, image, x, y, width, height, color, offset) {
  const silhouette = getEnemySilhouetteSprite(image, color);
  if (!silhouette) return;
  const offsets = [
    [-offset, 0],
    [offset, 0],
    [0, -offset],
    [0, offset],
    [-offset * 0.72, -offset * 0.72],
    [offset * 0.72, -offset * 0.72],
    [-offset * 0.72, offset * 0.72],
    [offset * 0.72, offset * 0.72]
  ];
  offsets.forEach(([dx, dy]) => {
    ctx.drawImage(silhouette, x + dx, y + dy, width, height);
  });
}

function getEnemyOutlineOffsets(offset) {
  return [
    [-offset, 0],
    [offset, 0],
    [0, -offset],
    [0, offset],
    [-offset * 0.72, -offset * 0.72],
    [offset * 0.72, -offset * 0.72],
    [-offset * 0.72, offset * 0.72],
    [offset * 0.72, offset * 0.72]
  ];
}

function drawCompositeOutline(ctx, image, color, x, y, width, height, offset) {
  const silhouette = getEnemySilhouetteSprite(image, color);
  if (!silhouette) return;
  getEnemyOutlineOffsets(offset).forEach(([dx, dy]) => {
    ctx.drawImage(silhouette, x + dx, y + dy, width, height);
  });
}

function getCompositeEnemySprite(image, style) {
  if (!image || !image.naturalWidth || !image.naturalHeight || !style) return null;
  const keyParts = [
    style.cacheKey || 'variant',
    style.outline || '',
    style.outerOutline || '',
    ...(Array.isArray(style.tintLayers) ? style.tintLayers : [])
  ];
  const cacheKey = getEnemyVariantCacheKey(image, 'composite', keyParts.join('|'));
  const cached = enemyVariantSpriteCache.get(cacheKey);
  if (cached) return cached;

  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const pad = Math.ceil(Math.max(width, height) * 0.08);
  const offscreen = document.createElement('canvas');
  offscreen.width = width + pad * 2;
  offscreen.height = height + pad * 2;
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return null;

  if (style.outerOutline) {
    drawCompositeOutline(offCtx, image, style.outerOutline, pad, pad, width, height, Math.max(1.5, width * 0.055));
  }
  if (style.outline) {
    drawCompositeOutline(offCtx, image, style.outline, pad, pad, width, height, Math.max(1, width * 0.033));
  }
  offCtx.drawImage(getTintedEnemySprite(image, style), pad, pad, width, height);

  const result = {
    image: offscreen,
    padX: pad / width,
    padY: pad / height
  };
  enemyVariantSpriteCache.set(cacheKey, result);
  return result;
}

function drawEnemyVariantAura(ctx, enemy, width, height, style, nowMs) {
  if (!style?.aura) return;
  const pulse = (Math.sin(nowMs * 0.008 + enemy.wobbleSeed) + 1) * 0.5;
  ctx.save();
  ctx.fillStyle = style.aura;
  ctx.beginPath();
  ctx.ellipse(
    enemy.x,
    enemy.y + height * 0.08,
    width * (0.58 + pulse * 0.08),
    height * (0.48 + pulse * 0.06),
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.restore();
}

function getEnemyHpColor(enemy, variantStyle) {
  if (variantStyle?.hpColor) return variantStyle.hpColor;
  if (enemy.role === 'commander') return '#f59e0b';
  if (enemy.role === 'summoner') return '#60a5fa';
  if (enemy.role === 'charger') return '#fb923c';
  if (enemy.role === 'armored' || enemy.role === 'adaptive') return '#a78bfa';
  if (enemy.role === 'splitter') return '#fbbf24';
  return '#f97316';
}

function getEnemyBadge(enemy, variantStyle) {
  if (variantStyle?.label) {
    return {
      text: variantStyle.label,
      fill: variantStyle.fill,
      stroke: variantStyle.stroke,
      color: variantStyle.color
    };
  }
  if (enemy.role === 'commander') {
    return { text: '지휘', fill: 'rgba(120, 53, 15, 0.9)', stroke: 'rgba(253, 230, 138, 0.58)', color: '#fef3c7' };
  }
  if (enemy.role === 'summoner') {
    return { text: '소환', fill: 'rgba(30, 58, 138, 0.9)', stroke: 'rgba(191, 219, 254, 0.52)', color: '#dbeafe' };
  }
  if (enemy.role === 'charger') {
    return { text: '돌진', fill: 'rgba(124, 45, 18, 0.88)', stroke: 'rgba(254, 215, 170, 0.48)', color: '#ffedd5' };
  }
  return { text: '', fill: '', stroke: '', color: '' };
}

function getBattleRenderLoad(battle = session?.battle) {
  const enemyCount = Number(battle?.enemies?.length) || 0;
  const projectileCount = Number(battle?.projectiles?.length) || 0;
  const effectCount = countActiveEffects(battle);
  const performanceMode = Boolean(battle?.performanceMode);
  const busy = performanceMode
    || enemyCount >= BUSY_RENDER_ENEMY_COUNT
    || projectileCount >= BUSY_RENDER_PROJECTILE_COUNT
    || effectCount >= 7;
  const veryBusy = Boolean(battle?.performanceVeryBusy)
    || enemyCount >= VERY_BUSY_RENDER_ENEMY_COUNT
    || projectileCount >= VERY_BUSY_RENDER_PROJECTILE_COUNT
    || effectCount >= 10;
  return { busy, veryBusy, performanceMode, enemyCount, projectileCount, effectCount };
}

function shouldDrawEnemyInfo(enemy, variantStyle, renderLoad) {
  if (renderLoad?.performanceMode && !enemy.elite && !enemy.hardened && enemy.hp >= enemy.maxHp) return false;
  if (!renderLoad?.busy) return true;
  if (enemy.hp < enemy.maxHp) return true;
  if (variantStyle || enemy.elite || enemy.hardened) return true;
  return ['commander', 'summoner', 'armored', 'adaptive'].includes(enemy.role);
}

function drawEnemy(ctx, enemy, nowMs, renderLoad = null) {
  const image = enemyImages.get(enemy.tier);
  const variantStyle = getEnemyVariantVisual(enemy);
  const visualScale = getBattleVisualScale();
  const enemyDrawScale = clamp(visualScale * 1.1, 0.55, 1);
  const visualRadius = Math.max(8, enemy.radius * enemyDrawScale);
  const spriteSize = image?.complete && image.naturalWidth
    ? getDrawSizeByLongEdge(image, enemy.renderSize * enemyDrawScale)
    : null;
  const drawWidth = spriteSize?.width || enemy.renderSize * enemyDrawScale;
  const drawHeight = spriteSize?.height || enemy.renderSize * enemyDrawScale;
  const drawX = enemy.x - drawWidth / 2;
  const drawY = enemy.y - drawHeight / 2;
  if ((!renderLoad?.veryBusy && !renderLoad?.performanceMode) || enemy.elite) {
    drawEnemyVariantAura(ctx, enemy, drawWidth, drawHeight, variantStyle, nowMs);
  }

  ctx.save();
  ctx.shadowColor = 'rgba(9, 24, 56, 0.24)';
  ctx.shadowBlur = (renderLoad?.veryBusy || renderLoad?.performanceMode ? 0 : (variantStyle ? 18 : 10)) * enemyDrawScale;
  ctx.shadowOffsetY = renderLoad?.veryBusy || renderLoad?.performanceMode ? 0 : 6 * enemyDrawScale;
  if (variantStyle?.shadowColor && !renderLoad?.busy && !renderLoad?.performanceMode) {
    ctx.filter = `drop-shadow(0 0 ${(enemy.elite ? 16 : 11) * enemyDrawScale}px ${variantStyle.shadowColor})`;
  }
  if (image?.complete && image.naturalWidth) {
    const compositeSprite = variantStyle ? getCompositeEnemySprite(image, variantStyle) : null;
    if (compositeSprite?.image) {
      const padX = drawWidth * compositeSprite.padX;
      const padY = drawHeight * compositeSprite.padY;
      ctx.drawImage(
        compositeSprite.image,
        drawX - padX,
        drawY - padY,
        drawWidth + padX * 2,
        drawHeight + padY * 2
      );
    } else {
      if (variantStyle?.outerOutline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outerOutline, Math.max(1.5, drawWidth * 0.055));
      }
      if (variantStyle?.outline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outline, Math.max(1, drawWidth * 0.033));
      }
      const renderImage = variantStyle ? getTintedEnemySprite(image, variantStyle) : image;
      ctx.drawImage(renderImage, drawX, drawY, drawWidth, drawHeight);
    }
  } else {
    ctx.fillStyle = variantStyle?.fallbackFill || '#be123c';
    ctx.strokeStyle = variantStyle?.outline || 'rgba(255,255,255,0.35)';
    ctx.lineWidth = variantStyle ? 4 : 2;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, visualRadius, 0, Math.PI * 2);
    ctx.fill();
    if (variantStyle) ctx.stroke();
  }
  ctx.restore();

  const badge = getEnemyBadge(enemy, variantStyle);
  if (!shouldDrawEnemyInfo(enemy, variantStyle, renderLoad)) return;

  const barWidth = Math.round(clamp(drawWidth * 0.84, 24, 44));
  const barHeight = Math.round(clamp(6 * enemyDrawScale, 3, 6));
  const hpColor = getEnemyHpColor(enemy, variantStyle);
  drawHpBar(ctx, enemy.x - barWidth / 2, enemy.y - visualRadius - Math.round(13 * enemyDrawScale), barWidth, enemy.hp, enemy.maxHp, hpColor, barHeight);
  const drawBadge = badge.text && (!renderLoad?.veryBusy || enemy.elite || enemy.hardened);
  if (drawBadge) {
    ctx.save();
    const badgeFontSize = Math.round(clamp(10 * enemyDrawScale, 7, 10));
    const badgeHeight = Math.round(clamp(14 * enemyDrawScale, 10, 14));
    const badgeRadius = Math.round(clamp(7 * enemyDrawScale, 5, 7));
    ctx.font = `800 ${badgeFontSize}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelWidth = Math.max(Math.round(24 * enemyDrawScale), ctx.measureText(badge.text).width + Math.round(12 * enemyDrawScale));
    const labelY = enemy.y - visualRadius - Math.round(30 * enemyDrawScale);
    ctx.fillStyle = badge.fill || 'rgba(15,23,42,0.82)';
    ctx.beginPath();
    ctx.roundRect(enemy.x - labelWidth / 2, labelY, labelWidth, badgeHeight, badgeRadius);
    ctx.fill();
    if (badge.stroke) {
      ctx.strokeStyle = badge.stroke;
      ctx.lineWidth = clamp(enemyDrawScale, 0.75, 1);
      ctx.stroke();
    }
    ctx.fillStyle = badge.color || '#ffffff';
    ctx.fillText(badge.text, enemy.x, labelY + badgeHeight / 2);
    ctx.restore();
  }
}

function drawExplosionFramePrimitives(ctx, centerX, centerY, radius, level, seed, progress) {
  const alpha = 1 - progress;
  const easeOut = 1 - Math.pow(1 - progress, 2);
  const coreRadius = radius * (0.16 + easeOut * 0.22);
  const ringRadius = radius * (0.32 + easeOut * 0.92);
  const particleCount = Math.round(clamp(7 + level * 2, 7, 16));

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const gradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, Math.max(coreRadius, 2));
  gradient.addColorStop(0, `rgba(255, 255, 255, ${0.78 * alpha})`);
  gradient.addColorStop(0.32, `rgba(255, 228, 102, ${0.62 * alpha})`);
  gradient.addColorStop(1, `rgba(249, 115, 22, ${0.12 * alpha})`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 237, 147, ${0.86 * alpha})`;
  ctx.lineWidth = Math.max(2, 5 * alpha);
  ctx.beginPath();
  ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(251, 146, 60, ${0.52 * alpha})`;
  ctx.lineWidth = Math.max(1, 2.5 * alpha);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * (0.48 + easeOut * 0.72), 0, Math.PI * 2);
  ctx.stroke();

  for (let index = 0; index < particleCount; index += 1) {
    const angle = (Math.PI * 2 * index) / particleCount + seed * Math.PI * 2;
    const spread = radius * (0.16 + easeOut * (0.42 + ((index % 3) * 0.08)));
    const x = centerX + Math.cos(angle) * spread;
    const y = centerY + Math.sin(angle) * spread;
    ctx.fillStyle = `rgba(255, ${Math.round(170 + (index % 4) * 18)}, 72, ${0.72 * alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(1.5, (4 + level * 0.45) * alpha), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function trimExplosionFrameCache() {
  while (explosionFrameCache.size > EXPLOSION_FRAME_CACHE_LIMIT) {
    const firstKey = explosionFrameCache.keys().next().value;
    if (!firstKey) break;
    explosionFrameCache.delete(firstKey);
  }
}

function getExplosionFrameSprite(effect, progress) {
  const radius = Math.max(4, Number(effect?.radius) || 0);
  const level = Math.max(1, Math.round(Number(effect?.level) || 1));
  const radiusBucket = Math.max(4, Math.round(radius / 4) * 4);
  const levelBucket = Math.min(16, level);
  const seedValue = Number(effect?.seed) || 0;
  const seedBucket = Math.floor(clamp(seedValue, 0, 0.999999) * EXPLOSION_SEED_BUCKETS);
  const frameIndex = clamp(Math.floor(progress * EXPLOSION_FRAME_COUNT), 0, EXPLOSION_FRAME_COUNT - 1);
  const frameProgress = clamp((frameIndex + 0.5) / EXPLOSION_FRAME_COUNT, 0, 1);
  const cacheKey = `${radiusBucket}:${levelBucket}:${seedBucket}:${frameIndex}`;
  const cached = explosionFrameCache.get(cacheKey);
  if (cached) return cached;

  const extent = Math.ceil(radiusBucket * 1.3 + levelBucket * 1.5 + 10);
  const size = Math.max(24, extent * 2);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const frameCtx = canvas.getContext('2d');
  if (!frameCtx) return null;
  drawExplosionFramePrimitives(
    frameCtx,
    extent,
    extent,
    radiusBucket,
    levelBucket,
    seedBucket / EXPLOSION_SEED_BUCKETS,
    frameProgress
  );
  const frame = { canvas, extent, size };
  explosionFrameCache.set(cacheKey, frame);
  trimExplosionFrameCache();
  return frame;
}

function drawExplosionEffect(ctx, effect, nowMs) {
  const startedAtMs = Number(effect?.startedAtMs) || nowMs;
  const durationMs = Math.max(1, Number(effect?.durationMs) || SHIP_EXPLOSION_EFFECT_MS);
  const progress = clamp((nowMs - startedAtMs) / durationMs, 0, 1);
  const frame = getExplosionFrameSprite(effect, progress);
  if (!frame?.canvas) {
    drawExplosionFramePrimitives(ctx, effect.x, effect.y, Math.max(4, Number(effect?.radius) || 0), Math.max(1, Number(effect?.level) || 1), Number(effect?.seed) || 0, progress);
    return;
  }
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(frame.canvas, effect.x - frame.extent, effect.y - frame.extent, frame.size, frame.size);
  ctx.restore();
}

function drawBattleEffects(ctx, effects, nowMs, width, height) {
  if (!Array.isArray(effects) || !effects.length) return;
  effects.forEach((effect) => {
    if (!effect || effect.removed || !effect.active) return;
    if (!isDrawAreaVisible(effect?.x, effect?.y, effect?.radius, width, height, 12)) return;
    if (effect?.type === 'explosion') drawExplosionEffect(ctx, effect, nowMs);
  });
}

function drawDefeatFlashOverlay(ctx, battle, nowMs, width, height) {
  if (!battle) return;
  const flashRemainingMs = Math.max(0, Number(battle.defeatFlashUntilMs || 0) - nowMs);
  const respawnRemainingMs = Math.max(0, Number(battle.ship?.respawnUntilMs || 0) - nowMs);
  if (flashRemainingMs <= 0 && respawnRemainingMs <= 0) return;
  const flashRatio = clamp(flashRemainingMs / BATTLESHIP_DEFEAT_FLASH_MS, 0, 1);
  const pulse = 0.5 + Math.sin(nowMs * 0.018) * 0.5;
  const overlayAlpha = clamp(0.06 + flashRatio * 0.42 + (respawnRemainingMs > 0 ? pulse * 0.04 : 0), 0.06, 0.52);
  ctx.save();
  ctx.fillStyle = `rgba(185, 28, 28, ${overlayAlpha})`;
  ctx.fillRect(0, 0, width, height);

  const visualScale = getBattleVisualScale(battle);
  const panelWidth = Math.min(width - 28, Math.round(clamp(width * 0.54, 210, 360)));
  const panelHeight = Math.round(clamp(74 * visualScale, 48, 74));
  const panelX = (width - panelWidth) / 2;
  const panelY = Math.round(clamp(height * 0.18, 22, 118));
  const radius = Math.round(clamp(12 * visualScale, 7, 12));
  ctx.fillStyle = 'rgba(69, 10, 10, 0.82)';
  ctx.strokeStyle = 'rgba(254, 202, 202, 0.72)';
  ctx.lineWidth = Math.max(1, 2 * visualScale);
  ctx.beginPath();
  ctx.roundRect(panelX, panelY, panelWidth, panelHeight, radius);
  ctx.fill();
  ctx.stroke();

  const respawnSec = Math.max(0, Math.ceil(respawnRemainingMs / 1000));
  const penalty = Math.max(0, Math.round(Number(battle.lastDeathPenalty) || 0));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff7ed';
  ctx.font = `900 ${Math.round(clamp(18 * visualScale, 12, 20))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  ctx.fillText('거북선 격침', width / 2, panelY + panelHeight * 0.34);
  ctx.font = `800 ${Math.round(clamp(12 * visualScale, 8, 13))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  const penaltyText = penalty > 0 ? `점수 -${penalty.toLocaleString('ko-KR')} · ` : '';
  ctx.fillText(`${penaltyText}${respawnSec}초 뒤 재출항`, width / 2, panelY + panelHeight * 0.68);
  ctx.restore();
}

function isDrawAreaVisible(x, y, radius, width, height, margin = 0) {
  const extent = Math.max(0, Number(radius) || 0) + Math.max(0, Number(margin) || 0);
  return x + extent >= 0
    && x - extent <= width
    && y + extent >= 0
    && y - extent <= height;
}

function getProjectileRenderRadius(projectile) {
  return Math.max(3, (Number(projectile?.radius) || 0) * PROJECTILE_RENDER_RADIUS_RATIO);
}

function drawProjectileGroup(ctx, projectiles, width, height, hasExplosion) {
  let drew = false;
  ctx.beginPath();
  for (let index = 0; index < projectiles.length; index += 1) {
    const projectile = projectiles[index];
    if (!projectile || projectile.removed) continue;
    if (Boolean(projectile.explosionRadius > 0) !== hasExplosion) continue;
    const renderRadius = getProjectileRenderRadius(projectile);
    if (!isDrawAreaVisible(projectile.x, projectile.y, renderRadius, width, height, 8)) continue;
    ctx.moveTo(projectile.x + renderRadius, projectile.y);
    ctx.arc(projectile.x, projectile.y, renderRadius, 0, Math.PI * 2);
    drew = true;
  }
  if (!drew) return;
  ctx.fill();
  ctx.stroke();
}

function drawProjectiles(ctx, projectiles, width, height) {
  if (!Array.isArray(projectiles) || !projectiles.length) return;
  const renderLoad = getBattleRenderLoad();
  ctx.save();
  ctx.lineWidth = renderLoad.performanceMode ? 0.85 : PROJECTILE_RENDER_STROKE_WIDTH;
  ctx.fillStyle = '#f9e27d';
  ctx.strokeStyle = 'rgba(120,53,15,0.55)';
  drawProjectileGroup(ctx, projectiles, width, height, false);
  ctx.fillStyle = '#fb923c';
  ctx.strokeStyle = 'rgba(124,45,18,0.68)';
  drawProjectileGroup(ctx, projectiles, width, height, true);
  ctx.restore();
}

function drawBattle() {
  if (!session || !battleCanvas || !battleCtx) return;
  const nowMs = performance.now();
  syncCanvasSize({ nowMs });
  const ctx = battleCtx;
  const battle = session.battle;
  const width = battle.canvasWidth;
  const height = battle.canvasHeight;
  ctx.clearRect(0, 0, width, height);
  drawBackground(ctx, width, height, battle);

  drawShip(ctx, battle.ship, nowMs);

  const visualScale = getBattleVisualScale(battle);
  const renderLoad = getBattleRenderLoad(battle);
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const drawRadius = Math.max(enemy.radius, enemy.renderSize * visualScale * 0.68);
    if (isDrawAreaVisible(enemy.x, enemy.y, drawRadius, width, height, 34)) {
      drawEnemy(ctx, enemy, nowMs, renderLoad);
    }
  }

  drawProjectiles(ctx, battle.projectiles, width, height);

  drawBattleEffects(ctx, battle.effects, nowMs, width, height);

  if (!isTabletFaceToFaceSession()) {
    drawShipHpGauge(ctx, battle.ship, width);

    ctx.save();
    const overlayScale = getBattleVisualScale(battle);
    const maxTier = getUnlockedEnemyTier(battle.waves.elapsedSec);
    const eliteTier = getEliteUnlockedTier(battle.waves.elapsedSec);
    const overlayX = Math.round(clamp(12 * overlayScale, 6, 12));
    const tinyMap = width < 190;
    const overlayY = tinyMap ? Math.round(clamp(39 * overlayScale, 36, 42)) : Math.round(clamp(74 * overlayScale, 42, 74));
    const overlayWidth = tinyMap
      ? Math.min(width - overlayX * 2, 92)
      : Math.min(width - overlayX * 2, Math.round(clamp(168 * overlayScale, 104, 168)));
    const overlayHeight = tinyMap ? 24 : Math.round(clamp(54 * overlayScale, 34, 54));
    const overlayRadius = Math.round(clamp(8 * overlayScale, 5, 8));
    ctx.fillStyle = 'rgba(8, 19, 43, 0.78)';
    ctx.beginPath();
    ctx.roundRect(overlayX, overlayY, overlayWidth, overlayHeight, overlayRadius);
    ctx.fill();
    ctx.fillStyle = '#fff5d6';
    if (tinyMap) {
      ctx.font = '900 7px Apple SD Gothic Neo, Malgun Gothic, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `Lv.${battle.waves.level} · 01-${String(maxTier).padStart(2, '0')}${eliteTier ? ` · 특${String(eliteTier).padStart(2, '0')}` : ''}`,
        overlayX + 6,
        overlayY + overlayHeight / 2
      );
    } else {
      ctx.font = `900 ${Math.round(clamp(14 * overlayScale, 8, 14))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
      ctx.fillText(`Wave Lv.${battle.waves.level}`, overlayX + Math.round(clamp(12 * overlayScale, 7, 12)), overlayY + Math.round(clamp(20 * overlayScale, 13, 20)));
      ctx.font = `800 ${Math.round(clamp(12 * overlayScale, 7, 12))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
      ctx.fillText(`적 01-${String(maxTier).padStart(2, '0')}${eliteTier ? ` · 특수 ${String(eliteTier).padStart(2, '0')}` : ''}`, overlayX + Math.round(clamp(12 * overlayScale, 7, 12)), overlayY + Math.round(clamp(40 * overlayScale, 25, 40)));
    }
    ctx.restore();
  }

  drawDefeatFlashOverlay(ctx, battle, nowMs, width, height);
}

function getBattleDrawIntervalMs(battle) {
  if (!battle) return 0;
  const mapSize = Math.min(Number(battle.canvasWidth) || 0, Number(battle.canvasHeight) || 0);
  const busyCombat = battle.projectiles.length >= 28 || countActiveEffects(battle) >= 6 || battle.enemies.length >= 18;
  const busyQuiz = isTabletFaceToFaceSession()
    && session.playerQuizStates.some((quizState) => quizState.quizOpen);
  if (battle.performanceMode && (busyCombat || mapSize >= 640)) return isTabletFaceToFaceSession() ? 34 : 28;
  if (isTabletFaceToFaceSession() && (busyCombat || busyQuiz)) return 34;
  if (mapSize >= 640 && busyCombat) return 24;
  return 0;
}

function updateBattlePerformanceMode(battle, dtMs) {
  if (!battle) return;
  const frameMs = Number(dtMs) || 0;
  if (frameMs >= PERFORMANCE_LAG_HARD_FRAME_MS) {
    battle.performanceLagScore = Math.min(10, (Number(battle.performanceLagScore) || 0) + 2);
  } else if (frameMs >= PERFORMANCE_LAG_SOFT_FRAME_MS) {
    battle.performanceLagScore = Math.min(10, (Number(battle.performanceLagScore) || 0) + 1);
  } else {
    battle.performanceLagScore = Math.max(0, (Number(battle.performanceLagScore) || 0) - 0.25);
  }
  if (!battle.performanceMode && battle.performanceLagScore >= PERFORMANCE_LAG_ENTER_SCORE) {
    battle.performanceMode = true;
  } else if (battle.performanceMode && battle.performanceLagScore <= PERFORMANCE_LAG_EXIT_SCORE) {
    battle.performanceMode = false;
  }
  battle.performanceVeryBusy = battle.performanceLagScore >= PERFORMANCE_LAG_ENTER_SCORE + 3;
}

function shouldDrawBattleFrame(battle, nowMs) {
  const intervalMs = getBattleDrawIntervalMs(battle);
  if (intervalMs <= 0) return true;
  return !battle.lastDrawMs || nowMs - battle.lastDrawMs >= intervalMs;
}

function battleFrame(nowMs) {
  if (!session || session.endedAt) return;
  session.battles.forEach((battle) => {
    withBattleContext(battle.playerIndex, () => {
      const dtMs = Math.min(50, Math.max(0, nowMs - battle.lastFrameMs));
      battle.lastFrameMs = nowMs;
      updateBattlePerformanceMode(battle, dtMs);
      updateBattle(dtMs / 1000, nowMs);
      if (shouldDrawBattleFrame(battle, nowMs)) {
        battle.lastDrawMs = nowMs;
        drawBattle();
      }
    });
  });
  if (!session || session.endedAt) return;
  battleAnimationId = window.requestAnimationFrame(battleFrame);
}

function startBattleLoop() {
  if (!session) return;
  stopBattleLoop();
  const nowMs = performance.now();
  session.battles.forEach((battle) => {
    battle.running = true;
    battle.lastFrameMs = nowMs;
  });
  battleAnimationId = window.requestAnimationFrame(battleFrame);
}

function stopBattleLoop() {
  if (battleAnimationId) {
    window.cancelAnimationFrame(battleAnimationId);
    battleAnimationId = 0;
  }
  if (session?.battles) {
    session.battles.forEach((battle) => {
      battle.running = false;
    });
  }
}

function updateTimer() {
  if (!session) return;
  const remainingMs = session.deadlineAt - Date.now();
  const clock = formatClock(remainingMs / 1000);
  elements.timerPill.textContent = clock;
  if (remainingMs <= 0) finishSession();
}

function startTimer() {
  updateTimer();
  session.timerId = window.setInterval(updateTimer, 200);
}

async function startSelectedGame() {
  if (startLoading) return;
  setSetupMessage();
  enforceDisplayModeRules();
  if (!selectedMinutes) {
    setSetupMessage('플레이 시간을 선택하세요.', 'error');
    return;
  }
  setStartLoading(true, '퀴즈 데이터를 불러오는 중', 0.04);
  try {
    const questions = await prepareGameStart();
    setStartLoading(true, '적 출현 순서를 미리 준비하는 중', 0.98);
    await nextPaint();
    session = buildSession(questions);
    currentBattleIndex = 0;
    nextQuestion();
    showScreen('play');
    setStartLoading(false);
    renderPlay();
    renderStageShell();
    startTimer();
    startBattleLoop();
  } catch (error) {
    setStartLoading(false);
    setSetupMessage(error instanceof Error ? error.message : '시작할 수 없습니다.', 'error');
  } finally {
    updateSetupSummary({ keepError: true });
  }
}

function stopSessionTimer() {
  if (session?.timerId) {
    window.clearInterval(session.timerId);
    session.timerId = null;
  }
  if (session?.answerTimerId) {
    window.clearTimeout(session.answerTimerId);
    session.answerTimerId = 0;
  }
}

function summarizeSession() {
  const battles = Array.isArray(session.battles) && session.battles.length ? session.battles : [session.battle];
  const totalCorrect = session.players.reduce((sum, player) => sum + player.correct, 0);
  const totalWrong = session.players.reduce((sum, player) => sum + player.wrong, 0);
  const playedMs = Math.max(0, (session.endedAt || new Date()).getTime() - session.startedAt.getTime());
  const hpCurrent = battles.reduce((sum, battle) => sum + Math.max(0, Math.round(battle.ship.hp)), 0);
  const hpMax = battles.reduce((sum, battle) => sum + battle.ship.maxHp, 0);
  const waveBonus = battles.reduce((sum, battle) => sum + battle.waves.level * 60, 0);
  const battleScore = battles.reduce((sum, battle) => sum + battle.score.points, 0);
  const finalScore = battleScore + waveBonus;
  return {
    totalCorrect,
    totalWrong,
    hpCurrent,
    hpMax,
    hp: `${hpCurrent}/${hpMax}`,
    defeated: battles.reduce((sum, battle) => sum + battle.score.kills, 0),
    score: finalScore,
    battleScore,
    killScore: battles.reduce((sum, battle) => sum + battle.score.killPoints, 0),
    waveBonus,
    bonusPoints: battles.reduce((sum, battle) => sum + battle.score.bonusPoints, 0),
    maxCombo: battles.reduce((max, battle) => Math.max(max, battle.score.maxCombo), 0),
    eliteKills: battles.reduce((sum, battle) => sum + battle.score.eliteKills, 0),
    hardenedKills: battles.reduce((sum, battle) => sum + battle.score.hardenedKills, 0),
    gold: battles.reduce((sum, battle) => sum + battle.score.gold, 0),
    wave: battles.reduce((max, battle) => Math.max(max, battle.waves.level), 1),
    deaths: battles.reduce((sum, battle) => sum + battle.ship.deathCount, 0),
    playedSec: Math.round(playedMs / 1000)
  };
}

function isGugudanSoloRecordResult() {
  return Boolean(session && session.packId === 'gugudan' && !session.sharedBattle && session.players.length === 1);
}

function getCurrentGugudanFactMap() {
  return createGugudanAggregateFromRecords(session?.gugudanRecords || []);
}

function getGugudanWeaknessText(factMap) {
  const danItems = getGugudanDanSummary(factMap)
    .filter((item) => item.attempts > 0)
    .sort((left, right) => right.wrong - left.wrong || left.dan - right.dan);
  if (!danItems.length) return '아직 저장할 구구단 풀이 기록이 없습니다.';
  const wrongDanItems = danItems.filter((item) => item.wrong > 0).slice(0, 3);
  if (!wrongDanItems.length) return '이번 판 오답 없음 · 모든 풀이가 정답입니다.';
  const factItems = getSortedGugudanFacts(factMap)
    .filter((item) => item.wrong > 0)
    .sort((left, right) => right.wrong - left.wrong || left.dan - right.dan || left.multiplier - right.multiplier)
    .slice(0, 3);
  const danText = wrongDanItems.map((item) => `${item.dan}단 ${item.wrong}회`).join(' · ');
  const factText = factItems.map((item) => `${item.expression} ${item.wrong}회`).join(' · ');
  return `오답이 많은 단: ${danText}${factText ? ` / 문항: ${factText}` : ''}`;
}

function setGugudanRecordStatus(message = '', kind = '') {
  if (!elements.gugudanRecordStatus) return;
  elements.gugudanRecordStatus.textContent = message;
  elements.gugudanRecordStatus.classList.toggle('is-error', kind === 'error');
  elements.gugudanRecordStatus.classList.toggle('is-success', kind === 'success');
}

function renderGugudanRecordPanel() {
  const panel = elements.gugudanRecordPanel;
  const resultModal = $('.result-modal', elements.resultScreen);
  if (!panel) return;
  const visible = isGugudanSoloRecordResult();
  panel.classList.toggle('is-hidden', !visible);
  resultModal?.classList.toggle('has-gugudan-record', visible);
  if (!visible) {
    setGugudanRecordStatus();
    return;
  }
  const factMap = getCurrentGugudanFactMap();
  const hasRecords = factMap.size > 0;
  const summaryText = getGugudanWeaknessText(factMap);
  const copy = $('.gugudan-record-copy p', panel);
  if (copy) {
    copy.textContent = `${summaryText} 학생번호는 파일명과 CSV에만 들어가며 앱 안에는 저장하지 않습니다.`;
  }
  if (elements.gugudanDownloadCurrentButton) elements.gugudanDownloadCurrentButton.disabled = !hasRecords;
  if (elements.gugudanMergeCsvButton) elements.gugudanMergeCsvButton.disabled = !hasRecords;
  setGugudanRecordStatus(hasRecords ? '같은 학생의 이전 기록 CSV를 선택할 때만 누적하세요.' : '기록할 구구단 풀이가 없습니다.', hasRecords ? '' : 'error');
}

function getStudentIdForCsv() {
  const raw = elements.gugudanStudentId?.value || '';
  const safe = getSafeStudentId(raw);
  if (elements.gugudanStudentId && safe !== raw.trim()) {
    elements.gugudanStudentId.value = safe;
  }
  if (!safe) {
    setGugudanRecordStatus('학생번호를 입력하세요. 예: 12', 'error');
    elements.gugudanStudentId?.focus();
    return '';
  }
  return safe;
}

function getGugudanCsvFilename(studentId, merged = false) {
  const stamp = formatFileTimestamp(new Date());
  return `gugudan-student-${studentId}${merged ? '-merged' : ''}-${stamp}.csv`;
}

function downloadCurrentGugudanCsv() {
  if (!isGugudanSoloRecordResult()) return;
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  const factMap = getCurrentGugudanFactMap();
  if (!factMap.size) {
    setGugudanRecordStatus('저장할 구구단 풀이 기록이 없습니다.', 'error');
    return;
  }
  const csv = buildGugudanCsv(studentId, factMap, { minutes: session.minutes, sourceLabel: session.packLabel });
  downloadCsvFile(getGugudanCsvFilename(studentId), csv);
  setGugudanRecordStatus('이번 기록 CSV를 내려받았습니다.', 'success');
}

async function mergeAndDownloadGugudanCsv(file) {
  if (!isGugudanSoloRecordResult() || !file) return;
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  try {
    const previousText = await file.text();
    const previous = parseGugudanCsvAggregate(previousText);
    const previousStudentIds = Array.from(previous.studentIds).filter(Boolean);
    if (previousStudentIds.length && !previousStudentIds.includes(studentId)) {
      setGugudanRecordStatus(`선택한 CSV의 학생번호(${previousStudentIds.join(', ')})가 현재 입력값과 다릅니다.`, 'error');
      return;
    }
    const mergedMap = new Map(previous.factMap);
    getCurrentGugudanFactMap().forEach((item) => {
      addGugudanAggregate(mergedMap, {
        dan: item.dan,
        multiplier: item.multiplier,
        key: item.expression,
        expression: item.expression
      }, item);
    });
    if (!mergedMap.size) {
      setGugudanRecordStatus('합칠 수 있는 구구단 기록 CSV가 아닙니다.', 'error');
      return;
    }
    const csv = buildGugudanCsv(studentId, mergedMap, { minutes: session.minutes, sourceLabel: session.packLabel });
    downloadCsvFile(getGugudanCsvFilename(studentId, true), csv);
    setGugudanRecordStatus('이전 기록과 이번 기록을 합친 CSV를 내려받았습니다.', 'success');
  } catch (error) {
    setGugudanRecordStatus('CSV 파일을 읽지 못했습니다. 이 앱에서 받은 기록 CSV인지 확인하세요.', 'error');
  }
}

function renderResult() {
  if (!session) return;
  const summary = summarizeSession();
  const totalAttempts = summary.totalCorrect + summary.totalWrong;
  const accuracyText = formatAccuracy(summary.totalCorrect, totalAttempts);
  const targetScore = Math.max(1, session.minutes) * 1800;
  const resultRank = summary.hp.startsWith('0/')
    ? '방어 실패'
    : (summary.score >= targetScore * 1.7 ? '완전 방어' : (summary.score >= targetScore ? '방어 성공' : '전투 종료'));
  const endedText = session.endedAt.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const endedClock = session.endedAt.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const isMultiPlayerResult = session.players.length > 1;
  const isTabletFaceResult = isTabletFaceToFaceSession();
  syncTabletFaceLayoutBasis();
  const resultModal = $('.result-modal', elements.resultScreen);
  resultModal?.classList.toggle('is-split-result', isMultiPlayerResult);
  resultModal?.classList.toggle('is-tablet-face-result', isTabletFaceResult);
  elements.resultTitle.textContent = isSharedBattleSession()
    ? '함께 풀기 전투 결과'
    : (isMultiPlayerResult ? '플레이어별 전투 결과' : resultRank);
  elements.resultSubtitle.textContent = isMultiPlayerResult
    ? `${session.packLabel} · ${session.modeLabel} · ${session.displayModeLabel} · ${session.players.length}명 · ${session.minutes}분 · 종료 ${endedText}`
    : `${session.packLabel} · ${session.modeLabel} · ${session.displayModeLabel} · ${session.players.length}명 · ${formatClock(summary.playedSec)}`;
  elements.resultTimePill.textContent = '결과 확정';
  elements.resultGrid.className = isMultiPlayerResult ? 'result-grid result-session-grid is-hidden' : 'result-grid';
  if (isMultiPlayerResult) {
    elements.resultGrid.innerHTML = '';
  } else {
    elements.resultGrid.innerHTML = `
    <div class="result-battle-card">
      <div class="result-battle-main">
        <b>최종 점수</b>
        <strong>${escapeHtml(summary.score.toLocaleString('ko-KR'))}</strong>
        <span>전투 ${escapeHtml(summary.battleScore.toLocaleString('ko-KR'))} · Wave 보너스 ${escapeHtml(summary.waveBonus)}</span>
      </div>
    </div>
    ${[
    ['격퇴 수', `${summary.defeated}`, 'is-kill'],
    ['최고 웨이브', `Lv.${summary.wave}`, 'is-wave'],
    ['최고 콤보', `x${summary.maxCombo}`, ''],
    ['정답률(정답수/문제수)', accuracyText, ''],
    ['선택 시간', `${session.minutes}분`, ''],
    ['종료 시각', endedText, 'is-time']
  ].map(([label, value, tone]) => `
    <div class="result-tile ${tone}">
      <b>${escapeHtml(label)}</b>
      <span>${escapeHtml(value)}</span>
    </div>
  `).join('')}
  `;
  }

  const playerResults = session.players.map((player, index) => {
    const attempts = player.correct + player.wrong;
    const playerAccuracy = attempts > 0 ? Math.round((player.correct / attempts) * 100) : 0;
    const playerAccuracyText = formatAccuracy(player.correct, attempts);
    const battle = isSharedBattleSession() ? session.battles[0] : session.battles[index];
    const battleKills = battle?.score?.kills || 0;
    const battleScore = battle?.score?.points || player.score;
    const waveBonus = (battle?.waves?.level || 1) * 60;
    const finalScore = battleScore + waveBonus;
    return {
      index,
      player,
      attempts,
      playerAccuracy,
      playerAccuracyText,
      battle,
      battleKills,
      battleScore,
      waveBonus,
      finalScore
    };
  });
  const orderedPlayerResults = isTabletFaceResult
    ? [playerResults[1], playerResults[0]].filter(Boolean)
    : playerResults;
  const tabletFaceCenterHtml = isTabletFaceResult ? `
    <div class="tablet-face-result-center" aria-label="공유 전투 결과">
      <div>
        <span>전투 종료</span>
        <b>${escapeHtml(resultRank)}</b>
      </div>
      <dl>
        <div><dt>팀 점수</dt><dd>${escapeHtml(summary.score.toLocaleString('ko-KR'))}</dd></div>
        <div><dt>격퇴</dt><dd>${escapeHtml(String(summary.defeated))}</dd></div>
        <div><dt>정답률</dt><dd>${escapeHtml(accuracyText)}</dd></div>
        <div><dt>GOLD</dt><dd>${escapeHtml(summary.gold.toLocaleString('ko-KR'))}</dd></div>
        <div><dt>종료</dt><dd>${escapeHtml(endedClock)}</dd></div>
      </dl>
    </div>
  ` : '';
  elements.playerResults.className = `player-results player-count-${session.players.length}${isMultiPlayerResult ? ' is-primary-results' : ''}${isTabletFaceResult ? ' is-tablet-face-results' : ''}`;
  elements.playerResults.innerHTML = `
    ${isMultiPlayerResult ? '' : '<div class="player-results-heading">플레이어 전투 기록</div>'}
    ${orderedPlayerResults.map((result, orderIndex) => {
    const { player, index, playerAccuracy, playerAccuracyText, battle, battleKills, battleScore, waveBonus, finalScore } = result;
    const maxCombo = battle?.score?.maxCombo || 0;
    return `
    ${isTabletFaceResult && orderIndex === 1 ? tabletFaceCenterHtml : ''}
    <div class="player-result-card${isTabletFaceResult ? ' tablet-face-card' : ''}${isTabletFaceResult && index === 1 ? ' is-flipped' : ''}">
      <div class="player-card-head">
        <span>${index + 1}P</span>
        <strong>${escapeHtml(player.name)}</strong>
      </div>
      <div class="player-card-session">선택 ${session.minutes}분 · 종료 ${escapeHtml(endedClock)}</div>
      <div class="player-scoreplate">
        <b>최종 점수</b>
        <strong>${finalScore.toLocaleString('ko-KR')}</strong>
        <span>전투 ${battleScore.toLocaleString('ko-KR')} · Wave ${waveBonus}</span>
      </div>
      <div class="player-card-main">
        <div><b>${battleKills}</b><span>격퇴</span></div>
        <div><b>${escapeHtml(playerAccuracyText)}</b><span>정답률(정답수/문제수)</span></div>
        <div><b>${player.maxStreak}</b><span>최대 연속</span></div>
        <div><b>x${maxCombo}</b><span>최고 콤보</span></div>
      </div>
      <div class="player-accuracy-meter"><i style="width: ${playerAccuracy}%"></i></div>
      <div class="player-reward-line">빠른 정답 ${player.quickAnswers}회 · GOLD ${player.quizGold}</div>
    </div>
    `;
  }).join('')}
  `;
  renderGugudanRecordPanel();
}

function finishSession() {
  if (!session || session.endedAt) return;
  stopSessionTimer();
  stopBattleLoop();
  session.endedAt = new Date();
  session.quizOpen = false;
  session.battles.forEach((battle) => {
    clearQuizAutoAdvance(battle);
    battle.quizOpen = false;
  });
  session.playerQuizStates?.forEach((quizState) => {
    clearQuizAutoAdvance(quizState);
    quizState.quizOpen = false;
  });
  elements.timerPill.textContent = '00:00';
  elements.resultTimePill.textContent = '결과 확정';
  elements.questionArea.classList.add('is-hidden');
  elements.questionArea.innerHTML = '';
  $$('.battle-quiz-layer', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('.coop-quiz-overlay', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('[data-ref="coop-quiz-split-layer"]', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('[data-ref="tablet-player-quiz-layer"]', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('.coop-player-control-card', elements.gameStage).forEach((card) => {
    card.classList.remove('is-quiz-open');
  });
  $$('.tablet-player-zone', elements.gameStage).forEach((zone) => {
    zone.classList.remove('is-quiz-open');
  });
  $$('.choice-button', elements.questionArea).forEach((button) => {
    button.disabled = true;
  });
  renderResult();
  showScreen('result');
}

function abandonSession() {
  stopSessionTimer();
  stopBattleLoop();
  session?.battles?.forEach(clearQuizAutoAdvance);
  session?.playerQuizStates?.forEach(clearQuizAutoAdvance);
  session = null;
  syncTabletFaceLayoutBasis();
  battleCanvas = null;
  battleCtx = null;
  battleViews = [];
  currentBattleIndex = 0;
  elements.questionArea.classList.add('is-hidden');
  elements.questionArea.innerHTML = '';
  $$('.battle-quiz-layer', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('.coop-quiz-overlay', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('[data-ref="coop-quiz-split-layer"]', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('[data-ref="tablet-player-quiz-layer"]', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('.coop-player-control-card', elements.gameStage).forEach((card) => {
    card.classList.remove('is-quiz-open');
  });
  $$('.tablet-player-zone', elements.gameStage).forEach((zone) => {
    zone.classList.remove('is-quiz-open');
  });
  showScreen('setup');
  updateSetupSummary();
}

function bindEvents() {
  elements.quizPack.addEventListener('change', () => {
    selectedPackId = elements.quizPack.value;
    updateSetupSummary();
  });

  elements.playMinutes.addEventListener('change', () => {
    selectedMinutes = Number(elements.playMinutes.value) || null;
    updateSetupSummary();
  });

  elements.modeOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode]');
    if (!button) return;
    if (button.disabled) return;
    selectedMode = PLAY_MODES.some((mode) => mode.id === button.dataset.mode)
      ? button.dataset.mode
      : 'solo';
    updateSetupSummary();
  });

  elements.displayModeToggle?.addEventListener('click', selectNextDisplayMode);

  elements.tabletPromoButton?.addEventListener('click', () => {
    selectedDisplayMode = 'tablet';
    selectedMode = 'coop';
    selectedPlayers = 2;
    updateSetupSummary();
  });

  elements.playerOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-players]');
    if (!button) return;
    if (button.disabled) return;
    selectedPlayers = Number(button.dataset.players) || 1;
    updateSetupSummary();
  });

  elements.startButton.addEventListener('click', startSelectedGame);
  elements.exitButton.addEventListener('click', abandonSession);
  elements.backSetupButton.addEventListener('click', abandonSession);
  elements.gugudanDownloadCurrentButton?.addEventListener('click', downloadCurrentGugudanCsv);
  elements.gugudanMergeCsvButton?.addEventListener('click', () => {
    if (!getStudentIdForCsv()) return;
    if (!elements.gugudanRecordFile) return;
    elements.gugudanRecordFile.value = '';
    elements.gugudanRecordFile.click();
  });
  elements.gugudanRecordFile?.addEventListener('change', () => {
    const file = elements.gugudanRecordFile.files?.[0];
    mergeAndDownloadGugudanCsv(file);
  });
  elements.restartSameButton.addEventListener('click', async () => {
    stopSessionTimer();
    stopBattleLoop();
    session = null;
    battleCanvas = null;
    battleCtx = null;
    battleViews = [];
    currentBattleIndex = 0;
    showScreen('setup');
    await startSelectedGame();
  });
  elements.gameStage.addEventListener('pointerdown', handleBattlePointerDown);
  window.addEventListener('resize', () => {
    syncTabletFaceLayoutBasis();
    syncAllCanvasSizes();
    if (!session) updateSetupSummary();
    if (session) {
      session.battles.forEach((battle) => {
        withBattleContext(battle.playerIndex, () => drawBattle());
      });
    }
  }, { passive: true });
}

window.__KNOLQUIZ_TEST__ = {
  getBattleSnapshot(playerIndex = currentBattleIndex) {
    if (!session) return null;
    setBattleContext(playerIndex);
    const battle = session.battle;
    return {
      playerIndex: battle.playerIndex,
      gold: battle.score.gold,
      enemies: battle.enemies.filter((enemy) => enemy && !enemy.removed).map((enemy) => ({
        id: enemy.id,
        hp: Math.round(enemy.hp),
        x: Math.round(enemy.x),
        y: Math.round(enemy.y)
      })),
      effects: battle.effects.filter((effect) => effect && effect.active && !effect.removed).map((effect) => ({
        type: effect.type,
        radius: Math.round(effect.radius),
        level: effect.level
      })),
      projectileCount: battle.projectiles.filter((projectile) => projectile && !projectile.removed).length,
      statusText: battle.statusText,
      score: battle.score.points,
      lastDeathPenalty: battle.lastDeathPenalty,
      lastDeathClearedEnemies: battle.lastDeathClearedEnemies,
      respawning: isShipRespawning(),
      performanceMode: battle.performanceMode,
      performanceLagScore: Math.round((Number(battle.performanceLagScore) || 0) * 10) / 10,
      ship: {
        hp: Math.round(battle.ship.hp),
        maxHp: battle.ship.maxHp,
        deathCount: battle.ship.deathCount,
        attackPower: battle.ship.attackPower,
        attackCooldownMs: Math.round(getAttackCooldownMs()),
        attackSpeedLevel: battle.ship.attackSpeedLevel,
        attackPowerLevel: battle.ship.attackPowerLevel,
        projectileCount: battle.ship.projectileCount,
        penetrationLevel: battle.ship.penetrationLevel,
        explosionLevel: battle.ship.explosionLevel,
        explosionRadius: getShipExplosionRadius(),
        explosionDamageRatio: getShipExplosionDamageRatio(),
        damageReductionRatio: getShipDamageReductionRatio()
      }
    };
  },
  grantGold(amount = 1000, playerIndex = currentBattleIndex) {
    if (!session) return false;
    setBattleContext(playerIndex);
    session.battle.score.gold += Math.max(0, Math.round(Number(amount) || 0));
    refreshBattleHud(playerIndex);
    return session.battle.score.gold;
  },
  forceEnemyCluster(playerIndex = currentBattleIndex, count = 4) {
    if (!session) return false;
    setBattleContext(playerIndex);
    const battle = session.battle;
    const def = ENEMY_DEFINITIONS[0];
    const centerX = battle.ship.x + Math.min(92, battle.canvasWidth * 0.24);
    const centerY = battle.ship.y;
    const total = clamp(Math.round(Number(count) || 4), 2, 8);
    for (let index = 0; index < total; index += 1) {
      const angle = (Math.PI * 2 * index) / total;
      const spread = index === 0 ? 0 : 18 + (index % 2) * 8;
      battle.spawnSerial += 1;
      const enemy = acquireEnemy(battle);
      Object.assign(enemy, {
        id: `test-cluster-${battle.playerIndex}-${battle.spawnSerial}`,
        active: true,
        removed: false,
        tier: def.tier,
        typeCode: def.code,
        typeName: def.name,
        role: 'swarm',
        roleLabel: '무리형',
        elite: false,
        hardened: false,
        x: centerX + Math.cos(angle) * spread,
        y: centerY + Math.sin(angle) * spread,
        radius: 16,
        speed: 0,
        hp: 16,
        maxHp: 16,
        touchDamage: 1,
        renderSize: 50,
        hasBeenVisible: true,
        wobbleSeed: battleRandom() * Math.PI * 2
      });
      battle.enemies.push(enemy);
    }
    battle.nextShotMs = Math.min(battle.nextShotMs, battle.worldElapsedMs + 20);
    drawBattle();
    return battle.enemies.length;
  },
  finishNow() {
    if (!session) return false;
    session.deadlineAt = Date.now() - 1;
    updateTimer();
    return true;
  },
  forceEnemyTouch(playerIndex = currentBattleIndex) {
    if (!session) return false;
    setBattleContext(playerIndex);
    const battle = session.battle;
    const enemy = acquireEnemy(battle);
    Object.assign(enemy, {
      id: `test-${Date.now()}`,
      active: true,
      removed: false,
      tier: 1,
      typeCode: '01',
      typeName: '도깨비불',
      role: 'swarm',
      roleLabel: '무리형',
      elite: false,
      hardened: false,
      x: battle.ship.x + battle.ship.radius,
      y: battle.ship.y,
      radius: 22,
      speed: 0,
      hp: 10,
      maxHp: 10,
      touchDamage: 8,
      renderSize: 52,
      hasBeenVisible: true,
      wobbleSeed: 0
    });
    battle.enemies.push(enemy);
    return true;
  },
  spawnEnemyVariant(variant = 'hardened', tier = 5, playerIndex = currentBattleIndex) {
    if (!session) return false;
    setBattleContext(playerIndex);
    const battle = session.battle;
    const normalizedVariant = String(variant || '').trim();
    const safeTier = clamp(Number(tier) || 5, 1, ENEMY_DEFINITIONS.length);
    const def = ENEMY_DEFINITIONS.find((item) => item.tier === safeTier) || ENEMY_DEFINITIONS[0];
    const elapsedSec = normalizedVariant === 'elite'
      ? Math.max(battle.waves.elapsedSec, ELITE_UNLOCK_TIME_SEC)
      : Math.max(battle.waves.elapsedSec, 60);
    const enemy = createEnemyFromDefinition(def, elapsedSec, {
      elite: normalizedVariant === 'elite',
      hardened: normalizedVariant !== 'elite',
      flowSpeedMul: 1
    });
    enemy.x = battle.ship.x + battle.canvasWidth * (enemy.elite ? 0.24 : -0.24);
    enemy.y = battle.ship.y - battle.canvasHeight * 0.16;
    enemy.hasBeenVisible = true;
    enemy.speed = 0;
    battle.enemies.push(enemy);
    drawBattle();
    return {
      variant: enemy.elite ? 'elite' : 'hardened',
      tier: enemy.tier,
      hp: enemy.hp,
      touchDamage: enemy.touchDamage
    };
  }
};

renderSetupControls();
bindEvents();
