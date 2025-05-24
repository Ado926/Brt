import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' ; 
import { tr, translateText } from './lib/_checkLang.js';

//---------[ Añada los numeros a ser Propietario/a ]---------

global.owner = [
["50493732693", 'Owner Wirk', true], //ShizukaBot-MD 💙
["59169082575"], 
["59169214837"],
["5218715746374"],
["593968585383"],
["595976126756"],
["584125778026"],
["593968263524"],
["5215539356057"],
["573012482597"],
["51968374620"]]
global.mods = []
global.prems = []

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
global.botNumberCode = "" //Ejemplo: +59309090909
global.confirmCode = "" 
global.gataJadibts = true //cambia a false Desactivar en "auto-reconexion" de sub-bots

//Cambiar a tu idioma "es = español" - "en = inglés"
global.lang = "es"
global.tr = tr

//---------[ APIS GLOBAL ]---------

global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = { lolhuman: { url: 'https://api.lolhuman.xyz/api/', key: 'GataDiosV3' },
skizo: { url: 'https://skizo.tech/api/', key: 'GataDios' },
alyachan: { url: 'https://api.alyachan.dev/api/', key: null }, 
neoxr: { url: 'https://api.neoxr.eu/api', key: 'GataDios' },
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
popcat: { url: 'https://api.popcat.xyz', key: null }}

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//------------------------[ Stickers ]-----------------------------

global.packname = `✿ MomoAyaseBot-MD ✿` //"Powered @Alba070503"
global.author = `✿ Powered By Wirk ✿` //"coloca tu nombre "
//------------[ Versión | Nombre | cuentas ]------------

global.wm = 'Mai ☔' 
global.vs = '2.3.0'
global.yt = 'https://www.youtube.com/@Alba070503'
global.tiktok = 'https://www.tiktok.com/@Alba070503'
global.md = 'https://github.com/Alba070503/KoharuBot-MD'
global.fb = 'https://www.facebook.com/'
global.face = 'https://www.facebook.com/groups/872989990425789/'

global.nna = 'https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A' //Update
global.nna2 = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Koharu update
global.nnaa = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Koharu - Test
global.nn = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Grupo 1
global.nnn = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Grupo 2
global.nnnt = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Grupo del Colaboracion
global.nnntt = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //enlace 
global.nnnttt = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //A.T.T.M
global.nnntttt = 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' //Grupo ayuda sobre el bot
global.bot = 'wa.me/59169082575'
global.redes = [nna, nna2, yt, nn, nnn, nnnt, nnntt, nnnttt, nnntttt, md, tiktok, fb, face]

//------------------------[ Info | Datos ]---------------------------

global.wait = '❀ Espérame tantito~ ❀\n\n> *❀ Porfis no hagas spam, que me asusto~ ❀*'
global.waitt = '*❀ Cargando con ternura... ▬▬▭▭▭*'
global.waittt = '*❀ Cargando con ternura... ▬▬▬▬▭▭*'
global.waitttt = '*❀ Cargando con ternura... ▬▬▬▬▬▬▭*'
global.waittttt = '*❀ Cargando con ternura... ▬▬▬▬▬▬▬*'
global.rg = '『❀ R E S U L T A D I T O S  L I N D O S ❀』\n\n'
global.ag = '『❀ A Y A A ~  P R E C A U C I Ó N ❀』\n\n'
global.iig = '『❀ D A T I T O S  B O N I T O S ❀』\n\n'
global.fg = '『❀ U W U ~ A L G O  F A L L Ó ❀』\n\n'
global.mg = '『❀ O P P S ~  L O  U S A S T E  M A L ❀』\n\n'
global.eeg = '『❀ R E P O R T I T O  E N V I A D O ❀』\n\n'
global.eg = '『❀ T O D O  S A L I Ó  B I E N ~ Y A Y ❀』\n\n'
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/img/catagolo.jpg')
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//-------------------------[ IMAGEN ]------------------------------
//global.img = "https://qu.ax/ueLBh.jpg"
global.img1 = 'https://qu.ax/vmBSN.jpg'
global.img2 = 'hhttps://qu.ax/ueLBh.jpg'

global.imagen = fs.readFileSync('./Menu2.jpg')
global.imagen1 = fs.readFileSync('./media/Menu1.jpg')
global.imagen2 = fs.readFileSync('./media/Menu2.jpg')
global.imagen3 = fs.readFileSync('./media/Menu3.jpg')
global.imagen4 = fs.readFileSync('./media/Menu4.jpg')
global.imagen5 = 'https://files.catbox.moe/6ve8db.jpg'
global.imagen6 = 'https://files.catbox.moe/lp0r2h.jpg'
global.menu18 = 'https://files.catbox.moe/s5p436.jpg'
global.vid1 = 'https://files.catbox.moe/5gw9u2.mp4'
global.img = [imagen, imagen1, imagen2, imagen3, imagen4]
global.imageUrl = ["https://files.catbox.moe/rt8xqt.jpg", "https://files.catbox.moe/6ve8db.jpg", "https://files.catbox.moe/s5p436.jpg"]

//----------------------------[ NIVELES | RPG ]---------------------------------

global.multiplier = 850 // Cuanto más alto, más difícil subir de nivel
global.maxwarn = '4' // máxima advertencias

//---------------[ IDs de canales ]----------------

global.ch = {
ch1: '120363402846939411@newsletter', 
ch2: '120363402846939411@newsletter', 
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
