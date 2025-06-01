import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import client from './db'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then( async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await client.connect()

  ipcMain.handle('getPartners', async function getPartners() {
      try {
        const resp = await client.query(`SELECT partners.*, discount_data.discount
FROM partners
LEFT JOIN (
    SELECT total_summary.id_partner_name, 
           CASE
               WHEN total_summary.total_ammount <= 10000 THEN 0
               WHEN total_summary.total_ammount > 10000 AND total_summary.total_ammount <= 50000 THEN 5
               WHEN total_summary.total_ammount > 50000 AND total_summary.total_ammount <= 300000 THEN 10
               ELSE 15
           END AS discount
    FROM (
        SELECT id_partner_name, SUM(ammount) AS total_ammount 
        FROM public.partner_products
        GROUP BY id_partner_name
    ) AS total_summary
) AS discount_data ON partners.id = discount_data.id_partner_name;
`)
        return resp.rows
      } catch (e) {
        console.log(e)
      }
  })

  ipcMain.handle('createPartner', async function createPartner(event, partner) {
    const {type, name, director, email, telephone, address, inn, rating} = partner
   await client.query(`INSERT INTO partners (partner_type, partner_name, director, email, telephone, address, inn, rating)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [type, name, director, email, telephone, address, inn, rating]);
  })

  ipcMain.handle('updatePartner', async function updatePartner(event, partner) {
  const { id, type, name, director, email, telephone, address, inn , rating } = partner;

  try {

    // await client.query(`UPDATE partners
    //   SET partner_name = $1, 
    //       partner_type = $2, 
    //       director = $3, 
    //       email = $4, 
    //       inn = $5, 
    //       telephone = $6, 
    //       address = $7, 
    //       rating = $8
    // WHERE id = $9`, 
    // [name, type, director, email, inn, telephone, address, rating, id]);

    await client.query(`UPDATE partners
      SET partner_name = '${name}', partner_type = '${type}', director='${director}', email='${email}', inn=${inn}, telephone='${telephone}', address='${address}', rating='${rating}'
      WHERE partners.id = ${id};`)
    return;
  } catch (e) {
    return ('error')
  }
}
)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

