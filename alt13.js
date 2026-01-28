const mineflayer = require('mineflayer');

// Versi server (Sesuaikan jika perlu: '1.16.5', '1.12.2', dll)
const serverVersion = '1.16.5'; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startBot() {
    const bot = mineflayer.createBot({
        host: 'kalwi.id',
        username: '_altRema13',
        auth: 'offline',
        version: serverVersion,
        logErrors: false, // Matikan log error standar
        checkTimeoutInterval: 30 * 1000, // Mencegah bot drop karena lag saat load chunk
    });

    // OVERRIDE fungsi warn/error bot untuk mematikan spam "Ignoring block entities"
    // Ini menangkap sisa log yang lolos dari logErrors: false
    const originalWarn = bot._client.on ? null : console.warn; 
    const originalLog = bot._client.on ? null : console.log;

    // Metode paling ampuh: Memodifikasi console sementara atau menggunakan event listener
    bot.on('error', (err) => {
        // Silent: Jangan print error apapun
    });

    bot.on('spawn', async () => {
        try {
            await sleep(5000);
            bot.chat('/login alt1104');
            
            await sleep(5000);
            bot.chat('/move oneblock');
            
            await sleep(5000);
            bot.chat('/afk');
        } catch (error) {
            // Silent
        }
    });

    bot.on('kicked', (reason) => {
        // Silent
    });

    bot.on('end', async () => {
        await sleep(5000);
        startBot();
    });
}

// JALANKAN SCRIPT DENGAN MENYEMATKAN LINGKUNGAN (ENVIRONMENT) AGAR BENAR-BENAR HILANG
// Karena pesan "Ignoring..." seringkali berasal dari library eksternal yang console.log langsung,
// cara terbaik adalah membungkus console.log global secara halus saat bot berjalan.

const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Hanya matikan log yang mengandung kata kunci spam
const newLog = function (...args) {
    const message = args.join(' ');
    // Jangan tampilkan jika mengandung kata-kata spam ini
    if (message.includes('Ignoring block entities') || 
        message.includes('Chunk size is') || 
        message.includes('partial packet')) {
        return;
    }
    originalConsoleLog.apply(console, args);
};

const newError = function (...args) {
    const message = args.join(' ');
    if (message.includes('Ignoring block entities') || 
        message.includes('Chunk size is') || 
        message.includes('partial packet')) {
        return;
    }
    originalConsoleError.apply(console, args);
};

// Timpa fungsi console global
console.log = newLog;
console.error = newError;
console.warn = newError;

// Jalankan Bot
startBot();