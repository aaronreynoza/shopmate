const contentHTML = (estado:string, numero:string) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
          table {
            width: 100%;
          }
          th {
            height: 70px;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th colspan="2">
              <img src="https://azurefiletestexpress.blob.core.windows.net/resourcedata/SMR.jpg" width="300px" height="200px">
            </th>
          </tr>
          <tr>
            <th>Estado de la solicitud</th>
            <th>${numero}</th>
          </tr>
          <tr>
            <th>Solicitud</th>
            <th>${estado}</th>
          </tr>
        </table>
      </body>
      </html>
    `;
export default contentHTML;
