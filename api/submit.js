import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    try {
      // Vérification et log des variables d'environnement
      if (!process.env.GOOGLE_CREDENTIALS_BASE64) {
        throw new Error('La variable GOOGLE_CREDENTIALS_BASE64 est indéfinie.');
      }
      if (!process.env.SPREADSHEET_ID) {
        throw new Error('La variable SPREADSHEET_ID est indéfinie.');
      }

      // Décodage et parsing des credentials
      const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8'));

      // Configuration de l'authentification Google Sheets
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = process.env.SPREADSHEET_ID;

      // Ajout des données au Google Sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'test!A1', // Remplace 'test' par le nom de ta feuille
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [body] },
      });

      res.status(200).send('Données ajoutées avec succès');
    } catch (error) {
      console.error('Erreur lors de l’envoi des données :', error);
      res.status(500).send('Erreur : ' + error.message);
    }
  } else {
    res.status(405).send('Méthode non autorisée');
  }
}
