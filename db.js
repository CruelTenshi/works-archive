/**
 * db.js — 데이터만 관리하는 파일 (UI 코드 없음)
 * ------------------------------------------------------
 * 아래 INITIAL_WORKS만 수정하면 초기 작품 목록을 바꿀 수 있습니다.
 * 데모 작품명/표지/감상은 모두 이 사이트를 위해 만든 가상 예시입니다.
 *
 * title     : 작품 이름 (필수)
 * image     : img 폴더 안 파일 이름. 빈 문자열이면 기본 포스터
 * watchedAt : 본 날짜 "YYYY-MM-DD" 또는 "" (선택)
 * rating    : 1 ~ 5 사이 0.5점 단위 (필수)
 * review    : 한 줄 평 또는 "" (선택, 180자 이하)
 * longReview: 장문 감상 또는 "" (선택, 10,000자 이하)
 * lifeWork  : 인생작 여부 (true / false, 생략하면 false)
 * types     : TYPES에 선언된 유형 중 1개 이상
 * status    : "completed"(감상 완료) / "watching"(감상 중)
 * id        : 중복되지 않는 고유 값
 * createdAt : 추가 시각 ISO 문자열 (최근 넣은 순 정렬에 사용)
 *
 * 화면에서 작품을 추가/수정하면 INITIAL_WORKS에 반영할 JS 코드를
 * 만들어 보여줍니다. 코드를 db.js의 INITIAL_WORKS에 직접 반영해 주세요.
 */
