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
const LOCAL_PRACTICE_STORE_KEY = 'knolquiz.practice-records.v1';
const LOCAL_PRACTICE_LEGACY_STORE_KEYS = Object.freeze([
  'knolquiz-turtle-defense.practice-records.v1',
  'knolquiz-jumpmap.practice-records.v1'
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
    id: 'division-gugudan',
    label: '나눗셈(구구단)',
    kind: 'csv',
    path: './assets/quiz/data/division-gugudan-2to9.csv'
  },
  {
    id: 'make-10-addition',
    label: '더해서 10 만들기',
    kind: 'csv',
    path: './assets/quiz/data/make-10-addition.csv'
  },
  {
    id: 'make-100-addition',
    label: '더해서 100 만들기',
    kind: 'csv',
    path: './assets/quiz/data/make-100-addition.csv'
  },
  {
    id: 'make-10-100-1000-multiplication',
    label: '10·100·1000 만들기 곱셈',
    kind: 'csv',
    path: './assets/quiz/data/make-10-100-1000-multiplication.csv'
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

const PRACTICE_RECORD_CONFIGS = Object.freeze({
  gugudan: Object.freeze({
    packId: 'gugudan',
    sourceLabel: '구구단',
    filePrefix: '구구단',
    recordNoun: '구구단 풀이',
    statusTitle: '내 구구단 상태',
    recordTitle: '구구단 학습 기록 저장',
    reportKicker: 'Gugudan Report',
    groupHeader: '많이 틀린 구구단 단수',
    groupStatusTitle: '오답이 많은 단',
    factHeader: '많이 틀린 곱셈',
    factStatusTitle: '오답이 많은 문항',
    heatmapTitle: '구구단 지도',
    heatmapAria: '구구단 문항별 상태',
    heatmapCorner: '×'
  }),
  'division-gugudan': Object.freeze({
    packId: 'division-gugudan',
    sourceLabel: '나눗셈(구구단)',
    filePrefix: '나눗셈구구단',
    recordNoun: '나눗셈 풀이',
    statusTitle: '내 나눗셈(구구단) 상태',
    recordTitle: '나눗셈(구구단) 학습 기록 저장',
    reportKicker: 'Division Report',
    groupHeader: '많이 틀린 나누는 수',
    groupStatusTitle: '오답이 많은 나누는 수',
    factHeader: '많이 틀린 나눗셈',
    factStatusTitle: '오답이 많은 나눗셈',
    heatmapTitle: '나눗셈 지도',
    heatmapAria: '나눗셈 문항별 상태',
    heatmapCorner: '÷'
  })
});

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
    hpMulBase: 1.46,
    hpMulTierStep: 0.02,
    speedMul: 0.94,
    touchMulBase: 1.38,
    touchMulTierStep: 0.025,
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
    hpMulBase: 1.76,
    hpMulTierStep: 0.08,
    hpTier10MulBase: 1.04,
    hpTier10MulStep: 0.07,
    speedMulBase: 1.08,
    speedMulTierStep: 0.02,
    speedTier10MulBase: 1.01,
    speedTier10MulStep: 0.02,
    touchMulBase: 1.32,
    touchMulTierStep: 0.07,
    touchTier10MulBase: 1.04,
    touchTier10MulStep: 0.07,
    renderSizeAdd: 6,
    renderSizeMulBase: 1.09,
    renderSizeMulTierStep: 0.02,
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

const ENEMY_VARIANT_VISUAL_CACHE = Object.freeze({
  hardened: Object.freeze({
    ...ENEMY_STRENGTH_VARIANTS.hardened.visual,
    cacheKey: 'hardened',
    badge: Object.freeze({
      text: ENEMY_STRENGTH_VARIANTS.hardened.visual.label,
      fill: ENEMY_STRENGTH_VARIANTS.hardened.visual.fill,
      stroke: ENEMY_STRENGTH_VARIANTS.hardened.visual.stroke,
      color: ENEMY_STRENGTH_VARIANTS.hardened.visual.color
    }),
    compositeCacheKey: [
      'hardened',
      ENEMY_STRENGTH_VARIANTS.hardened.visual.outline || '',
      ENEMY_STRENGTH_VARIANTS.hardened.visual.outerOutline || '',
      ...ENEMY_STRENGTH_VARIANTS.hardened.visual.tintLayers
    ].join('|')
  }),
  elite: Object.freeze({
    ...ENEMY_STRENGTH_VARIANTS.elite.visual,
    cacheKey: 'elite',
    badge: Object.freeze({
      text: ENEMY_STRENGTH_VARIANTS.elite.visual.label,
      fill: ENEMY_STRENGTH_VARIANTS.elite.visual.fill,
      stroke: ENEMY_STRENGTH_VARIANTS.elite.visual.stroke,
      color: ENEMY_STRENGTH_VARIANTS.elite.visual.color
    }),
    compositeCacheKey: [
      'elite',
      ENEMY_STRENGTH_VARIANTS.elite.visual.outline || '',
      ENEMY_STRENGTH_VARIANTS.elite.visual.outerOutline || '',
      ...ENEMY_STRENGTH_VARIANTS.elite.visual.tintLayers
    ].join('|')
  }),
  eliteMax: Object.freeze({
    ...ENEMY_STRENGTH_VARIANTS.elite.visual,
    ...ENEMY_STRENGTH_VARIANTS.elite.visual.max,
    cacheKey: 'elite-max',
    badge: Object.freeze({
      text: ENEMY_STRENGTH_VARIANTS.elite.visual.label,
      fill: ENEMY_STRENGTH_VARIANTS.elite.visual.fill,
      stroke: ENEMY_STRENGTH_VARIANTS.elite.visual.stroke,
      color: ENEMY_STRENGTH_VARIANTS.elite.visual.color
    }),
    compositeCacheKey: [
      'elite-max',
      ENEMY_STRENGTH_VARIANTS.elite.visual.max.outline || ENEMY_STRENGTH_VARIANTS.elite.visual.outline || '',
      ENEMY_STRENGTH_VARIANTS.elite.visual.max.outerOutline || ENEMY_STRENGTH_VARIANTS.elite.visual.outerOutline || '',
      ...ENEMY_STRENGTH_VARIANTS.elite.visual.max.tintLayers
    ].join('|')
  })
});

const ENEMY_BADGE_EMPTY = Object.freeze({ text: '', fill: '', stroke: '', color: '' });
const ENEMY_ROLE_BADGES = Object.freeze({
  commander: Object.freeze({ text: '지휘', fill: 'rgba(120, 53, 15, 0.9)', stroke: 'rgba(253, 230, 138, 0.58)', color: '#fef3c7' }),
  summoner: Object.freeze({ text: '소환', fill: 'rgba(30, 58, 138, 0.9)', stroke: 'rgba(191, 219, 254, 0.52)', color: '#dbeafe' }),
  charger: Object.freeze({ text: '돌진', fill: 'rgba(124, 45, 18, 0.88)', stroke: 'rgba(254, 215, 170, 0.48)', color: '#ffedd5' })
});
const ENEMY_ALWAYS_INFO_ROLES = new Set(['commander', 'summoner', 'armored', 'adaptive']);

const SHIP_SRC = './assets/battleship/battleship-ship.png';
const ENEMY_ASSET_BASE = './assets/battleship/';
const SHIP_SPRITE_CROP = Object.freeze({ x: 354, y: 43, width: 316, height: 482 });

const ELITE_UNLOCK_TIME_SEC = 180;
const ENEMY_TIER_UNLOCK_STEP_SEC = 20;
const ELITE_TIER_UNLOCK_STEP_SEC = 24;
const SPAWN_START_COOLDOWN_MS = 1850;
const SPAWN_MIN_COOLDOWN_MS = 560;
const SPAWN_DECAY_PER_SEC = 4.6;
const HP_GROWTH_STEP_SEC = 24;
const HP_GROWTH_PER_STEP = 0.1;
const SPEED_GROWTH_STEP_SEC = 34;
const SPEED_GROWTH_PER_STEP = 0.07;
const TOUCH_GROWTH_STEP_SEC = 40;
const TOUCH_GROWTH_PER_STEP = 0.075;
const SIZE_GROWTH_STEP_SEC = 75;
const ENEMY_HP_RANDOM_SPREAD = 5;
const ENEMY_SPEED_RANDOM_SPREAD = 9;
const ENEMY_FLOW_PULSE_STRENGTH = 0.045;
const ENEMY_FLOW_PULSE_COOLDOWN_FACTOR = 0.28;
const ENEMY_LATE_SOFTCAP = 30;
const ENEMY_MAX_ACTIVE_CAP = 31;
const ENEMY_BURST_BASE_CHANCE = 0.09;
const ENEMY_BURST_MAX_CHANCE = 0.27;
const ENEMY_BURST_GROWTH_SEC = 1280;
const ENEMY_BURST_LATE_PRESSURE_STEP = 0.012;
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
const MULTI_BATTLE_QUIZ_WORLD_SLOW_RATIO = 0.68;
const BOARD_MULTI_BATTLE_QUIZ_WORLD_SLOW_RATIO = 0.82;
const SHIP_BASE_MAX_HP = 300;
const SHIP_BASE_ATTACK_POWER = 12;
const SHIP_BASE_ATTACK_COOLDOWN_MS = 700;
const SHIP_INITIAL_ATTACK_COOLDOWN_MS = 1000;
const SHIP_ATTACK_SPEED_LEVEL_STEP = 0.075;
const SHIP_ATTACK_POWER_LEVEL_STEP = 0.11;
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
const BATTLESHIP_RESPAWN_INVULN_MS = 1200;
const BATTLESHIP_DEFEAT_FLASH_MS = 1150;
const BATTLESHIP_DEFEAT_SPAWN_RESTART_MS = 420;
const BATTLESHIP_DEFEAT_PENALTY_MIN = 180;
const BATTLESHIP_DEFEAT_PENALTY_SCORE_RATIO = 0.12;
const BATTLESHIP_DEFEAT_PENALTY_WAVE_STEP = 45;
const BATTLESHIP_REPAIR_QUIZ_REQUIRED = 3;
const BATTLESHIP_REPAIR_QUIZ_OPEN_DELAY_MS = 1000;
const PROJECTILE_RENDER_RADIUS_RATIO = 0.66;
const PROJECTILE_RENDER_STROKE_WIDTH = 1.35;
const EARLY_ATTACK_SLOW_WINDOW_SEC = 70;
const EARLY_ATTACK_SLOW_MAX_RATIO = SHIP_INITIAL_ATTACK_COOLDOWN_MS / SHIP_BASE_ATTACK_COOLDOWN_MS;
const QUIZ_SCORE_BASE = 120;
const QUIZ_SCORE_DIFFICULTY_STEP = 35;
const QUIZ_COMBO_SCORE_STEP = 0.06;
const QUIZ_COMBO_SCORE_MAX = 0.72;
const QUIZ_BURST_QUESTION_COUNT = 3;
const QUIZ_AUTO_NEXT_DELAY_MS = 760;
const QUIZ_AUTO_CLOSE_DELAY_MS = 920;
const HUD_REFRESH_INTERVAL_MS = 140;
const HUD_IDLE_REFRESH_INTERVAL_MS = 520;
const CANVAS_SYNC_INTERVAL_MS = 220;
const CANVAS_MAX_BACKING_PIXELS = 2600000;
const MIN_START_LOADING_MS = 850;
const MULTI_START_LOADING_MS = 1300;
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
const WEAKNESS_PRACTICE_MIN_READY_MS = 350;
const KILL_SCORE_BASE = 25;
const KILL_SCORE_TIER_STEP = 14;
const KILL_SCORE_COMBO_STEP = 0.015;
const KILL_SCORE_COMBO_MAX = 0.36;
const KILL_SCORE_ROLE_BONUS = 24;
const KILL_SCORE_HARDENED_BONUS = 32;
const KILL_SCORE_ELITE_BASE_BONUS = 88;
const KILL_SCORE_ELITE_TIER_BONUS = 9;
const KILL_RUSH_BONUS_BASE = 125;
const KILL_RUSH_BONUS_WAVE_STEP = 9;
const ENEMY_BADGE_SPRITE_CACHE_LIMIT = 96;
const ENEMY_SHADOW_SPRITE_CACHE_LIMIT = 220;
const ENEMY_SPRITE_CACHE_DPR = 2;
const projectileAngleOffsetCache = new Map();
const explosionFrameCache = new Map();
const warmedExplosionLevels = new Set();
const enemyBadgeSpriteCache = new Map();
const enemyShadowSpriteCache = new Map();
let explosionWarmupTail = Promise.resolve();
let enemyBadgeMeasureCtx = null;

const elements = {
  setupScreen: $('#setup-screen'),
  playScreen: $('#play-screen'),
  resultScreen: $('#result-screen'),
  quizPack: $('#quiz-pack'),
  playMinutes: $('#play-minutes'),
  modeOptions: $('#mode-options'),
  qrToggle: $('#qr-toggle'),
  qrModal: $('#qr-modal'),
  qrCloseButton: $('#qr-close-button'),
  gugudanReportModal: $('#gugudan-report-modal'),
  gugudanReportKicker: $('#gugudan-report-kicker'),
  gugudanReportTitle: $('#gugudan-report-title'),
  gugudanReportCloseButton: $('#gugudan-report-close-button'),
  gugudanReportSubtitle: $('#gugudan-report-subtitle'),
  gugudanReportBody: $('#gugudan-report-body'),
  practiceRecordManagerModal: $('#practice-record-manager-modal'),
  practiceRecordManagerCloseButton: $('#practice-record-manager-close-button'),
  practiceRecordManagerCurrentStudent: $('#practice-record-manager-current-student'),
  practiceRecordManagerSwitchButton: $('#practice-record-manager-switch-button'),
  practiceRecordManagerList: $('#practice-record-manager-list'),
  fullscreenToggles: $$('.fullscreen-toggle'),
  displayModeToggle: $('#display-mode-toggle'),
  initialDisplayModeModal: $('#initial-display-mode-modal'),
  initialDisplayModeOptions: $('#initial-display-mode-options'),
  playerOptions: $('#player-options'),
  startButton: $('#start-button'),
  setupError: $('#setup-error'),
  gugudanStatusCheck: $('#gugudan-status-check'),
  gugudanStatusToggle: $('#gugudan-status-toggle'),
  practiceCurrentStudent: $('#practice-current-student'),
  practiceCurrentStudentHint: $('#practice-current-student-hint'),
  practiceStudentSwitchButton: $('#practice-student-switch-button'),
  practiceRecordManagerButton: $('#practice-record-manager-button'),
  gugudanStatusButton: $('#gugudan-status-button'),
  gugudanStatusFile: $('#gugudan-status-file'),
  gugudanWeaknessPracticeButton: $('#gugudan-weakness-practice-button'),
  gugudanWeaknessPracticeFile: $('#gugudan-weakness-practice-file'),
  gugudanImportRecordsButton: $('#gugudan-import-records-button'),
  gugudanMergeRecordsButton: $('#gugudan-merge-records-button'),
  gugudanMergeRecordsFile: $('#gugudan-merge-records-file'),
  divisionStatusButton: $('#division-status-button'),
  divisionStatusFile: $('#division-status-file'),
  divisionGugudanWeaknessPracticeButton: $('#division-gugudan-weakness-practice-button'),
  divisionGugudanWeaknessPracticeFile: $('#division-gugudan-weakness-practice-file'),
  divisionImportRecordsButton: $('#division-import-records-button'),
  divisionMergeRecordsButton: $('#division-merge-records-button'),
  divisionMergeRecordsFile: $('#division-merge-records-file'),
  gugudanStatusPanel: $('#gugudan-status-panel'),
  startLoading: $('#start-loading'),
  startLoadingGrid: $('#start-loading-grid'),
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
  gugudanDownloadBackupButton: $('#gugudan-download-backup-button'),
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
let selectedMinutes = 2;
let setupMessageKind = '';
let startLoading = false;
let combatAssetsWarmed = false;
let initialDisplayModePromptShown = false;
let startLoadingLayoutSignature = '';
let activeWeaknessPractice = null;
let selectedPracticeStudentId = '';
let session = null;
let battleCanvas = null;
let battleCtx = null;
let battleBackgroundCanvas = null;
let battleBackgroundCtx = null;
let battleViews = [];
let currentBattleIndex = 0;
let battleAnimationId = 0;
let lastReportFocusElement = null;
const recentPointerControls = new WeakMap();
let quizTextFitFrameId = 0;
const quizTextFitRoots = new Set();

const BATTLE_TEXT_REFS = [
  'player-summary',
  'ship-hp',
  'score-points',
  'kill-combo',
  'resource-score',
  'attack-stat'
];

const POINTER_CLICK_SUPPRESS_MS = 850;

const ENEMY_OUTLINE_DIRECTIONS = Object.freeze([
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-0.72, -0.72],
  [0.72, -0.72],
  [-0.72, 0.72],
  [0.72, 0.72]
]);

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

function createSpawnEnemyPlan(threatRandom, positionRandom = threatRandom) {
  return {
    sideRoll: positionRandom(),
    laneRoll: positionRandom(),
    definitionRoll: threatRandom(),
    eliteRoll: threatRandom(),
    hardenedRoll: threatRandom(),
    hpRoll: threatRandom(),
    speedRoll: threatRandom(),
    wobbleRoll: positionRandom()
  };
}

function createSpawnEventPlan(threatRandom, positionRandom = threatRandom) {
  return {
    burstRoll: threatRandom(),
    enemies: [
      createSpawnEnemyPlan(threatRandom, positionRandom),
      createSpawnEnemyPlan(threatRandom, positionRandom)
    ]
  };
}

function getSpawnPlanSize(durationSec) {
  const spawnTicks = Math.ceil((Math.max(60, Number(durationSec) || 60) * 1000) / SPAWN_MIN_COOLDOWN_MS);
  return spawnTicks + SPAWN_PLAN_BUFFER;
}

function createSpawnPlan(sessionSeed, playerIndex, durationSec) {
  const threatRandom = createSeededRandom(hashSeed(`${sessionSeed}:spawn-plan:threat:${durationSec}`));
  const positionRandom = createSeededRandom(hashSeed(`${sessionSeed}:spawn-plan:position:${playerIndex}:${durationSec}`));
  return Array.from({ length: getSpawnPlanSize(durationSec) }, () => createSpawnEventPlan(threatRandom, positionRandom));
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

function countTextChars(value) {
  return Array.from(String(value ?? '').trim()).length;
}

function getTextScaleClass(value, prefix) {
  const length = countTextChars(value);
  if (length <= 3) return `${prefix}-tiny`;
  if (length <= 8) return `${prefix}-short`;
  if (length <= 18) return `${prefix}-medium`;
  return `${prefix}-long`;
}

function getChoiceTextClasses(value) {
  const text = String(value ?? '').trim();
  const classes = [getTextScaleClass(text, 'choice-text')];
  if (/^-?\d+(?:[.,]\d+)?$/.test(text)) classes.push('is-numeric-choice');
  return classes;
}

function getPracticeRecordConfig(packId = session?.packId) {
  return PRACTICE_RECORD_CONFIGS[packId] || null;
}

function getPracticeGroupLabel(dan, config = getPracticeRecordConfig()) {
  const value = Number(dan);
  if (config?.packId === 'division-gugudan') return `${value}로 나누기`;
  return `${value}단`;
}

function getPracticeGridKey(dan, multiplier, config = getPracticeRecordConfig()) {
  if (config?.packId === 'division-gugudan') return `${dan}÷${multiplier}`;
  return `${dan}x${multiplier}`;
}

function getPracticeGridExpression(dan, multiplier, config = getPracticeRecordConfig()) {
  if (config?.packId === 'division-gugudan') return `${dan * multiplier}÷${dan}`;
  return `${dan}×${multiplier}`;
}

function getPracticeFactFromMultiplication(text) {
  const match = text.match(/(\d+)\s*(?:x|×|\*)\s*(\d+)/i);
  if (!match) return null;
  const dan = Number(match[1]);
  const multiplier = Number(match[2]);
  if (!Number.isFinite(dan) || !Number.isFinite(multiplier)) return null;
  return {
    packId: 'gugudan',
    dan,
    multiplier,
    key: `${dan}x${multiplier}`,
    expression: `${dan}x${multiplier}`,
    label: `${dan} x ${multiplier}`
  };
}

function getPracticeFactFromDivision(text) {
  const match = text.match(/(\d+)\s*(?:÷|\/)\s*(\d+)/i);
  if (!match) return null;
  const dividend = Number(match[1]);
  const divisor = Number(match[2]);
  if (!Number.isFinite(dividend) || !Number.isFinite(divisor) || divisor === 0) return null;
  const quotient = dividend / divisor;
  if (!Number.isInteger(quotient)) return null;
  return {
    packId: 'division-gugudan',
    dan: divisor,
    multiplier: quotient,
    key: `${divisor}÷${quotient}`,
    expression: `${dividend}÷${divisor}`,
    label: `${dividend} ÷ ${divisor}`
  };
}

function getGugudanFact(question, packId = '') {
  const text = String(question?.text || question?.prompt || '').trim();
  if (packId === 'division-gugudan') return getPracticeFactFromDivision(text);
  if (packId === 'gugudan') return getPracticeFactFromMultiplication(text);
  return getPracticeFactFromMultiplication(text) || getPracticeFactFromDivision(text);
}

function createEmptyGugudanAggregate(fact) {
  return {
    key: fact.key,
    packId: fact.packId || '',
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
      packId: record.packId,
      dan: record.dan,
      multiplier: record.multiplier,
      key: record.factKey || getPracticeGridKey(record.dan, record.multiplier, getPracticeRecordConfig(record.packId)),
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

function parseGugudanCsvAggregate(text, options = {}) {
  const rows = csvRowsToObjects(text);
  const factMap = new Map();
  const studentIds = new Set();
  const packLabels = new Set();
  const config = options.config || getPracticeRecordConfig(options.packId);
  rows.forEach((row) => {
    const studentId = String(row['학생번호'] || '').trim();
    if (studentId) studentIds.add(studentId);
    const packLabel = String(row['퀴즈팩'] || '').trim();
    if (packLabel) packLabels.add(packLabel);
    const rowType = String(row['행구분'] || '').trim();
    const expression = String(row['식'] || row['문항'] || '').trim();
    if (rowType && rowType !== '문항') return;
    if (!expression) return;
    const fact = getGugudanFact({ text: expression }, config?.packId || '');
    if (!fact) return;
    addGugudanAggregate(factMap, fact, {
      attempts: getCsvNumber(row['시도']),
      correct: getCsvNumber(row['정답']),
      wrong: getCsvNumber(row['오답']),
      lastWrongAt: row['최근오답시각']
    });
  });
  return { factMap, studentIds, packLabels };
}

function createEmptyLocalPracticeStore() {
  return {
    version: 1,
    activeStudentByPack: {},
    records: {}
  };
}

function isLocalPracticeStorageAvailable() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch (error) {
    return false;
  }
}

function normalizeLocalPracticeStore(parsed) {
  if (!parsed || typeof parsed !== 'object') return createEmptyLocalPracticeStore();
  return {
    version: 1,
    activeStudentByPack: parsed.activeStudentByPack && typeof parsed.activeStudentByPack === 'object'
      ? parsed.activeStudentByPack
      : {},
    records: parsed.records && typeof parsed.records === 'object'
      ? parsed.records
      : {}
  };
}

function hasLocalPracticeStoreRecords(store) {
  return Object.values(store?.records || {}).some((packRecords) => (
    packRecords && typeof packRecords === 'object' && Object.keys(packRecords).length > 0
  ));
}

function mergeLocalPracticeStore(target, source) {
  Object.entries(source?.activeStudentByPack || {}).forEach(([packId, studentId]) => {
    if (studentId && !target.activeStudentByPack[packId]) {
      target.activeStudentByPack[packId] = studentId;
    }
  });
  Object.entries(source?.records || {}).forEach(([packId, packRecords]) => {
    if (!packRecords || typeof packRecords !== 'object') return;
    if (!target.records[packId]) target.records[packId] = {};
    Object.entries(packRecords).forEach(([studentId, entry]) => {
      if (!entry || !Array.isArray(entry.facts)) return;
      const existing = target.records[packId][studentId];
      if (!existing?.facts) {
        target.records[packId][studentId] = entry;
        return;
      }
      const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
      const mergedMap = deserializeGugudanFactMap(existing.facts, config);
      mergeGugudanFactMap(mergedMap, deserializeGugudanFactMap(entry.facts, config), config);
      const updatedAt = [existing.updatedAt, entry.updatedAt].filter(Boolean).sort().at(-1) || existing.updatedAt || entry.updatedAt || '';
      target.records[packId][studentId] = {
        ...existing,
        ...entry,
        updatedAt,
        facts: serializeGugudanFactMap(mergedMap)
      };
    });
  });
  return target;
}

function removeLegacyLocalPracticeStores() {
  if (!isLocalPracticeStorageAvailable()) return;
  try {
    LOCAL_PRACTICE_LEGACY_STORE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch (error) {
    // Migration already wrote the shared store; stale legacy keys can remain if cleanup fails.
  }
}

function readLocalPracticeStore() {
  if (!isLocalPracticeStorageAvailable()) return null;
  const store = createEmptyLocalPracticeStore();
  let foundLegacyRecords = false;
  try {
    [LOCAL_PRACTICE_STORE_KEY, ...LOCAL_PRACTICE_LEGACY_STORE_KEYS].forEach((key) => {
      const parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
      const normalized = normalizeLocalPracticeStore(parsed);
      if (key !== LOCAL_PRACTICE_STORE_KEY && hasLocalPracticeStoreRecords(normalized)) {
        foundLegacyRecords = true;
      }
      mergeLocalPracticeStore(store, normalized);
    });
    if (foundLegacyRecords && hasLocalPracticeStoreRecords(store)) {
      window.localStorage.setItem(LOCAL_PRACTICE_STORE_KEY, JSON.stringify(store));
      removeLegacyLocalPracticeStores();
    }
    return store;
  } catch (error) {
    return createEmptyLocalPracticeStore();
  }
}

function writeLocalPracticeStore(store) {
  if (!isLocalPracticeStorageAvailable()) return false;
  try {
    window.localStorage.setItem(LOCAL_PRACTICE_STORE_KEY, JSON.stringify(store || createEmptyLocalPracticeStore()));
    return true;
  } catch (error) {
    return false;
  }
}

function serializeGugudanFactMap(factMap) {
  return getSortedGugudanFacts(factMap).map((item) => ({
    key: item.key,
    packId: item.packId,
    dan: item.dan,
    multiplier: item.multiplier,
    expression: item.expression,
    attempts: item.attempts,
    correct: item.correct,
    wrong: item.wrong,
    lastWrongAt: item.lastWrongAt || ''
  }));
}

function deserializeGugudanFactMap(items = [], config = getPracticeRecordConfig()) {
  const factMap = new Map();
  (Array.isArray(items) ? items : []).forEach((item) => {
    const dan = Math.round(Number(item?.dan) || 0);
    const multiplier = Math.round(Number(item?.multiplier) || 0);
    if (dan < 2 || dan > 9 || multiplier < 1 || multiplier > 9) return;
    addGugudanAggregate(factMap, {
      packId: config?.packId || item.packId || '',
      dan,
      multiplier,
      key: item?.key || getPracticeGridKey(dan, multiplier, config),
      expression: item?.expression || getPracticeGridExpression(dan, multiplier, config)
    }, item);
  });
  return factMap;
}

function getLocalPracticeEntry(packId = 'gugudan', studentId = '') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const store = readLocalPracticeStore();
  if (!store) return null;
  const safeStudentId = getSafeStudentId(studentId || store.activeStudentByPack?.[config.packId] || '');
  if (!safeStudentId) return null;
  const entry = store.records?.[config.packId]?.[safeStudentId];
  if (!entry || !Array.isArray(entry.facts)) return null;
  return {
    store,
    config,
    studentId: safeStudentId,
    entry,
    record: {
      version: 1,
      packId: config.packId,
      studentId: safeStudentId,
      studentIds: new Set([safeStudentId]),
      sourceLabel: entry.sourceLabel || config.sourceLabel,
      createdAt: String(entry.createdAt || ''),
      updatedAt: String(entry.updatedAt || ''),
      factMap: deserializeGugudanFactMap(entry.facts, config)
    }
  };
}

function getLocalPracticeActiveStudent(packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const store = readLocalPracticeStore();
  return getSafeStudentId(store?.activeStudentByPack?.[config.packId] || '');
}

function getPreferredPracticeStudentId(packId = '') {
  const explicit = getSafeStudentId(selectedPracticeStudentId);
  if (explicit) return explicit;
  if (packId) return getLocalPracticeActiveStudent(packId);
  return getLocalPracticeActiveStudent('gugudan') || getLocalPracticeActiveStudent('division-gugudan');
}

function getPracticeStudentSummaryText() {
  const preferred = getPreferredPracticeStudentId();
  if (preferred) return `${preferred}번`;
  const gugudanStudent = getLocalPracticeActiveStudent('gugudan');
  const divisionStudent = getLocalPracticeActiveStudent('division-gugudan');
  if (gugudanStudent && divisionStudent && gugudanStudent !== divisionStudent) {
    return `구구단 ${gugudanStudent}번 · 나눗셈 ${divisionStudent}번`;
  }
  return '아직 선택 안 됨';
}

function setLocalPracticeActiveStudent(studentId, packId = '') {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId || !isLocalPracticeStorageAvailable()) return false;
  const store = readLocalPracticeStore();
  if (!store) return false;
  const packIds = packId
    ? [packId]
    : Object.keys(PRACTICE_RECORD_CONFIGS);
  packIds.forEach((id) => {
    const config = getPracticeRecordConfig(id);
    if (config) store.activeStudentByPack[config.packId] = safeStudentId;
  });
  return writeLocalPracticeStore(store);
}

function updateResultRecordStudentUi() {
  const panel = elements.gugudanRecordPanel;
  if (!panel || panel.classList.contains('is-hidden')) return;
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const preferred = getPreferredPracticeStudentId(config.packId);
  const currentValue = getSafeStudentId(elements.gugudanStudentId?.value || '');
  if (preferred && elements.gugudanStudentId && !currentValue) {
    elements.gugudanStudentId.value = preferred;
  }
  const studentId = getSafeStudentId(elements.gugudanStudentId?.value || preferred || '');
  if (elements.gugudanDownloadCurrentButton) {
    elements.gugudanDownloadCurrentButton.textContent = studentId
      ? `${studentId}번 기록으로 저장하기`
      : '학생번호 입력 후 저장하기';
  }
}

function refreshPracticeStudentUi() {
  const summaryText = getPracticeStudentSummaryText();
  const preferred = getPreferredPracticeStudentId();
  if (elements.practiceCurrentStudent) {
    elements.practiceCurrentStudent.textContent = summaryText;
  }
  if (elements.practiceCurrentStudentHint) {
    elements.practiceCurrentStudentHint.textContent = preferred
      ? '저장과 상태 확인은 이 번호 기준으로 시작합니다.'
      : '결과 저장 전에 번호를 확인하세요.';
  }
  if (elements.practiceRecordManagerCurrentStudent) {
    elements.practiceRecordManagerCurrentStudent.textContent = summaryText;
  }
  updateResultRecordStudentUi();
}

function setPreferredPracticeStudentId(studentId, options = {}) {
  const safeStudentId = getSafeStudentId(studentId);
  selectedPracticeStudentId = safeStudentId;
  if (safeStudentId && options.persist !== false) {
    setLocalPracticeActiveStudent(safeStudentId, options.packId || '');
  }
  refreshPracticeStudentUi();
  return safeStudentId;
}

function promptPracticeStudentSwitch() {
  const current = getPreferredPracticeStudentId();
  const entered = getSafeStudentId(window.prompt(
    '현재 사용할 학생번호를 입력하세요.\n결과 저장과 내 상태 확인이 이 번호 기준으로 시작됩니다.',
    current
  ) || '');
  if (!entered) return;
  if (!window.confirm(
    `${entered}번을 이 기기의 현재 학생번호로 표시합니다.\n\n`
    + '지금 이 기기를 사용하는 학생의 번호가 맞나요?'
  )) {
    return;
  }
  setPreferredPracticeStudentId(entered);
}

function loadLocalGugudanRecord(studentId, packId = 'gugudan') {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId) return null;
  return getLocalPracticeEntry(packId, safeStudentId)?.record || null;
}

function getLocalGugudanRecordSummaries(packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const store = readLocalPracticeStore();
  const records = store?.records?.[config.packId] || {};
  const summaries = [];
  Object.entries(records).forEach(([studentId, entry]) => {
    const safeStudentId = getSafeStudentId(entry?.studentId || studentId);
    if (!safeStudentId || !Array.isArray(entry?.facts)) return;
    const local = getLocalPracticeEntry(config.packId, safeStudentId);
    if (!local?.record?.factMap?.size) return;
    const summary = getGugudanAggregateSummary(local.record.factMap);
    summaries.push({
      studentId: safeStudentId,
      packId: config.packId,
      config,
      record: local.record,
      updatedAt: local.record.updatedAt,
      attempts: summary.attempts,
      wrong: summary.wrong,
      accuracy: formatAccuracy(summary.correct, summary.attempts)
    });
  });
  return summaries.sort((left, right) => (
    String(right.updatedAt).localeCompare(String(left.updatedAt))
    || String(left.studentId).localeCompare(String(right.studentId), 'ko-KR')
  ));
}

function selectLocalGugudanRecord(packId = 'gugudan', purposeText = '확인') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const summaries = getLocalGugudanRecordSummaries(config.packId);
  if (!summaries.length) return null;
  const preferred = getPreferredPracticeStudentId(config.packId);
  if (preferred) {
    const matched = summaries.find((item) => item.studentId === preferred);
    if (matched) {
      setPreferredPracticeStudentId(matched.studentId, { packId: config.packId });
      return matched;
    }
  }
  if (summaries.length === 1) {
    setPreferredPracticeStudentId(summaries[0].studentId, { packId: config.packId });
    return summaries[0];
  }
  const savedIds = summaries.map((item) => item.studentId).join(', ');
  const requestedId = getSafeStudentId(window.prompt(
    `${config.sourceLabel} 로컬 기록이 여러 개 있습니다.\n${purposeText}할 학생번호를 입력하세요.\n저장된 학생번호: ${savedIds}`,
    summaries[0].studentId
  ) || '');
  const selected = summaries.find((item) => item.studentId === requestedId);
  if (!selected) {
    setGugudanStatusPanel('저장된 학생번호 중 하나를 정확히 입력해야 합니다.', 'error');
    return null;
  }
  setPreferredPracticeStudentId(selected.studentId, { packId: config.packId });
  return selected;
}

function saveLocalPracticeRecord(packId, studentId, factMap, options = {}) {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId || !factMap?.size) return null;
  const store = readLocalPracticeStore();
  if (!store) return null;
  if (!store.records[config.packId]) store.records[config.packId] = {};
  const existing = store.records[config.packId][safeStudentId];
  const mergedMap = options.replace ? new Map() : (
    existing?.facts
      ? deserializeGugudanFactMap(existing.facts, config)
      : new Map()
  );
  mergeGugudanFactMap(mergedMap, factMap, config);
  const now = new Date();
  const nowText = now.toISOString();
  store.records[config.packId][safeStudentId] = {
    studentId: safeStudentId,
    sourceLabel: config.sourceLabel,
    createdAt: existing?.createdAt || nowText,
    updatedAt: nowText,
    facts: serializeGugudanFactMap(mergedMap)
  };
  store.activeStudentByPack[config.packId] = safeStudentId;
  if (!writeLocalPracticeStore(store)) return null;
  selectedPracticeStudentId = safeStudentId;
  refreshPracticeStudentUi();
  return {
    factMap: mergedMap,
    studentIds: new Set([safeStudentId]),
    studentId: safeStudentId,
    updatedAt: now
  };
}

