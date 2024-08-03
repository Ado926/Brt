import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import fs from 'fs';

// Carga la imagen desde el sistema de archivos
const loadImage = async () => {
    const imagePath = 'https://telegra.ph/file/8648870907494d8806af2.jpg'; // Ruta de la imagen que subiste
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer;
};

const handler = async (m, { conn, text, usedPrefix: prefix }) => {
    const imageBuffer = await loadImage();

    const messageMedia = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });

    const menuMessage = {
        body: { text: `╭────《 *ts sk* 》─────⊷\n│ ╭──────────────◆\n│ │ usuario: ${await conn.getName(m.sender)}\n│ │ creador: Skid\n│ │ Comandos: ${global.commands.size}\n│ ╰──────────────◆\n╰───────────────⊷\n╭────❏ *MENÚ* ❏\n\n│ ${prefix}comando1 - Descripción del comando 1\n│ ${prefix}comando2 - Descripción del comando 2\n│ ${prefix}comando3 - Descripción del comando 3\n╰━━━━━━━━━━━━━──⊷\n\nBuenas noches 🌙`.trim() },
        footer: { text: 'Agradecimiento a la comunidad de "WSApp • Developers"\nhttps://chat.whatsapp.com/FaQunmlp9BmDRk6lEEc9FJ\nAgradecimiento especial a Carlos (PT) por los códigos de interactiveMessage (botones)\nhttps://github.com/darlyn1234\nAdaptación de imagen en tipo lista, código y funcionamiento por BrunoSobrino\nhttps://github.com/BrunoSobrino'.trim() },
        header: {
            title: 'MENÚ',
            hasMediaAttachment: true,
            imageMessage: messageMedia.imageMessage,
        }
    };

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: menuMessage,
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['menu'];
handler.tags = ['general'];
handler.command = /^(menu8)$/i;

export default handler;
