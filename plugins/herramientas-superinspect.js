// Código adaptado por https://github.com/GataNina-Li
// Código compatible con canales y comunidades de WhatsApp

import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"
import axios from 'axios'

// Función auxiliar para reporte de errores
const reportError = async (m, e) => {
  console.error(e)
  await m.reply(`*❌ Se produjo un error inesperado.*\n\n> ${e.message}`)
}

// Función para formatear fechas
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString('es-ES', { timeZone: 'America/Tegucigalpa' })
}

// Traducción rápida ficticia si no usas un sistema de traducción
const tr = async (text) => text

// Imagen aleatoria ficticia
const img = {
  getRandom: () => 'https://telegra.ph/file/19f9fe6a3cc2e6b7cbf2b.jpg'
}

let handler = async (m, { conn, args, text }) => {
  try {
    const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
    const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]

    if (!text) return await m.reply(await tr(`*⚠️ Ingrese un enlace de un grupo/comunidad/canal de WhatsApp para obtener información.*`))

    let msgTxt1 = await tr("No encontrado")
    let thumb = img.getRandom()

    let MetadataGroupInfo = async (res) => {
      let nameCommunity = await tr("no pertenece a ninguna Comunidad")
      let groupPicture = await tr("No se pudo obtener")

      if (res.linkedParent) {
        let linkedGroupMeta = await conn.groupMetadata(res.linkedParent).catch(() => null)
        nameCommunity = linkedGroupMeta ? "\n`Nombre:` " + (linkedGroupMeta.subject || "") : nameCommunity
      }

      let pp = await conn.profilePictureUrl(res.id, 'image').catch(() => null)
      let inviteCode = await conn.groupInviteCode(res.id).catch(() => null)

      let caption = `🆔 *${await tr("Identificador del grupo")}:*\n${res.id || msgTxt1}\n\n` +
        `👑 *${await tr("Creado por")}:*\n${res.owner ? `@${res.owner.split("@")[0]}` : msgTxt1} ${res.creation ? `el ${formatDate(res.creation)}` : ""}\n\n` +
        `🏷️ *${await tr("Nombre")}:*\n${res.subject || msgTxt1}\n\n` +
        `✏️ *${await tr("Nombre cambiado por")}:*\n${res.subjectOwner ? `@${res.subjectOwner.split("@")[0]}` : msgTxt1} ${res.subjectTime ? `el ${formatDate(res.subjectTime)}` : ""}\n\n` +
        `📄 *${await tr("Descripción")}:*\n${res.desc || msgTxt1}\n\n` +
        `📝 *${await tr("Descripción cambiado por")}:*\n${res.descOwner ? `@${res.descOwner.split("@")[0]}` : msgTxt1}\n\n` +
        `🗃️ *${await tr("Id de la descripción")}:*\n${res.descId || msgTxt1}\n\n` +
        `🖼️ *${await tr("Imagen del grupo")}:*\n${pp || groupPicture}\n\n` +
        `💫 *${await tr("Autor")}:*\n${res.author || msgTxt1}\n\n` +
        `🎫 *${await tr("Código de invitación")}:*\n${inviteCode || msgTxt1}\n\n` +
        `⌛ *${await tr("Duración")}:*\n${res.ephemeralDuration !== undefined ? `${res.ephemeralDuration} segundos` : "Desconocido"}\n\n` +
        `🛃 *${await tr("Admins")}:*\n` +
        (res.participants?.filter(u => u.admin)?.map((u, i) => `${i + 1}. @${u.id.split("@")[0]} (${u.admin})`).join("\n") || msgTxt1) + `\n\n` +
        `🔰 *${await tr("Usuarios en total")}:*\n${res.size || msgTxt1}\n\n` +
        `✨ *${await tr("Información avanzada")}* ✨\n\n🔎 ${await tr("*Comunidad vinculada al grupo:*")}\n${res.isCommunity ? "Este grupo es un chat de avisos" : `${res.linkedParent ? "`Id:` " + res.linkedParent : "Este grupo"} ${nameCommunity}`}\n\n` +
        `⚠️ *${await tr("Restricciones")}:* ${res.restrict ? "✅" : "❌"}\n` +
        `📢 *${await tr("Anuncios")}:* ${res.announce ? "✅" : "❌"}\n` +
        `🏘️ *${await tr("¿Es comunidad?")}:* ${res.isCommunity ? "✅" : "❌"}\n` +
        `📯 *${await tr("¿Es anuncio de comunidad?")}:* ${res.isCommunityAnnounce ? "✅" : "❌"}\n` +
        `🤝 *${await tr("Tiene aprobación de miembros")}:* ${res.joinApprovalMode ? "✅" : "❌"}\n` +
        `🆕 *${await tr("Puede Agregar futuros miembros")}:* ${res.memberAddMode ? "✅" : "❌"}\n`

      return caption.trim()
    }

    let info = null

    if (channelUrl || inviteUrl) {
      try {
        let inviteInfo = await conn.groupGetInviteInfo(channelUrl || inviteUrl)
        info = await MetadataGroupInfo(inviteInfo)
      } catch (e) {
        return await m.reply('*❌ Grupo no encontrado o enlace inválido.*')
      }
    } else {
      try {
        let res = await conn.groupMetadata(m.chat)
        info = await MetadataGroupInfo(res)
      } catch (e) {
        return await m.reply('*⚠️ No se pudo obtener los metadatos del grupo.*')
      }
    }

    if (info) {
      await conn.sendMessage(m.chat, {
        text: info,
        contextInfo: {
          mentionedJid: conn.parseMention(info)
        }
      }, { quoted: m })
    }

  } catch (e) {
    await reportError(m, e)
  }
}

handler.command = /^groupinfo|infogrupo|inspeccionar|grupoinfo$/i
export default handler