function getLocalPracticeConfirmMessage(packId, studentId, mode = 'save') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const activeStudentId = getLocalPracticeActiveStudent(config.packId);
  let actionText = '이번 기록을 이 기기에 누적 저장합니다.';
  if (mode === 'backup') {
    actionText = 'CSV 백업을 만들기 전에 이번 기록을 이 기기 로컬 저장에 먼저 반영합니다.';
  } else if (mode === 'import') {
    actionText = [
      'CSV 백업 파일 내용으로 이 기기의 로컬 상태를 바꿉니다.',
      '지금 이 기기에 저장된 로컬 기록은 선택한 CSV 내용으로 대체됩니다.',
      '오래된 CSV라면 최근 풀이 기록이 사라질 수 있습니다.'
    ].join('\n');
  }
  const activeText = activeStudentId && activeStudentId !== studentId
    ? `\n현재 이 기기의 ${config.sourceLabel} 사용자는 ${activeStudentId}번으로 되어 있습니다.`
    : '';
  return [
    `${studentId}번 학생이 이 기기의 실제 사용자 맞나요?`,
    actionText,
    '공용 기기라면 다른 학생 기록과 섞일 수 있습니다.',
    activeText,
    '맞으면 확인을 눌러 계속합니다.'
  ].filter(Boolean).join('\n');
}

function getWeaknessPracticeLabel(packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  return `${config.sourceLabel} 취약점 연습`;
}

function getActiveWeaknessPractice(packId = selectedPackId) {
  if (!activeWeaknessPractice) return null;
  return activeWeaknessPractice.packId === packId ? activeWeaknessPractice : null;
}

function clearWeaknessPractice(message = '') {
  if (!activeWeaknessPractice) return;
  activeWeaknessPractice = null;
  if (message) setSetupMessage(message, 'note');
}

function getWeaknessPracticeInput(packId = 'gugudan') {
  return packId === 'division-gugudan'
    ? elements.divisionGugudanWeaknessPracticeFile
    : elements.gugudanWeaknessPracticeFile;
}

function renderWeaknessPracticeStatus(message, packId = 'gugudan', options = {}) {
  const panel = elements.gugudanStatusPanel;
  if (!panel) return;
  setGugudanStatusExpanded(true);
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const busy = options.kind === 'busy';
  const error = options.kind === 'error';
  const metrics = Array.isArray(options.metrics) ? options.metrics : [];
  panel.classList.remove('is-empty', 'is-error', 'is-success');
  panel.classList.toggle('is-error', error);
  panel.classList.toggle('is-success', !error);
  panel.innerHTML = `
    <div class="gugudan-status-heading">
      <b>${escapeHtml(getWeaknessPracticeLabel(packId))}</b>
      <span>${escapeHtml(busy ? '취약점 분석 중' : (options.fileName || '기록 파일'))}</span>
    </div>
    ${metrics.length ? `
      <div class="gugudan-status-summary">
        ${metrics.map(([label, value]) => `
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        `).join('')}
      </div>
    ` : ''}
    <p class="gugudan-status-message${error ? '' : ' is-strong'}">${escapeHtml(message)}</p>
    <em>${escapeHtml(options.footer || '로컬 기록 또는 CSV 백업을 기준으로 취약점 연습을 준비합니다.')}</em>
  `;
}

function getPracticeAnswerRange(packId = 'gugudan') {
  return packId === 'division-gugudan'
    ? { min: 1, max: 9 }
    : { min: 2, max: 81 };
}

function createPracticeChoiceValues(answer, fact, packId = 'gugudan') {
  const safeAnswer = Math.round(Number(answer) || 0);
  const range = getPracticeAnswerRange(packId);
  const values = new Set([safeAnswer]);
  const add = (value) => {
    const next = Math.round(Number(value) || 0);
    if (next >= range.min && next <= range.max) values.add(next);
  };

  if (packId === 'division-gugudan') {
    add(safeAnswer - 2);
    add(safeAnswer - 1);
    add(safeAnswer + 1);
    add(safeAnswer + 2);
  } else {
    const dan = Math.round(Number(fact?.dan) || 0);
    const multiplier = Math.round(Number(fact?.multiplier) || 0);
    add(dan * (multiplier - 1));
    add(dan * (multiplier + 1));
    add((dan - 1) * multiplier);
    add((dan + 1) * multiplier);
    add(safeAnswer - dan);
    add(safeAnswer + dan);
  }

  for (let offset = 1; values.size < 4 && offset <= 12; offset += 1) {
    add(safeAnswer - offset);
    add(safeAnswer + offset);
  }
  for (let value = range.min; values.size < 4 && value <= range.max; value += 1) {
    add(value);
  }
  const distractors = Array.from(values).filter((value) => value !== safeAnswer);
  return shuffle([safeAnswer, ...shuffle(distractors).slice(0, 3)]).map(String);
}

function createWeaknessPracticeQuestion(item, packId = 'gugudan', index = 0) {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const dan = Math.round(Number(item?.dan) || 0);
  const multiplier = Math.round(Number(item?.multiplier) || 0);
  const answer = packId === 'division-gugudan' ? multiplier : dan * multiplier;
  const text = packId === 'division-gugudan'
    ? `${dan * multiplier} ÷ ${dan} = ?`
    : `${dan} × ${multiplier} = ?`;
  return {
    id: `weakness-${config.packId}-${dan}-${multiplier}-${index}`,
    prompt: '취약점 연습 문제',
    text,
    choices: createPracticeChoiceValues(answer, { dan, multiplier }, packId),
    answer: String(answer),
    asset: false,
    hasQuestionImage: false,
    hasChoiceImages: false,
    weaknessPractice: true
  };
}

function buildWeaknessPracticeQuestions(factMap, packId = 'gugudan') {
  const allAttempted = getSortedGugudanFacts(factMap).filter((item) => item.attempts > 0);
  const weakFacts = allAttempted.filter((item) => item.wrong > 0);
  const danger = sortGugudanWeakItems(weakFacts.filter((item) => getGugudanRiskLevel(item) === 'danger'));
  const warning = sortGugudanWeakItems(weakFacts.filter((item) => getGugudanRiskLevel(item) === 'warning'));
  const stable = allAttempted
    .filter((item) => getGugudanRiskLevel(item) === 'ok')
    .sort((left, right) => (
      right.attempts - left.attempts
      || left.dan - right.dan
      || left.multiplier - right.multiplier
    ));
  const orderedWeak = [...danger, ...warning];
  const weakWeighted = [];
  danger.forEach((item) => {
    for (let index = 0; index < 4; index += 1) weakWeighted.push(item);
  });
  warning.forEach((item) => {
    for (let index = 0; index < 2; index += 1) weakWeighted.push(item);
  });
  const stableReviewCount = Math.min(stable.length, weakWeighted.length ? Math.max(1, Math.round(weakWeighted.length * 0.08)) : 0);
  if (!weakWeighted.length) {
    return { questions: [], dangerCount: 0, warningCount: 0, stableCount: 0, weakCount: 0 };
  }
  while (weakWeighted.length < Math.min(18, Math.max(6, orderedWeak.length * 3))) {
    orderedWeak.forEach((item) => weakWeighted.push(item));
  }
  const questionItems = shuffle(weakWeighted);
  shuffle(stable.slice(0, stableReviewCount)).forEach((item, index) => {
    questionItems.splice(Math.min(questionItems.length, (index + 1) * 5), 0, item);
  });
  return {
    questions: questionItems.map((item, index) => createWeaknessPracticeQuestion(item, packId, index + 1)),
    dangerCount: danger.length,
    warningCount: warning.length,
    stableCount: stableReviewCount,
    weakCount: orderedWeak.length
  };
}

function prepareWeaknessPracticeFromAggregate(parsed, packId = 'gugudan', sourceName = '') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  if (!parsed?.factMap?.size) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus(`${config.sourceLabel} 기록을 찾지 못했습니다. CSV 백업을 불러오거나 게임 후 이 기기에 저장하세요.`, packId, {
      kind: 'error',
      fileName: sourceName
    });
    return false;
  }

  const studentIds = Array.from(parsed.studentIds || []).filter(Boolean);
  if (studentIds.length > 1) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus('학생번호가 여러 개인 기록입니다. 한 학생의 기록만 사용해 주세요.', packId, {
      kind: 'error',
      fileName: sourceName
    });
    return false;
  }

  const built = buildWeaknessPracticeQuestions(parsed.factMap, packId);
  if (!built.questions.length) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus('누적 오답이 없어 취약점 연습 문제를 만들지 않았습니다. 일반 연습으로 진행해도 됩니다.', packId, {
      kind: 'error',
      fileName: sourceName
    });
    return false;
  }

  selectedPackId = config.packId;
  selectedMode = 'solo';
  selectedPlayers = 1;
  activeWeaknessPractice = {
    packId: config.packId,
    label: getWeaknessPracticeLabel(packId),
    fileName: sourceName,
    studentText: studentIds[0] || '학생번호 없음',
    questions: built.questions,
    dangerCount: built.dangerCount,
    warningCount: built.warningCount,
    stableCount: built.stableCount,
    weakCount: built.weakCount
  };
  renderSetupControls();
  renderWeaknessPracticeStatus('준비 완료 · 게임 시작을 누르면 1인 취약점 연습으로 시작합니다.', packId, {
    fileName: sourceName,
    metrics: [
      ['학생번호', activeWeaknessPractice.studentText],
      ['집중 연습', `${built.dangerCount}문항`],
      ['다시 확인', `${built.warningCount}문항`],
      ['안정 확인', `${built.stableCount}문항`],
      ['출제 목록', `${built.questions.length}문제`]
    ]
  });
  updateSetupSummary();
  return true;
}

function prepareWeaknessPracticeFromLocal(packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const selected = selectLocalGugudanRecord(config.packId, '취약점 연습');
  if (!selected?.record?.factMap?.size) {
    renderWeaknessPracticeStatus(`${config.sourceLabel} 로컬 기록이 없습니다. CSV 백업 파일을 선택해 취약점 연습을 준비하세요.`, packId, {
      kind: 'error',
      fileName: '이 기기 로컬 저장'
    });
    const input = getWeaknessPracticeInput(packId);
    if (input) {
      input.value = '';
      input.click();
    }
    return false;
  }
  return prepareWeaknessPracticeFromAggregate(selected.record, packId, `로컬 저장 · 학생번호 ${selected.studentId}`);
}

