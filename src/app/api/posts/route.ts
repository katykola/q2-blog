import { NextResponse } from "next/server";
import https from "https";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;


export async function GET() {
  try {
    const token = TOKEN;

    const options = {
      hostname: 'stage73.q2.cz',
      path: '/q2onboarding/q2/posts/list',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify({ token }))
      }
    };

    const data = await new Promise((resolve, reject) => {

      const req = https.request(options, (res) => {
        
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(responseData));
          } else {
            reject(`Error ${res.statusCode}: ${responseData}`);
          }
        });
      });

      req.on('error', (error) => {
        reject(`Request error: ${error}`);
      });

      req.write(JSON.stringify({ token }));
      req.end();
    });

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: (error as Error).toString() }, { status: 500 });
  }
}
