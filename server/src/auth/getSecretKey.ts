import { randomBytes } from 'crypto';

function generateSecretKey(): string {
    return randomBytes(32).toString('hex');
}

const secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);

//c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c