async function prepareWeaknessPracticeFromFile(file, packId = 'gugudan') {
  if (!file) return;
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const input = getWeaknessPracticeInput(packId);
  const startedAt = performance.now();
  setSetupMessage('', '');
  elements.startButton.disabled = true;
  renderWeaknessPracticeStatus(`${config.sourceLabel} 기록을 읽고 취약 문항을 고르는 중입니다.`, packId, {
    kind: 'busy',
    fileName: file.name || ''
  });

  try {
    const text = await file.text();
    const remainingMs = WEAKNESS_PRACTICE_MIN_READY_MS - (performance.now() - startedAt);
    if (remainingMs > 0) await wait(remainingMs);
    const parsed = parseGugudanCsvAggregate(text, { config });
    prepareWeaknessPracticeFromAggregate(parsed, packId, file.name || '');
  } catch (error) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus(`${config.sourceLabel} 기록 파일을 읽을 수 없습니다. 파일 형식을 확인하세요.`, packId, {
      kind: 'error',
      fileName: file.name || ''
    });
  } finally {
    if (input) input.value = '';
    updateSetupSummary();
  }
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
  const playedText = options.playedText || '';
  const config = options.config || getPracticeRecordConfig(options.packId) || getPracticeRecordConfig('gugudan');
  const sourceLabel = options.sourceLabel || config?.sourceLabel || '구구단';
  const rows = [[
    '행구분',
    '학생번호',
    '생성일시',
    '퀴즈팩',
    '선택시간분',
    '플레이시간',
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
      playedText,
      getPracticeGroupLabel(item.dan, config),
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
      playedText,
      getPracticeGroupLabel(item.dan, config),
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
  syncAppViewportVars();
  document.body.dataset.screen = name;
  elements.setupScreen.classList.toggle('is-hidden', name !== 'setup');
  elements.playScreen.classList.toggle('is-hidden', name !== 'play');
  elements.resultScreen.classList.toggle('is-hidden', name !== 'result');
  syncDisplayModeToggleLock();
}

function getPackLabel(packId) {
  const weaknessPractice = getActiveWeaknessPractice(packId);
  if (weaknessPractice) return weaknessPractice.label;
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
  const { width, height } = getViewportMetrics();
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
  if (displayModeId === 'auto') return `모드:자동(${resolvedLabel})`;
  return `모드:${resolvedLabel}`;
}

function getDisplayModePerformanceNotice(resolvedMode = getResolvedDisplayMode()) {
  if (resolvedMode !== 'board') return '';
  return '전자칠판 모드는 큰 화면 렌더링과 다인 플레이에서 기기 성능에 따라 일시적인 렉이 생길 수 있습니다.';
}

function getInitialDisplayModeSelection(choice) {
  const normalized = String(choice || '').trim();
  if (normalized === 'mobile' || normalized === 'tablet') return normalized;
  if (normalized === 'wide') {
    return detectDisplayMode() === 'board' ? 'board' : 'web';
  }
  return 'web';
}

function setInitialDisplayModeModalOpen(open) {
  const visible = Boolean(open && elements.initialDisplayModeModal);
  elements.initialDisplayModeModal?.classList.toggle('is-hidden', !visible);
  elements.initialDisplayModeModal?.setAttribute('aria-hidden', String(!visible));
  document.body.dataset.initialDisplayModePrompt = String(visible);
  if (visible) {
    window.setTimeout(() => {
      const firstButton = $('[data-initial-display-mode]', elements.initialDisplayModeModal);
      firstButton?.focus();
    }, 0);
  }
}

function isDisplayModeChangeLocked() {
  return Boolean(session && !session.endedAt) || document.body.dataset.screen !== 'setup';
}

function syncDisplayModeToggleLock() {
  if (!elements.displayModeToggle) return;
  const locked = isDisplayModeChangeLocked();
  elements.displayModeToggle.disabled = locked;
  elements.displayModeToggle.setAttribute('aria-disabled', String(locked));
}

function showInitialDisplayModePrompt() {
  if (initialDisplayModePromptShown || session || document.body.dataset.screen !== 'setup') return;
  initialDisplayModePromptShown = true;
  setInitialDisplayModeModalOpen(true);
}

function applyInitialDisplayModeChoice(choice) {
  if (isDisplayModeChangeLocked()) return;
  const nextMode = getInitialDisplayModeSelection(choice);
  selectedDisplayMode = nextMode;
  updateSetupSummary();
  setInitialDisplayModeModalOpen(false);
  const label = getDisplayModeLabel(nextMode, getResolvedDisplayMode(nextMode));
  const notice = getDisplayModePerformanceNotice(getResolvedDisplayMode(nextMode));
  setSetupMessage(
    [`${label} 화면에 맞춰 시작 설정을 정리했습니다.`, notice].filter(Boolean).join(' '),
    'note'
  );
}

function getViewportMetrics() {
  const visualViewport = window.visualViewport;
  const width = Math.max(0, Math.floor(
    visualViewport?.width
    || window.innerWidth
    || document.documentElement.clientWidth
    || 0
  ));
  const height = Math.max(0, Math.floor(
    visualViewport?.height
    || window.innerHeight
    || document.documentElement.clientHeight
    || 0
  ));
  return {
    width,
    height,
    minSide: Math.min(width, height),
    maxSide: Math.max(width, height),
    area: width * height
  };
}

function syncAppViewportVars() {
  const { width, height } = getViewportMetrics();
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  document.documentElement.style.setProperty('--app-width', `${safeWidth}px`);
  document.documentElement.style.setProperty('--app-height', `${safeHeight}px`);
}

function syncTabletFaceLayoutBasis() {
  const active = Boolean(session && isTabletFaceToFaceSession());
  document.body.dataset.tabletFace = String(active);
  if (!active) {
    document.documentElement.style.removeProperty('--tablet-face-portrait-ratio');
    document.documentElement.style.removeProperty('--tablet-face-width');
    return;
  }
  const { height, minSide, maxSide } = getViewportMetrics();
  const measuredRatio = maxSide > 0 ? minSide / maxSide : 0.695;
  const portraitRatio = measuredRatio >= 0.63 && measuredRatio <= 0.78
    ? measuredRatio
    : 0.695;
  document.documentElement.style.setProperty('--tablet-face-portrait-ratio', portraitRatio.toFixed(3));
  document.documentElement.style.setProperty('--tablet-face-width', `${Math.round(clamp(height * portraitRatio, 320, 920))}px`);
}

function selectNextDisplayMode() {
  if (isDisplayModeChangeLocked()) return;
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
    ? `현재 화면에서는 ${recommendedLimit}명까지 권장합니다. 더 많은 인원은 기기성능과 화면크기가 충분할 때 원활합니다.`
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

function isTabletFaceLoadingLayout(playerCount = selectedPlayers) {
  return Boolean(getResolvedDisplayMode() === 'tablet' && selectedMode === 'coop' && playerCount === 2);
}

function getStartLoadingPlayerOrder(playerCount = selectedPlayers) {
  const safeCount = clamp(Math.round(Number(playerCount) || 1), 1, 4);
  if (isTabletFaceLoadingLayout(safeCount)) return [1, 0];
  return Array.from({ length: safeCount }, (_, index) => index);
}

function renderStartLoadingLayout() {
  if (!elements.startLoading || !elements.startLoadingGrid) return;
  const playerCount = clamp(Math.round(Number(selectedPlayers) || 1), 1, 4);
  const tabletFace = isTabletFaceLoadingLayout(playerCount);
  const signature = `${playerCount}:${tabletFace ? 'tablet-face' : 'standard'}`;
  elements.startLoading.classList.toggle('is-multi', playerCount > 1);
  elements.startLoading.classList.toggle('is-tablet-face', tabletFace);
  elements.startLoading.dataset.loadingPlayers = String(playerCount);
  [1, 2, 3, 4].forEach((count) => {
    elements.startLoading.classList.toggle(`player-count-${count}`, playerCount === count);
  });
  elements.startLoading.style.setProperty('--loading-players', String(playerCount));
  if (startLoadingLayoutSignature === signature && elements.startLoadingGrid.children.length) return;
  startLoadingLayoutSignature = signature;
  const order = getStartLoadingPlayerOrder(playerCount);
  elements.startLoadingGrid.innerHTML = order.map((playerIndex, orderIndex) => {
    const flipped = tabletFace && orderIndex === 0;
    return `
      <div class="start-loading-card${flipped ? ' is-flipped' : ''}" data-loading-player="${playerIndex + 1}">
        <span class="start-loading-kicker">${playerCount > 1 ? `${playerIndex + 1}P 전장 준비 중` : '전장 준비 중'}</span>
        <b class="start-loading-message">게임 자산을 미리 불러오고 있습니다</b>
        <p>퀴즈 버튼을 눌러 퀴즈를 풀고 거북선을 레벨업시켜 강화하세요.</p>
        <div class="start-loading-bar" aria-hidden="true"><i class="start-loading-fill"></i></div>
        <em class="start-loading-percent">0%</em>
      </div>
    `;
  }).join('');
}

function updateStartLoadingPanels(message = '게임 자산을 미리 불러오고 있습니다', progress = 0) {
  const safeProgress = clamp(Number(progress) || 0, 0, 1);
  const percentText = `${Math.round(safeProgress * 100)}%`;
  $$('.start-loading-message', elements.startLoading).forEach((node) => {
    node.textContent = message;
  });
  $$('.start-loading-fill', elements.startLoading).forEach((node) => {
    node.style.width = percentText;
  });
  $$('.start-loading-percent', elements.startLoading).forEach((node) => {
    node.textContent = percentText;
  });
}

function setStartLoading(active, message = '게임 자산을 미리 불러오고 있습니다', progress = 0) {
  startLoading = Boolean(active);
  const safeProgress = clamp(Number(progress) || 0, 0, 1);
  elements.startLoading?.classList.toggle('is-hidden', !startLoading);
  elements.startLoading?.setAttribute('aria-hidden', String(!startLoading));
  document.documentElement.classList.toggle('start-loading-open', startLoading);
  document.body.classList.toggle('start-loading-open', startLoading);
  if (startLoading) {
    renderStartLoadingLayout();
    updateStartLoadingPanels(message, safeProgress);
  } else {
    startLoadingLayoutSignature = '';
  }
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

function setQrModalOpen(open, options = {}) {
  const active = Boolean(open);
  if (!elements.qrModal) return;
  elements.qrModal.classList.toggle('is-hidden', !active);
  elements.qrModal.setAttribute('aria-hidden', String(!active));
  elements.qrToggle?.setAttribute('aria-expanded', String(active));
  if (active) {
    elements.qrCloseButton?.focus();
  } else if (options.restoreFocus !== false) {
    elements.qrToggle?.focus();
  }
}

function setGugudanStatusExpanded(expanded) {
  const active = Boolean(expanded);
  elements.gugudanStatusCheck?.classList.toggle('is-collapsed', !active);
  elements.gugudanStatusToggle?.setAttribute('aria-expanded', String(active));
  if (elements.gugudanStatusToggle) {
    elements.gugudanStatusToggle.textContent = active ? '접기' : '펴기';
  }
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
}

function isFullscreenSupported() {
  const root = document.documentElement;
  return Boolean(root.requestFullscreen || root.webkitRequestFullscreen);
}

function updateFullscreenControls() {
  const active = isFullscreenActive();
  const supported = isFullscreenSupported();
  elements.fullscreenToggles.forEach((button) => {
    const compact = button.classList.contains('play-fullscreen-toggle');
    button.textContent = compact ? (active ? '해제' : '전체') : (active ? '전체화면 해제' : '전체화면');
    button.disabled = !supported;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', active ? '전체화면 해제' : '전체화면으로 보기');
    button.title = supported ? (active ? '전체화면 해제' : '전체화면으로 보기') : '이 브라우저는 전체화면을 지원하지 않습니다.';
  });
}

async function toggleFullscreen() {
  if (!isFullscreenSupported()) {
    updateFullscreenControls();
    return;
  }
  try {
    if (isFullscreenActive()) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      const root = document.documentElement;
      if (root.requestFullscreen) {
        await root.requestFullscreen();
      } else if (root.webkitRequestFullscreen) {
        root.webkitRequestFullscreen();
      }
    }
  } catch (error) {
    console.warn('Fullscreen toggle failed', error);
  } finally {
    updateFullscreenControls();
  }
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
    elements.displayModeToggle.title = '게임 시작 전 화면 모드 전환: 자동 → 모바일 → 태블릿 → 전자칠판 → 웹';
    syncDisplayModeToggleLock();
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
    button.innerHTML = `${escapeHtml(label)}${notRecommended ? ' <small class="option-warning">기기성능, 화면크기 필요</small>' : ''}`;
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
    const setupMessages = [
      selectedPlayers > limitInfo.recommendedLimit ? limitInfo.reason : '',
      getDisplayModePerformanceNotice(resolvedMode)
    ].filter(Boolean);
    const setupMessage = setupMessages.join(' ');
    setSetupMessage(setupMessage, setupMessage ? 'note' : '');
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
  const weaknessPractice = getActiveWeaknessPractice(packId);
  if (weaknessPractice?.questions?.length) return weaknessPractice.questions;
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
  return [
    ENEMY_VARIANT_VISUAL_CACHE.hardened,
    ENEMY_VARIANT_VISUAL_CACHE.elite,
    ENEMY_VARIANT_VISUAL_CACHE.eliteMax
  ];
}

function warmupEnemyBadgeSprites() {
  const badges = [
    ...Object.values(ENEMY_ROLE_BADGES),
    ...getWarmupEnemyVariantStyles().map((style) => style.badge).filter(Boolean)
  ];
  [0.55, 0.75, 1].forEach((scale) => {
    badges.forEach((badge) => getEnemyBadgeSprite(badge, scale));
  });
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
  warmupEnemyBadgeSprites();
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
  const minimumLoadingMs = selectedPlayers > 1 ? MULTI_START_LOADING_MS : MIN_START_LOADING_MS;
  const weaknessPractice = getActiveWeaknessPractice(selectedPackId);
  updateProgress(weaknessPractice ? '취약점 연습 문제를 준비하는 중' : '퀴즈 데이터를 불러오는 중', 0.06);
  const questions = await loadPack(selectedPackId);
  updateProgress('전투 자산을 점검하는 중', 0.12);
  await warmupCombatAssets(updateProgress);
  await warmupQuizAssets(questions, updateProgress);
  updateProgress('전장 배치를 최종 준비하는 중', 0.96);
  const remainingMs = minimumLoadingMs - (performance.now() - startedAtMs);
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
    repairQuizTimerId: 0,
    activeEffectCount: 0,
    renderLoad: {
      busy: false,
      veryBusy: false,
      performanceMode: false,
      enemyCount: 0,
      projectileCount: 0,
      effectCount: 0
    },
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
      deathCount: 0,
      repairQuizRequired: 0,
      repairQuizAnswered: 0,
      repairQuizPlayerAnswers: [],
      repairQuizSharedQuestion: null
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
    backgroundLayerSignature: '',
    shipSpriteCache: null,
    shipHpGaugeCache: null,
    waveOverlayCache: null,
    enemies: [],
    enemiesNeedCompact: false,
    enemyPool: createEnemyPool(),
    enemyPoolCursor: 0,
    enemySpatialGrid: createEnemySpatialGrid(),
    projectiles: [],
    projectilesNeedCompact: false,
    projectilePool: createProjectilePool(),
    projectilePoolCursor: 0,
    effects: [],
    effectsNeedCompact: false,
    effectPool: createEffectPool(),
    effectPoolCursor: 0,
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
    questionQueue: createQuestionQueue(questions),
    currentQuestion: null,
    answerLocked: false,
    selectedChoice: '',
    questionStartedAtMs: 0,
    feedback: '',
    feedbackKind: '',
    quizBurstAnswered: 0,
    quizBurstTotal: QUIZ_BURST_QUESTION_COUNT,
    repairQuizSingle: false,
    completedRepairQuiz: false,
    autoAdvanceTimerId: 0
  };
}

function createQuestionQueue(questions = []) {
  const items = Array.isArray(questions) ? [...questions] : [];
  return items.some((question) => question?.weaknessPractice) ? items : shuffle(items);
}

function buildSession(questions) {
  const startedAt = new Date();
  const resolvedDisplayMode = enforceDisplayModeRules();
  const weaknessPractice = getActiveWeaknessPractice(selectedPackId);
  const sharedBattle = selectedMode === 'coop';
  const combatSeed = hashSeed(`${selectedPackId}:${selectedPlayers}:${selectedMinutes}:${startedAt.getTime()}:${Math.random()}`);
  const sessionState = {
    packId: selectedPackId,
    packLabel: weaknessPractice?.label || getPackLabel(selectedPackId),
    weaknessPractice: weaknessPractice ? {
      packId: weaknessPractice.packId,
      label: weaknessPractice.label,
      fileName: weaknessPractice.fileName,
      studentText: weaknessPractice.studentText,
      weakCount: weaknessPractice.weakCount,
      dangerCount: weaknessPractice.dangerCount,
      warningCount: weaknessPractice.warningCount,
      stableCount: weaknessPractice.stableCount
    } : null,
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
    queue: createQuestionQueue(questions),
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
    battle.questionQueue = createQuestionQueue(questions);
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
  battleBackgroundCanvas = battleViews[battleIndex]?.backgroundCanvas || null;
  battleBackgroundCtx = battleViews[battleIndex]?.backgroundCtx || null;
  return battle;
}

function withBattleContext(index, callback) {
  const previousIndex = currentBattleIndex;
  const previousBattle = session?.battle || null;
  const previousCanvas = battleCanvas;
  const previousCtx = battleCtx;
  const previousBackgroundCanvas = battleBackgroundCanvas;
  const previousBackgroundCtx = battleBackgroundCtx;
  const battle = setBattleContext(index);
  if (!battle) return undefined;
  try {
    return callback(battle, index);
  } finally {
    currentBattleIndex = previousIndex;
    if (session && previousBattle) session.battle = previousBattle;
    battleCanvas = previousCanvas;
    battleCtx = previousCtx;
    battleBackgroundCanvas = previousBackgroundCanvas;
    battleBackgroundCtx = previousBackgroundCtx;
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
    quizState.questionQueue = createQuestionQueue(session.questions);
  }
  if (!quizState.questionQueue.length) {
    quizState.questionQueue = createQuestionQueue(session.questions);
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

function cloneQuizQuestion(question) {
  if (!question) return null;
  return {
    ...question,
    choices: Array.isArray(question.choices) ? [...question.choices] : []
  };
}

function assignQuestionToQuizState(quizState, question) {
  if (!session || !quizState || !question) return null;
  quizState.currentQuestion = cloneQuizQuestion(question);
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
  quizState.quizBurstTotal = QUIZ_BURST_QUESTION_COUNT;
  quizState.repairQuizSingle = false;
  quizState.completedRepairQuiz = false;
  quizState.currentQuestion = null;
  quizState.answerLocked = false;
  quizState.selectedChoice = '';
  quizState.questionStartedAtMs = 0;
  quizState.feedback = '';
  quizState.feedbackKind = '';
}

function startQuizBurst(quizState, options = {}) {
  if (!quizState) return null;
  clearQuizAutoAdvance(quizState);
  quizState.quizBurstAnswered = 0;
  quizState.quizBurstTotal = Math.max(1, Math.round(Number(options.total) || QUIZ_BURST_QUESTION_COUNT));
  quizState.repairQuizSingle = Boolean(options.repairQuizSingle);
  quizState.completedRepairQuiz = false;
  return options.question
    ? assignQuestionToQuizState(quizState, options.question)
    : nextQuestion(quizState);
}

function getQuizBurstTotal(quizState) {
  return Math.max(1, Math.round(Number(quizState?.quizBurstTotal) || QUIZ_BURST_QUESTION_COUNT));
}

function getQuizBurstProgress(quizState) {
  const total = getQuizBurstTotal(quizState);
  const answered = clamp(Number(quizState?.quizBurstAnswered) || 0, 0, total);
  const current = clamp(answered + (quizState?.answerLocked ? 0 : 1), 1, total);
  return { answered, current, total };
}

function getQuizAutoProgressText(quizState) {
  const progress = getQuizBurstProgress(quizState);
  if (quizState?.repairQuizSingle) {
    return progress.answered >= progress.total
      ? (isShipRepairQuizPending(session?.battle) ? '수리 답안 제출 · 다른 플레이어를 기다립니다' : '수리 완료 · 전장으로 복귀합니다')
      : '수리 퀴즈 1문제';
  }
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
  const complete = quizState.quizBurstAnswered >= getQuizBurstTotal(quizState);
  const delayMs = complete ? QUIZ_AUTO_CLOSE_DELAY_MS : QUIZ_AUTO_NEXT_DELAY_MS;
  const staggerMs = isDenseIndividualBattleSession() ? getSafePlayerIndex(battleIndex) * 90 : 0;
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
    if (nextQuizState.quizBurstAnswered >= getQuizBurstTotal(nextQuizState)) {
      closeQuizModal(battleIndex, { completedBurst: true });
      return;
    }
    nextQuestion(nextQuizState);
    renderQuizSurface(battleIndex);
    refreshBattleHud(battleIndex);
  }, delayMs + staggerMs);
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
  const chance = clamp(0.05 + ((elapsedSec - ELITE_UNLOCK_TIME_SEC) / 420) * 0.24, 0.05, 0.29);
  return ((roll01 ?? battleRandom()) || 0) < chance;
}

function getLateWavePressure(elapsedSec) {
  if (elapsedSec >= 420) return 2;
  if (elapsedSec >= 260) return 1;
  return 0;
}

function getFlowState(elapsedSec, target = null) {
  const cyclePos = ((elapsedSec % FLOW_CYCLE_SEC) + FLOW_CYCLE_SEC) % FLOW_CYCLE_SEC;
  const pulse = Math.sin(elapsedSec * 0.38) * ENEMY_FLOW_PULSE_STRENGTH;
  const latePressure = getLateWavePressure(elapsedSec);
  const flow = target || {};
  let label = '보통';
  let spawnCooldownMul = 1;
  let speedMul = 1;
  let capBonus = 0;
  let hardenedBonus = 0;

  if (cyclePos >= FLOW_LULL_START_SEC && cyclePos < FLOW_LULL_END_SEC) {
    label = '완급-완';
    spawnCooldownMul = 1.25;
    speedMul = 0.94;
    capBonus = -1;
    hardenedBonus = -0.015;
  } else if (cyclePos >= FLOW_SURGE_START_SEC && cyclePos < FLOW_SURGE_END_SEC) {
    label = '러시';
    spawnCooldownMul = 0.84;
    speedMul = 1.07;
    capBonus = 2;
    hardenedBonus = 0.045;
  } else if (cyclePos >= FLOW_SURGE_END_SEC && cyclePos < FLOW_AFTERSHOCK_END_SEC) {
    label = '압박';
    spawnCooldownMul = 0.93;
    speedMul = 1.025;
    capBonus = 1;
    hardenedBonus = 0.025;
  }

  if (latePressure >= 1) {
    label = label === '보통' ? '후반 압박' : `${label} · 후반`;
    spawnCooldownMul *= 0.96;
    speedMul *= 1.02;
    capBonus += 1;
    hardenedBonus += 0.025;
  }
  if (latePressure >= 2) {
    label = label.includes('후반') ? '최종 압박' : `${label} · 최종`;
    spawnCooldownMul *= 0.94;
    speedMul *= 1.025;
    capBonus += 1;
    hardenedBonus += 0.03;
  }

  flow.label = label;
  flow.spawnCooldownMul = clamp(spawnCooldownMul * (1 - pulse * ENEMY_FLOW_PULSE_COOLDOWN_FACTOR), 0.68, 1.42);
  flow.speedMul = clamp(speedMul * (1 + pulse), 0.9, 1.18);
  flow.capBonus = capBonus;
  flow.hardenedBonus = hardenedBonus;
  return flow;
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

function formatAttackCycleSeconds(cooldownMs) {
  const seconds = Math.max(0.1, (Number(cooldownMs) || SHIP_INITIAL_ATTACK_COOLDOWN_MS) / 1000);
  const rounded = Math.round(seconds * 10) / 10;
  if (Math.abs(rounded - Math.round(rounded)) < 0.05) return String(Math.round(rounded));
  return rounded.toFixed(1);
}

function getAttackStatText(ship = session?.battle?.ship) {
  if (!ship) return `${SHIP_BASE_ATTACK_POWER} · 1발/1초`;
  return `${ship.attackPower} · ${ship.projectileCount}발/${formatAttackCycleSeconds(getAttackCooldownMs())}초`;
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
          <canvas class="battle-background-canvas" aria-hidden="true"></canvas>
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
          <div class="battle-stat score-stat"><b>점수</b><span data-ref="score-points">0</span></div>
          <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
          <div class="battle-stat"><b>GOLD</b><span data-ref="resource-score">0</span></div>
          <div class="battle-stat attack-stat-card"><b>화력</b><span data-ref="attack-stat">12 · 1발/1초</span></div>
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
      <div class="battle-stat score-stat"><b>팀 점수</b><span data-ref="score-points">0</span></div>
      <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
      <div class="battle-stat"><b>공유 GOLD</b><span data-ref="resource-score">0</span></div>
      <div class="battle-stat attack-stat-card"><b>화력</b><span data-ref="attack-stat">12 · 1발/1초</span></div>
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
            <canvas class="battle-background-canvas" aria-hidden="true"></canvas>
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
          <canvas class="battle-background-canvas" aria-hidden="true"></canvas>
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
          <div class="battle-stat score-stat"><b>팀 점수</b><span data-ref="score-points">0</span></div>
          <div class="battle-stat"><b>격퇴/콤보</b><span data-ref="kill-combo">0 / x0</span></div>
          <div class="battle-stat"><b>공유 GOLD</b><span data-ref="resource-score">0</span></div>
          <div class="battle-stat attack-stat-card"><b>화력</b><span data-ref="attack-stat">12 · 1발/1초</span></div>
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

  battleViews = $$('.battle-panel', elements.gameStage).map(createBattleView);
  elements.gameStage.onclick = handleBattleAction;
  setBattleContext(0);
  syncAllCanvasSizes();
  refreshAllBattleHuds();
}

function collectBattleDomRefs(root) {
  const textRefs = {};
  BATTLE_TEXT_REFS.forEach((ref) => {
    textRefs[ref] = $$(`[data-ref="${ref}"]`, root);
  });
  const upgradeButtonsByAction = {};
  UPGRADE_ACTIONS.forEach((action) => {
    upgradeButtonsByAction[action] = $$(`[data-action="${action}"]`, root);
  });
  return {
    textRefs,
    statusNodes: $$('[data-ref="battle-status"]', root),
    hpStatNodes: $$('.ship-hp-stat', root),
    hpFillNodes: $$('[data-ref="ship-hp-fill"]', root),
    quizButtons: $$('[data-action="quiz"]', root),
    upgradeButtonsByAction
  };
}

function createBattleView(panel, index) {
  const canvas = $('.battle-canvas', panel);
  const backgroundCanvas = $('.battle-background-canvas', panel);
  return {
    index,
    panel,
    backgroundCanvas,
    backgroundCtx: backgroundCanvas?.getContext('2d') || null,
    canvas,
    ctx: canvas.getContext('2d'),
    refs: collectBattleDomRefs(panel)
  };
}

function getBattleDomRefs(index = currentBattleIndex) {
  const battleIndex = getGameplayBattleIndex(index);
  const view = battleViews[battleIndex];
  if (!view) return collectBattleDomRefs(elements.gameStage);
  if (!view.refs) view.refs = collectBattleDomRefs(view.panel);
  return view.refs;
}

function setUpgradeButton(button, disabled, title, meta, cost) {
  if (!button) return;
  const compact = Boolean(button.closest('.battle-panel-tablet'));
  const detail = compact ? cost : `${meta} · ${cost}`;
  const shortTitle = String(title || '').trim().slice(0, 1);
  const nextDisabled = Boolean(disabled);
  if (button.disabled) button.disabled = false;
  button.classList.toggle('is-disabled', nextDisabled);
  button.dataset.upgradeTitle = title;
  button.dataset.upgradeMeta = meta;
  button.dataset.upgradeCost = cost;
  button.dataset.upgradeShort = shortTitle;
  const disabledText = String(nextDisabled);
  if (button.getAttribute('aria-disabled') !== disabledText) {
    button.setAttribute('aria-disabled', disabledText);
  }
  const ariaLabel = `${title} ${meta} ${cost}`;
  if (button.getAttribute('aria-label') !== ariaLabel) {
    button.setAttribute('aria-label', ariaLabel);
  }
  const signature = `${nextDisabled}|${title}|${detail}`;
  if (button.dataset.renderSignature !== signature) {
    button.dataset.renderSignature = signature;
    button.innerHTML = `
      <span>${escapeHtml(title)}</span>
      <small data-cost="${escapeHtml(cost)}">${escapeHtml(detail)}</small>
    `;
  }
}

function setUpgradeButtons(source, action, disabled, title, meta, cost) {
  const buttons = source?.upgradeButtonsByAction?.[action] || $$(`[data-action="${action}"]`, source);
  buttons.forEach((button) => {
    setUpgradeButton(button, disabled, title, meta, cost);
  });
}

function refreshBattleHud(index = currentBattleIndex, options = {}) {
  if (!session) return;
  const nowMs = Number(options.nowMs) || performance.now();
  if (options.passive) {
    const targetBattle = getBattle(index);
    if (!targetBattle) return;
    const elapsedSinceHudRefresh = nowMs - (Number(targetBattle.lastHudRefreshMs) || 0);
    const refreshInterval = targetBattle.hudDirty ? HUD_REFRESH_INTERVAL_MS : HUD_IDLE_REFRESH_INTERVAL_MS;
    if (elapsedSinceHudRefresh < refreshInterval) return;
  }
  setBattleContext(index);
  const battle = session.battle;
  battle.lastHudRefreshMs = nowMs;
  battle.hudDirty = false;
  const ship = battle.ship;
  const player = session.players[isSharedBattleSession() ? getSafePlayerIndex(index) : battle.playerIndex] || session.players[0];
  const refs = getBattleDomRefs(index);
  const setText = (ref, text) => {
    (refs.textRefs[ref] || []).forEach((node) => {
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
  setText('score-points', battle.score.points.toLocaleString('ko-KR'));
  setText('kill-combo', `${battle.score.kills} / x${battle.score.combo}`);
  setText('resource-score', battle.score.gold.toLocaleString('ko-KR'));
  setText('attack-stat', getAttackStatText(ship));
  refs.statusNodes.forEach((toast) => {
    if (toast.textContent !== battle.statusText) toast.textContent = battle.statusText;
    const className = `battle-status ${battle.statusTone || ''}`;
    if (toast.className !== className) toast.className = className;
  });
  const hpRatio = ship.maxHp > 0 ? clamp(ship.hp / ship.maxHp, 0, 1) : 0;
  refs.hpStatNodes.forEach((hpStatNode) => {
    hpStatNode.classList.toggle('is-warning', hpRatio <= 0.48 && hpRatio > 0.22);
    hpStatNode.classList.toggle('is-danger', hpRatio <= 0.22);
  });
  refs.hpFillNodes.forEach((hpFill) => {
    const width = `${Math.round(hpRatio * 100)}%`;
    if (hpFill.style.width !== width) hpFill.style.width = width;
  });

  const quizButtons = options.passive ? [] : refs.quizButtons;
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

  const shouldRefreshUpgrades = options.includeUpgrades !== false && !options.passive;
  const healCost = shouldRefreshUpgrades ? getHealCost() : 0;
  const upgradeRenderSignature = shouldRefreshUpgrades ? [
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
  ].join('|') : battle.lastUpgradeRenderSignature;
  if (shouldRefreshUpgrades && upgradeRenderSignature !== battle.lastUpgradeRenderSignature) {
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
      refs,
      'heal',
      ship.hp >= ship.maxHp || battle.score.gold < healCost || isShipRespawning(),
      '회복',
      '+44 HP',
      `${healCost}G`
    );
    setUpgradeButtons(
      refs,
      'speed',
      battle.score.gold < speedCost,
      '연사',
      `Lv.${ship.attackSpeedLevel}`,
      `${speedCost}G`
    );
    setUpgradeButtons(
      refs,
      'power',
      battle.score.gold < powerCost,
      '화력',
      `Lv.${ship.attackPowerLevel}`,
      `${powerCost}G`
    );
    setUpgradeButtons(
      refs,
      'projectile',
      projectileMaxed || battle.score.gold < bulletCost,
      '포탄',
      `${ship.projectileCount}발`,
      projectileMaxed ? 'MAX' : `${bulletCost}G`
    );
    setUpgradeButtons(
      refs,
      'penetration',
      penetrationMaxed || battle.score.gold < penetrationCost,
      '관통',
      `Lv.${ship.penetrationLevel}`,
      penetrationMaxed ? 'MAX' : `${penetrationCost}G`
    );
    setUpgradeButtons(
      refs,
      'explosion',
      explosionMaxed || battle.score.gold < explosionCost,
      '폭발',
      `Lv.${ship.explosionLevel}`,
      explosionMaxed ? 'MAX' : `${explosionCost}G`
    );
    setUpgradeButtons(
      refs,
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

function markPointerControlHandled(control, nowMs = performance.now()) {
  if (!control) return;
  recentPointerControls.set(control, nowMs);
}

function wasPointerControlHandledRecently(control, nowMs = performance.now()) {
  if (!control) return false;
  const handledAtMs = recentPointerControls.get(control) || 0;
  return nowMs - handledAtMs < POINTER_CLICK_SUPPRESS_MS;
}

function consumeBattleInputEvent(event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
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
    if (wasPointerControlHandledRecently(quizControl)) {
      consumeBattleInputEvent(event);
      return;
    }
    consumeBattleInputEvent(event);
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
  if (wasPointerControlHandledRecently(button)) {
    consumeBattleInputEvent(event);
    return;
  }
  consumeBattleInputEvent(event);
  runBattleActionFromButton(button);
}

function handleBattlePointerDown(event) {
  const quizControl = event.target.closest('[data-choice], [data-quiz-close]');
  if (quizControl && session) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    consumeBattleInputEvent(event);
    markPointerControlHandled(quizControl);
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
  consumeBattleInputEvent(event);
  markPointerControlHandled(button);
  runBattleActionFromButton(button);
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
  if (hasImageChoice) {
    choiceClasses.push('has-image-choice');
  } else {
    choiceClasses.push(...getChoiceTextClasses(choiceValue));
  }
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
  const battle = session.battle;
  session.activePlayerIndex = battleIndex;
  if (isSharedBattleSession()) {
    const quizState = getQuizState(battleIndex);
    if (!quizState) return;
    const repairQuizOpen = isShipRepairQuizPending(battle);
    const sharedRepairQuestion = repairQuizOpen ? ensureSharedRepairQuestion(battle) : null;
    if (!quizState.quizOpen) {
      startQuizBurst(quizState, {
        total: repairQuizOpen ? 1 : QUIZ_BURST_QUESTION_COUNT,
        repairQuizSingle: repairQuizOpen,
        question: sharedRepairQuestion
      });
    } else if (!quizState.currentQuestion) {
      quizState.quizBurstTotal = repairQuizOpen ? 1 : QUIZ_BURST_QUESTION_COUNT;
      quizState.repairQuizSingle = repairQuizOpen;
      if (sharedRepairQuestion) assignQuestionToQuizState(quizState, sharedRepairQuestion);
      else nextQuestion(quizState);
    }
    quizState.quizOpen = true;
    updateSharedBattleQuizFlag();
    renderCoopQuizOverlay();
    const openCount = session.playerQuizStates.filter((item) => item.quizOpen).length;
    setBattleStatus(
      repairQuizOpen
        ? `${getShipRepairStatusText(battle)} · 퀴즈 풀이 중`
        : `${openCount}명 퀴즈 풀이 중 · 팀 전장 계속 진행`,
      repairQuizOpen ? 'danger' : ''
    );
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
  setBattleStatus(
    isShipRepairQuizPending(battle)
      ? `${getShipRepairStatusText(battle)} · 퀴즈 풀이 중`
      : '퀴즈 풀이 중 · 전장 속도 감소',
    isShipRepairQuizPending(battle) ? 'danger' : ''
  );
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
  const completedRepairQuiz = Boolean(quizState?.completedRepairQuiz);
  if (quizState) {
    quizState.quizOpen = false;
    resetQuizBurst(quizState);
  }
  if (isSharedBattleSession()) {
    updateSharedBattleQuizFlag();
    renderCoopQuizOverlay();
    const openCount = session.playerQuizStates.filter((item) => item.quizOpen).length;
    const repairPending = isShipRepairQuizPending(session.battle);
    setBattleStatus(
      repairPending
        ? getShipRepairStatusText(session.battle)
        : (completedRepairQuiz ? '수리 퀴즈 완료 · 전장 복귀' : (openCount > 0 ? `${openCount}명 퀴즈 풀이 중 · 강화/회복 가능` : (completedBurst ? `${QUIZ_BURST_QUESTION_COUNT}문제 완료 · 전장 복귀` : '전장 진행 중'))),
      repairPending ? 'danger' : ((completedRepairQuiz || completedBurst) ? 'success' : '')
    );
    refreshBattleHud(battleIndex);
    return;
  } else {
    const root = getBattleRoot(battleIndex);
    root?.classList.remove('is-quiz-open');
    const layer = $('[data-ref="battle-quiz-layer"]', root);
    if (layer) {
      layer.classList.add('is-hidden');
      layer.innerHTML = '';
    }
  }
  setBattleStatus(
    isShipRepairQuizPending(session.battle)
      ? getShipRepairStatusText(session.battle)
      : (completedRepairQuiz ? '수리 퀴즈 완료 · 전장 복귀' : (completedBurst ? `${QUIZ_BURST_QUESTION_COUNT}문제 완료 · 전장 복귀` : '전장 진행 중')),
    isShipRepairQuizPending(session.battle) ? 'danger' : ((completedRepairQuiz || completedBurst) ? 'success' : '')
  );
  refreshBattleHud(battleIndex);
}

function showNextQuestionInModal(battleIndex = currentBattleIndex) {
  if (!session) return;
  setBattleContext(battleIndex);
  const quizState = getQuizState(battleIndex);
  if (!quizState?.answerLocked) return;
  clearQuizAutoAdvance(quizState);
  if (quizState.quizBurstAnswered >= getQuizBurstTotal(quizState)) {
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
  const questionTextValue = question.text || question.prompt || '';
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
    : `<p class="question-text ${getTextScaleClass(questionTextValue, 'question-text')}">${escapeHtml(questionTextValue)}</p>`);

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

function getQuizTextFitMax(element) {
  const card = element.closest('.quiz-modal-card');
  const cardWidth = card?.clientWidth || window.innerWidth || 0;
  const cardHeight = card?.clientHeight || window.innerHeight || 0;
  const compact = cardWidth < 360 || cardHeight < 280;
  const veryCompact = cardWidth < 260 || cardHeight < 220;
  if (element.matches('.question-text')) {
    if (element.classList.contains('question-text-tiny')) return veryCompact ? 34 : (compact ? 46 : 68);
    if (element.classList.contains('question-text-short')) return veryCompact ? 28 : (compact ? 40 : 58);
    if (element.classList.contains('question-text-medium')) return veryCompact ? 23 : (compact ? 32 : 46);
    return veryCompact ? 18 : (compact ? 25 : 36);
  }
  if (element.matches('.choice-text')) {
    const button = element.closest('.choice-button');
    const numeric = button?.classList.contains('is-numeric-choice');
    if (numeric) return veryCompact ? 26 : (compact ? 40 : 62);
    if (button?.classList.contains('choice-text-tiny')) return veryCompact ? 24 : (compact ? 34 : 52);
    if (button?.classList.contains('choice-text-short')) return veryCompact ? 21 : (compact ? 30 : 44);
    if (button?.classList.contains('choice-text-medium')) return veryCompact ? 17 : (compact ? 24 : 34);
    return veryCompact ? 13 : (compact ? 18 : 26);
  }
  return 24;
}

function getQuizTextFitContainer(element) {
  if (element.matches('.choice-text')) return element.closest('.choice-button') || element;
  if (element.matches('.question-text')) return element.closest('.quiz-question-body') || element;
  return element.closest('.quiz-title-block') || element;
}

function isDenseSplitQuizElement(element) {
  return Boolean(
    element?.closest?.('.split-count-3, .split-count-4, .coop-quiz-split-grid.player-count-3, .coop-quiz-split-grid.player-count-4')
  );
}

function isDenseSplitQuizRoot(root) {
  return Boolean(
    root?.closest?.('.split-count-3, .split-count-4, .coop-quiz-split-grid.player-count-3, .coop-quiz-split-grid.player-count-4')
    || root?.querySelector?.('.split-count-3, .split-count-4, .coop-quiz-split-grid.player-count-3, .coop-quiz-split-grid.player-count-4')
  );
}

function shouldFitChoiceTextInDenseSplit(element) {
  const text = String(element?.textContent || '').replace(/\s+/g, '');
  return text.length > 6;
}

function quizTextFits(element, container) {
  const pad = 2;
  if (element.matches('.choice-text')) {
    const button = container;
    return button.scrollWidth <= button.clientWidth + pad
      && button.scrollHeight <= button.clientHeight + pad;
  }
  return element.scrollWidth <= container.clientWidth + pad
    && element.scrollHeight <= container.clientHeight + pad;
}

function fitQuizTextElement(element) {
  const container = getQuizTextFitContainer(element);
  if (!container || container.clientWidth < 8 || container.clientHeight < 8) return;
  const fitSignature = [
    element.textContent || '',
    Math.round(container.clientWidth),
    Math.round(container.clientHeight),
    element.className
  ].join('|');
  if (element.dataset.fitSignature === fitSignature) return;
  const max = getQuizTextFitMax(element);
  const min = 8;
  element.style.fontSize = `${max}px`;
  if (quizTextFits(element, container)) {
    element.dataset.fitSignature = fitSignature;
    return;
  }
  let low = min;
  let high = max;
  let best = min;
  element.style.fontSize = `${min}px`;
  const iterations = isDenseSplitQuizElement(element) ? 4 : 6;
  for (let index = 0; index < iterations; index += 1) {
    const size = (low + high) / 2;
    element.style.fontSize = `${size}px`;
    if (quizTextFits(element, container)) {
      best = size;
      low = size;
    } else {
      high = size;
    }
  }
  element.style.fontSize = `${Math.floor(best * 10) / 10}px`;
  element.dataset.fitSignature = fitSignature;
}

function fitQuizText(root = elements.gameStage) {
  if (!root) return;
  const denseSplitRoot = isDenseSplitQuizRoot(root);
  const choiceTargets = $$('.quiz-modal-card .choice-button:not(.has-image-choice) .choice-text', root)
    .filter((element) => !denseSplitRoot || shouldFitChoiceTextInDenseSplit(element));
  const targets = [
    ...$$('.quiz-modal-card .question-text', root),
    ...choiceTargets
  ];
  targets.forEach(fitQuizTextElement);
}

function scheduleQuizTextFit(root = elements.gameStage) {
  if (root) quizTextFitRoots.add(root);
  if (quizTextFitFrameId) return;
  quizTextFitFrameId = window.requestAnimationFrame(() => {
    quizTextFitFrameId = 0;
    const roots = Array.from(quizTextFitRoots);
    quizTextFitRoots.clear();
    roots.forEach((targetRoot) => fitQuizText(targetRoot));
  });
}

function getBattleQuizWorldRatio(battle = session?.battle) {
  if (!battle?.quizOpen) return 1;
  if (isShipRepairQuizPending(battle)) return BATTLE_QUIZ_WORLD_SLOW_RATIO;
  if (!isSharedBattleSession()) {
    if (session?.displayMode === 'board' && session?.players?.length >= 3) {
      return BOARD_MULTI_BATTLE_QUIZ_WORLD_SLOW_RATIO;
    }
    if (session?.players?.length >= 2) return MULTI_BATTLE_QUIZ_WORLD_SLOW_RATIO;
  }
  return BATTLE_QUIZ_WORLD_SLOW_RATIO;
}

function getQuizSurfaceSignature(playerIndex) {
  const quizState = getQuizState(playerIndex);
  const question = quizState?.currentQuestion;
  if (!quizState?.quizOpen || !question) return 'idle';
  return [
    'open',
    playerIndex,
    question.id || question.key || question.text || question.prompt || '',
    question.prompt || '',
    question.image || '',
    (question.choices || []).map(String).join('\u001f'),
    String(question.answer),
    quizState.answerLocked ? 1 : 0,
    quizState.selectedChoice || '',
    quizState.feedback || '',
    quizState.feedbackKind || '',
    Number(quizState.quizBurstAnswered) || 0
  ].join('\u001e');
}

function renderQuizSurfaceInto(container, playerIndex, isOpen) {
  if (!container) return;
  const quizState = getQuizState(playerIndex);
  if (!isOpen || !quizState?.currentQuestion) {
    if (container.dataset.renderSignature !== 'idle') {
      container.innerHTML = '';
      container.dataset.renderSignature = 'idle';
    }
    return;
  }
  if (!quizState.answerLocked && !quizState.questionStartedAtMs) {
    quizState.questionStartedAtMs = Date.now();
  }
  const signature = getQuizSurfaceSignature(playerIndex);
  if (container.dataset.renderSignature === signature) return;
  container.innerHTML = buildQuizCardHtml(playerIndex);
  container.dataset.renderSignature = signature;
  scheduleQuizTextFit(container);
}

function setQuizLayerContentFlags(layer, question) {
  if (!layer) return;
  const hasQuestionImage = Boolean(question?.hasQuestionImage && question?.image);
  const hasChoiceImages = Boolean(question?.choices?.some(isQuizImageAsset));
  layer.classList.toggle('has-question-image', hasQuestionImage);
  layer.classList.toggle('has-choice-images', hasChoiceImages);
}

function ensureCoopQuizSplitGrid(overlay) {
  const count = session?.players?.length || 1;
  const expectedClass = `coop-quiz-split-grid player-count-${count}`;
  const currentGrid = overlay.firstElementChild;
  if (
    currentGrid
    && currentGrid.className === expectedClass
    && currentGrid.children.length === count
  ) {
    return currentGrid;
  }
  overlay.innerHTML = `
    <div class="${expectedClass}">
      ${session.players.map((player, index) => `
        <section class="coop-quiz-split-slot is-idle" data-player-index="${index}" data-render-signature="idle" aria-label="${escapeHtml(player.name)} 퀴즈 화면"></section>
      `).join('')}
    </div>
  `;
  return overlay.firstElementChild;
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
      renderQuizSurfaceInto(layer, playerIndex, isOpen);
      $(`.tablet-player-zone[data-player-index="${playerIndex}"]`, root)?.classList.toggle('is-quiz-open', isOpen);
    });
    scheduleQuizTextFit(root);
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
  const grid = ensureCoopQuizSplitGrid(overlay);
  session.players.forEach((player, index) => {
    const quizState = getQuizState(index);
    const isOpen = Boolean(quizState?.quizOpen);
    const slot = grid.children[index];
    if (!slot) return;
    slot.classList.toggle('is-active', isOpen);
    slot.classList.toggle('is-idle', !isOpen);
    const label = `${player.name} 퀴즈 화면`;
    if (slot.getAttribute('aria-label') !== label) {
      slot.setAttribute('aria-label', label);
    }
    renderQuizSurfaceInto(slot, index, isOpen);
  });
  scheduleQuizTextFit(overlay);
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
  root.classList.add('is-quiz-open');
  setQuizLayerContentFlags(layer, quizState.currentQuestion);
  layer.classList.remove('is-hidden');
  layer.innerHTML = buildQuizCardHtml(battleIndex);
  scheduleQuizTextFit(layer);
}

function renderPlay() {
  if (!session) return;
  const tabletFace = isTabletFaceToFaceSession();
  syncTabletFaceLayoutBasis();
  document.body.dataset.displayMode = session.displayMode;
  document.body.dataset.displayModeChoice = session.displayModeChoice;
  document.body.dataset.tabletFace = String(tabletFace);
  elements.playTitle.textContent = `${session.packLabel} · ${session.modeLabel} · ${session.players.length}명`;
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
  const config = getPracticeRecordConfig(session?.packId);
  if (!session || !config || session.sharedBattle || session.players.length !== 1) return;
  const fact = getGugudanFact(question, config.packId);
  if (!fact) return;
  const startedAtMs = Number(quizState?.questionStartedAtMs) || 0;
  session.gugudanRecords.push({
    packId: config.packId,
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
    getQuizBurstTotal(quizState),
    (Number(quizState.quizBurstAnswered) || 0) + 1
  );
  const repairWasPending = isShipRepairQuizPending(battle);
  const repairAdvanced = recordShipRepairQuizAnswer(battle, battleIndex);
  quizState.completedRepairQuiz = Boolean(repairWasPending && repairAdvanced && !isShipRepairQuizPending(battle));

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
  const deviceDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const backingPixelDpr = Math.sqrt(CANVAS_MAX_BACKING_PIXELS / Math.max(1, width * height));
  const dpr = Math.max(1, Math.min(deviceDpr, backingPixelDpr));
  const backingWidth = Math.round(width * dpr);
  const backingHeight = Math.round(height * dpr);
  const canvasNeedsResize = battleCanvas.width !== backingWidth || battleCanvas.height !== backingHeight;
  const backgroundNeedsResize = Boolean(
    battleBackgroundCanvas
      && (battleBackgroundCanvas.width !== backingWidth || battleBackgroundCanvas.height !== backingHeight)
  );
  const backgroundLayerSignature = `${backingWidth}x${backingHeight}:${Math.round(width)}x${Math.round(height)}`;
  if (canvasNeedsResize || backgroundNeedsResize) {
    battleCanvas.width = backingWidth;
    battleCanvas.height = backingHeight;
    battleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (battleBackgroundCanvas && battleBackgroundCtx) {
      battleBackgroundCanvas.width = backingWidth;
      battleBackgroundCanvas.height = backingHeight;
      battleBackgroundCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    session.battle.canvasWidth = width;
    session.battle.canvasHeight = height;
    session.battle.backgroundCache = null;
    session.battle.shipSpriteCache = null;
    session.battle.shipHpGaugeCache = null;
    session.battle.waveOverlayCache = null;
    session.battle.ship.x = width * 0.5;
    session.battle.ship.y = height * 0.5;
    session.battle.ship.radius = clamp(Math.min(width, height) * 0.07 * SHIP_COLLISION_RADIUS_SCALE, 16, 42);
  }
  if (battleBackgroundCtx && (force || canvasNeedsResize || backgroundNeedsResize || battle.backgroundLayerSignature !== backgroundLayerSignature)) {
    drawBackground(battleBackgroundCtx, width, height, battle);
    battle.backgroundLayerSignature = backgroundLayerSignature;
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

function getEnemySpawnPoint(radius, plan = null, spawnIndex = 0) {
  const battle = session.battle;
  const width = battle.canvasWidth;
  const height = battle.canvasHeight;
  const offset = Math.max(48, Math.round(radius + 24));
  const sideRoll = (((plan?.sideRoll ?? battleRandom()) || 0) + Math.max(0, spawnIndex) * 0.5) % 1;
  const baseSide = Math.floor(sideRoll * 4);
  const side = (baseSide + (battle.playerIndex % 4)) % 4;
  const laneRoll = (((plan?.laneRoll ?? battleRandom()) || 0) + Math.max(0, spawnIndex) * 0.23) % 1;
  const rawLane = 0.08 + laneRoll * 0.84;
  const lane = battle.playerIndex % 2 === 0 ? rawLane : 1 - rawLane;
  if (side === 0) return { x: lane * width, y: -offset };
  if (side === 1) return { x: width + offset, y: lane * height };
  if (side === 2) return { x: lane * width, y: height + offset };
  return { x: -offset, y: lane * height };
}

function pickSpawnDefinition(maxTier, preferHigh = false, roll01 = null) {
  const safeMaxTier = clamp(Math.round(Number(maxTier) || 1), 1, ENEMY_DEFINITIONS.length);
  let totalWeight = 0;
  let lastDef = ENEMY_DEFINITIONS[0];
  for (let index = 0; index < ENEMY_DEFINITIONS.length; index += 1) {
    const def = ENEMY_DEFINITIONS[index];
    if (def.tier > safeMaxTier) break;
    lastDef = def;
    totalWeight += preferHigh ? (1 + (def.tier - 1) * 0.42) : (1 + (safeMaxTier - def.tier) * 0.35);
  }
  let roll = ((roll01 ?? battleRandom()) || 0) * totalWeight;
  for (let index = 0; index < ENEMY_DEFINITIONS.length; index += 1) {
    const def = ENEMY_DEFINITIONS[index];
    if (def.tier > safeMaxTier) break;
    roll -= preferHigh ? (1 + (def.tier - 1) * 0.42) : (1 + (safeMaxTier - def.tier) * 0.35);
    if (roll <= 0) return def;
  }
  return lastDef;
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
  let hp = Math.round((def.baseHp + ((plan?.hpRoll ?? battleRandom()) || 0) * ENEMY_HP_RANDOM_SPREAD) * hpScale);
  let speed = (def.baseSpeed + ((plan?.speedRoll ?? battleRandom()) || 0) * ENEMY_SPEED_RANDOM_SPREAD) * speedScale;
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
  const moveSpeedMultiplier = roleConfig.role === 'swarm'
    ? 1.1
    : (roleConfig.role === 'armored' ? 0.94 : 1);

  const radius = Math.max(12, Math.round(renderSize * (elite ? 0.31 : 0.27) * ENEMY_COLLISION_RADIUS_SCALE));
  const spawnPoint = getEnemySpawnPoint(radius, plan, options.spawnIndex);
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
    moveSpeedMultiplier,
    wobbleMovement: roleConfig.role === 'swarm' || roleConfig.role === 'splitter',
    wobbleSeed: ((plan?.wobbleRoll ?? battleRandom()) || 0) * Math.PI * 2
  });
  return enemy;
}

function shouldSpawnHardenedEnemy(elapsedSec, flow, def, roll01 = null) {
  if (elapsedSec < 45) return false;
  const tierBonus = Math.max(0, def.tier - 1) * 0.0045;
  const elapsedBonus = clamp((elapsedSec - 45) / 460, 0, 1) * 0.085;
  const flowBonus = Number(flow?.hardenedBonus) || 0;
  const chance = clamp(0.028 + tierBonus + elapsedBonus + flowBonus, 0.005, 0.22);
  return ((roll01 ?? battleRandom()) || 0) < chance;
}

function spawnEnemy(flow) {
  const battle = session.battle;
  const elapsedSec = battle.waves.elapsedSec;
  const softCap = elapsedSec < 60
    ? EARLY_SOFTCAP_T1
    : (elapsedSec < 140 ? EARLY_SOFTCAP_T2 : (elapsedSec < 240 ? EARLY_SOFTCAP_T3 : ENEMY_LATE_SOFTCAP));
  const cap = clamp(
    softCap + (Number(flow?.capBonus) || 0) + getLateWavePressure(elapsedSec),
    5,
    ENEMY_MAX_ACTIVE_CAP
  );
  if (battle.enemies.length >= cap) return;

  const spawnPlan = getNextSpawnEventPlan();
  const burstChance = clamp(
    ENEMY_BURST_BASE_CHANCE + (elapsedSec / ENEMY_BURST_GROWTH_SEC) + getLateWavePressure(elapsedSec) * ENEMY_BURST_LATE_PRESSURE_STEP,
    ENEMY_BURST_BASE_CHANCE,
    ENEMY_BURST_MAX_CHANCE
  );
  const remainingSlots = cap - battle.enemies.length;
  const spawnCount = remainingSlots >= 2 && ((spawnPlan?.burstRoll ?? battleRandom()) || 0) < burstChance ? 2 : 1;
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
      plan: enemyPlan,
      spawnIndex: index
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
    renderMetricKey: '',
    renderDrawScale: 1,
    renderDrawWidth: 0,
    renderDrawHeight: 0,
    renderVisualRadius: 0,
    renderCullRadius: 0,
    hasBeenVisible: false,
    moveSpeedMultiplier: 1,
    wobbleMovement: false,
    wobbleSeed: 0
  };
}

function createEnemyPool(size = ENEMY_POOL_SIZE) {
  return Array.from({ length: size }, (_, index) => createPooledEnemy(index));
}

function acquireInactiveFromPool(pool, owner, cursorKey) {
  if (!Array.isArray(pool) || !pool.length) return null;
  const startIndex = clamp(Math.round(Number(owner?.[cursorKey]) || 0), 0, pool.length - 1);
  for (let offset = 0; offset < pool.length; offset += 1) {
    const poolIndex = (startIndex + offset) % pool.length;
    const item = pool[poolIndex];
    if (item && !item.active) {
      if (owner && cursorKey) owner[cursorKey] = (poolIndex + 1) % pool.length;
      return item;
    }
  }
  return null;
}

function acquireEnemy(battle = session?.battle) {
  if (!battle) return createPooledEnemy();
  if (!Array.isArray(battle.enemyPool) || !battle.enemyPool.length) {
    battle.enemyPool = createEnemyPool();
  }
  const pooled = acquireInactiveFromPool(battle.enemyPool, battle, 'enemyPoolCursor');
  if (pooled) return pooled;
  const overflow = createPooledEnemy(battle.enemyPool.length);
  battle.enemyPool.push(overflow);
  battle.enemyPoolCursor = (overflow.poolIndex + 1) % battle.enemyPool.length;
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
    renderRadius: 0,
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
  const pooled = acquireInactiveFromPool(battle.projectilePool, battle, 'projectilePoolCursor');
  if (pooled) return pooled;
  const overflow = createPooledProjectile(battle.projectilePool.length);
  battle.projectilePool.push(overflow);
  battle.projectilePoolCursor = (overflow.poolIndex + 1) % battle.projectilePool.length;
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
  const angleOffsets = getProjectileAngleOffsets(count);
  const projectileRadius = 6.5 + Math.min(2, battle.ship.attackPowerLevel * 0.18);
  const projectileRenderRadius = getProjectileRenderRadius({ radius: projectileRadius });
  const projectileDamage = battle.ship.attackPower;
  for (let index = 0; index < angleOffsets.length; index += 1) {
    const offset = angleOffsets[index];
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
    projectile.radius = projectileRadius;
    projectile.renderRadius = projectileRenderRadius;
    projectile.damage = projectileDamage;
    projectile.remainingHits = penetrationHits;
    projectile.explosionLevel = explosionLevel;
    projectile.explosionRadius = explosionRadius;
    projectile.explosionDamageRatio = explosionDamageRatio;
    projectile.trackHits = penetrationHits > 0;
    projectile.hitEnemyIds.length = 0;
    battle.projectiles.push(projectile);
  }
}

function addKillReward(enemy) {
  const battle = session.battle;
  const tier = Math.max(1, Number(enemy?.tier) || 1);
  const eliteBonus = enemy?.elite ? 2 : 0;
  const isHardened = Boolean(enemy?.hardened && !enemy?.elite);
  const waveBonus = Math.max(0, battle.waves.level - 1) * 3;
  const roleBonus = ['commander', 'summoner', 'armored', 'adaptive'].includes(enemy?.role) ? KILL_SCORE_ROLE_BONUS : 0;
  const variantBonus = enemy?.elite
    ? (KILL_SCORE_ELITE_BASE_BONUS + tier * KILL_SCORE_ELITE_TIER_BONUS)
    : (isHardened ? KILL_SCORE_HARDENED_BONUS : 0);
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
    const rushBonus = KILL_RUSH_BONUS_BASE + battle.waves.level * KILL_RUSH_BONUS_WAVE_STEP;
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
  compactActiveArray(battle.enemies);
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
  compactActiveArray(battle.projectiles);
  battle.projectilesNeedCompact = false;
}

function compactActiveArray(items, requireActive = false) {
  if (!Array.isArray(items)) return items;
  let writeIndex = 0;
  for (let readIndex = 0; readIndex < items.length; readIndex += 1) {
    const item = items[readIndex];
    if (!item || item.removed || (requireActive && !item.active)) continue;
    if (writeIndex !== readIndex) items[writeIndex] = item;
    writeIndex += 1;
  }
  items.length = writeIndex;
  return items;
}

function createEnemySpatialGrid() {
  return {
    cellSize: ENEMY_SPATIAL_CELL_SIZE,
    buckets: new Map(),
    bucketPool: []
  };
}

function resetEnemySpatialGrid(grid) {
  if (!grid?.buckets) return;
  if (!Array.isArray(grid.bucketPool)) grid.bucketPool = [];
  for (const bucket of grid.buckets.values()) {
    if (!bucket) continue;
    bucket.length = 0;
    grid.bucketPool.push(bucket);
  }
  grid.buckets.clear();
}

function getEnemySpatialGridKey(cellX, cellY) {
  return cellX * 65536 + cellY;
}

function buildEnemySpatialGrid(battle) {
  const cellSize = ENEMY_SPATIAL_CELL_SIZE;
  const grid = battle.enemySpatialGrid || createEnemySpatialGrid();
  battle.enemySpatialGrid = grid;
  grid.cellSize = cellSize;
  resetEnemySpatialGrid(grid);
  const buckets = grid.buckets;
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const cellX = Math.floor(enemy.x / cellSize);
    const cellY = Math.floor(enemy.y / cellSize);
    const key = getEnemySpatialGridKey(cellX, cellY);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(enemy);
    } else {
      const nextBucket = grid.bucketPool.pop() || [];
      nextBucket.length = 0;
      nextBucket.push(enemy);
      buckets.set(key, nextBucket);
    }
  }
  return grid;
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
      const bucket = grid.buckets.get(getEnemySpatialGridKey(cellX, cellY));
      if (!bucket) continue;
      for (let index = 0; index < bucket.length; index += 1) {
        callback(bucket[index]);
      }
    }
  }
}

function findProjectileHitEnemy(grid, projectile) {
  if (!grid?.buckets?.size || !projectile) return null;
  const cellSize = grid.cellSize || ENEMY_SPATIAL_CELL_SIZE;
  const safeRadius = Math.max(1, (Number(projectile.radius) || 0) + 80);
  const minX = Math.floor((projectile.x - safeRadius) / cellSize);
  const maxX = Math.floor((projectile.x + safeRadius) / cellSize);
  const minY = Math.floor((projectile.y - safeRadius) / cellSize);
  const maxY = Math.floor((projectile.y + safeRadius) / cellSize);
  let hitEnemy = null;
  let hitEnemyDistanceSq = Number.POSITIVE_INFINITY;
  const trackHits = Boolean(projectile.trackHits);
  const hitEnemyIds = trackHits ? projectile.hitEnemyIds : null;
  const hitIdsAreArray = Array.isArray(hitEnemyIds);
  for (let cellY = minY; cellY <= maxY; cellY += 1) {
    for (let cellX = minX; cellX <= maxX; cellX += 1) {
      const bucket = grid.buckets.get(getEnemySpatialGridKey(cellX, cellY));
      if (!bucket) continue;
      for (let index = 0; index < bucket.length; index += 1) {
        const enemy = bucket[index];
        if (!enemy || enemy.removed) continue;
        if (
          trackHits
          && (
            hitIdsAreArray
              ? hitEnemyIds.includes(enemy.id)
              : typeof hitEnemyIds?.has === 'function' && hitEnemyIds.has(enemy.id)
          )
        ) {
          continue;
        }
        const hitRadius = projectile.radius + enemy.radius;
        const dx = projectile.x - enemy.x;
        const dy = projectile.y - enemy.y;
        const projectileDistanceSq = dx * dx + dy * dy;
        if (projectileDistanceSq > hitRadius * hitRadius || projectileDistanceSq >= hitEnemyDistanceSq) continue;
        hitEnemy = enemy;
        hitEnemyDistanceSq = projectileDistanceSq;
      }
    }
  }
  return hitEnemy;
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
    seed: 0,
    radiusBucket: 0,
    levelBucket: 1,
    seedBucket: 0,
    frameCachePrefix: '',
    frameCacheSignature: ''
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
  const wasActive = effect.active && !effect.removed;
  effect.active = false;
  effect.removed = true;
  if (battle) {
    if (wasActive) battle.activeEffectCount = Math.max(0, (Number(battle.activeEffectCount) || 0) - 1);
    battle.effectsNeedCompact = true;
  }
}

function compactRemovedEffects(battle = session?.battle) {
  if (!battle?.effectsNeedCompact) return;
  compactActiveArray(battle.effects, true);
  battle.effectsNeedCompact = false;
}

function acquireExplosionEffect(battle = session?.battle) {
  if (!battle) return null;
  if (!Array.isArray(battle.effects)) battle.effects = [];
  if (!Array.isArray(battle.effectPool) || !battle.effectPool.length) {
    battle.effectPool = createEffectPool();
  }

  for (let index = 0; index < battle.effects.length; index += 1) {
    const effect = battle.effects[index];
    if (effect && effect.removed) return effect;
  }

  if (battle.effects.length >= MAX_ACTIVE_BATTLE_EFFECTS) {
    const recycleIndex = clamp(Math.round(Number(battle.effectRecycleIndex) || 0), 0, Math.max(0, battle.effects.length - 1));
    battle.effectRecycleIndex = (recycleIndex + 1) % Math.max(1, battle.effects.length);
    return battle.effects[recycleIndex] || battle.effectPool[0] || null;
  }

  const pooled = acquireInactiveFromPool(battle.effectPool, battle, 'effectPoolCursor');
  if (pooled) {
    battle.effects.push(pooled);
    return pooled;
  }

  return battle.effects[0] || null;
}

function updateExplosionEffectFrameCacheFields(effect) {
  if (!effect) return null;
  const radius = Math.max(4, Number(effect.radius) || 0);
  const level = Math.max(1, Math.round(Number(effect.level) || 1));
  const radiusBucket = Math.max(4, Math.round(radius / 4) * 4);
  const levelBucket = Math.min(16, level);
  const seedValue = Number(effect.seed) || 0;
  const seedBucket = Math.floor(clamp(seedValue, 0, 0.999999) * EXPLOSION_SEED_BUCKETS);
  const signature = `${radiusBucket}:${levelBucket}:${seedBucket}`;
  if (effect.frameCacheSignature === signature) return effect;
  effect.radiusBucket = radiusBucket;
  effect.levelBucket = levelBucket;
  effect.seedBucket = seedBucket;
  effect.frameCachePrefix = signature;
  effect.frameCacheSignature = signature;
  return effect;
}

function addExplosionEffect(x, y, radius, level = 1, damage = 0, startedAtMs = performance.now()) {
  const battle = session?.battle;
  if (!battle || radius <= 0) return;
  const effect = acquireExplosionEffect(battle);
  if (!effect) return;
  const wasActive = effect.active && !effect.removed;
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
  effect.startedAtMs = Number(startedAtMs) || performance.now();
  effect.durationMs = SHIP_EXPLOSION_EFFECT_MS;
  effect.seed = battleRandom();
  updateExplosionEffectFrameCacheFields(effect);
  if (!wasActive) battle.activeEffectCount = (Number(battle.activeEffectCount) || 0) + 1;
}

function applyProjectileSplashDamage(enemy, sourceEnemyId, impactX, impactY, radius, splashDamage, explosionLevel) {
  if (!enemy || enemy.removed || enemy.id === sourceEnemyId) return;
  const maxDistance = radius + enemy.radius;
  const dx = enemy.x - impactX;
  const dy = enemy.y - impactY;
  const centerDistanceSq = dx * dx + dy * dy;
  if (centerDistanceSq > maxDistance * maxDistance) return;
  const centerDistance = Math.sqrt(centerDistanceSq);
  const edgeDistance = Math.max(0, centerDistance - enemy.radius);
  if (edgeDistance > radius) return;
  const falloff = 1 - clamp(edgeDistance / Math.max(1, radius), 0, 1);
  const explosionDamage = Math.max(1, Math.round(splashDamage * (0.48 + falloff * 0.52)));
  const vectorLength = Math.max(0.0001, centerDistance);
  const knockback = (8 + explosionLevel * 2.6) * (0.3 + falloff * 0.64);
  enemy.x += (dx / vectorLength) * knockback;
  enemy.y += (dy / vectorLength) * knockback;
  if (applyDamageToEnemy(enemy, explosionDamage, true)) {
    removeEnemyAt(-1, enemy);
    addKillReward(enemy);
  }
}

function applyProjectileExplosion(projectile, sourceEnemyId, enemyGrid = null, nowMs = performance.now()) {
  const battle = session.battle;
  const radius = Math.max(0, Number(projectile?.explosionRadius) || 0);
  const damageRatio = clamp(Number(projectile?.explosionDamageRatio) || 0, 0, 1);
  if (radius <= 0 || damageRatio <= 0) return;
  const impactX = Number(projectile?.x) || 0;
  const impactY = Number(projectile?.y) || 0;
  const splashDamage = Math.max(1, Math.round((Number(projectile?.damage) || 0) * damageRatio));
  const explosionLevel = Math.max(1, Number(projectile?.explosionLevel) || 1);
  addExplosionEffect(impactX, impactY, radius, explosionLevel, splashDamage, nowMs);
  if (enemyGrid?.buckets?.size) {
    const cellSize = enemyGrid.cellSize || ENEMY_SPATIAL_CELL_SIZE;
    const safeRadius = radius + 80;
    const minX = Math.floor((impactX - safeRadius) / cellSize);
    const maxX = Math.floor((impactX + safeRadius) / cellSize);
    const minY = Math.floor((impactY - safeRadius) / cellSize);
    const maxY = Math.floor((impactY + safeRadius) / cellSize);
    for (let cellY = minY; cellY <= maxY; cellY += 1) {
      for (let cellX = minX; cellX <= maxX; cellX += 1) {
        const bucket = enemyGrid.buckets.get(getEnemySpatialGridKey(cellX, cellY));
        if (!bucket) continue;
        for (let index = 0; index < bucket.length; index += 1) {
          applyProjectileSplashDamage(bucket[index], sourceEnemyId, impactX, impactY, radius, splashDamage, explosionLevel);
        }
      }
    }
  } else {
    for (let index = battle.enemies.length - 1; index >= 0; index -= 1) {
      applyProjectileSplashDamage(battle.enemies[index], sourceEnemyId, impactX, impactY, radius, splashDamage, explosionLevel);
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
    const dx = enemy.x - battle.ship.x;
    const dy = enemy.y - battle.ship.y;
    const distSq = dx * dx + dy * dy;
    if (distSq > maxDistance * maxDistance) continue;
    const dist = Math.sqrt(distSq);
    if (dist > radius + enemy.radius) continue;
    const falloff = 1 - clamp(dist / Math.max(radius, 1), 0, 0.78);
    const shockDamage = Math.max(1, Math.round(baseDamage * Math.max(0.3, falloff)));
    const vectorLength = Math.max(0.0001, dist);
    enemy.x += (dx / vectorLength) * (14 + hullLevel * 3);
    enemy.y += (dy / vectorLength) * (14 + hullLevel * 3);
    if (applyDamageToEnemy(enemy, shockDamage)) {
      removeEnemyAt(index, enemy);
      addKillReward(enemy);
    }
  }
}

function getShipRepairQuizRequired(battle = session?.battle) {
  return Math.max(0, Math.round(Number(battle?.ship?.repairQuizRequired) || 0));
}

function getShipRepairQuizAnswered(battle = session?.battle) {
  return Math.max(0, Math.round(Number(battle?.ship?.repairQuizAnswered) || 0));
}

function getShipRepairQuizRemaining(battle = session?.battle) {
  return Math.max(0, getShipRepairQuizRequired(battle) - getShipRepairQuizAnswered(battle));
}

function isShipRepairQuizPending(battle = session?.battle) {
  return getShipRepairQuizRemaining(battle) > 0;
}

function getShipRepairStatusText(battle = session?.battle) {
  const required = getShipRepairQuizRequired(battle) || BATTLESHIP_REPAIR_QUIZ_REQUIRED;
  const answered = clamp(getShipRepairQuizAnswered(battle), 0, required);
  const remaining = Math.max(0, required - answered);
  const sharedRepair = Boolean(session?.sharedBattle && battle === session.battles?.[0]);
  return remaining > 0
    ? `거북선 수리 퀴즈 ${answered}/${required}${sharedRepair ? ' · 모두 1문제씩' : ` · ${remaining}문제 남음`}`
    : '수리 퀴즈 완료 · 거북선 재출항';
}

function isShipRespawning(nowMs = performance.now()) {
  const battle = session?.battle;
  return Boolean(
    isShipRepairQuizPending(battle)
      || (battle?.ship?.respawnUntilMs && Number(battle.ship.respawnUntilMs) > Number(nowMs))
  );
}

function isShipInvulnerable(nowMs = performance.now()) {
  return Number(session?.battle?.ship?.invulnerableUntilMs || 0) > Number(nowMs);
}

function clearBattlefieldForRespawn(battle = session?.battle) {
  if (!battle) return 0;
  let clearedEnemies = 0;
  if (Array.isArray(battle.enemies)) {
    for (let index = 0; index < battle.enemies.length; index += 1) {
      const enemy = battle.enemies[index];
      if (enemy && !enemy.removed) clearedEnemies += 1;
      markEnemyRemoved(enemy);
    }
  }
  battle.enemies = [];
  battle.enemiesNeedCompact = false;
  if (Array.isArray(battle.projectiles)) {
    for (let index = 0; index < battle.projectiles.length; index += 1) {
      markProjectileRemoved(battle.projectiles[index]);
    }
  }
  battle.projectiles = [];
  battle.projectilesNeedCompact = false;
  if (Array.isArray(battle.effects)) {
    for (let index = 0; index < battle.effects.length; index += 1) {
      markEffectRemoved(battle.effects[index], battle);
    }
    compactRemovedEffects(battle);
  }
  battle.activeEffectCount = 0;
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

function clearRepairQuizTimer(battle = session?.battle) {
  if (!battle?.repairQuizTimerId) return;
  window.clearTimeout(battle.repairQuizTimerId);
  battle.repairQuizTimerId = 0;
}

function getRepairQuizPlayerIndex(battle = session?.battle) {
  if (!session) return 0;
  if (isSharedBattleSession()) return getSafePlayerIndex(session.activePlayerIndex) || 0;
  return getSafePlayerIndex(battle?.playerIndex) || 0;
}

function ensureSharedRepairQuestion(battle = session?.battle) {
  if (!session || !battle) return null;
  const ship = battle.ship;
  if (ship.repairQuizSharedQuestion) return ship.repairQuizSharedQuestion;
  if (!Array.isArray(battle.questionQueue)) {
    battle.questionQueue = createQuestionQueue(session.questions);
  }
  if (!battle.questionQueue.length) {
    battle.questionQueue = createQuestionQueue(session.questions);
  }
  const base = battle.questionQueue.shift();
  if (!base) return null;
  ship.repairQuizSharedQuestion = {
    ...base,
    choices: shuffle(Array.isArray(base.choices) ? base.choices : [])
  };
  return ship.repairQuizSharedQuestion;
}

function scheduleRepairQuizOpen(battle = session?.battle) {
  if (!session || !battle) return;
  clearRepairQuizTimer(battle);
  battle.repairQuizTimerId = window.setTimeout(() => {
    battle.repairQuizTimerId = 0;
    if (!session || session.endedAt || !session.battles.includes(battle)) return;
    if (!isShipRepairQuizPending(battle)) return;
    if (isSharedBattleSession()) {
      ensureSharedRepairQuestion(battle);
      session.players.forEach((_, playerIndex) => {
        openQuizModal(playerIndex);
      });
      return;
    }
    const playerIndex = getRepairQuizPlayerIndex(battle);
    openQuizModal(playerIndex);
  }, BATTLESHIP_REPAIR_QUIZ_OPEN_DELAY_MS);
}

function restoreShipAfterRepair(nowMs = performance.now(), battle = session?.battle) {
  if (!battle) return;
  const ship = battle.ship;
  clearRepairQuizTimer(battle);
  ship.respawnUntilMs = 0;
  ship.repairQuizRequired = 0;
  ship.repairQuizAnswered = 0;
  ship.repairQuizPlayerAnswers = [];
  ship.repairQuizSharedQuestion = null;
  ship.invulnerableUntilMs = nowMs + BATTLESHIP_RESPAWN_INVULN_MS;
  ship.hp = ship.maxHp;
  battle.nextShotMs = battle.worldElapsedMs + 300;
  battle.nextSpawnMs = BATTLESHIP_DEFEAT_SPAWN_RESTART_MS;
  setBattleStatus('수리 퀴즈 완료 · 거북선 재출항', 'success');
}

function normalizeRepairQuizPlayerAnswers(battle = session?.battle) {
  if (!battle || !session?.sharedBattle) return [];
  const playerCount = session.players.length;
  const answers = Array.isArray(battle.ship.repairQuizPlayerAnswers)
    ? battle.ship.repairQuizPlayerAnswers.slice(0, playerCount)
    : [];
  while (answers.length < playerCount) answers.push(false);
  battle.ship.repairQuizPlayerAnswers = answers.map(Boolean);
  return battle.ship.repairQuizPlayerAnswers;
}

function recordShipRepairQuizAnswer(battle = session?.battle, playerIndex = currentBattleIndex) {
  if (!battle || !isShipRepairQuizPending(battle)) return false;
  const ship = battle.ship;
  const required = getShipRepairQuizRequired(battle);
  if (isSharedBattleSession()) {
    const safeIndex = getSafePlayerIndex(playerIndex) || 0;
    const answers = normalizeRepairQuizPlayerAnswers(battle);
    if (answers[safeIndex]) return true;
    answers[safeIndex] = true;
    ship.repairQuizAnswered = Math.min(required, answers.filter(Boolean).length);
  } else {
    ship.repairQuizAnswered = Math.min(required, getShipRepairQuizAnswered(battle) + 1);
  }
  battle.hudDirty = true;
  if (isShipRepairQuizPending(battle)) {
    setBattleStatus(getShipRepairStatusText(battle), 'danger');
    return true;
  }
  restoreShipAfterRepair(performance.now(), battle);
  return true;
}

function triggerShipRespawn(nowMs = performance.now()) {
  const battle = session.battle;
  const ship = battle.ship;
  const clearedEnemies = clearBattlefieldForRespawn(battle);
  const penalty = applyShipDeathScorePenalty(battle);
  const repairQuizRequired = isSharedBattleSession()
    ? Math.max(1, session.players.length)
    : BATTLESHIP_REPAIR_QUIZ_REQUIRED;
  ship.hp = 0;
  ship.deathCount += 1;
  ship.respawnUntilMs = 0;
  ship.invulnerableUntilMs = 0;
  ship.repairQuizRequired = repairQuizRequired;
  ship.repairQuizAnswered = 0;
  ship.repairQuizPlayerAnswers = isSharedBattleSession()
    ? Array.from({ length: session.players.length }, () => false)
    : [];
  ship.repairQuizSharedQuestion = null;
  battle.nextSpawnMs = BATTLESHIP_DEFEAT_SPAWN_RESTART_MS;
  battle.nextShotMs = Number.POSITIVE_INFINITY;
  battle.defeatFlashUntilMs = nowMs + BATTLESHIP_DEFEAT_FLASH_MS;
  battle.lastDeathPenalty = penalty;
  battle.lastDeathClearedEnemies = clearedEnemies;
  const penaltyText = penalty > 0 ? ` · 점수 -${penalty.toLocaleString('ko-KR')}` : '';
  const clearText = clearedEnemies > 0 ? ` · 적 ${clearedEnemies} 싹쓸이` : ' · 전장 정리';
  setBattleStatus(`거북선 격침${penaltyText}${clearText} · 1초 뒤 수리 퀴즈`, 'danger');
  scheduleRepairQuizOpen(battle);
}

function completeShipRespawn(nowMs = performance.now()) {
  const battle = session.battle;
  if (isShipRepairQuizPending(battle)) return;
  const ship = battle.ship;
  if (!ship.respawnUntilMs || ship.respawnUntilMs > nowMs) return;
  restoreShipAfterRepair(nowMs, battle);
}

function updateBattle(dtSec, nowMs) {
  if (!session || session.endedAt) return;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }
  const battle = session.battle;
  const ship = battle.ship;

  completeShipRespawn(nowMs);
  const recovering = isShipRespawning(nowMs);
  const worldDtSec = recovering ? 0 : dtSec * getBattleQuizWorldRatio(battle);
  battle.worldElapsedMs += worldDtSec * 1000;
  battle.waves.elapsedSec += worldDtSec;
  battle.waves.level = 1 + Math.floor(battle.waves.elapsedSec / 20);
  battle.spawnCooldownMs = Math.max(
    SPAWN_MIN_COOLDOWN_MS,
    SPAWN_START_COOLDOWN_MS - battle.waves.elapsedSec * SPAWN_DECAY_PER_SEC
  );
  battle.flow = getFlowState(battle.waves.elapsedSec, battle.flow);
  const activeSpawnCooldown = clamp(
    battle.spawnCooldownMs * battle.flow.spawnCooldownMul,
    Math.max(420, SPAWN_MIN_COOLDOWN_MS * 0.74),
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

  const enemyGrid = battle.projectiles.length && battle.enemies.length ? buildEnemySpatialGrid(battle) : null;
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
    const hitEnemy = findProjectileHitEnemy(enemyGrid, projectile);
    if (hitEnemy) {
      addProjectileHitEnemy(projectile, hitEnemy.id);
      const killed = applyDamageToEnemy(hitEnemy, projectile.damage);
      applyProjectileExplosion(projectile, hitEnemy.id, enemyGrid, nowMs);
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

  let activeEffectCount = 0;
  for (let index = battle.effects.length - 1; index >= 0; index -= 1) {
    const effect = battle.effects[index];
    if (!effect || effect.removed || !effect.active) continue;
    const durationMs = Math.max(1, Number(effect?.durationMs) || 1);
    if (nowMs - (Number(effect?.startedAtMs) || 0) >= durationMs) {
      markEffectRemoved(effect, battle);
    } else {
      activeEffectCount += 1;
    }
  }
  battle.activeEffectCount = activeEffectCount;
  compactRemovedEffects(battle);

  let shipSafeFromTouch = isShipRespawning(nowMs) || isShipInvulnerable(nowMs);
  const touchDamageMultiplier = 3 * (1 - getShipDamageReductionRatio());
  for (let index = battle.enemies.length - 1; index >= 0; index -= 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const shipDx = ship.x - enemy.x;
    const shipDy = ship.y - enemy.y;
    const shipDistanceSq = shipDx * shipDx + shipDy * shipDy;
    let moveX = 0;
    let moveY = 0;
    if (enemy.wobbleMovement) {
      const baseAngle = Math.atan2(shipDy, shipDx);
      let angle = baseAngle;
      angle += Math.sin(battle.worldElapsedMs * 0.004 + enemy.wobbleSeed) * 0.42;
      moveX = Math.cos(angle);
      moveY = Math.sin(angle);
    } else {
      const invDistance = 1 / Math.max(0.0001, Math.sqrt(shipDistanceSq));
      moveX = shipDx * invDistance;
      moveY = shipDy * invDistance;
    }
    let speedMultiplier = Number(enemy.moveSpeedMultiplier) || 1;
    if (enemy.role === 'charger' && shipDistanceSq < 165 * 165) speedMultiplier *= 1.7;
    enemy.x += moveX * enemy.speed * speedMultiplier * worldDtSec;
    enemy.y += moveY * enemy.speed * speedMultiplier * worldDtSec;

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
    if (shipSafeFromTouch) continue;
    const touchRadius = enemy.radius + ship.radius;
    const touchDx = ship.x - enemy.x;
    const touchDy = ship.y - enemy.y;
    if (touchDx * touchDx + touchDy * touchDy > touchRadius * touchRadius) continue;
    const touchDamage = Math.max(
      1,
      Math.round(enemy.touchDamage * touchDamageMultiplier)
    );
    ship.hp = Math.max(0, ship.hp - touchDamage);
    removeEnemyAt(index, enemy);
    triggerHullShockwave(enemy, touchDamage);
    setBattleStatus(`거북선 피격 · HP -${touchDamage}`, 'danger');
    if (ship.hp <= 0) {
      triggerShipRespawn(nowMs);
      shipSafeFromTouch = true;
    }
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

function getShipHpGaugeMetrics(ship, width, battle = session?.battle) {
  const ratio = ship.maxHp > 0 ? clamp(ship.hp / ship.maxHp, 0, 1) : 0;
  const tone = getShipHpTone(ratio);
  const visualScale = getBattleVisualScale(battle);
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
  const roundedHp = Math.max(0, Math.round(ship.hp));
  return {
    ratio,
    tone,
    visualScale,
    barWidth,
    barHeight,
    frameHeight,
    frameRadius,
    innerPad,
    labelFontSize,
    toneFontSize,
    x,
    y,
    fillWidth,
    textY,
    barY,
    roundedHp,
    cacheHeight: Math.ceil(y + frameHeight + 22 * visualScale + 2)
  };
}

function drawShipHpGaugePrimitives(ctx, ship, width, metrics) {
  const {
    ratio,
    tone,
    visualScale,
    barWidth,
    barHeight,
    frameHeight,
    frameRadius,
    innerPad,
    labelFontSize,
    toneFontSize,
    x,
    y,
    fillWidth,
    textY,
    barY,
    roundedHp
  } = metrics;
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
  ctx.fillText(`${roundedHp} / ${ship.maxHp}`, x + barWidth - Math.round(clamp(14 * visualScale, 8, 14)), textY);

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

function drawShipHpGauge(ctx, ship, width) {
  const battle = session?.battle;
  const metrics = getShipHpGaugeMetrics(ship, width, battle);
  const signature = [
    Math.round(width),
    metrics.roundedHp,
    ship.maxHp,
    Math.round(metrics.visualScale * 1000),
    metrics.tone.label
  ].join('|');
  if (battle?.shipHpGaugeCache?.signature === signature && battle.shipHpGaugeCache.canvas) {
    ctx.drawImage(battle.shipHpGaugeCache.canvas, 0, 0);
    return;
  }
  if (!battle) {
    drawShipHpGaugePrimitives(ctx, ship, width, metrics);
    return;
  }
  const cacheCanvas = document.createElement('canvas');
  cacheCanvas.width = Math.max(1, Math.ceil(width));
  cacheCanvas.height = Math.max(1, metrics.cacheHeight);
  const cacheCtx = cacheCanvas.getContext('2d');
  if (!cacheCtx) {
    drawShipHpGaugePrimitives(ctx, ship, width, metrics);
    return;
  }
  drawShipHpGaugePrimitives(cacheCtx, ship, width, metrics);
  battle.shipHpGaugeCache = {
    signature,
    canvas: cacheCanvas
  };
  ctx.drawImage(cacheCanvas, 0, 0);
}

function getShipRenderMetrics(battle = session?.battle) {
  const mapSize = Math.min(Number(battle?.canvasWidth) || 0, Number(battle?.canvasHeight) || 0);
  const longEdge = clamp(mapSize * 0.24 * SHIP_RENDER_SCALE, 31, 114);
  const drawHeight = longEdge;
  const drawWidth = drawHeight * (SHIP_SPRITE_CROP.width / SHIP_SPRITE_CROP.height);
  return { drawWidth, drawHeight };
}

function getShipImageSignature() {
  return shipImage.complete && shipImage.naturalWidth
    ? `image:${shipImage.naturalWidth}x${shipImage.naturalHeight}`
    : 'fallback';
}

function drawShipSpritePrimitives(ctx, drawWidth, drawHeight, centerX, centerY) {
  ctx.save();
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
      centerX - drawWidth / 2,
      centerY - drawHeight / 2,
      drawWidth,
      drawHeight
    );
  } else {
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, drawWidth * 0.52, drawHeight * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function getShipSpriteCache(battle, drawWidth, drawHeight) {
  if (!battle) return null;
  const signature = [
    Math.round(drawWidth * 10),
    Math.round(drawHeight * 10),
    getShipImageSignature()
  ].join('|');
  if (battle.shipSpriteCache?.signature === signature && battle.shipSpriteCache.canvas) {
    return battle.shipSpriteCache;
  }
  const pad = 34;
  const shadowOffsetY = 8;
  const cacheCanvas = document.createElement('canvas');
  cacheCanvas.width = Math.max(1, Math.ceil(drawWidth + pad * 2));
  cacheCanvas.height = Math.max(1, Math.ceil(drawHeight + pad * 2 + shadowOffsetY));
  const cacheCtx = cacheCanvas.getContext('2d');
  if (!cacheCtx) return null;
  const anchorX = pad + drawWidth / 2;
  const anchorY = pad + drawHeight / 2;
  drawShipSpritePrimitives(cacheCtx, drawWidth, drawHeight, anchorX, anchorY);
  battle.shipSpriteCache = {
    signature,
    canvas: cacheCanvas,
    anchorX,
    anchorY
  };
  return battle.shipSpriteCache;
}

function drawShip(ctx, ship, nowMs) {
  const battle = session?.battle;
  const invulnerable = isShipInvulnerable(nowMs);
  const respawning = isShipRespawning(nowMs);
  const { drawWidth, drawHeight } = getShipRenderMetrics(battle);
  const sprite = getShipSpriteCache(battle, drawWidth, drawHeight);
  ctx.save();
  ctx.globalAlpha = respawning ? 0.26 : (invulnerable ? 0.62 + Math.sin(nowMs * 0.02) * 0.2 : 1);
  if (sprite?.canvas) {
    ctx.drawImage(sprite.canvas, ship.x - sprite.anchorX, ship.y - sprite.anchorY);
  } else {
    drawShipSpritePrimitives(ctx, drawWidth, drawHeight, ship.x, ship.y);
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
    const isMaxElite = getEliteUnlockedTier(session?.battle?.waves?.elapsedSec || 0) >= 10;
    return isMaxElite ? ENEMY_VARIANT_VISUAL_CACHE.eliteMax : ENEMY_VARIANT_VISUAL_CACHE.elite;
  }
  if (enemy?.hardened) {
    return ENEMY_VARIANT_VISUAL_CACHE.hardened;
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
  for (let index = 0; index < ENEMY_OUTLINE_DIRECTIONS.length; index += 1) {
    const direction = ENEMY_OUTLINE_DIRECTIONS[index];
    ctx.drawImage(silhouette, x + direction[0] * offset, y + direction[1] * offset, width, height);
  }
}

function drawCompositeOutline(ctx, image, color, x, y, width, height, offset) {
  const silhouette = getEnemySilhouetteSprite(image, color);
  if (!silhouette) return;
  for (let index = 0; index < ENEMY_OUTLINE_DIRECTIONS.length; index += 1) {
    const direction = ENEMY_OUTLINE_DIRECTIONS[index];
    ctx.drawImage(silhouette, x + direction[0] * offset, y + direction[1] * offset, width, height);
  }
}

function getCompositeEnemySprite(image, style) {
  if (!image || !image.naturalWidth || !image.naturalHeight || !style) return null;
  const detail = style.compositeCacheKey || [
    style.cacheKey || 'variant',
    style.outline || '',
    style.outerOutline || '',
    ...(Array.isArray(style.tintLayers) ? style.tintLayers : [])
  ].join('|');
  const cacheKey = getEnemyVariantCacheKey(image, 'composite', detail);
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

function trimMapCache(cache, limit) {
  if (!cache?.size || cache.size <= limit) return;
  while (cache.size > limit) {
    const firstKey = cache.keys().next().value;
    if (!firstKey) break;
    cache.delete(firstKey);
  }
}

function getEnemyBodySource(image, variantStyle) {
  if (!image?.complete || !image.naturalWidth) return null;
  if (!variantStyle) {
    return {
      image,
      padX: 0,
      padY: 0,
      kind: 'base',
      cacheKey: image.currentSrc || image.src || `${image.naturalWidth}x${image.naturalHeight}`
    };
  }
  const compositeSprite = getCompositeEnemySprite(image, variantStyle);
  if (compositeSprite?.image) {
    return {
      image: compositeSprite.image,
      padX: compositeSprite.padX,
      padY: compositeSprite.padY,
      kind: 'composite',
      cacheKey: getEnemyVariantCacheKey(image, 'composite-body', variantStyle.compositeCacheKey || variantStyle.cacheKey || 'variant')
    };
  }
  const tintedSprite = getTintedEnemySprite(image, variantStyle);
  return {
    image: tintedSprite,
    padX: 0,
    padY: 0,
    kind: 'tinted',
    cacheKey: getEnemyVariantCacheKey(image, 'tinted-body', variantStyle.cacheKey || 'variant')
  };
}

function drawEnemyBodySource(ctx, source, drawX, drawY, drawWidth, drawHeight) {
  if (!source?.image) return false;
  const padX = drawWidth * (Number(source.padX) || 0);
  const padY = drawHeight * (Number(source.padY) || 0);
  ctx.drawImage(
    source.image,
    drawX - padX,
    drawY - padY,
    drawWidth + padX * 2,
    drawHeight + padY * 2
  );
  return true;
}

function getEnemyShadowSprite(source, drawWidth, drawHeight, enemyDrawScale, shadowBlur, shadowOffsetY, filterText) {
  if (!source?.image || shadowBlur <= 0) return null;
  const bodyWidth = drawWidth + drawWidth * (Number(source.padX) || 0) * 2;
  const bodyHeight = drawHeight + drawHeight * (Number(source.padY) || 0) * 2;
  const shadowPad = Math.ceil(Math.max(6, shadowBlur + Math.abs(shadowOffsetY) + 4));
  const dpr = ENEMY_SPRITE_CACHE_DPR;
  const logicalWidth = Math.ceil(bodyWidth + shadowPad * 2);
  const logicalHeight = Math.ceil(bodyHeight + shadowPad * 2 + Math.max(0, shadowOffsetY));
  const key = [
    source.cacheKey,
    Math.round(bodyWidth * 10),
    Math.round(bodyHeight * 10),
    Math.round(enemyDrawScale * 1000),
    Math.round(shadowBlur * 10),
    Math.round(shadowOffsetY * 10),
    filterText || '',
    dpr
  ].join('|');
  const cached = enemyShadowSpriteCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(logicalWidth * dpr));
  canvas.height = Math.max(1, Math.ceil(logicalHeight * dpr));
  const offCtx = canvas.getContext('2d');
  if (!offCtx) return null;
  offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  offCtx.shadowColor = 'rgba(9, 24, 56, 0.24)';
  offCtx.shadowBlur = shadowBlur;
  offCtx.shadowOffsetY = shadowOffsetY;
  if (filterText) offCtx.filter = filterText;
  offCtx.drawImage(source.image, shadowPad, shadowPad, bodyWidth, bodyHeight);
  offCtx.filter = 'none';

  const sprite = {
    canvas,
    width: logicalWidth,
    height: logicalHeight,
    anchorX: shadowPad + bodyWidth / 2,
    anchorY: shadowPad + bodyHeight / 2
  };
  enemyShadowSpriteCache.set(key, sprite);
  trimMapCache(enemyShadowSpriteCache, ENEMY_SHADOW_SPRITE_CACHE_LIMIT);
  return sprite;
}

function getEnemyBadgeMeasureContext() {
  if (enemyBadgeMeasureCtx) return enemyBadgeMeasureCtx;
  const canvas = document.createElement('canvas');
  enemyBadgeMeasureCtx = canvas.getContext('2d');
  return enemyBadgeMeasureCtx;
}

function getEnemyBadgeSprite(badge, enemyDrawScale) {
  const text = String(badge?.text || '');
  if (!text) return null;
  const badgeFontSize = Math.round(clamp(10 * enemyDrawScale, 7, 10));
  const badgeHeight = Math.round(clamp(14 * enemyDrawScale, 10, 14));
  const badgeRadius = Math.round(clamp(7 * enemyDrawScale, 5, 7));
  const lineWidth = clamp(enemyDrawScale, 0.75, 1);
  const fill = badge.fill || 'rgba(15,23,42,0.82)';
  const stroke = badge.stroke || '';
  const color = badge.color || '#ffffff';
  const font = `800 ${badgeFontSize}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  const key = [
    text,
    fill,
    stroke,
    color,
    badgeFontSize,
    badgeHeight,
    badgeRadius,
    Math.round(lineWidth * 100),
    ENEMY_SPRITE_CACHE_DPR
  ].join('|');
  const cached = enemyBadgeSpriteCache.get(key);
  if (cached) return cached;

  const measureCtx = getEnemyBadgeMeasureContext();
  if (!measureCtx) return null;
  measureCtx.font = font;
  const labelWidth = Math.max(Math.round(24 * enemyDrawScale), measureCtx.measureText(text).width + Math.round(12 * enemyDrawScale));
  const dpr = ENEMY_SPRITE_CACHE_DPR;
  const logicalWidth = Math.ceil(labelWidth + lineWidth * 2);
  const logicalHeight = Math.ceil(badgeHeight + lineWidth * 2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(logicalWidth * dpr));
  canvas.height = Math.max(1, Math.ceil(logicalHeight * dpr));
  const offCtx = canvas.getContext('2d');
  if (!offCtx) return null;
  offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  offCtx.font = font;
  offCtx.textAlign = 'center';
  offCtx.textBaseline = 'middle';
  offCtx.fillStyle = fill;
  offCtx.beginPath();
  offCtx.roundRect(lineWidth, lineWidth, labelWidth, badgeHeight, badgeRadius);
  offCtx.fill();
  if (stroke) {
    offCtx.strokeStyle = stroke;
    offCtx.lineWidth = lineWidth;
    offCtx.stroke();
  }
  offCtx.fillStyle = color;
  offCtx.fillText(text, lineWidth + labelWidth / 2, lineWidth + badgeHeight / 2);

  const sprite = {
    canvas,
    width: logicalWidth,
    height: logicalHeight,
    drawOffsetX: logicalWidth / 2,
    drawOffsetY: lineWidth
  };
  enemyBadgeSpriteCache.set(key, sprite);
  trimMapCache(enemyBadgeSpriteCache, ENEMY_BADGE_SPRITE_CACHE_LIMIT);
  return sprite;
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

function getEnemyRenderMetrics(enemy, image, visualScale = getBattleVisualScale()) {
  if (!enemy) {
    return {
      drawScale: 1,
      drawWidth: 0,
      drawHeight: 0,
      visualRadius: 0,
      cullRadius: 0
    };
  }
  const safeVisualScale = Number(visualScale) || 1;
  const naturalWidth = Number(image?.naturalWidth) || 0;
  const naturalHeight = Number(image?.naturalHeight) || 0;
  const key = [
    enemy.tier || 0,
    Math.round((Number(enemy.renderSize) || 0) * 100),
    Math.round((Number(enemy.radius) || 0) * 100),
    Math.round(safeVisualScale * 1000),
    naturalWidth,
    naturalHeight
  ].join(':');
  if (enemy.renderMetricKey === key) {
    return {
      drawScale: enemy.renderDrawScale,
      drawWidth: enemy.renderDrawWidth,
      drawHeight: enemy.renderDrawHeight,
      visualRadius: enemy.renderVisualRadius,
      cullRadius: enemy.renderCullRadius
    };
  }

  const enemyDrawScale = clamp(safeVisualScale * 1.1, 0.55, 1);
  const renderSize = Number(enemy.renderSize) || 0;
  let drawWidth = renderSize * enemyDrawScale;
  let drawHeight = drawWidth;
  if (image?.complete && naturalWidth && naturalHeight) {
    const scale = drawWidth / Math.max(naturalWidth, naturalHeight);
    drawWidth = naturalWidth * scale;
    drawHeight = naturalHeight * scale;
  }
  const visualRadius = Math.max(8, (Number(enemy.radius) || 0) * enemyDrawScale);
  const cullRadius = Math.max(Number(enemy.radius) || 0, renderSize * safeVisualScale * 0.68);

  enemy.renderMetricKey = key;
  enemy.renderDrawScale = enemyDrawScale;
  enemy.renderDrawWidth = drawWidth;
  enemy.renderDrawHeight = drawHeight;
  enemy.renderVisualRadius = visualRadius;
  enemy.renderCullRadius = cullRadius;

  return {
    drawScale: enemyDrawScale,
    drawWidth,
    drawHeight,
    visualRadius,
    cullRadius
  };
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
  if (variantStyle?.badge) return variantStyle.badge;
  return ENEMY_ROLE_BADGES[enemy.role] || ENEMY_BADGE_EMPTY;
}

function getBattleRenderLoad(battle = session?.battle) {
  const enemyCount = Number(battle?.enemies?.length) || 0;
  const projectileCount = Number(battle?.projectiles?.length) || 0;
  const effectCount = Number.isFinite(battle?.activeEffectCount)
    ? Math.max(0, Number(battle.activeEffectCount) || 0)
    : countActiveEffects(battle);
  const performanceMode = Boolean(battle?.performanceMode);
  const busy = performanceMode
    || enemyCount >= BUSY_RENDER_ENEMY_COUNT
    || projectileCount >= BUSY_RENDER_PROJECTILE_COUNT
    || effectCount >= 7;
  const veryBusy = Boolean(battle?.performanceVeryBusy)
    || enemyCount >= VERY_BUSY_RENDER_ENEMY_COUNT
    || projectileCount >= VERY_BUSY_RENDER_PROJECTILE_COUNT
    || effectCount >= 10;
  const renderLoad = battle?.renderLoad || {};
  renderLoad.busy = busy;
  renderLoad.veryBusy = veryBusy;
  renderLoad.performanceMode = performanceMode;
  renderLoad.enemyCount = enemyCount;
  renderLoad.projectileCount = projectileCount;
  renderLoad.effectCount = effectCount;
  if (battle) battle.renderLoad = renderLoad;
  return renderLoad;
}

function shouldDrawEnemyInfo(enemy, variantStyle, renderLoad) {
  if (renderLoad?.performanceMode && !enemy.elite && !enemy.hardened && enemy.hp >= enemy.maxHp) return false;
  if (!renderLoad?.busy) return true;
  if (enemy.hp < enemy.maxHp) return true;
  if (variantStyle || enemy.elite || enemy.hardened) return true;
  return ENEMY_ALWAYS_INFO_ROLES.has(enemy.role);
}

function drawEnemy(ctx, enemy, nowMs, renderLoad = null, visualScale = getBattleVisualScale(), image = null, metrics = null) {
  image = image || enemyImages.get(enemy.tier);
  const variantStyle = getEnemyVariantVisual(enemy);
  metrics = metrics || getEnemyRenderMetrics(enemy, image, visualScale);
  const enemyDrawScale = metrics.drawScale;
  const visualRadius = metrics.visualRadius;
  const drawWidth = metrics.drawWidth;
  const drawHeight = metrics.drawHeight;
  const drawX = enemy.x - drawWidth / 2;
  const drawY = enemy.y - drawHeight / 2;
  if (!renderLoad?.veryBusy && (!renderLoad?.performanceMode || enemy.elite || enemy.hardened)) {
    drawEnemyVariantAura(ctx, enemy, drawWidth, drawHeight, variantStyle, nowMs);
  }

  const shadowBlur = (renderLoad?.veryBusy
    ? 0
    : (renderLoad?.performanceMode ? (variantStyle ? 7 : 4) : (variantStyle ? 18 : 10))) * enemyDrawScale;
  const shadowOffsetY = (renderLoad?.veryBusy ? 0 : (renderLoad?.performanceMode ? 3 : 6)) * enemyDrawScale;
  const filterText = variantStyle?.shadowColor && !renderLoad?.busy && !renderLoad?.performanceMode
    ? `drop-shadow(0 0 ${(enemy.elite ? 16 : 11) * enemyDrawScale}px ${variantStyle.shadowColor})`
    : '';
  if (image?.complete && image.naturalWidth) {
    const bodySource = getEnemyBodySource(image, variantStyle);
    const shadowSprite = getEnemyShadowSprite(bodySource, drawWidth, drawHeight, enemyDrawScale, shadowBlur, shadowOffsetY, filterText);
    if (shadowSprite?.canvas) {
      ctx.drawImage(
        shadowSprite.canvas,
        enemy.x - shadowSprite.anchorX,
        enemy.y - shadowSprite.anchorY,
        shadowSprite.width,
        shadowSprite.height
      );
    } else if (bodySource?.image) {
      const needsContextState = shadowBlur > 0 || Boolean(filterText);
      if (needsContextState) {
        ctx.save();
        ctx.shadowColor = 'rgba(9, 24, 56, 0.24)';
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetY = shadowOffsetY;
        if (filterText) ctx.filter = filterText;
      }
      if (bodySource.kind === 'tinted' && variantStyle?.outerOutline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outerOutline, Math.max(1.5, drawWidth * 0.055));
      }
      if (bodySource.kind === 'tinted' && variantStyle?.outline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outline, Math.max(1, drawWidth * 0.033));
      }
      drawEnemyBodySource(ctx, bodySource, drawX, drawY, drawWidth, drawHeight);
      if (needsContextState) ctx.restore();
    } else {
      ctx.save();
      ctx.shadowColor = 'rgba(9, 24, 56, 0.24)';
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetY = shadowOffsetY;
      if (variantStyle?.outerOutline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outerOutline, Math.max(1.5, drawWidth * 0.055));
      }
      if (variantStyle?.outline) {
        drawEnemySilhouetteOutline(ctx, image, drawX, drawY, drawWidth, drawHeight, variantStyle.outline, Math.max(1, drawWidth * 0.033));
      }
      const renderImage = variantStyle ? getTintedEnemySprite(image, variantStyle) : image;
      ctx.drawImage(renderImage, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
    }
  } else {
    ctx.save();
    ctx.shadowColor = 'rgba(9, 24, 56, 0.24)';
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.fillStyle = variantStyle?.fallbackFill || '#be123c';
    ctx.strokeStyle = variantStyle?.outline || 'rgba(255,255,255,0.35)';
    ctx.lineWidth = variantStyle ? 4 : 2;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, visualRadius, 0, Math.PI * 2);
    ctx.fill();
    if (variantStyle) ctx.stroke();
    ctx.restore();
  }

  const badge = getEnemyBadge(enemy, variantStyle);
  if (!shouldDrawEnemyInfo(enemy, variantStyle, renderLoad)) return;

  const barWidth = Math.round(clamp(drawWidth * 0.84, 24, 44));
  const barHeight = Math.round(clamp(6 * enemyDrawScale, 3, 6));
  const hpColor = getEnemyHpColor(enemy, variantStyle);
  drawHpBar(ctx, enemy.x - barWidth / 2, enemy.y - visualRadius - Math.round(13 * enemyDrawScale), barWidth, enemy.hp, enemy.maxHp, hpColor, barHeight);
  const drawBadge = badge.text && (!renderLoad?.veryBusy || enemy.elite || enemy.hardened);
  if (drawBadge) {
    const labelY = enemy.y - visualRadius - Math.round(30 * enemyDrawScale);
    const badgeSprite = getEnemyBadgeSprite(badge, enemyDrawScale);
    if (badgeSprite?.canvas) {
      ctx.drawImage(
        badgeSprite.canvas,
        enemy.x - badgeSprite.drawOffsetX,
        labelY - badgeSprite.drawOffsetY,
        badgeSprite.width,
        badgeSprite.height
      );
    } else {
      ctx.save();
      const badgeFontSize = Math.round(clamp(10 * enemyDrawScale, 7, 10));
      const badgeHeight = Math.round(clamp(14 * enemyDrawScale, 10, 14));
      const badgeRadius = Math.round(clamp(7 * enemyDrawScale, 5, 7));
      ctx.font = `800 ${badgeFontSize}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelWidth = Math.max(Math.round(24 * enemyDrawScale), ctx.measureText(badge.text).width + Math.round(12 * enemyDrawScale));
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
  updateExplosionEffectFrameCacheFields(effect);
  const radiusBucket = Math.max(4, Number(effect?.radiusBucket) || 4);
  const levelBucket = Math.max(1, Number(effect?.levelBucket) || 1);
  const seedBucket = Math.max(0, Number(effect?.seedBucket) || 0);
  const frameIndex = clamp(Math.floor(progress * EXPLOSION_FRAME_COUNT), 0, EXPLOSION_FRAME_COUNT - 1);
  const frameProgress = clamp((frameIndex + 0.5) / EXPLOSION_FRAME_COUNT, 0, 1);
  const cacheKey = `${effect?.frameCachePrefix || `${radiusBucket}:${levelBucket}:${seedBucket}`}:${frameIndex}`;
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

function drawExplosionEffect(ctx, effect, nowMs, options = {}) {
  const startedAtMs = Number(effect?.startedAtMs) || nowMs;
  const durationMs = Math.max(1, Number(effect?.durationMs) || SHIP_EXPLOSION_EFFECT_MS);
  const progress = clamp((nowMs - startedAtMs) / durationMs, 0, 1);
  const frame = getExplosionFrameSprite(effect, progress);
  if (!frame?.canvas) {
    drawExplosionFramePrimitives(ctx, effect.x, effect.y, Math.max(4, Number(effect?.radius) || 0), Math.max(1, Number(effect?.level) || 1), Number(effect?.seed) || 0, progress);
    return;
  }
  if (options.compositeReady) {
    ctx.drawImage(frame.canvas, effect.x - frame.extent, effect.y - frame.extent, frame.size, frame.size);
    return;
  }
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(frame.canvas, effect.x - frame.extent, effect.y - frame.extent, frame.size, frame.size);
  ctx.restore();
}

function drawBattleEffects(ctx, effects, nowMs, width, height) {
  if (!Array.isArray(effects) || !effects.length) return;
  let compositeReady = false;
  for (let index = 0; index < effects.length; index += 1) {
    const effect = effects[index];
    if (!effect || effect.removed || !effect.active) continue;
    if (!isDrawAreaVisible(effect?.x, effect?.y, effect?.radius, width, height, 12)) continue;
    if (effect?.type === 'explosion') {
      if (!compositeReady) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        compositeReady = true;
      }
      drawExplosionEffect(ctx, effect, nowMs, { compositeReady: true });
    }
  }
  if (compositeReady) ctx.restore();
}

function drawDefeatFlashOverlay(ctx, battle, nowMs, width, height) {
  if (!battle) return;
  const flashRemainingMs = Math.max(0, Number(battle.defeatFlashUntilMs || 0) - nowMs);
  const repairPending = isShipRepairQuizPending(battle);
  const respawnRemainingMs = repairPending ? 0 : Math.max(0, Number(battle.ship?.respawnUntilMs || 0) - nowMs);
  if (flashRemainingMs <= 0 && respawnRemainingMs <= 0 && !repairPending) return;
  const flashRatio = clamp(flashRemainingMs / BATTLESHIP_DEFEAT_FLASH_MS, 0, 1);
  const pulse = 0.5 + Math.sin(nowMs * 0.018) * 0.5;
  const overlayAlpha = clamp(0.06 + flashRatio * 0.42 + (repairPending || respawnRemainingMs > 0 ? pulse * 0.04 : 0), 0.06, 0.52);
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

  const penalty = Math.max(0, Math.round(Number(battle.lastDeathPenalty) || 0));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff7ed';
  ctx.font = `900 ${Math.round(clamp(18 * visualScale, 12, 20))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  ctx.fillText('거북선 격침', width / 2, panelY + panelHeight * 0.34);
  ctx.font = `800 ${Math.round(clamp(12 * visualScale, 8, 13))}px Apple SD Gothic Neo, Malgun Gothic, sans-serif`;
  const penaltyText = penalty > 0 ? `점수 -${penalty.toLocaleString('ko-KR')} · ` : '';
  const repairText = repairPending
    ? `수리 퀴즈 ${getShipRepairQuizAnswered(battle)}/${getShipRepairQuizRequired(battle)}`
    : `${Math.max(0, Math.ceil(respawnRemainingMs / 1000))}초 뒤 재출항`;
  ctx.fillText(`${penaltyText}${repairText}`, width / 2, panelY + panelHeight * 0.68);
  ctx.restore();
}

function drawWaveOverlayPrimitives(ctx, battle, width) {
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
  ctx.save();
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
  return Math.ceil(overlayY + overlayHeight + 3);
}

function drawWaveOverlay(ctx, battle, width) {
  const maxTier = getUnlockedEnemyTier(battle.waves.elapsedSec);
  const eliteTier = getEliteUnlockedTier(battle.waves.elapsedSec);
  const signature = [
    Math.round(width),
    battle.waves.level,
    maxTier,
    eliteTier,
    Math.round(getBattleVisualScale(battle) * 1000)
  ].join('|');
  if (battle.waveOverlayCache?.signature === signature && battle.waveOverlayCache.canvas) {
    ctx.drawImage(battle.waveOverlayCache.canvas, 0, 0);
    return;
  }
  const cacheCanvas = document.createElement('canvas');
  cacheCanvas.width = Math.max(1, Math.ceil(width));
  cacheCanvas.height = Math.max(1, Math.ceil(clamp(138 * getBattleVisualScale(battle), 74, 138)));
  const cacheCtx = cacheCanvas.getContext('2d');
  if (!cacheCtx) {
    drawWaveOverlayPrimitives(ctx, battle, width);
    return;
  }
  const usedHeight = drawWaveOverlayPrimitives(cacheCtx, battle, width);
  if (usedHeight > 0 && usedHeight < cacheCanvas.height) {
    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = cacheCanvas.width;
    trimmedCanvas.height = usedHeight;
    trimmedCanvas.getContext('2d')?.drawImage(cacheCanvas, 0, 0);
    battle.waveOverlayCache = { signature, canvas: trimmedCanvas };
    ctx.drawImage(trimmedCanvas, 0, 0);
    return;
  }
  battle.waveOverlayCache = { signature, canvas: cacheCanvas };
  ctx.drawImage(cacheCanvas, 0, 0);
}

function isDrawAreaVisible(x, y, radius, width, height, margin = 0) {
  const extent = Math.max(0, Number(radius) || 0) + Math.max(0, Number(margin) || 0);
  return x + extent >= 0
    && x - extent <= width
    && y + extent >= 0
    && y - extent <= height;
}

function getProjectileRenderRadius(projectile) {
  return Math.max(3, (Number(projectile?.renderRadius) || 0) || ((Number(projectile?.radius) || 0) * PROJECTILE_RENDER_RADIUS_RATIO));
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

function drawProjectiles(ctx, projectiles, width, height, renderLoad = getBattleRenderLoad()) {
  if (!Array.isArray(projectiles) || !projectiles.length) return;
  ctx.save();
  ctx.lineWidth = renderLoad.performanceMode ? 1.08 : PROJECTILE_RENDER_STROKE_WIDTH;
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
  const ctx = battleCtx;
  const battle = session.battle;
  const width = battle.canvasWidth;
  const height = battle.canvasHeight;
  ctx.clearRect(0, 0, width, height);
  if (!battleBackgroundCanvas) drawBackground(ctx, width, height, battle);

  drawShip(ctx, battle.ship, nowMs);

  const visualScale = getBattleVisualScale(battle);
  const renderLoad = getBattleRenderLoad(battle);
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!enemy || enemy.removed) continue;
    const enemyImage = enemyImages.get(enemy.tier);
    const metrics = getEnemyRenderMetrics(enemy, enemyImage, visualScale);
    if (isDrawAreaVisible(enemy.x, enemy.y, metrics.cullRadius, width, height, 34)) {
      drawEnemy(ctx, enemy, nowMs, renderLoad, visualScale, enemyImage, metrics);
    }
  }

  drawProjectiles(ctx, battle.projectiles, width, height, renderLoad);

  drawBattleEffects(ctx, battle.effects, nowMs, width, height);

  if (!isTabletFaceToFaceSession()) {
    drawShipHpGauge(ctx, battle.ship, width);
  }

  drawDefeatFlashOverlay(ctx, battle, nowMs, width, height);
}

function isDenseIndividualBattleSession() {
  return Boolean(session && !isSharedBattleSession() && session.players.length >= 3);
}

function hasDenseIndividualQuizOpen() {
  return Boolean(
    isDenseIndividualBattleSession()
    && session.battles.some((battle) => battle?.quizOpen)
  );
}

function getBattleDrawIntervalMs(battle) {
  if (!battle) return 0;
  const mapSize = Math.min(Number(battle.canvasWidth) || 0, Number(battle.canvasHeight) || 0);
  const effectCount = Number.isFinite(battle.activeEffectCount)
    ? Math.max(0, Number(battle.activeEffectCount) || 0)
    : countActiveEffects(battle);
  const busyCombat = battle.projectiles.length >= 28 || effectCount >= 6 || battle.enemies.length >= 18;
  const busyQuiz = isTabletFaceToFaceSession()
    && session.playerQuizStates.some((quizState) => quizState.quizOpen);
  const denseIndividual = isDenseIndividualBattleSession();
  const denseIndividualQuiz = hasDenseIndividualQuizOpen();
  if (denseIndividual && battle.performanceMode) return 34;
  if (denseIndividualQuiz) return 34;
  if (denseIndividual && busyCombat) return 28;
  if (battle.performanceMode && (busyCombat || mapSize >= 640)) return isTabletFaceToFaceSession() ? 34 : 28;
  if (isTabletFaceToFaceSession() && (busyCombat || busyQuiz)) return 34;
  if (mapSize >= 640 && busyCombat) return 24;
  return 0;
}

function getBattleDrawPhaseMs(battle, intervalMs) {
  if (!battle || intervalMs <= 0 || !isDenseIndividualBattleSession()) return 0;
  const count = Math.max(1, session.battles.length);
  return (battle.playerIndex % count) * (intervalMs / count);
}

function getBattleUpdateIntervalMs(battle) {
  if (!battle || !isDenseIndividualBattleSession()) return 0;
  if (hasDenseIndividualQuizOpen()) return 24;
  return battle.performanceMode ? 20 : 0;
}

function shouldUpdateBattleFrame(battle, nowMs) {
  const intervalMs = getBattleUpdateIntervalMs(battle);
  if (intervalMs <= 0) return true;
  const phasedNowMs = nowMs + getBattleDrawPhaseMs(battle, intervalMs);
  return !battle.lastFrameMs || phasedNowMs - battle.lastFrameMs >= intervalMs;
}

function updateBattlePerformanceMode(battle, dtMs) {
  if (!battle) return;
  const frameMs = Number(dtMs) || 0;
  const denseIndividual = isDenseIndividualBattleSession();
  const hardFrameMs = denseIndividual ? 64 : PERFORMANCE_LAG_HARD_FRAME_MS;
  const softFrameMs = denseIndividual ? 42 : PERFORMANCE_LAG_SOFT_FRAME_MS;
  if (frameMs >= hardFrameMs) {
    battle.performanceLagScore = Math.min(10, (Number(battle.performanceLagScore) || 0) + 2);
  } else if (frameMs >= softFrameMs) {
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
  const phasedNowMs = nowMs + getBattleDrawPhaseMs(battle, intervalMs);
  return !battle.lastDrawMs || phasedNowMs - battle.lastDrawMs >= intervalMs;
}

function battleFrame(nowMs) {
  if (!session || session.endedAt) return;
  session.battles.forEach((battle) => {
    withBattleContext(battle.playerIndex, () => {
      if (!shouldUpdateBattleFrame(battle, nowMs)) return;
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
  if (elements.timerPill.textContent !== clock) elements.timerPill.textContent = clock;
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
  return Boolean(session && getPracticeRecordConfig(session.packId) && !session.sharedBattle && session.players.length === 1);
}

function getCurrentGugudanFactMap() {
  return createGugudanAggregateFromRecords(session?.gugudanRecords || []);
}

function getGugudanWeaknessText(factMap, config = getPracticeRecordConfig()) {
  const danItems = getGugudanDanSummary(factMap)
    .filter((item) => item.attempts > 0)
    .sort((left, right) => right.wrong - left.wrong || left.dan - right.dan);
  if (!danItems.length) return `아직 저장할 ${config?.recordNoun || '연산 풀이'} 기록이 없습니다.`;
  const wrongDanItems = danItems.filter((item) => item.wrong > 0).slice(0, 3);
  if (!wrongDanItems.length) return '이번 판 오답 없음 · 모든 풀이가 정답입니다.';
  const factItems = getSortedGugudanFacts(factMap)
    .filter((item) => item.wrong > 0)
    .sort((left, right) => right.wrong - left.wrong || left.dan - right.dan || left.multiplier - right.multiplier)
    .slice(0, 3);
  const danText = wrongDanItems.map((item) => `${getPracticeGroupLabel(item.dan, config)} ${item.wrong}회`).join(' · ');
  const factText = factItems.map((item) => `${item.expression} ${item.wrong}회`).join(' · ');
  return `${config?.groupStatusTitle || '오답이 많은 단'}: ${danText}${factText ? ` / 문항: ${factText}` : ''}`;
}

function getGugudanAggregateSummary(factMap) {
  const facts = getSortedGugudanFacts(factMap);
  const totals = facts.reduce((sum, item) => ({
    attempts: sum.attempts + item.attempts,
    correct: sum.correct + item.correct,
    wrong: sum.wrong + item.wrong
  }), { attempts: 0, correct: 0, wrong: 0 });
  const weakDans = getGugudanDanSummary(factMap)
    .filter((item) => item.attempts > 0 && item.wrong > 0)
    .sort((left, right) => right.wrong - left.wrong || right.attempts - left.attempts || left.dan - right.dan)
    .slice(0, 3);
  const weakFacts = facts
    .filter((item) => item.attempts > 0 && item.wrong > 0)
    .sort((left, right) => (
      right.wrong - left.wrong
      || right.attempts - left.attempts
      || left.dan - right.dan
      || left.multiplier - right.multiplier
    ))
    .slice(0, 5);
  return { ...totals, weakDans, weakFacts };
}

function formatGugudanStatusList(items, type, config = getPracticeRecordConfig()) {
  if (!items.length) return '누적 오답이 없습니다.';
  return items.map((item) => {
    const label = type === 'dan' ? getPracticeGroupLabel(item.dan, config) : item.expression;
    return `${label} · 오답 ${item.wrong}회 · ${formatCsvAccuracy(item.correct, item.attempts)}`;
  }).join(' / ');
}

function formatGugudanExpression(value) {
  return String(value || '').replace(/x/gi, '×').replace(/\//g, '÷');
}

function getGugudanRiskLevel(item) {
  const attempts = Math.max(0, Number(item?.attempts) || 0);
  const wrong = Math.max(0, Number(item?.wrong) || 0);
  if (!attempts) return 'none';
  const wrongRate = wrong / attempts;
  if (wrongRate >= 0.4 || wrong >= 3) return 'danger';
  if (wrong > 0) return 'warning';
  return 'ok';
}

function getGugudanRiskLabel(level) {
  if (level === 'danger') return '집중 연습';
  if (level === 'warning') return '다시 확인';
  if (level === 'ok') return '안정';
  return '기록 없음';
}

function sortGugudanWeakItems(items) {
  return [...items].sort((left, right) => {
    const leftRate = left.attempts ? left.wrong / left.attempts : 0;
    const rightRate = right.attempts ? right.wrong / right.attempts : 0;
    return (
      right.wrong - left.wrong
      || rightRate - leftRate
      || right.attempts - left.attempts
      || left.dan - right.dan
      || (left.multiplier || 0) - (right.multiplier || 0)
    );
  });
}

function getGugudanReportComment(summary, config = getPracticeRecordConfig()) {
  if (!summary.attempts) return `아직 읽을 수 있는 ${config?.recordNoun || '연산 풀이'} 기록이 없습니다.`;
  if (!summary.wrong) return '누적 오답이 없습니다. 지금 기록에서는 안정적으로 풀고 있습니다.';
  const worstDan = summary.weakDans[0];
  const worstFact = summary.weakFacts[0];
  if (worstDan && worstFact) {
    return `${getPracticeGroupLabel(worstDan.dan, config)}와 ${formatGugudanExpression(worstFact.expression)}을 먼저 다시 보면 효과적입니다.`;
  }
  if (worstDan) return `${getPracticeGroupLabel(worstDan.dan, config)}부터 다시 연습하면 좋습니다.`;
  return '오답이 있는 문항부터 짧게 다시 풀어보면 좋습니다.';
}

function getGugudanDanReportItems(factMap) {
  const danSummary = new Map(getGugudanDanSummary(factMap).map((item) => [item.dan, item]));
  return Array.from({ length: 8 }, (_, index) => {
    const dan = index + 2;
    return danSummary.get(dan) || { dan, attempts: 0, correct: 0, wrong: 0 };
  });
}

function buildGugudanReportSummary(record) {
  const summary = getGugudanAggregateSummary(record.factMap);
  const weakDans = sortGugudanWeakItems(getGugudanDanSummary(record.factMap).filter((item) => item.attempts > 0 && item.wrong > 0)).slice(0, 4);
  const weakFacts = sortGugudanWeakItems(getSortedGugudanFacts(record.factMap).filter((item) => item.attempts > 0 && item.wrong > 0)).slice(0, 6);
  return { ...summary, weakDans, weakFacts };
}

function renderGugudanWeakBars(items, type, config = getPracticeRecordConfig()) {
  if (!items.length) {
    return '<p class="gugudan-report-empty">누적 오답이 없습니다.</p>';
  }
  const maxWrong = Math.max(1, ...items.map((item) => item.wrong));
  return items.map((item) => {
    const label = type === 'dan' ? getPracticeGroupLabel(item.dan, config) : formatGugudanExpression(item.expression);
    const percent = item.attempts ? Math.round((item.wrong / item.attempts) * 100) : 0;
    const width = Math.max(10, Math.round((item.wrong / maxWrong) * 100));
    const level = getGugudanRiskLevel(item);
    return `
      <div class="gugudan-weak-row risk-${level}">
        <div class="gugudan-weak-meta">
          <strong>${escapeHtml(label)}</strong>
          <span>오답 ${item.wrong}회 · 오답률 ${percent}%</span>
        </div>
        <div class="gugudan-weak-track" aria-hidden="true"><i style="width: ${width}%"></i></div>
      </div>
    `;
  }).join('');
}

function renderGugudanHeatmap(factMap, config = getPracticeRecordConfig()) {
  const cells = [`<div class="gugudan-heatmap-cell is-label">${escapeHtml(config?.heatmapCorner || '×')}</div>`];
  for (let multiplier = 1; multiplier <= 9; multiplier += 1) {
    cells.push(`<div class="gugudan-heatmap-cell is-label">${multiplier}</div>`);
  }
  for (let dan = 2; dan <= 9; dan += 1) {
    cells.push(`<div class="gugudan-heatmap-cell is-label">${config?.packId === 'division-gugudan' ? `÷${dan}` : dan}</div>`);
    for (let multiplier = 1; multiplier <= 9; multiplier += 1) {
      const key = getPracticeGridKey(dan, multiplier, config);
      const item = factMap.get(key) || {
        key,
        dan,
        multiplier,
        expression: getPracticeGridExpression(dan, multiplier, config),
        attempts: 0,
        correct: 0,
        wrong: 0
      };
      const level = getGugudanRiskLevel(item);
      const label = getPracticeGridExpression(dan, multiplier, config);
      const title = item.attempts
        ? `${label}: 시도 ${item.attempts}, 오답 ${item.wrong}, 정답률 ${formatCsvAccuracy(item.correct, item.attempts)}`
        : `${label}: 기록 없음`;
      cells.push(`
        <div class="gugudan-heatmap-cell level-${level}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
          <strong>${label}</strong>
          <span>${escapeHtml(getGugudanRiskLabel(level))}</span>
        </div>
      `);
    }
  }
  return cells.join('');
}

function setGugudanReportOpen(open, options = {}) {
  const active = Boolean(open);
  if (!elements.gugudanReportModal) return;
  elements.gugudanReportModal.classList.toggle('is-hidden', !active);
  elements.gugudanReportModal.setAttribute('aria-hidden', String(!active));
  if (active) {
    elements.gugudanReportCloseButton?.focus();
  } else if (options.restoreFocus !== false) {
    (lastReportFocusElement || elements.gugudanStatusButton)?.focus();
  }
}

function renderGugudanStatusReport(record, fileName = '', options = {}) {
  if (!elements.gugudanReportBody) return;
  const config = options.config || getPracticeRecordConfig(options.packId) || getPracticeRecordConfig('gugudan');
  const summary = buildGugudanReportSummary(record);
  const studentIds = Array.from(record.studentIds || []).filter(Boolean).sort((left, right) => left.localeCompare(right, 'ko-KR'));
  const studentText = studentIds.length ? studentIds.join(', ') : '학생번호 없음';
  const danItems = getGugudanDanReportItems(record.factMap);
  const dangerCount = getSortedGugudanFacts(record.factMap).filter((item) => getGugudanRiskLevel(item) === 'danger').length;
  const warningCount = getSortedGugudanFacts(record.factMap).filter((item) => getGugudanRiskLevel(item) === 'warning').length;
  if (elements.gugudanReportKicker) elements.gugudanReportKicker.textContent = config.reportKicker;
  if (elements.gugudanReportTitle) elements.gugudanReportTitle.textContent = config.statusTitle;
  if (elements.gugudanReportSubtitle) {
    const sourceText = String(fileName || '').trim();
    elements.gugudanReportSubtitle.textContent = sourceText
      ? (sourceText.includes(studentText) ? sourceText : `${sourceText} · ${studentText}`)
      : studentText;
  }
  elements.gugudanReportBody.innerHTML = `
    <section class="gugudan-report-hero">
      <div>
        <span>누적 정답률</span>
        <strong>${escapeHtml(formatAccuracy(summary.correct, summary.attempts))}</strong>
      </div>
      <p>${escapeHtml(getGugudanReportComment(summary, config))}</p>
    </section>

    <section class="gugudan-report-metrics" aria-label="구구단 누적 요약">
      <div><span>풀이</span><strong>${summary.attempts}</strong><em>문제</em></div>
      <div><span>정답</span><strong>${summary.correct}</strong><em>개</em></div>
      <div><span>오답</span><strong>${summary.wrong}</strong><em>개</em></div>
      <div><span>집중 연습</span><strong>${dangerCount}</strong><em>문항</em></div>
      <div><span>다시 확인</span><strong>${warningCount}</strong><em>문항</em></div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.groupHeader)}</h3>
        <span>오답 횟수와 오답률 기준</span>
      </div>
      <div class="gugudan-weak-list">${renderGugudanWeakBars(summary.weakDans, 'dan', config)}</div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.factHeader)}</h3>
        <span>먼저 복습할 문항</span>
      </div>
      <div class="gugudan-weak-list">${renderGugudanWeakBars(summary.weakFacts, 'fact', config)}</div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${config.packId === 'division-gugudan' ? '나누는 수별 상태' : '단별 상태'}</h3>
        <span>${config.packId === 'division-gugudan' ? '2부터 9까지 나누는 수별 누적 결과' : '2단부터 9단까지 누적 결과'}</span>
      </div>
      <div class="gugudan-dan-strip">
        ${danItems.map((item) => {
          const level = getGugudanRiskLevel(item);
          return `
            <div class="gugudan-dan-card risk-${level}">
              <b>${escapeHtml(getPracticeGroupLabel(item.dan, config))}</b>
              <strong>${escapeHtml(formatCsvAccuracy(item.correct, item.attempts))}</strong>
              <span>오답 ${item.wrong}회</span>
            </div>
          `;
        }).join('')}
      </div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.heatmapTitle)}</h3>
        <span>초록 안정 · 노랑 다시 확인 · 빨강 집중 연습</span>
      </div>
      <div class="gugudan-heatmap" role="grid" aria-label="${escapeHtml(config.heatmapAria)}">
        ${renderGugudanHeatmap(record.factMap, config)}
      </div>
    </section>

    <p class="gugudan-report-note">${escapeHtml(options.message || '이 기기에 저장된 누적 기록입니다. CSV 백업을 함께 보관하세요.')}</p>
  `;
  setGugudanReportOpen(true, { restoreFocus: false });
}

function setGugudanStatusPanel(message = '기록 파일을 선택하면 연산 상태가 여기에 표시됩니다.', kind = '') {
  const panel = elements.gugudanStatusPanel;
  if (!panel) return;
  if (kind) setGugudanStatusExpanded(true);
  panel.textContent = message;
  panel.classList.toggle('is-empty', !kind);
  panel.classList.toggle('is-error', kind === 'error');
  panel.classList.toggle('is-success', kind === 'success');
}

function showLocalGugudanStatus(packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  if (!isLocalPracticeStorageAvailable()) {
    setGugudanStatusPanel('이 브라우저에서는 로컬 저장을 사용할 수 없습니다. CSV 백업 저장을 이용하세요.', 'error');
    return false;
  }
  const selected = selectLocalGugudanRecord(config.packId, '상태 확인');
  if (!selected?.record?.factMap?.size) {
    setGugudanStatusPanel(`${config.sourceLabel} 로컬 기록이 없습니다. 게임 결과에서 이 기기에 저장하거나 CSV 백업에서 복구하세요.`, 'error');
    return false;
  }
  lastReportFocusElement = packId === 'division-gugudan' ? elements.divisionStatusButton : elements.gugudanStatusButton;
  const label = `로컬 저장 · 학생번호 ${selected.studentId}`;
  renderGugudanStatusPanel(selected.record, label, {
    config,
    title: config.statusTitle,
    message: '이 기기에 저장된 로컬 기록입니다. CSV 백업도 주기적으로 남겨 두세요.'
  });
  renderGugudanStatusReport(selected.record, label, {
    config,
    message: '이 기기에 저장된 로컬 기록입니다. 기기 초기화나 브라우저 데이터 삭제에 대비해 CSV 백업도 보관하세요.'
  });
  return true;
}

function renderGugudanStatusPanel(record, fileName = '', options = {}) {
  const panel = elements.gugudanStatusPanel;
  if (!panel) return;
  setGugudanStatusExpanded(true);
  const config = options.config || getPracticeRecordConfig(options.packId) || getPracticeRecordConfig('gugudan');
  const summary = getGugudanAggregateSummary(record.factMap);
  const studentIds = Array.from(record.studentIds).filter(Boolean).sort((left, right) => left.localeCompare(right, 'ko-KR'));
  const studentText = studentIds.length ? studentIds.join(', ') : '학생번호 없음';
  const fileText = fileName ? `파일: ${fileName}` : '기록 파일';
  panel.classList.remove('is-empty', 'is-error');
  panel.classList.add('is-success');
  panel.innerHTML = `
    <div class="gugudan-status-heading">
      <b>${escapeHtml(options.title || config.statusTitle)}</b>
      <span>${escapeHtml(fileName || '선택한 기록')}</span>
    </div>
    <div class="gugudan-status-summary">
      <span>학생번호</span>
      <strong>${escapeHtml(studentText)}</strong>
      <span>누적 정답률</span>
      <strong>${escapeHtml(formatAccuracy(summary.correct, summary.attempts))}</strong>
      <span>풀이</span>
      <strong>${summary.attempts}문제 · 오답 ${summary.wrong}회</strong>
    </div>
    <div class="gugudan-status-detail">
      <b>${escapeHtml(config.groupStatusTitle)}</b>
      <p>${escapeHtml(formatGugudanStatusList(summary.weakDans, 'dan', config))}</p>
    </div>
    <div class="gugudan-status-detail">
      <b>${escapeHtml(config.factStatusTitle)}</b>
      <p>${escapeHtml(formatGugudanStatusList(summary.weakFacts, 'fact', config))}</p>
    </div>
    ${options.message ? `<p class="gugudan-status-message is-strong">${escapeHtml(options.message)}</p>` : ''}
    <em>${escapeHtml(options.footer || `${fileText} 기준으로 표시합니다. CSV 백업을 함께 보관하세요.`)}</em>
  `;
}

function getAllPracticeRecordSummaries() {
  return Object.keys(PRACTICE_RECORD_CONFIGS)
    .flatMap((packId) => getLocalGugudanRecordSummaries(packId))
    .sort((left, right) => (
      String(left.studentId).localeCompare(String(right.studentId), 'ko-KR')
      || String(left.config.sourceLabel).localeCompare(String(right.config.sourceLabel), 'ko-KR')
    ));
}

function removeLocalPracticeRecord(packId, studentId) {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const safeStudentId = getSafeStudentId(studentId);
  const store = readLocalPracticeStore();
  if (!safeStudentId || !store?.records?.[config.packId]?.[safeStudentId]) return false;
  delete store.records[config.packId][safeStudentId];
  if (!Object.keys(store.records[config.packId]).length) {
    delete store.records[config.packId];
  }
  if (store.activeStudentByPack?.[config.packId] === safeStudentId) {
    delete store.activeStudentByPack[config.packId];
  }
  const stillHasPreferred = Object.values(store.records || {}).some((packRecords) => (
    packRecords && Object.prototype.hasOwnProperty.call(packRecords, selectedPracticeStudentId)
  ));
  if (selectedPracticeStudentId === safeStudentId && !stillHasPreferred) {
    selectedPracticeStudentId = '';
  }
  return writeLocalPracticeStore(store);
}

function renderPracticeRecordManager() {
  if (!elements.practiceRecordManagerList) return;
  const summaries = getAllPracticeRecordSummaries();
  if (elements.practiceRecordManagerCurrentStudent) {
    elements.practiceRecordManagerCurrentStudent.textContent = getPracticeStudentSummaryText();
  }
  if (!summaries.length) {
    elements.practiceRecordManagerList.innerHTML = `
      <div class="practice-record-empty">
        <b>아직 이 기기에 저장된 기록이 없습니다.</b>
        <span>1인 구구단이나 나눗셈을 플레이한 뒤 결과 화면에서 저장하면 여기에 표시됩니다.</span>
      </div>
    `;
    return;
  }

  const grouped = new Map();
  summaries.forEach((summary) => {
    if (!grouped.has(summary.studentId)) grouped.set(summary.studentId, []);
    grouped.get(summary.studentId).push(summary);
  });

  elements.practiceRecordManagerList.innerHTML = Array.from(grouped.entries()).map(([studentId, records]) => `
    <section class="practice-record-student-card">
      <div class="practice-record-student-head">
        <div>
          <span>학생번호</span>
          <b>${escapeHtml(studentId)}번</b>
        </div>
        <button class="ghost-action" type="button" data-practice-record-action="select" data-student-id="${escapeHtml(studentId)}">이 번호 사용</button>
      </div>
      <div class="practice-record-item-list">
        ${records.map((summary) => `
          <article class="practice-record-item">
            <div class="practice-record-item-main">
              <b>${escapeHtml(summary.config.sourceLabel)}</b>
              <span>풀이 ${escapeHtml(String(summary.attempts))}회 · 정답률 ${escapeHtml(summary.accuracy)} · 오답 ${escapeHtml(String(summary.wrong))}회</span>
            </div>
            <div class="practice-record-item-actions">
              <button class="ghost-action" type="button" data-practice-record-action="view" data-pack-id="${escapeHtml(summary.packId)}" data-student-id="${escapeHtml(studentId)}">상태 보기</button>
              <button class="ghost-action" type="button" data-practice-record-action="backup" data-pack-id="${escapeHtml(summary.packId)}" data-student-id="${escapeHtml(studentId)}">CSV 백업</button>
              <button class="ghost-action danger-action" type="button" data-practice-record-action="delete" data-pack-id="${escapeHtml(summary.packId)}" data-student-id="${escapeHtml(studentId)}">삭제</button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

function setPracticeRecordManagerOpen(open) {
  const active = Boolean(open);
  if (!elements.practiceRecordManagerModal) return;
  if (active) renderPracticeRecordManager();
  elements.practiceRecordManagerModal.classList.toggle('is-hidden', !active);
  elements.practiceRecordManagerModal.setAttribute('aria-hidden', String(!active));
  document.body.classList.toggle('practice-record-manager-open', active);
  if (active) {
    elements.practiceRecordManagerCloseButton?.focus();
  } else {
    elements.practiceRecordManagerButton?.focus();
  }
}

function getLocalPracticeRecordForAction(packId, studentId) {
  const record = loadLocalGugudanRecord(studentId, packId);
  if (!record?.factMap?.size) {
    setGugudanStatusPanel('해당 로컬 기록을 찾을 수 없습니다.', 'error');
    renderPracticeRecordManager();
    return null;
  }
  return record;
}

function handlePracticeRecordManagerAction(action, packId, studentId) {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId) return;
  if (action === 'select') {
    setPreferredPracticeStudentId(safeStudentId);
    renderPracticeRecordManager();
    return;
  }
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const record = getLocalPracticeRecordForAction(config.packId, safeStudentId);
  if (!record) return;
  if (action === 'view') {
    setPreferredPracticeStudentId(safeStudentId, { packId: config.packId });
    const label = `로컬 저장 · 학생번호 ${safeStudentId}`;
    lastReportFocusElement = elements.practiceRecordManagerButton;
    renderGugudanStatusPanel(record, label, {
      config,
      title: config.statusTitle,
      message: '이 기기에 저장된 로컬 기록입니다.'
    });
    renderGugudanStatusReport(record, label, {
      config,
      message: '이 기기에 저장된 로컬 기록입니다. CSV 백업 파일을 보관하면 기기 변경이나 기록 삭제 때 복구할 수 있습니다.'
    });
    setPracticeRecordManagerOpen(false);
    return;
  }
  if (action === 'backup') {
    const csvText = buildGugudanCsv(safeStudentId, record.factMap, {
      minutes: '',
      playedText: '',
      config,
      sourceLabel: config.sourceLabel
    });
    downloadCsvFile(getGugudanCsvFilename(safeStudentId, true, config), csvText);
    return;
  }
  if (action === 'delete') {
    if (!window.confirm(
      `${safeStudentId}번 ${config.sourceLabel} 로컬 기록을 이 기기에서 삭제합니다.\n\n`
      + 'CSV 백업이 없다면 이 기록은 복구할 수 없습니다. 삭제할까요?'
    )) {
      return;
    }
    if (removeLocalPracticeRecord(config.packId, safeStudentId)) {
      renderPracticeRecordManager();
      refreshPracticeStudentUi();
    }
  }
}

async function loadGugudanStatusCsv(file, packId = 'gugudan') {
  if (!file) return;
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  setGugudanStatusPanel('기록 파일을 읽는 중입니다.', 'success');
  try {
    const text = await file.text();
    const record = parseGugudanCsvAggregate(text, { config });
    if (!record.factMap.size) {
      setGugudanStatusPanel(`${config.sourceLabel} 기록 파일을 읽지 못했습니다. 이 앱에서 저장한 ${config.sourceLabel} CSV 파일을 선택하세요.`, 'error');
      return;
    }
    lastReportFocusElement = packId === 'division-gugudan' ? elements.divisionStatusButton : elements.gugudanStatusButton;
    renderGugudanStatusPanel(record, file.name, { config });
    renderGugudanStatusReport(record, file.name, { config });
  } catch (error) {
    setGugudanStatusPanel('기록 파일을 읽지 못했습니다. CSV 파일을 다시 선택하세요.', 'error');
  }
}

async function importGugudanCsvToLocal(file, packId = 'gugudan', options = {}) {
  if (!file) return false;
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const statusTarget = options.statusTarget || 'panel';
  const setStatus = (message, kind = '') => {
    if (statusTarget === 'result') setGugudanRecordStatus(message, kind);
    else setGugudanStatusPanel(message, kind);
  };
  if (!isLocalPracticeStorageAvailable()) {
    setStatus('이 브라우저에서는 로컬 저장을 사용할 수 없습니다. CSV 백업 저장을 이용하세요.', 'error');
    return false;
  }
  setStatus('CSV 백업 파일을 읽는 중입니다.', 'success');
  try {
    const text = await file.text();
    const parsed = parseGugudanCsvAggregate(text, { config });
    if (!parsed.factMap.size) {
      setStatus(`${config.sourceLabel} 학습 기록을 찾을 수 없습니다. 이 앱에서 저장한 CSV 파일을 선택하세요.`, 'error');
      return false;
    }
    const studentIds = Array.from(parsed.studentIds).filter(Boolean);
    if (studentIds.length !== 1) {
      setStatus('학생번호가 없거나 여러 개인 CSV는 로컬 기록으로 불러올 수 없습니다. 한 학생의 백업 파일을 선택하세요.', 'error');
      return false;
    }
    const studentId = getSafeStudentId(studentIds[0]);
    if (!studentId) {
      setStatus('CSV의 학생번호를 확인할 수 없습니다.', 'error');
      return false;
    }
    const expectedStudentId = getSafeStudentId(options.expectedStudentId || '');
    if (expectedStudentId && studentId !== expectedStudentId) {
      setStatus('학생번호가 다른 기록입니다. 같은 학생번호의 CSV 백업만 복구할 수 있습니다.', 'error');
      return false;
    }
    const confirmed = window.confirm(getLocalPracticeConfirmMessage(config.packId, studentId, 'import'));
    if (!confirmed) {
      setStatus('CSV 불러오기를 취소했습니다.', 'error');
      return false;
    }
    const saved = saveLocalPracticeRecord(config.packId, studentId, parsed.factMap, { replace: true });
    if (!saved) {
      setStatus('로컬 저장에 실패했습니다. 브라우저 저장 권한이나 용량을 확인하세요.', 'error');
      return false;
    }
    clearCurrentGugudanSessionSavedToLocal(config.packId);
    setPreferredPracticeStudentId(studentId, { packId: config.packId });
    if (elements.practiceRecordManagerModal && !elements.practiceRecordManagerModal.classList.contains('is-hidden')) {
      renderPracticeRecordManager();
    }
    const record = {
      factMap: saved.factMap,
      studentIds: saved.studentIds
    };
    if (statusTarget === 'result') {
      setGugudanRecordStatus(`CSV 백업을 불러와 ${studentId}번 로컬 상태를 갱신했습니다.`, 'success');
    } else {
      lastReportFocusElement = packId === 'division-gugudan' ? elements.divisionImportRecordsButton : elements.gugudanImportRecordsButton;
      renderGugudanStatusPanel(record, file.name || 'CSV 백업', {
        config,
        title: `${config.sourceLabel} CSV 불러오기`,
        message: `${studentId}번 로컬 상태를 CSV 내용으로 갱신했습니다.`
      });
      renderGugudanStatusReport(record, file.name || 'CSV 백업', {
        config,
        message: `${studentId}번 로컬 상태를 CSV 내용으로 갱신했습니다. 이전 로컬 기록은 이 CSV 내용으로 바뀌었습니다.`
      });
    }
    return true;
  } catch (error) {
    setStatus('CSV 파일을 읽지 못했습니다. 파일 형식을 확인하세요.', 'error');
    return false;
  }
}

function mergeGugudanFactMap(targetMap, sourceMap, config = getPracticeRecordConfig()) {
  sourceMap.forEach((item) => {
    addGugudanAggregate(targetMap, {
      packId: config?.packId || item.packId || '',
      dan: item.dan,
      multiplier: item.multiplier,
      key: item.key || getPracticeGridKey(item.dan, item.multiplier, config),
      expression: item.expression
    }, item);
  });
}

async function mergeSelectedGugudanRecordFiles(files, packId = 'gugudan') {
  const config = getPracticeRecordConfig(packId) || getPracticeRecordConfig('gugudan');
  const mergeInput = packId === 'division-gugudan'
    ? elements.divisionMergeRecordsFile
    : elements.gugudanMergeRecordsFile;
  const selectedFiles = Array.from(files || []);
  if (selectedFiles.length < 2) {
    setGugudanStatusPanel('합칠 기록 파일을 2개 이상 선택하세요.', 'error');
    return;
  }

  const mergedMap = new Map();
  const studentIds = new Set();
  const invalidFileNames = [];
  setGugudanStatusPanel('기록 파일을 합치는 중입니다.', 'success');
  try {
    const parsedFiles = await Promise.all(selectedFiles.map(async (file) => ({
      file,
      parsed: parseGugudanCsvAggregate(await file.text(), { config })
    })));
    parsedFiles.forEach(({ file, parsed }) => {
      if (!parsed.factMap.size) {
        invalidFileNames.push(file.name || '이름 없는 파일');
        return;
      }
      parsed.studentIds.forEach((id) => {
        if (id) studentIds.add(id);
      });
      mergeGugudanFactMap(mergedMap, parsed.factMap, config);
    });
  } catch (error) {
    setGugudanStatusPanel('기록 파일을 읽을 수 없습니다. 파일 형식을 확인하세요.', 'error');
    return;
  } finally {
    if (mergeInput) mergeInput.value = '';
  }

  if (invalidFileNames.length) {
    setGugudanStatusPanel(`${config.sourceLabel} 학습 기록을 찾을 수 없는 파일이 있습니다: ${invalidFileNames.join(', ')}`, 'error');
    return;
  }
  if (!mergedMap.size) {
    setGugudanStatusPanel(`합칠 ${config.sourceLabel} 학습 기록을 찾을 수 없습니다.`, 'error');
    return;
  }
  if (studentIds.size !== 1) {
    setGugudanStatusPanel('학생번호가 서로 다른 기록은 합칠 수 없습니다. 같은 학생번호의 파일만 선택하세요.', 'error');
    return;
  }

  const studentId = Array.from(studentIds)[0];
  const csvText = buildGugudanCsv(studentId, mergedMap, {
    minutes: '',
    playedText: '',
    config,
    sourceLabel: config.sourceLabel
  });
  const filename = getGugudanCsvFilename(studentId, true, config);
  downloadCsvFile(filename, csvText);
  let localMessage = '새 파일을 내려받은 뒤 계속 보관하세요.';
  let reportRecord = {
    factMap: mergedMap,
    studentIds
  };
  if (window.confirm(getLocalPracticeConfirmMessage(config.packId, studentId, 'import'))) {
    const saved = saveLocalPracticeRecord(config.packId, studentId, mergedMap, { replace: true });
    if (saved) {
      reportRecord = {
        factMap: saved.factMap,
        studentIds: saved.studentIds
      };
      localMessage = '합친 기록을 이 기기의 로컬 기록에도 반영했습니다. 새 CSV 파일도 보관해 주세요.';
    } else {
      localMessage = '로컬 저장에는 실패했습니다. 새 CSV 파일은 보관해 주세요.';
    }
  } else {
    localMessage = '로컬 기록은 변경하지 않았습니다. 새 CSV 파일은 보관해 주세요.';
  }
  lastReportFocusElement = packId === 'division-gugudan' ? elements.divisionMergeRecordsButton : elements.gugudanMergeRecordsButton;
  renderGugudanStatusPanel({
    factMap: reportRecord.factMap,
    studentIds: reportRecord.studentIds
  }, filename, {
    config,
    title: `${config.sourceLabel} 기록 합치기`,
    message: `${selectedFiles.length}개 기록을 하나로 합쳐 저장했습니다. ${localMessage}`
  });
  renderGugudanStatusReport({
    factMap: reportRecord.factMap,
    studentIds: reportRecord.studentIds
  }, filename, {
    config,
    message: `${selectedFiles.length}개 기록을 하나로 합쳐 저장했습니다. ${localMessage}`
  });
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
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const recordTitle = session?.weaknessPractice?.label
    ? `${session.weaknessPractice.label} 기록 저장`
    : config.recordTitle;
  panel.classList.toggle('is-hidden', !visible);
  panel.setAttribute('aria-label', recordTitle);
  resultModal?.classList.toggle('has-gugudan-record', visible);
  if (!visible) {
    setGugudanRecordStatus();
    return;
  }
  const factMap = getCurrentGugudanFactMap();
  const hasRecords = factMap.size > 0;
  const summaryText = getGugudanWeaknessText(factMap, config);
  const title = $('.gugudan-record-copy b', panel);
  const copy = $('.gugudan-record-copy p', panel);
  if (title) title.textContent = recordTitle;
  if (copy) {
    copy.textContent = `${summaryText} 학생번호를 확인한 뒤 이 기기에 누적 저장합니다. CSV는 백업과 복구용입니다.`;
  }
  if (elements.gugudanDownloadCurrentButton) elements.gugudanDownloadCurrentButton.disabled = !hasRecords;
  if (elements.gugudanDownloadBackupButton) elements.gugudanDownloadBackupButton.disabled = !hasRecords;
  if (elements.gugudanMergeCsvButton) elements.gugudanMergeCsvButton.disabled = !hasRecords;
  updateResultRecordStudentUi();
  setGugudanRecordStatus(hasRecords ? '기본은 이 기기 로컬 저장입니다. CSV는 백업이나 복구가 필요할 때 사용하세요.' : `기록할 ${config.recordNoun} 기록이 없습니다.`, hasRecords ? '' : 'error');
}

function getStudentIdForCsv() {
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const raw = elements.gugudanStudentId?.value || getPreferredPracticeStudentId(config.packId) || '';
  const safe = getSafeStudentId(raw);
  if (elements.gugudanStudentId && safe !== elements.gugudanStudentId.value.trim()) {
    elements.gugudanStudentId.value = safe;
  }
  if (!safe) {
    setGugudanRecordStatus('학생번호를 입력하세요. 예: 12', 'error');
    elements.gugudanStudentId?.focus();
    return '';
  }
  return safe;
}

function getGugudanCsvFilename(studentId, merged = false, config = getPracticeRecordConfig()) {
  const stamp = formatFileTimestamp(new Date());
  const prefix = config?.filePrefix || '구구단';
  return merged ? `${prefix}${studentId}-종합.csv` : `${prefix}${studentId}-${stamp}.csv`;
}

function getGugudanCsvOptions() {
  const summary = session ? summarizeSession() : { playedSec: 0 };
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  return {
    minutes: session?.minutes || '',
    playedText: formatClock(summary.playedSec || 0),
    config,
    sourceLabel: session?.weaknessPractice?.label || config.sourceLabel
  };
}

function hasCurrentGugudanSessionSavedToLocal(studentId, packId = session?.packId) {
  const marker = session?.localPracticeRecordSaved;
  return Boolean(marker && marker.studentId === studentId && marker.packId === packId);
}

function markCurrentGugudanSessionSavedToLocal(studentId, packId = session?.packId) {
  if (!session) return;
  session.localPracticeRecordSaved = { studentId, packId };
}

function clearCurrentGugudanSessionSavedToLocal(packId = session?.packId) {
  if (!session?.localPracticeRecordSaved) return;
  if (!packId || session.localPracticeRecordSaved.packId === packId) {
    session.localPracticeRecordSaved = null;
  }
}

function saveCurrentGugudanLocally() {
  if (!isGugudanSoloRecordResult()) return;
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  const factMap = getCurrentGugudanFactMap();
  if (!factMap.size) {
    setGugudanRecordStatus(`저장할 ${config.recordNoun} 기록이 없습니다.`, 'error');
    return;
  }
  if (!isLocalPracticeStorageAvailable()) {
    setGugudanRecordStatus('이 브라우저에서는 로컬 저장을 사용할 수 없습니다. CSV 백업 저장을 이용하세요.', 'error');
    return;
  }
  if (hasCurrentGugudanSessionSavedToLocal(studentId, config.packId)) {
    setGugudanRecordStatus('이번 기록은 이미 이 기기 로컬 저장에 반영되어 있습니다. CSV 백업 저장으로 안전하게 보관할 수 있습니다.', 'success');
    return;
  }
  const confirmed = window.confirm(getLocalPracticeConfirmMessage(config.packId, studentId, 'save'));
  if (!confirmed) {
    setGugudanRecordStatus('로컬 저장을 취소했습니다.', 'error');
    return;
  }
  const saved = saveLocalPracticeRecord(config.packId, studentId, factMap);
  if (!saved) {
    setGugudanRecordStatus('로컬 저장에 실패했습니다. 브라우저 저장 권한이나 용량을 확인하세요.', 'error');
    return;
  }
  markCurrentGugudanSessionSavedToLocal(studentId, config.packId);
  updateResultRecordStudentUi();
  if (elements.practiceRecordManagerModal && !elements.practiceRecordManagerModal.classList.contains('is-hidden')) {
    renderPracticeRecordManager();
  }
  setGugudanRecordStatus(`${studentId}번 기록을 이 기기에 누적 저장했습니다. CSV 백업도 함께 보관하면 더 안전합니다.`, 'success');
}

function downloadGugudanBackupCsv() {
  if (!isGugudanSoloRecordResult()) return;
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  const currentMap = getCurrentGugudanFactMap();
  let local = getLocalPracticeEntry(config.packId, studentId);
  if (currentMap.size && (!hasCurrentGugudanSessionSavedToLocal(studentId, config.packId) || !local?.record?.factMap?.size)) {
    const confirmed = window.confirm(getLocalPracticeConfirmMessage(config.packId, studentId, 'backup'));
    if (!confirmed) {
      setGugudanRecordStatus('CSV 백업을 취소했습니다. 먼저 이 기기에 저장하면 안전하게 백업할 수 있습니다.', 'error');
      return;
    }
    const saved = saveLocalPracticeRecord(config.packId, studentId, currentMap);
    if (!saved) {
      setGugudanRecordStatus('로컬 저장에 실패했습니다. 브라우저 저장 권한이나 용량을 확인하세요.', 'error');
      return;
    }
    markCurrentGugudanSessionSavedToLocal(studentId, config.packId);
    local = getLocalPracticeEntry(config.packId, studentId);
  }
  const backupMap = new Map();
  if (local?.record?.factMap?.size) {
    mergeGugudanFactMap(backupMap, local.record.factMap, config);
  }
  if (!backupMap.size) {
    setGugudanRecordStatus(`백업할 ${config.recordNoun} 기록이 없습니다.`, 'error');
    return;
  }
  const csv = buildGugudanCsv(studentId, backupMap, getGugudanCsvOptions());
  downloadCsvFile(getGugudanCsvFilename(studentId, true, config), csv);
  setGugudanRecordStatus('로컬 저장된 내용을 CSV 백업 파일로 저장했습니다. 브라우저 기록이 사라질 때 복구용으로 사용하세요.', 'success');
}

async function loadPreviousGugudanCsv(file) {
  if (!isGugudanSoloRecordResult() || !file) return;
  const config = getPracticeRecordConfig(session?.packId) || getPracticeRecordConfig('gugudan');
  const studentId = getStudentIdForCsv();
  if (!studentId) {
    if (elements.gugudanRecordFile) elements.gugudanRecordFile.value = '';
    return;
  }
  try {
    await importGugudanCsvToLocal(file, config.packId, {
      statusTarget: 'result',
      expectedStudentId: studentId
    });
  } finally {
    if (elements.gugudanRecordFile) elements.gugudanRecordFile.value = '';
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
  $$('.battle-panel', elements.gameStage).forEach((panel) => {
    panel.classList.remove('is-quiz-open');
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
  battleBackgroundCanvas = null;
  battleBackgroundCtx = null;
  battleViews = [];
  currentBattleIndex = 0;
  elements.questionArea.classList.add('is-hidden');
  elements.questionArea.innerHTML = '';
  $$('.battle-quiz-layer', elements.gameStage).forEach((layer) => {
    layer.classList.add('is-hidden');
    layer.innerHTML = '';
  });
  $$('.battle-panel', elements.gameStage).forEach((panel) => {
    panel.classList.remove('is-quiz-open');
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
    const clearedWeaknessPractice = Boolean(activeWeaknessPractice);
    if (clearedWeaknessPractice) clearWeaknessPractice();
    updateSetupSummary();
    if (clearedWeaknessPractice) {
      setSetupMessage('취약점 연습을 해제했습니다. 선택한 퀴즈팩으로 시작합니다.', 'note');
    }
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
    const clearedWeaknessPractice = Boolean(activeWeaknessPractice && selectedMode !== 'solo');
    if (clearedWeaknessPractice) clearWeaknessPractice();
    updateSetupSummary();
    if (clearedWeaknessPractice) {
      setSetupMessage('취약점 연습은 1인 각자 풀기 전용입니다. 일반 플레이로 전환했습니다.', 'note');
    }
  });

  elements.initialDisplayModeOptions?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-initial-display-mode]');
    if (!button) return;
    applyInitialDisplayModeChoice(button.dataset.initialDisplayMode);
  });
  elements.displayModeToggle?.addEventListener('click', selectNextDisplayMode);
  elements.fullscreenToggles.forEach((button) => {
    button.addEventListener('click', toggleFullscreen);
  });
  document.addEventListener('fullscreenchange', updateFullscreenControls);
  document.addEventListener('webkitfullscreenchange', updateFullscreenControls);
  elements.qrToggle?.addEventListener('click', () => setQrModalOpen(true));
  elements.qrCloseButton?.addEventListener('click', () => setQrModalOpen(false));
  elements.qrModal?.addEventListener('click', (event) => {
    if (event.target === elements.qrModal) setQrModalOpen(false);
  });
  elements.gugudanReportCloseButton?.addEventListener('click', () => setGugudanReportOpen(false));
  elements.gugudanReportModal?.addEventListener('click', (event) => {
    if (event.target === elements.gugudanReportModal) setGugudanReportOpen(false);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.qrModal && !elements.qrModal.classList.contains('is-hidden')) {
      setQrModalOpen(false);
    }
    if (event.key === 'Escape' && elements.gugudanReportModal && !elements.gugudanReportModal.classList.contains('is-hidden')) {
      setGugudanReportOpen(false);
    }
    if (event.key === 'Escape' && elements.practiceRecordManagerModal && !elements.practiceRecordManagerModal.classList.contains('is-hidden')) {
      setPracticeRecordManagerOpen(false);
    }
  });

  elements.practiceStudentSwitchButton?.addEventListener('click', promptPracticeStudentSwitch);
  elements.practiceRecordManagerButton?.addEventListener('click', () => setPracticeRecordManagerOpen(true));
  elements.practiceRecordManagerCloseButton?.addEventListener('click', () => setPracticeRecordManagerOpen(false));
  elements.practiceRecordManagerSwitchButton?.addEventListener('click', () => {
    promptPracticeStudentSwitch();
    renderPracticeRecordManager();
  });
  elements.practiceRecordManagerModal?.addEventListener('click', (event) => {
    if (event.target === elements.practiceRecordManagerModal) {
      setPracticeRecordManagerOpen(false);
      return;
    }
    const button = event.target.closest('[data-practice-record-action]');
    if (!button) return;
    handlePracticeRecordManagerAction(
      button.dataset.practiceRecordAction,
      button.dataset.packId || '',
      button.dataset.studentId || ''
    );
  });

  elements.tabletPromoButton?.addEventListener('click', () => {
    const clearedWeaknessPractice = Boolean(activeWeaknessPractice);
    if (clearedWeaknessPractice) clearWeaknessPractice();
    selectedDisplayMode = 'tablet';
    selectedMode = 'coop';
    selectedPlayers = 2;
    updateSetupSummary();
    if (clearedWeaknessPractice) {
      setSetupMessage('취약점 연습은 1인 전용이라 해제했습니다. 태블릿 2인 모드로 전환했습니다.', 'note');
    }
  });

  elements.playerOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-players]');
    if (!button) return;
    if (button.disabled) return;
    selectedPlayers = Number(button.dataset.players) || 1;
    const clearedWeaknessPractice = Boolean(activeWeaknessPractice && selectedPlayers !== 1);
    if (clearedWeaknessPractice) clearWeaknessPractice();
    updateSetupSummary();
    if (clearedWeaknessPractice) {
      setSetupMessage('취약점 연습은 1인 전용입니다. 일반 플레이로 전환했습니다.', 'note');
    }
  });

  elements.startButton.addEventListener('click', startSelectedGame);
  elements.exitButton.addEventListener('click', abandonSession);
  elements.backSetupButton.addEventListener('click', abandonSession);
  elements.gugudanStatusToggle?.addEventListener('click', () => {
    const expanded = elements.gugudanStatusToggle.getAttribute('aria-expanded') === 'true';
    setGugudanStatusExpanded(!expanded);
  });
  elements.gugudanStatusButton?.addEventListener('click', () => {
    showLocalGugudanStatus('gugudan');
  });
  elements.gugudanStatusFile?.addEventListener('change', () => {
    const file = elements.gugudanStatusFile.files?.[0];
    importGugudanCsvToLocal(file, 'gugudan').finally(() => {
      if (elements.gugudanStatusFile) elements.gugudanStatusFile.value = '';
    });
  });
  elements.gugudanWeaknessPracticeButton?.addEventListener('click', () => {
    prepareWeaknessPracticeFromLocal('gugudan');
  });
  elements.gugudanImportRecordsButton?.addEventListener('click', () => {
    if (!elements.gugudanStatusFile) return;
    elements.gugudanStatusFile.value = '';
    elements.gugudanStatusFile.click();
  });
  elements.gugudanWeaknessPracticeFile?.addEventListener('change', () => {
    prepareWeaknessPracticeFromFile(elements.gugudanWeaknessPracticeFile.files?.[0], 'gugudan');
  });
  elements.gugudanMergeRecordsButton?.addEventListener('click', () => {
    if (!elements.gugudanMergeRecordsFile) return;
    elements.gugudanMergeRecordsFile.value = '';
    elements.gugudanMergeRecordsFile.click();
  });
  elements.gugudanMergeRecordsFile?.addEventListener('change', () => {
    mergeSelectedGugudanRecordFiles(elements.gugudanMergeRecordsFile.files, 'gugudan');
  });
  elements.divisionStatusButton?.addEventListener('click', () => {
    showLocalGugudanStatus('division-gugudan');
  });
  elements.divisionStatusFile?.addEventListener('change', () => {
    const file = elements.divisionStatusFile.files?.[0];
    importGugudanCsvToLocal(file, 'division-gugudan').finally(() => {
      if (elements.divisionStatusFile) elements.divisionStatusFile.value = '';
    });
  });
  elements.divisionGugudanWeaknessPracticeButton?.addEventListener('click', () => {
    prepareWeaknessPracticeFromLocal('division-gugudan');
  });
  elements.divisionImportRecordsButton?.addEventListener('click', () => {
    if (!elements.divisionStatusFile) return;
    elements.divisionStatusFile.value = '';
    elements.divisionStatusFile.click();
  });
  elements.divisionGugudanWeaknessPracticeFile?.addEventListener('change', () => {
    prepareWeaknessPracticeFromFile(elements.divisionGugudanWeaknessPracticeFile.files?.[0], 'division-gugudan');
  });
  elements.divisionMergeRecordsButton?.addEventListener('click', () => {
    if (!elements.divisionMergeRecordsFile) return;
    elements.divisionMergeRecordsFile.value = '';
    elements.divisionMergeRecordsFile.click();
  });
  elements.divisionMergeRecordsFile?.addEventListener('change', () => {
    mergeSelectedGugudanRecordFiles(elements.divisionMergeRecordsFile.files, 'division-gugudan');
  });
  elements.gugudanDownloadCurrentButton?.addEventListener('click', saveCurrentGugudanLocally);
  elements.gugudanDownloadBackupButton?.addEventListener('click', downloadGugudanBackupCsv);
  elements.gugudanStudentId?.addEventListener('input', updateResultRecordStudentUi);
  elements.gugudanMergeCsvButton?.addEventListener('click', () => {
    if (!elements.gugudanRecordFile) return;
    elements.gugudanRecordFile.value = '';
    elements.gugudanRecordFile.click();
  });
  elements.gugudanRecordFile?.addEventListener('change', () => {
    loadPreviousGugudanCsv(elements.gugudanRecordFile.files?.[0]);
  });
  elements.restartSameButton.addEventListener('click', async () => {
    stopSessionTimer();
    stopBattleLoop();
    session = null;
    battleCanvas = null;
    battleCtx = null;
    battleBackgroundCanvas = null;
    battleBackgroundCtx = null;
    battleViews = [];
    currentBattleIndex = 0;
    showScreen('setup');
    await startSelectedGame();
  });
  elements.gameStage.addEventListener('pointerdown', handleBattlePointerDown);
  const handleViewportResize = () => {
    syncAppViewportVars();
    syncTabletFaceLayoutBasis();
    syncAllCanvasSizes();
    if (!session) updateSetupSummary();
    if (session) {
      session.battles.forEach((battle) => {
        withBattleContext(battle.playerIndex, () => drawBattle());
      });
      scheduleQuizTextFit(elements.gameStage);
    }
  };
  window.addEventListener('resize', handleViewportResize, { passive: true });
  window.addEventListener('orientationchange', () => {
    window.setTimeout(handleViewportResize, 80);
  }, { passive: true });
  window.visualViewport?.addEventListener('resize', handleViewportResize, { passive: true });
  window.visualViewport?.addEventListener('scroll', handleViewportResize, { passive: true });
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
      repairQuiz: {
        required: getShipRepairQuizRequired(battle),
        answered: getShipRepairQuizAnswered(battle),
        remaining: getShipRepairQuizRemaining(battle)
      },
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
        moveSpeedMultiplier: 1.1,
        wobbleMovement: true,
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
      moveSpeedMultiplier: 1.1,
      wobbleMovement: true,
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
  },
  getLocalPracticeStore() {
    return readLocalPracticeStore();
  }
};

syncAppViewportVars();
renderSetupControls();
refreshPracticeStudentUi();
bindEvents();
updateFullscreenControls();
showInitialDisplayModePrompt();
