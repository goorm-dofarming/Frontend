import { http, HttpResponse } from 'msw';
import { logs } from '../constatns/logExample';

export const handlers = [
  http.get('https://api.example.com/api/user', () => {
    return HttpResponse.json({
      data: {
        name: '서근재',
        age: 26,
      },
    });
  }),

  http.get('https://api.example.com/api/entireChats', () => {
    return HttpResponse.json({
      data: [
        {
          roomId: 1,
          title: '경남 여행 가는 사람 다 모여',
          regionName: '경상남도',
          regionImageUrl: '',
          tags: [
            { name: '#바다', color: '#007bff' },
            { name: '#맛집', color: '#007bff' },
          ],
          participantCount: 12,
          createAt: Date.now(),
        },
        {
          roomId: 2,
          title: '돌굴러가유~',
          regionName: '충청북도',
          regionImageUrl: '',
          tags: [{ name: '#느림', color: '#007bff' }],
          participantCount: 5,
          createAt: Date.now(),
        },
        {
          roomId: 3,
          title: '붓싼아이가!',
          regionName: '부산광역시',
          regionImageUrl: '',
          tags: [
            { name: '#부산갈매기', color: '#007bff' },
            { name: '#밀락더수변', color: '#007bff' },
          ],
          participantCount: 20,
          createAt: Date.now(),
        },
      ],
    });
  }),

  http.get('https://api.example.com/api/myChats', () => {
    return HttpResponse.json({
      data: [
        {
          roomId: 1,
          title: '경남 여행 가는 사람 다 모여',
          regionName: '경상남도',
          regionImageUrl: '',
          tags: [
            { name: '#바다', color: '#007bff' },
            { name: '#맛집', color: '#007bff' },
          ],
          participantCount: 12,
          createAt: Date.now(),
        },
        {
          roomId: 2,
          title: '돌굴러가유~',
          regionName: '충청북도',
          regionImageUrl: '',
          tags: [{ name: '#느림', color: '#007bff' }],
          participantCount: 5,
          createAt: Date.now(),
        },
      ],
    });
  }),
  http.get(`/logs`, () => {
    return HttpResponse.json(logs);
  }),
];