(() => {
  "use strict";
  const TYPES = Object.freeze(["애니메이션", "문학", "비문학", "영화", "만화", "라이트노벨", "드라마"]);
  const INITIAL_WORKS = [
    {
      "id": "52178506-862a-4f2b-8a41-f311dc9a47c5",
      "title": "기생수 : 세이의 격률",
      "image": "기생수.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:01:10.519Z"
    },
    {
      "id": "71c858fc-4f86-4dae-8877-df49d28d7b65",
      "title": "장송의 프리렌",
      "image": "장송의 프리렌.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "잔잔한 여정을 담은 전통 판타지",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:04:10.537Z"
    },
    {
      "id": "9f955bf2-40e2-4f25-979a-863959b54c88",
      "title": "장송의 프리렌 2기",
      "image": "장송의 프리렌 2기.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:06:58.044Z"
    },
    {
      "id": "ab6ce88a-6bcb-48d9-a584-0f5f558d6be4",
      "title": "프린세스 프린서플",
      "image": "프린세스 프린서플.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:08:57.582Z"
     },
     {
      "id": "e0bbe869-7e03-427d-9f93-5918d3c552ce",
      "title": "주술회전 2기 : 희옥·옥절",
      "image": "주술회전 2기 희옥 옥절.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:11:03.613Z"
    },
    {
      "id": "9a716eb8-e8f0-4922-bf60-74662e871884",
      "title": "진격의 거인 The Final Season",
      "image": "진격의 거인 The Final Season.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "인류와 우리, 선택의 어려움",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:15:38.037Z"
    },
    {
      "id": "1a16b653-603b-4108-b38b-7d65d58a38ab",
      "title": "데스노트",
      "image": "데스노트.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "치열한 두뇌 싸움, 참신한 전개",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:17:48.987Z"
    },
    {
      "id": "6b078db9-b0b7-40ed-a365-ac4b3a3655ee",
      "title": "최애의 아이",
      "image": "최애의 아이.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:19:11.156Z"
    },
    {
      "id": "089e8999-67e2-4ef5-b9df-bc8281f88fb6",
      "title": "봇치 더 록",
      "image": "봇치 더 록.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "초반까지 공감하며 보다가 인싸 기만에 당함",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:21:03.096Z"
    },
    {
      "id": "6b064b5f-464b-4263-a429-63b40e7b9a0e",
      "title": "도쿄 구울",
      "image": "도쿄 구울.jpg",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:26:53.560Z"
    },
    {
      "id": "03700188-4021-4b4c-a099-9a38ea19a33c",
      "title": "도쿄 구울 √A",
      "image": "도쿄 구울 루트 A.jpg",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:29:10.836Z"
    },
    {
      "id": "dd5a6bfc-e3fc-417c-ac74-ffc174383cc6",
      "title": "91Days",
      "image": "91Days.jpg",
      "watchedAt": "",
      "rating": 5,
      "review": "어두운 느와르의 감성",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:32:26.168Z"
    },
    {
      "id": "24935aa4-c2a5-4250-87bf-c55fbf64e5cd",
      "title": "Re: 제로부터 시작하는 이세계 생활",
      "image": "Re 제로부터 시작하는 이세계 생활.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:34:09.759Z"
    },
    {
      "id": "0e489715-2ac1-4cd4-972b-3b41ac3bd0fb",
      "title": "유녀전기 : Saga of Tanya the Evil",
      "image": "유녀전기 Saga of Tanya the Evil Movie.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:36:02.359Z"
    },
    {
      "id": "476e3aaa-e370-458e-b2b6-1d824b32c2d7",
      "title": "도쿄 리벤저스",
      "image": "도쿄 리벤저스.jpg",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:39:12.253Z"
    },
    {
      "id": "9e5d8e8d-ad64-44ff-ba80-be028113b7b3",
      "title": "암살교실 2기",
      "image": "암살교실 2기.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "졸업 축하드립니다",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:40:38.513Z"
    },
    {
      "id": "c09686ed-93ae-4f66-982c-5f6ded9873ef",
      "title": "노 게임 노 라이프 -제로-",
      "image": "노 게임 노 라이프 제로.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "지브릴 나쁜 년",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:41:47.761Z"
    },
    {
      "id": "f6b5b24e-ac7d-4e42-82b0-9c6d55d25922",
      "title": "임금님 랭킹",
      "image": "임금님 랭킹.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:42:53.657Z"
    },
    {
      "id": "8ae2c31e-f246-49ad-ba23-e79bc2c45d48",
      "title": "약속의 네버랜드",
      "image": "약속의 네버랜드.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:43:57.339Z"
    },
    {
      "id": "45cb5558-8a4b-44c8-8e4e-063f108b7a75",
      "title": "해피 슈가 라이프",
      "image": "해피 슈가 라이프.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "사랑에는 여러 형태가 있다",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:44:39.572Z"
    },
    {
      "id": "5eebf964-cab6-4a51-a412-c8988e609dce",
      "title": "나만이 없는 거리",
      "image": "나만이 없는 거리.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "서스펜스 추리의 정석",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:45:41.223Z"
    },
    {
      "id": "c1eb3bd0-8e57-4124-abd7-e7adfc4b1415",
      "title": "진격의 거인",
      "image": "진격의 거인.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "압도적 공포와 충격",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:46:59.180Z"
    },
    {
      "id": "782da6ca-7ccb-4cc2-8986-ba94c765fa2a",
      "title": "혈계전선",
      "image": "혈계전선.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:47:52.827Z"
    },
    {
      "id": "0e438637-4f78-4ee5-9f77-69180fdb2d6d",
      "title": "혈계전선 & 비욘드",
      "image": "혈계전선 & 비욘드.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:48:44.541Z"
    },
    {
      "id": "a52bea7f-6592-4dee-93d8-6ac32b1281a7",
      "title": "Angel Beats!",
      "image": "Angel Beats!.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "불합리함과 억울함의 해소. 그리고 소중함",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:49:55.784Z"
    },
    {
      "id": "f34da3d4-34fa-48d5-9701-3dc1c46e2c57",
      "title": "Charlotte",
      "image": "Charlotte.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "영웅의 성장과 희생",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:51:03.232Z"
    },
    {
      "id": "bcce1628-7171-4209-8d63-aa1c4b5383a5",
      "title": "마법소녀 사이트",
      "image": "마법소녀 사이트.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T03:54:13.030Z"
    },
    {
      "id": "649cf815-26da-437b-a2cd-1254376fd85b",
      "title": "코드 기아스 반역의 를르슈",
      "image": "코드 기아스 반역의 를르슈.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "두뇌형 먼치킨의 정석",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:56:12.042Z"
    },
    {
      "id": "52408a6c-caca-4664-a5d0-982148c1a178",
      "title": "코드 기아스 반역의 를르슈 R2",
      "image": "코드 기아스 반역의 를르슈 R2.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "그 누구도 상처 입지 않는 세계의 완성이다",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:57:14.427Z"
    },
    {
      "id": "0a7871cc-5ef1-4f5f-98b5-9eb530de3ad6",
      "title": "코드 기아스 부활의 를르슈",
      "image": "코드 기아스 부활의 를르슈.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "정의의 복귀, 영웅의 부활",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T03:58:28.814Z"
    },
    {
      "id": "e3573fb2-f87f-4145-957d-272c45bce14a",
      "title": "아인",
      "image": "아인.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:00:42.578Z"
    },
    {
      "id": "a9641a39-4c23-4071-b470-303902308fc0",
      "title": "마녀의 여행",
      "image": "마녀의 여행.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "사이코 마녀의 미친 여행",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:01:45.511Z"
    },
    {
      "id": "6531eeb0-e9f7-4a3a-ad36-0153102b5cab",
      "title": "메이드 인 어비스",
      "image": "메이드 인 어비스.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:02:48.264Z"
    },
    {
      "id": "5c9047d4-3153-4c19-97dc-eb608dd3b892",
      "title": "메이드 인 어비스: 열일의 황금향",
      "image": "메이드 인 어비스 열일의 황금향.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:04:07.495Z"
    },
    {
      "id": "34e10b7c-6ec3-4399-9f43-ae5be57d06b4",
      "title": "메이드 인 어비스 : 깊은 영혼의 여명",
      "image": "메이드 인 어비스 깊은 영혼의 여명.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "사랑과 세뇌, 그리고 자유의지",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T04:05:39.703Z"
    },
    {
      "id": "596c27a3-d62a-46a4-8453-ecca4e238e22",
      "title": "리코리스 리코일",
      "image": "리코리스 리코일.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "백합에는 감동이 있다",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:06:40.318Z"
    },
    {
      "id": "078e41f6-283d-47cc-b92f-09b770e5a1ea",
      "title": "이누야시키",
      "image": "이누야시키.jpg",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:08:34.559Z"
    },
    {
        "id": "af0f452f-e9bb-44cc-8ed1-252534aed160",
        "title": "체인소 맨",
        "image": "체인소 맨.webp",
        "watchedAt": "",
        "rating": 5,
        "review": "",
        "longReview": "",
        "types": [
            "애니메이션"
        ],
        "status": "completed",
        "createdAt": "2026-10-30T04:11:27.091Z"
    },
    {
      "id": "88b91867-91ed-49a9-8df2-c5edc996b553",
      "title": "심부름꾼 사이토 씨, 이세계에 가다",
      "image": "심부름꾼 사이토 씨, 이세계에 가다.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:12:39.273Z"
    },
    {
      "id": "252b7adb-a356-4d71-8bbb-c71dd2533e6e",
      "title": "재와 환상의 그림갈",
      "image": "재와 환상의 그림갈.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T04:13:45.934Z"
   },
   {
     "id": "7349d524-83b8-4028-86a7-3e981bab9705",
     "title": "일찍이 마법소녀와 악은 적대하고 있었다.",
     "image": "일찍이 마법소녀와 악은 적대하고 있었다.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:15:08.945Z"
   },
   {
     "id": "b50d82eb-7833-4eed-949e-1c8918c2ed04",
     "title": "도망을 잘 치는 도련님",
     "image": "도망을 잘 치는 도련님.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:16:34.130Z"
   },
   {
     "id": "f4397dec-ce7c-4908-95df-45cb97e998c9",
     "title": "바카노!",
     "image": "바카노!.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:17:32.557Z"
   },
   {
     "id": "f35c262f-f6c9-4362-9541-0c9fe9192b2a",
     "title": "빈란드 사가",
     "image": "빈란드 사가.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "바이킹 멋있다",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:18:56.018Z"
   },
   {
     "id": "5ee40178-3618-4233-8d7d-08a54001d857",
     "title": "리코리스 리코일 Friends are thieves of the time.",
     "image": "리코리스 리코일 Friends are thieves of the time.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:20:46.015Z"
   },
   {
       "id": "62c5078d-d27b-4132-8886-cb34a1cd4ee8",
       "title": "신세기 에반게리온",
       "image": "신세기 에반게리온.webp",
       "watchedAt": "",
       "rating": 5,
       "review": "소년이여 신화가 되어라",
       "longReview": "",
       "types": [
           "애니메이션"
       ],
       "lifeWork" : true,
       "status": "completed",
       "createdAt": "2026-10-30T04:21:53.875Z"
   },
   {
     "id": "a4273e1b-c11b-449e-a9aa-d145e0c3db37",
     "title": "엔드 오브 에반게리온",
     "image": "엔드 오브 에반게리온.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "각자이기에 아름다운 것들",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "lifeWork" : true,
     "status": "completed",
     "createdAt": "2026-10-30T04:23:00.709Z"
   },
   {
     "id": "9a3b6bb2-e578-455c-ab9b-7afd0f80181b",
     "title": "타코피의 원죄",
     "image": "타코피의 원죄.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:23:59.208Z"
   },
   {
     "id": "86e0a9d2-1082-4209-9d89-b5dcb3948935",
     "title": "클레바테스 -마수왕과 아기와 시체 용사-",
     "image": "클레바테스 -마수왕과 아기와 시체 용사-.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:25:08.570Z"
   },
   {
     "id": "ac3dc008-87d4-4440-9aa1-2562e6f53dc3",
     "title": "괴수 8호 2기",
     "image": "괴수 8호 2기.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:26:18.086Z"
   },
   {
     "id": "fb87b7ed-9867-4165-bd0f-028c3f15fccf",
     "title": "사일런트 위치 침묵의 마녀의 비밀",
     "image": "사일런트 위치 침묵의 마녀의 비밀.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "공감하면서 볼 수 있음",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:27:20.652Z"
   },
   {
     "id": "550fab15-a1e9-46c6-88da-63a96c99e4e8",
     "title": "지. -지구의 운동에 대하여-",
     "image": "지. -지구의 운동에 대하여-.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "표현의 자유와 성역 없는 탐구",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "lifeWork" : true,
     "status": "completed",
     "createdAt": "2026-10-30T04:28:24.102Z"
   },
   {
     "id": "0b0f8691-b013-4f61-a028-57689159f836",
     "title": "주술회전 3기 : 사멸회유 전편",
     "image": "주술회전 3기 사멸회유 전편.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:29:25.993Z"
   },
   {
     "id": "2c9ed009-4b77-4c3c-84b5-db16d5aa5a4b",
     "title": "최애의 아이 3기",
     "image": "최애의 아이 3기.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:30:27.540Z"
   },
   {
     "id": "2d0a805a-9fcf-40cc-996a-714f9359dc83",
     "title": "Re: 제로부터 시작하는 이세계 생활 4기",
     "image": "Re 제로부터 시작하는 이세계 생활 4기.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:31:33.892Z"
   },
   {
     "id": "ff002bb1-9d6c-46aa-85a9-258c34246004",
     "title": "무직전생 ~이세계에 갔으면 최선을 다한다~",
     "image": "무직전생 ~이세계에 갔으면 최선을 다한다~.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:33:07.306Z"
   },
   {
     "id": "1bc887a6-46b1-4588-8b5c-059fb7d1ed79",
     "title": "무직전생 Ⅱ ~이세계에 갔으면 최선을 다한다~",
     "image": "무직전생 Ⅱ ~이세계에 갔으면 최선을 다한다~.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:34:02.042Z"
   },
   {
     "id": "6b0ef630-f218-46b7-ae3d-e5a32a6100a7",
     "title": "유녀전기 Ⅱ",
     "image": "유녀전기 Ⅱ.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:35:36.311Z"
   },
   {
       "id": "1621b82b-6285-410c-b621-4ee6839a5d6b",
       "title": "무직전생 Ⅲ ~이세계에 갔으면 최선을 다한다~",
       "image": "무직전생 Ⅲ ~이세계에 갔으면 최선을 다한다~.webp",
       "watchedAt": "",
       "rating": 5,
       "review": "",
       "longReview": "",
       "types": [
           "애니메이션"
       ],
       "status": "watching",
       "createdAt": "2026-10-30T04:37:10.519Z"
   },
  {
     "id": "6d8cad89-f9c0-4eeb-88f1-de92d88a2c4f",
     "title": "담배 고양이",
     "image": "담배 고양이.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "망해봤자 재가 될 뿐이야. 대충 살자",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:40:04.664Z"
   },
   {
     "id": "e7cfe6e2-296a-4e33-9a8b-eee6b0a236c9",
     "title": "마왕인 내가 노예 엘프를 신부로 삼았는데 어떻게 사랑하면 되지?",
     "image": "마왕인 내가 노예 엘프를 신부로 삼았는데 어떻게 사랑하면 되지.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:42:31.644Z"
   },
   {
     "id": "a59a2356-8913-49a1-bfa3-aed62c3ed531",
     "title": "주술회전 2기 : 시부야 사변",
     "image": "주술회전 2기 시부야 사변.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:45:17.058Z"
   },
   {
     "id": "9ab96ea5-0134-4810-8640-4ee8e7609a89",
     "title": "오빠는 끝!",
     "image": "오빠는 끝!.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "나 이런 거 좋아하는구나",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:46:37.871Z"
   },
   {
     "id": "c810f081-d8b0-4af7-ac4d-e164860ba189",
     "title": "주술회전 0",
     "image": "주술회전 0.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:47:28.671Z"
   },
   {
     "id": "1f0f08d7-8b62-4dba-9f1b-58319e5fa565",
     "title": "오드 택시",
     "image": "오드 택시.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:49:13.528Z"
   },
   {
     "id": "b0bfa3af-4226-4bd2-9274-e79e5972d4ca",
     "title": "단간론파 -희망의 학원과 절망의 고교생-",
     "image": "단간론파 -희망의 학원과 절망의 고교생-.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:52:01.733Z"
   },
   {
     "id": "52abe512-679f-4419-b93a-14d7da8f955d",
     "title": "단간론파 3 -The End of the 키보가미네 학원- 미래편",
     "image": "단간론파 3 -The End of the 키보가미네 학원- 미래편.jpg",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T04:54:06.122Z"
   },
   {
       "id": "5c713850-2af5-4238-b0c7-ef55fb6f5467",
       "title": "단간론파 3 -The End of the 키보가미네 학원- 절망편.jpg",
       "image": "단간론파 3 -The End of the 키보가미네 학원- 절망편.jpg",
       "watchedAt": "",
       "rating": 4.5,
       "review": "",
       "longReview": "",
       "types": [
           "애니메이션"
       ],
       "status": "completed",
       "createdAt": "2026-10-30T04:55:11.965Z"
   },
   {
     "id": "ef8e70a2-4cc9-4e7f-9b76-a38a78c89572",
     "title": "이세계 콰르텟",
     "image": "이세계 콰르텟.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:02:45.656Z"
   },
   {
     "id": "e392b8de-9c48-4ccb-82a1-41a9c0d2e382",
     "title": "이세계 콰르텟 2",
     "image": "이세계 콰르텟 2.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:03:55.826Z"
   },
   {
     "id": "dfd1b892-b7e8-46d1-b85a-9500aa4e55a5",
     "title": "유녀전기",
     "image": "유녀전기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:05:42.942Z"
   },
   {
       "id": "d3a0cad3-04eb-47a9-9365-2c51e4bc70dd",
     "title": "카구야 님은 고백받고 싶어? ~천재들의 연애 두뇌전~ 2기",
     "image": "카구야 님은 고백받고 싶어 ~천재들의 연애 두뇌전~ 2기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:06:50.478Z"
   },
   {
     "id": "d6f217e4-ffff-49cf-bb12-5aaa8eb774d9",
     "title": "카구야 님은 고백받고 싶어? ~천재들의 연애 두뇌전~",
     "image": "카구야 님은 고백받고 싶어 ~천재들의 연애 두뇌전~.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:08:24.931Z"
   },
   {
     "id": "5901b814-927b-4e69-9682-535e65e6a84e",
     "title": "카구야 님은 고백받고 싶어 -울트라 로맨틱-",
     "image": "카구야 님은 고백받고 싶어 -울트라 로맨틱-.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:09:11.266Z"
   },
   {
     "id": "95d76d74-dc22-4a9e-adbe-eeb68005d15f",
     "title": "역경무뢰 카이지",
     "image": "역경무뢰 카이지.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:09:59.574Z"
   },
   {
     "id": "a488aade-6a35-4e5a-b007-ffb784123ec1",
     "title": "역경무뢰 카이지 파계록편",
     "image": "역경무뢰 카이지 파계록편.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:11:05.124Z"
   },
   {
     "id": "c8b07ea7-3021-4c46-b5f4-df3417fe6b1a",
     "title": "암살교실",
     "image": "암살교실.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:11:46.270Z"
   },
   {
     "id": "df23e71f-c89a-4e3b-8155-04b1927c9db3",
     "title": "노 게임 노 라이프",
     "image": "노 게임 노 라이프.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:12:34.999Z"
   },
   {
     "id": "aefdaf1a-dffb-451d-949d-c5b6debc5448",
     "title": "청춘 돼지는 바니걸 선배의 꿈을 꾸지 않는다",
     "image": "청춘 돼지는 바니걸 선배의 꿈을 꾸지 않는다.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:13:42.664Z"
   },
   {
     "id": "6b0ff321-4423-43f0-8c4f-58993622945f",
     "title": "청춘 돼지는 꿈꾸는 소녀의 꿈을 꾸지 않는다",
     "image": "청춘 돼지는 꿈꾸는 소녀의 꿈을 꾸지 않는다.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:14:34.903Z"
   },
   {
     "id": "94176754-db37-4d40-9d16-b53b6191b3fa",
     "title": "청춘 돼지는 외출하는 여동생의 꿈을 꾸지 않는다",
     "image": "청춘 돼지는 외출하는 여동생의 꿈을 꾸지 않는다.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:16:03.620Z"
   },
   {
     "id": "c54c77ad-f4d3-491d-a6da-088137c598a9",
     "title": "청춘 돼지는 책가방 소녀의 꿈을 꾸지 않는다",
     "image": "청춘 돼지는 책가방 소녀의 꿈을 꾸지 않는다.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:17:12.921Z"
   },
   {
     "id": "f502cdd1-5c1f-4b77-a173-17bbb1f9dc1a",
     "title": "진격의 거인 2기",
     "image": "진격의 거인 2기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:18:22.800Z"
   },
   {
     "id": "731ecfd6-4d07-4ddb-87b4-7d5f63ae793c",
     "title": "진격의 거인 3기",
     "image": "진격의 거인 3기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:19:20.298Z"
   },
   {
     "id": "c280584b-db9c-4eb8-a63e-481054a3597a",
     "title": "종말의 세라프",
     "image": "종말의 세라프.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:20:11.552Z"
   },
   {
     "id": "c666e375-0633-4e84-99dd-5a6eea644f32",
     "title": "마계학교 이루마 군",
     "image": "마계학교 이루마 군.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:21:02.729Z"
   },
   {
     "id": "5a9b2451-4321-4084-9eef-2d28a53b8e69",
     "title": "극장판 소드 아트 온라인 -프로그레시브- 별 없는 밤의 아리아",
     "image": "극장판 소드 아트 온라인 -프로그레시브- 별 없는 밤의 아리아.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:22:31.797Z"
   },
   {
     "id": "fcf9ff58-efe4-4ba8-a795-198a51a8d59b",
     "title": "던전 관리인",
     "image": "던전 관리인.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:23:06.336Z"
   },
   {
     "id": "8c2ec3e4-a426-4a99-bf36-488bcbf9dc3e",
     "title": "최애의 아이 2기",
     "image": "최애의 아이 2기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:23:43.966Z"
   },
   {
     "id": "bd671e02-10a0-4487-9da1-02851a8b6235",
     "title": "Re: 제로부터 시작하는 이세계 생활 3기",
     "image": "Re 제로부터 시작하는 이세계 생활 3기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:25:11.203Z"
   },
   {
     "id": "2209589f-9e2e-4b2a-8807-fe36f0eab7b0",
     "title": "나 혼자만 레벨업 -ARISE FROM THE SHADOW-",
     "image": "나 혼자만 레벨업 -ARISE FROM THE SHADOW-.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:26:09.090Z"
   },
   {
     "id": "176270a7-2b78-48dd-a0cb-93481e130dd0",
     "title": "LAZARUS 라자로",
     "image": "LAZARUS 라자로.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:26:55.732Z"
   },
   {
     "id": "a90ba77d-4fc0-45cb-a2cb-4e5a6479dfd2",
     "title": "환생했는데 제7왕자라 내맘대로 마술을 연마합니다 2기",
     "image": "환생했는데 제7왕자라 내맘대로 마술을 연마합니다 2기.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:27:59.813Z"
   },
   {
     "id": "cc9173c4-1e85-48e3-b87b-641ef1cc1c77",
     "title": "이세계 콰르텟 3",
     "image": "이세계 콰르텟 3.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:28:54.617Z"
   },
   {
     "id": "bf2dd701-8a2b-43b8-ae85-ce0e640e105d",
     "title": "스파이 패밀리 Season 3",
     "image": "스파이 패밀리 Season 3.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:30:13.937Z"
   },
   {
     "id": "3a9a43a8-9242-46a1-9675-acc2019c5225",
     "title": "괴수 8호",
     "image": "괴수 8호.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:31:04.256Z"
   },
   {
     "id": "4e554982-297b-4bb9-a1ed-22d1bcd692ea",
     "title": "이 멋진 세계에 축복을! 3",
     "image": "이 멋진 세계에 축복을! 3.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:31:56.938Z"
   },
   {
     "id": "d9a95df6-72b4-4bfc-82a7-24876b3ed8a9",
     "title": "환생했는데 제7왕자라 내맘대로 마술을 연마합니다",
     "image": "환생했는데 제7왕자라 내맘대로 마술을 연마합니다.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:32:47.212Z"
   },
   {
     "id": "1438d9b9-0e2a-4507-94f1-2efc28a2263b",
     "title": "나 혼자만 레벨업",
     "image": "나 혼자만 레벨업.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:33:35.227Z"
   },
   {
     "id": "1d3181d8-a4ff-4fff-a58b-c247966c71a8",
     "title": "Re: 제로부터 시작하는 이세계 생활: 빙결의 인연",
     "image": "Re 제로부터 시작하는 이세계 생활 빙결의 인연.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:35:31.479Z"
   },
   {
     "id": "367d3c10-2d7d-4b93-8b76-421735955a30",
     "title": "주술회전",
     "image": "주술회전.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:36:14.388Z"
   },
   {
     "id": "6ae327c1-3207-41df-b971-6bbc3dd5195e",
     "title": "스파이 패밀리",
     "image": "스파이 패밀리.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "아냐가 귀여움",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:37:26.584Z"
   },
   {
     "id": "02dccdd2-408e-4061-a41b-065cebdf5896",
     "title": "극장판 귀멸의 칼날: 무한열차편",
     "image": "극장판 귀멸의 칼날 무한열차편.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:38:36.673Z"
   },
   {
     "id": "38aed6af-f060-45e9-b76d-9c8238146e94",
     "title": "방패 용사 성공담",
     "image": "방패 용사 성공담.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:39:52.582Z"
   },
   {
     "id": "39c4a280-3164-4b11-9e49-124809c062ae",
     "title": "Re: 제로부터 시작하는 이세계 생활 2기",
     "image": "Re 제로부터 시작하는 이세계 생활 2기.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:41:13.419Z"
   },
   {
       "id": "38638aa5-61cc-4f36-9b9f-169a1dbda643",
       "title": "극장판 이세계 콰르텟: 어나더 월드",
       "image": "극장판 이세계 콰르텟 어나더 월드.webp",
       "watchedAt": "",
       "rating": 4,
       "review": "",
       "longReview": "",
       "types": [
           "애니메이션",
           "영화"
       ],
       "status": "completed",
       "createdAt": "2026-10-30T10:42:38.590Z"
   },
   {
       "id": "132921be-d20e-4435-b359-37bc8919d057",
       "title": "고블린 슬레이어",
       "image": "고블린 슬레이어.webp",
       "watchedAt": "",
       "rating": 4,
       "review": "",
       "longReview": "",
       "types": [
           "애니메이션"
       ],
       "status": "completed",
       "createdAt": "2026-10-30T10:43:21.335Z"
   },
   {
     "id": "c9805db6-dfe7-41fd-88cc-d74ccb7e620d",
     "title": "원펀맨 2기",
     "image": "원펀맨 2기.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:44:38.976Z"
   },
   {
     "id": "0258939b-8aac-427d-a16e-e05c3ec2b55f",
     "title": "가브릴 드롭아웃",
     "image": "가브릴 드롭아웃.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "나의 일본 애니메이션 입덕작",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "lifeWork" : true,
     "status": "completed",
     "createdAt": "2026-10-30T10:45:29.481Z"
   },
   {
     "id": "77f701c8-0b83-4eb6-bd97-fffa887ad344",
     "title": "침략! 오징어 소녀",
     "image": "침략! 오징어 소녀.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:46:17.924Z"
   },
   {
     "id": "f1501e57-2fbf-4873-98ab-02ae0f6843b9",
     "title": "마왕성에서 잘 자요",
     "image": "마왕성에서 잘 자요.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:47:18.751Z"
   },
   {
     "id": "f8452df2-fec3-44bc-b720-e778a31ab2d2",
     "title": "소드 아트 온라인",
     "image": "소드 아트 온라인.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:48:22.502Z"
   },
   {
     "id": "ebaa978c-7dd9-4007-a3ff-1132aa07ff68",
     "title": "소드 아트 온라인 Ⅱ",
     "image": "소드 아트 온라인 Ⅱ.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:49:20.358Z"
   },
   {
     "id": "b5b6fa17-2c03-498f-8549-2d4cf8f66706",
     "title": "약속의 네버랜드 2",
     "image": "약속의 네버랜드 2.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:50:05.014Z"
   },
   {
     "id": "6e086e52-3850-4267-a727-15397fb4bc59",
     "title": "에로망가 선생",
     "image": "에로망가 선생.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:50:36.687Z"
   },
   {
     "id": "c9f17b62-184d-4615-bb96-612526334fcc",
     "title": "블렌드·S",
     "image": "블렌드·S.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "함정을 조심하세요",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:51:26.083Z"
   },
   {
     "id": "a5815f5d-4672-4d86-9b54-db8e2452f34f",
     "title": "달이 이끄는 이세계 여행",
     "image": "달이 이끄는 이세계 여행.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:52:14.782Z"
   },
   {
     "id": "edba3629-db7a-48ab-93fc-bcccd118ba24",
     "title": "나의 히어로 아카데미아",
     "image": "나의 히어로 아카데미아.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:53:00.474Z"
   },
   {
     "id": "7d084149-567f-4be4-ab19-29b2ca6295be",
     "title": "흔해빠진 직업으로 세계최강",
     "image": "흔해빠진 직업으로 세계최강.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:54:35.941Z"
   },
   {
     "id": "85ca4f3e-05a9-42c3-bb50-3a0e1f89745a",
     "title": "알바 뛰는 마왕님!",
     "image": "알바 뛰는 마왕님!.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:55:16.150Z"
   },
   {
     "id": "3f7ea6f3-a862-48c1-9dec-4f2907f24213",
     "title": "오버로드",
     "image": "오버로드.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:55:57.782Z"
   },
   {
     "id": "22e3a75c-a807-4835-a348-16aea6decac7",
     "title": "오버로드 Ⅱ",
     "image": "오버로드 Ⅱ.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:56:52.452Z"
   },
   {
     "id": "e0dec71c-1111-4011-8fbb-a9c9e29e641a",
     "title": "오버로드 Ⅲ",
     "image": "오버로드 Ⅲ.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:57:32.555Z"
   },
   {
     "id": "a42bfb2f-e3e5-4138-b10b-78cad722f026",
     "title": "오버로드 Ⅳ",
     "image": "오버로드 Ⅳ.webp",
     "watchedAt": "",
     "rating": 4.5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:58:12.591Z"
   },
   {
     "id": "69863b15-f4e1-4fdf-8317-79aadde9b860",
     "title": "이 멋진 세계에 축복을!",
     "image": "이 멋진 세계에 축복을!.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:58:56.294Z"
   },
   {
     "id": "95076de1-5556-4e38-81dc-4c42ac55bbb2",
     "title": "이 멋진 세계에 축복을! 2",
     "image": "이 멋진 세계에 축복을! 2.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T10:59:38.062Z"
   },
   {
     "id": "5c3f94d2-5f1e-4161-bcd7-3df285b324ef",
     "title": "이 멋진 세계에 축복을! 붉은 전설",
     "image": "이 멋진 세계에 축복을! 붉은 전설.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:00:31.074Z"
   },
   {
     "id": "0d59572c-5a13-4f15-8206-02cb372569b8",
     "title": "책벌레의 하극상 ~사서가 되기 위해서라면 뭐든지 할 수 있어~",
     "image": "책벌레의 하극상 ~사서가 되기 위해서라면 뭐든지 할 수 있어~.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:01:11.664Z"
   },
   {
     "id": "ac4052de-410a-4a7e-91e3-61418cb89f63",
     "title": "블랙 불릿",
     "image": "블랙 불릿.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:02:52.616Z"
   },
   {
     "id": "12f7ca13-c6b7-42ff-a485-db3452ea4f8f",
     "title": "괴짜의 샐러드 볼",
     "image": "괴짜의 샐러드 볼.webp",
     "watchedAt": "",
     "rating": 3.5,
     "review": "사라가 귀여움",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:03:36.425Z"
   },
   {
     "id": "35fd0732-484a-42ef-8b00-3b72eb917059",
     "title": "코바야시네 메이드래곤",
     "image": "코바야시네 메이드래곤.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:04:17.376Z"
   },
   {
     "id": "827c0dc2-9a33-44ac-bf89-51bc60fb5453",
     "title": "코바야시네 메이드래곤 S",
     "image": "코바야시네 메이드래곤 S.webp",
     "watchedAt": "",
     "rating": 5,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:05:07.116Z"
   },
   {
     "id": "65bfee67-e9e6-4cd8-868d-8887bbb8810e",
     "title": "길모퉁이 마족",
     "image": "길모퉁이 마족.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "모모가 귀여움",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:05:56.363Z"
   },
   {
     "id": "abc51b72-8aab-403d-bbfa-de7bdd012ca8",
     "title": "길모퉁이 마족 2번가",
     "image": "길모퉁이 마족 2번가.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:07:31.630Z"
   },
   {
     "id": "35e1f457-678d-452b-b5b9-b36aa3fe0c1d",
     "title": "그대들은 어떻게 살 것인가",
     "image": "그대들은 어떻게 살 것인가.webp",
     "watchedAt": "",
     "rating": 3.5,
     "review": "작가의 자화자찬. 나르시시즘",
     "longReview": "",
     "types": [
         "애니메이션",
         "영화"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:08:16.525Z"
   },
   {
     "id": "31733d66-057d-412c-b423-f43fd9afcad7",
     "title": "nEW GAME",
     "image": "nEW GAME.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:09:29.892Z"
   },
   {
     "id": "26f0edd3-307d-4a88-a955-6eaf64bdda97",
     "title": "nEW GAME!!",
     "image": "nEW GAME!!.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:10:14.165Z"
   },
   {
     "id": "74576539-c573-4adb-8137-cda7770f9320",
     "title": "조난입니까?",
     "image": "조난입니까.webp",
     "watchedAt": "",
     "rating": 4,
     "review": "조난에서 생존하는 불건전한 방법",
     "longReview": "",
     "types": [
         "애니메이션"
     ],
     "status": "completed",
     "createdAt": "2026-10-30T11:11:03.441Z"
   },
   {
      "id": "b214dc3d-ef40-4367-b7ba-6c7eca54d65d",
      "title": "이세계 수어사이드 스쿼드",
      "image": "이세계 수어사이드 스쿼드.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:11:50.331Z"
    },
    {
      "id": "d2ea1c34-21d5-41c0-a155-ce7f494ce0ee",
      "title": "히나마츠리",
      "image": "히나마츠리.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:12:36.534Z"
    },
    {
      "id": "3c74e017-73de-4e18-935d-b149ff467a45",
      "title": "전생했더니 슬라임이었던 건에 대하여 제3기",
      "image": "전생했더니 슬라임이었던 건에 대하여 제3기.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:13:31.494Z"
    },
    {
      "id": "78bb3039-5f1d-4999-8fdf-020a89514ab2",
      "title": "거미입니다만, 문제라도?",
      "image": "거미입니다만, 문제라도.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "참신한 전개, 힘든 작화",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:14:44.267Z"
    },
    {
      "id": "0551da96-b2e6-4409-b612-2ee0c7e26a80",
      "title": "전생 귀족, 감정 스킬로 성공하다",
      "image": "전생 귀족, 감정 스킬로 성공하다.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:15:37.256Z"
    },
    {
      "id": "ba7aba9f-5994-46bb-973a-8f1300568907",
      "title": "도쿄 리벤저스: 성야결전편",
      "image": "도쿄 리벤저스 성야결전편.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:16:30.717Z"
    },
    {
      "id": "b5a89977-6b67-465c-ac26-417f839653f3",
      "title": "프린세스 커넥트! Re:Dive",
      "image": "프린세스 커넥트! Re Dive.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:17:25.687Z"
    },
    {
      "id": "e18b1cad-2339-44a9-a87d-3d91228d3b8f",
      "title": "프린세스 커넥트! Re:Dive Season 2",
      "image": "프린세스 커넥트! Re Dive Season 2.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:18:06.996Z"
    },
    {
      "id": "2ed4070e-81e0-4be8-8732-2474651559c7",
      "title": "악역영애 전생 아저씨",
      "image": "악역영애 전생 아저씨.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:19:06.435Z"
    },
    {
      "id": "acd761a4-7dcf-4b44-9db6-f187d99f6afa",
      "title": "괴수 8호 호시나의 휴일",
      "image": "괴수 8호 호시나의 휴일.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:20:03.076Z"
    },
    {
      "id": "2e814f91-94c5-4e1a-852d-6753655a010c",
      "title": "이세계 묵시록 마이노그라 ~파멸의 문명에서 시작하는 세계 정복~",
      "image": "이세계 묵시록 마이노그라 ~파멸의 문명에서 시작하는 세계 정복~.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:20:50.905Z"
    },
    {
      "id": "7164cdf8-b126-43d8-b43f-f8133d73861f",
      "title": "극장판 귀멸의 칼날: 무한성편 제1장",
      "image": "극장판 귀멸의 칼날 무한성편 제1장.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:22:32.366Z"
    },
    {
      "id": "8e77ead9-c383-4dd7-8da5-ec5eedbc77f5",
      "title": "원펀맨 3기",
      "image": "원펀맨 3기.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:23:21.147Z"
    },
    {
      "id": "ae676a3d-5dbd-429d-8d1d-408e5e881525",
      "title": "전생했더니 슬라임이었던 건에 대하여 4기",
      "image": "전생했더니 슬라임이었던 건에 대하여 4기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "watching",
      "createdAt": "2026-10-30T11:24:27.479Z"
    },
    {
      "id": "2b151114-e71c-4bc8-88b0-39f4bba57754",
      "title": "달이 이끄는 이세계 여행 제2막",
      "image": "달이 이끄는 이세계 여행 제2막.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:25:15.464Z"
    },
    {
      "id": "d7c97928-cf4e-4060-8cb1-a00236dc3b9f",
      "title": "전생귀족, 감정 스킬로 성공하다 제2기",
      "image": "전생귀족, 감정 스킬로 성공하다 제2기.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:27:49.202Z"
    },
    {
      "id": "5c125ed7-bb69-44a1-b5ef-75d2b14e2302",
      "title": "마슐",
      "image": "마슐.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:28:51.678Z"
    },
    {
        "id": "55b56efc-7832-4823-b64e-d14a9840a76a",
        "title": "스파이 패밀리 Season 2",
        "image": "스파이 패밀리 Season 2.webp",
        "watchedAt": "",
        "rating": 4,
        "review": "",
        "longReview": "",
        "types": [
            "애니메이션"
        ],
        "status": "completed",
        "createdAt": "2026-10-30T11:29:43.414Z"
    },
    {
      "id": "75c75619-5b91-45a3-8499-ebdc8df29da8",
      "title": "귀멸의 칼날: 도공 마을편",
      "image": "귀멸의 칼날 도공 마을편.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:30:27.762Z"
    },
    {
      "id": "874e482e-4479-46ea-8613-48952b0c57b9",
      "title": "전생했더니 슬라임이었던 건에 대하여",
      "image": "전생했더니 슬라임이었던 건에 대하여.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:31:30.921Z"
    },
    {
      "id": "0e099cef-6dd1-4697-b81f-215e464f68e1",
      "title": "귀멸의 칼날: 환락의 거리편",
      "image": "귀멸의 칼날 환락의 거리편.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:32:33.090Z"
    },
    {
      "id": "cd0f3367-bb0a-465f-9456-33564d15f969",
      "title": "전생했더니 슬라임이었던 건에 대하여 2기",
      "image": "전생했더니 슬라임이었던 건에 대하여 2기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:33:35.335Z"
    },
    {
      "id": "4ef87317-61d4-465e-bb1f-14772b57847d",
      "title": "극장판 전생했더니 슬라임이었던 건에 대하여 홍련의 인연편",
      "image": "극장판 전생했더니 슬라임이었던 건에 대하여 홍련의 인연편.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:34:47.552Z"
    },
    {
      "id": "ab6fd29d-4084-4027-8745-b55d60577d23",
      "title": "방패 용사 성공담 Season 2",
      "image": "방패 용사 성공담 Season 2.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:35:47.891Z"
    },
    {
      "id": "55d71f42-3f31-4ab5-a68d-d1ab12570625",
      "title": "용왕이 하는 일!",
      "image": "용왕이 하는 일!.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "히나츠루 아이는 전설이다",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:36:50.960Z"
    },
    {
      "id": "d5bc99f0-7169-4b84-8904-493e1221473a",
      "title": "사카모토입니다만?",
      "image": "사카모토입니다만.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:37:31.940Z"
    },
    {
      "id": "2a1a3fdf-9969-4f18-93e5-6efab239c889",
      "title": "저, 능력은 평균치로 해달라고 말했잖아요!",
      "image": "저, 능력은 평균치로 해달라고 말했잖아요!.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:38:26.655Z"
    },
   {
      "id": "87b088cc-59c6-454f-9884-85c1d3d0391f",
      "title": "우리 메이드가 너무 짜증나!",
      "image": "우리 메이드가 너무 짜증나!.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:39:20.040Z"
    },
    {
      "id": "2e0ccf72-0b37-4644-8988-dbce287d76bf",
      "title": "야한 이야기라는 개념이 존재하지 않는 지루한 세계",
      "image": "야한 이야기라는 개념이 존재하지 않는 지루한 세계.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:40:16.598Z"
    },
    {
        "id": "38a739a5-ec5d-4142-b3b8-f968babe36eb",
        "title": "창단! 짐승의 길",
        "image": "창단! 짐승의 길.webp",
        "watchedAt": "",
        "rating": 3.5,
        "review": "",
        "longReview": "",
        "types": [
            "애니메이션"
        ],
        "status": "completed",
        "createdAt": "2026-10-30T11:41:02.379Z"
    },
    {
      "id": "0c11186f-97a2-44c2-b5a2-7151438c263c",
      "title": "흔해빠진 직업으로 세계최강 2기",
      "image": "흔해빠진 직업으로 세계최강 2기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:41:51.341Z"
    },
    {
      "id": "ff793eb7-b1d5-4842-98fa-d5326b80516e",
      "title": "현실주의 용사의 왕국 재건기",
      "image": "현실주의 용사의 왕국 재건기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:42:40.848Z"
    },
    {
      "id": "1506fc5f-44fe-48b6-9193-1529ff7c3200",
      "title": "최강 음양사의 이세계 전생기",
      "image": "최강 음양사의 이세계 전생기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:45:47.853Z"
    },
    {
      "id": "52b5d8dc-6cd4-420c-9872-a8858fa934ff",
      "title": "너의 이름은",
      "image": "너의 이름은.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "거품 흥행. 그만큼은 아니다",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:46:31.600Z"
    },
    {
      "id": "9e08604b-0033-481c-a048-f576a659503b",
      "title": "곰 곰 곰 베어",
      "image": "곰 곰 곰 베어.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "유나가 귀여움",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:47:09.559Z"
    },
    {
      "id": "d193995b-67d5-4302-83e2-c58b35a15ffa",
      "title": "슬라임을 잡으면서 300년, 모르는 사이에 레벨MAX가 되었습니다",
      "image": "슬라임을 잡으면서 300년, 모르는 사이에 레벨MAX가 되었습니다.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:48:19.138Z"
    },
    {
      "id": "9ee5d282-aead-4365-abbe-bbb58970aa12",
      "title": "녹을 먹는 비스코",
      "image": "녹을 먹는 비스코.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:49:10.303Z"
    },
    {
      "id": "ec6d8de4-f309-41c6-bd55-e6dc58798229",
      "title": "살애",
      "image": "살애.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:49:55.747Z"
    },
    {
      "id": "9ad237b1-ac12-4008-a42c-51ebff8fb6ca",
      "title": "외톨이 흡혈 공주의 고뇌",
      "image": "외톨이 흡혈 공주의 고뇌.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:50:42.023Z"
    },
    {
      "id": "5dd9f5bf-3726-4e2e-96fb-781765fab674",
      "title": "이세계 미소녀 수육 아저씨와",
      "image": "이세계 미소녀 수육 아저씨와.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:51:39.316Z"
    },
    {
      "id": "ab7626a4-a880-4dc6-85ef-b6ea3a1a99ef",
      "title": "어둠의 실력자가 되고 싶어서!",
      "image": "어둠의 실력자가 되고 싶어서!.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:52:39.438Z"
    },
    {
      "id": "2f88ae05-de3e-4c79-9337-e4fa11106dd9",
      "title": "스즈메의 문단속",
      "image": "스즈메의 문단속.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:53:21.596Z"
    },
    {
      "id": "5abfb23a-3782-46f9-95c2-323e1549f9fa",
      "title": "이 용사가 ZZANG센 주제에 너무 신중하다",
      "image": "이 용사가 ZZANG센 주제에 너무 신중하다.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:54:32.442Z"
    },
   {
      "id": "b203136c-409a-4549-94ef-0f00a84fbebc",
      "title": "Re:CREATORS",
      "image": "ReCREATORS.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:55:27.387Z"
    },
    {
      "id": "c174c91f-e0b3-4b6e-bb22-8ee529f34286",
      "title": "여성향 게임의 파멸 플래그밖에 없는 악역 영애로 환생해버렸다…",
      "image": "여성향 게임의 파멸 플래그밖에 없는 악역 영애로 환생해버렸다….webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:56:26.452Z"
    },
    {
      "id": "64fefdcd-8b3a-44a3-845d-3998b7366eb5",
      "title": "도쿄 리벤저스: 천축편",
      "image": "도쿄 리벤저스 천축편.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:57:16.186Z"
    },
    {
      "id": "6c0897d9-6bac-4d1e-a307-0faef6a636e9",
      "title": "쿠마미코",
      "image": "쿠마미코.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "귀여운 마치를 가스라이팅. 뜻밖의 멘헤라물",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:57:56.484Z"
    },
    {
      "id": "aaca2797-29b3-4dbf-a9bd-4937066680f5",
      "title": "괴인 개발부의 쿠로이츠 씨",
      "image": "괴인 개발부의 쿠로이츠 씨.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T11:58:57.880Z"
    },
    {
        "id": "c96ecd57-5eb9-423f-b888-03f2fe01c07b",
        "title": "나는 친구가 적다",
        "image": "나는 친구가 적다.webp",
        "watchedAt": "",
        "rating": 3,
        "review": "",
        "longReview": "",
        "types": [
            "애니메이션"
        ],
        "status": "completed",
        "createdAt": "2026-10-30T12:00:09.701Z"
    },
    {
      "id": "95e661cd-ac83-4f81-a253-8db8a85bce7a",
      "title": "헬 모드 ~파고들기 좋아하는 게이머는 폐급 설정 이세계에서 무쌍한다~",
      "image": "헬 모드 ~파고들기 좋아하는 게이머는 폐급 설정 이세계에서 무쌍한다~.webp",
      "watchedAt": "",
      "rating": 3,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:01:05.060Z"
    },
    {
      "id": "cb3a3c37-3072-4b17-b649-131c3b2f8f50",
      "title": "바보걸",
      "image": "바보걸.webp",
      "watchedAt": "",
      "rating": 2.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:01:57.088Z"
    },
    {
      "id": "e94fbb4f-8b0a-49aa-b8fc-9415936f86a7",
      "title": "신이 된 날",
      "image": "신이 된 날.webp",
      "watchedAt": "",
      "rating": 2,
      "review": "좆이 된 날. 초반 전개에 속지 말 것",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:02:45.381Z"
    },
    {
      "id": "6a2304f5-5402-4c96-9af4-4bde488a2509",
      "title": "초인 고교생들은 이세계에서도 여유롭게 살아가나 봅니다!",
      "image": "초인 고교생들은 이세계에서도 여유롭게 살아가나 봅니다!.webp",
      "watchedAt": "",
      "rating": 2,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:03:45.892Z"
    },
    {
      "id": "976d75ce-f51a-481f-9a88-789d0b6acd87",
      "title": "마왕군 최강의 마술사는 인간이었다",
      "image": "마왕군 최강의 마술사는 인간이었다.webp",
      "watchedAt": "",
      "rating": 2,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:04:27.833Z"
    },
    {
        "id": "b5184032-5c53-4852-b90b-3def10df464f",
        "title": "극장판 체인소 맨: 레제편",
        "image": "극장판 체인소 맨 레제편.webp",
        "watchedAt": "",
        "rating": 5,
        "review": "코끝을 울리는 애틋한 감정",
        "longReview": "",
        "types": [
            "애니메이션",
            "영화"
        ],
        "lifeWork" : true,
        "status": "completed",
        "createdAt": "2026-10-30T12:08:45.726Z"
    },
    {
      "id": "2c222f83-baab-4113-ba15-2addfe8c6fc4",
      "title": "시간을 달리는 소녀",
      "image": "시간을 달리는 소녀.webp",
      "watchedAt": "",
      "rating": 4.5,
      "review": "많은 떡밥과 생각하는 재미",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:11:03.953Z"
    },
    {
        "id": "35ea672e-efaa-4642-8fbe-0baad8dca0f7",
        "title": "니세코이",
        "image": "니세코이.webp",
        "watchedAt": "",
        "rating": 4,
        "review": "",
        "longReview": "",
        "types": [
            "애니메이션"
        ],
        "status": "completed",
        "createdAt": "2026-10-30T12:12:07.261Z"
    },
    {
      "id": "cbecfc60-4192-404a-addd-96901e6e1fcc",
      "title": "극장판 치이카와: 인어 섬의 비밀",
      "image": "극장판 치이카와 인어 섬의 비밀.webp",
      "watchedAt": "",
      "rating": 4.5,
      "review": "잔혹 동화. 어린이 동화의 클리셰를 비틀다",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:13:15.393Z"
    },
    {
      "id": "afc34384-c5ec-4833-adc4-e74091927aaa",
      "title": "센과 치히로의 행방불명",
      "image": "센과 치히로의 행방불명.webp",
      "watchedAt": "",
      "rating": 4,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:14:04.175Z"
    },
    {
      "id": "eb0016ae-a5e5-484b-bd2f-34011d2556ae",
      "title": "바람계곡의 나우시카",
      "image": "바람계곡의 나우시카.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "애니메이션 예술 작품의 고점",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T12:15:04.602Z"
    },
    {
      "id": "d4de02e6-0962-4374-96e8-ed4a0d98ee38",
      "title": "비스타즈",
      "image": "비스타즈.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "포식자와 피식자의 공존 가능성",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T12:16:30.719Z"
    },
    {
      "id": "dd7f37cd-a4a0-4c07-ab65-09a125679712",
      "title": "비스타즈 세컨드 시즌",
      "image": "비스타즈 세컨드 시즌.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:17:01.440Z"
    },
    {
      "id": "8fd59a9c-2ca0-4db6-bb5d-9eeb5b997747",
      "title": "사이버펑크: 엣지러너",
      "image": "사이버펑크 엣지러너.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "함께 달에 가지 못해 미안해",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T12:20:24.072Z"
    },
    {
      "id": "1b4f5083-025f-4edd-ac34-1c0b097710ee",
      "title": "카케구루이",
      "image": "카케구루이.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:22:48.164Z"
    },
    {
      "id": "6d49d73d-df1e-49eb-a62a-abc35cef8ea3",
      "title": "카케구루이 ××",
      "image": "카케구루이 ××.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:23:14.055Z"
    },
    {
      "id": "c3a45b18-7ed4-4945-bb1d-78b6e52fab68",
      "title": "초(超) 가구야 공주!",
      "image": "초(超) 가구야 공주!.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "5,000년 순애, 어떻게 이길래",
      "longReview": "",
      "types": [
          "애니메이션",
          "영화"
      ],
      "lifeWork" : true,
      "status": "completed",
      "createdAt": "2026-10-30T12:25:22.817Z"
    },
    {
      "id": "a42d9cbf-4696-4dcf-bdef-02b30a5a43bc",
      "title": "원펀맨",
      "image": "원펀맨.webp",
      "watchedAt": "",
      "rating": 5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:27:13.566Z"
    },
    {
      "id": "0ac19d0c-17e5-4d40-be9e-91c5cea34e66",
      "title": "귀멸의 칼날: 합동 강화 훈련편",
      "image": "귀멸의 칼날 합동 강화 훈련편.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:33:03.228Z"
    },
    {
      "id": "f4814038-91fc-475a-b8c7-f025fb5b3485",
      "title": "란영애 니아 리스톤 병약한 영애로 전생한 살신 무인의 화려한 무쌍담",
      "image": "란영애 니아 리스톤 병약한 영애로 전생한 살신 무인의 화려한 무쌍담.webp",
      "watchedAt": "",
      "rating": 4.5,
      "review": "니아가 귀여움",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "watching",
      "createdAt": "2026-10-30T12:34:36.531Z"
    },
    {
      "id": "430f1b20-761d-446e-84ef-165213e6460d",
      "title": "전생귀족, 감정 스킬로 성공하다 제3기",
      "image": "전생귀족, 감정 스킬로 성공하다 제3기.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "watching",
      "createdAt": "2026-10-30T12:35:41.203Z"
    },
    {
      "id": "94e385f6-577a-452e-b91d-056d61c3e02f",
      "title": "템빨 ~아이템의 힘~",
      "image": "템빨 ~아이템의 힘~.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "status": "completed",
      "createdAt": "2026-10-30T12:36:36.075Z"
    },
    {
      "id": "8a27d75f-8b72-499c-a6a9-83aea5b1871c",
      "title": "귀멸의 칼날",
      "image": "귀멸의 칼날.webp",
      "watchedAt": "",
      "rating": 3.5,
      "review": "뛰어난 작화로 겨우 살려낸 범작",
      "longReview": "",
      "types": [
          "애니메이션"
      ],
      "lifeWork": false,
      "status": "completed",
      "createdAt": "2026-10-30T13:30:14.263Z"
    }
];

  const works = INITIAL_WORKS.map(normalize);
  const clone = value => JSON.parse(JSON.stringify(value));

  function validateImage(value) {
    const file = String(value || "").trim();
    if (!file) return "";
    // 외부 URL, 상대 경로, 폴더 경로는 허용하지 않습니다.
    if (/[\\/\x00-\x1f]/.test(file) || file === "." || file === ".." ||
        !/\.(?:jpe?g|png|webp|avif|gif|svg)$/i.test(file) || file.length > 180) {
      throw new Error("이미지는 img 폴더 안의 파일명만 입력해 주세요. (jpg, png, webp, avif, gif, svg)");
    }
    return file;
  }

  function validateDate(value) {
    const date = String(value || "").trim();
    if (!date) return "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("본 날짜를 올바르게 입력해 주세요.");
    const parsed = new Date(date + "T12:00:00Z");
    if (date.slice(0,4) === "0000" || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10) !== date)
      throw new Error("존재하지 않는 날짜입니다.");
    return date;
  }

  function normalize(raw) {
    if (!raw || typeof raw !== "object") throw new Error("올바른 작품 데이터가 아닙니다.");
    const title = String(raw.title || "").trim();
    if (!title || title.length > 120) throw new Error("작품 이름을 1~120자로 입력해 주세요.");
    const rating = Number(raw.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5 || !Number.isInteger(rating * 2))
      throw new Error("별점은 1~5점 사이에서 0.5점 단위로 선택해 주세요.");
    const types = Array.isArray(raw.types) ? [...new Set(raw.types)] : [];
    if (!types.length || types.some(type => !TYPES.includes(type))) throw new Error("작품 유형을 한 개 이상 선택해 주세요.");
    if (!["watching", "completed"].includes(raw.status)) throw new Error("감상 상태를 선택해 주세요.");
    const review = String(raw.review || "").trim().replace(/\s*[\r\n]+\s*/g, " ");
    if (review.length > 180) throw new Error("한 줄 평은 180자까지 입력할 수 있습니다.");
    const longReview = String(raw.longReview || "").replace(/\r\n?/g, "\n").trim();
    if (longReview.length > 10000) throw new Error("긴 감상은 10,000자까지 입력할 수 있습니다.");
    const createdAt = raw.createdAt || new Date().toISOString();
    if (!Number.isFinite(Date.parse(createdAt))) throw new Error("추가 시각이 올바르지 않습니다.");
    return {
      id: String(raw.id || createId()),
      title, image: validateImage(raw.image),
      watchedAt: validateDate(raw.watchedAt), rating, review, longReview, types,
      lifeWork: raw.lifeWork === true,
      status: raw.status, createdAt: new Date(createdAt).toISOString()
    };
  }

  function createId() {
    return globalThis.crypto && typeof globalThis.crypto.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : "work-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  window.WorksDB = Object.freeze({
    types: TYPES,
    getAll() { return clone(works); },
    getById(id) { const found = works.find(work => work.id === id); return found ? clone(found) : null; },
    prepare(raw) {
      const existing = raw.id ? works.find(work => work.id === raw.id) : null;
      if (raw.id && !existing) throw new Error("수정할 작품을 찾을 수 없습니다.");
      return clone(normalize({
        ...raw, id: existing ? existing.id : createId(),
        createdAt: existing ? existing.createdAt : new Date().toISOString()
      }));
    },
    validateImage
  });
})();
