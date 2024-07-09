import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/api/user', () => {
    return HttpResponse.json({
      data: {
        name: '서근재',
        age: 26,
      },
    });
  }),
];
