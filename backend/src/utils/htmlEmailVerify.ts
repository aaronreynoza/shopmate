const contentHTML = (link:string, lastName:string, user:string) => `
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
        <tr style="color: white;background-color: black;">
          <th colspan="2">
            <span>${user} ${lastName} Gracias por registrarte</span>
          </th>
        </tr>
        <tr>
          <th colspan="2">
            <p>
              Muchas gracias por preferir nuestra plataforma para adquirir
              los mejores productos a los mejores precios,si tu no realizaste esta operación
              por favor ignora este mensaje, de lo contrario haz click en la imagen para verificar.
            </p>
          </th>
        </tr>
        <tr>
          <th colspan="2">
            <a href="${link}"><img src="https://azurefiletestexpress.blob.core.windows.net/resourcedata/veri.jpg"/ width="80px" height="80px"></a>
          </th>
        </tr>
        <tr>
          <td><p>Contactanos al numero tel </p></td>
          <td>: 202x-xxx</td>
        </tr>
        <tr>
          <td><p>Email</p></td>
          <td><p>: shopmasterrace@gmail.com</p></td>
        </tr>
      </table>
    </body>
    </html>
  `;
export default contentHTML;
