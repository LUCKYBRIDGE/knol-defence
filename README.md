# 놀퀴즈 거북선 디펜스

GitHub Pages 또는 정적 호스팅에 바로 올릴 수 있는 독립 거북선 디펜스 게임입니다.

## 포함 범위
- 서버, DB, Supabase, Auth 없음
- 학급모드, 플레이 기록, 랭킹전 없음
- 플레이 기록 저장 없음
- 플레이 인원은 전자칠판 플레이 화면 가독성을 위해 1-4명 지원
- 결과는 저장하지 않고 화면에서 바로 확인
- 선택한 1-10분 타이머가 끝나면 즉시 결과 화면으로 이동

## 실행
```bash
cd /Users/baekjiyun/Desktop/WAN/apps/knolquiz-turtle-defense-local
python3 -m http.server 4272 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4272/`을 엽니다.

## 검증
```bash
node --check app.js
```

반응형 화면은 1920x1080, 1366x768, 1024x768, 820x1180, 390x844에서 시작/플레이/결과 화면을 확인합니다.

## 배포
정적 파일만 사용합니다. 이 디렉터리 전체를 GitHub Pages, Netlify, Cloudflare Pages 같은 정적 호스팅에 배포하면 됩니다.
