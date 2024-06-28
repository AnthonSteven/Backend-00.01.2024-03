/*===================================================
=====================================================
        SOLICITUD  LISTADO DE PRODUCTOS DE UNA TIENDA
    Ejecutar:
        Terminal: npm run dev 
        Navegador: http://localhost:8080/lista

    Ejemplo:
        
        ********* Display en la pagina ***********

            LISTADO DE PRODUCTOS DE UNA TIENDA:
                Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
                Mens Casual Premium Slim Fit T-Shirts
                Mens Cotton Jacket
                Mens Casual Slim Fit
                John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet
                Solid Gold Petite Micropave
                White Gold Plated Princess
                Pierced Owl Rose Gold Plated Stainless Steel Double
                WD 2TB Elements Portable External Hard Drive - USB 3.0
                SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
                Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5
                WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive
                Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin
                Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED
                BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats
                Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket
                Rain Jacket Women Windbreaker Striped Climbing Raincoats
                MBJ Women's Solid Short Sleeve Boat Neck V
                Opna Women's Short Sleeve Moisture
                DANVOUY Womens T Shirt Casual Cotton Short

        *****************************************   

=====================================================
=====================================================*/


console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log("req.url:"+req.url)
    let strUrl = req.url;
    
    if (strUrl.includes("/lista")) {

        const options= {
            method: 'GET',
            url:`https://fakestoreapi.com/products`,
        };

        let strHTML="";
       
        //Solictud Axios - Lista de Productos de una Tienda
        axios.request(options)
            .then((response) => {
                strHTML+= `<b>LISTADO DE PRODUCTOS DE UNA TIENDA: </b><ol>`;
                console.log("Ingrese a AXIOS");
                let ListProducts =response.data;
                //console.log("Lista: ",ListProducts)
                console.log("Lista de Productos de una Tienda");
                ListProducts.forEach(element => {
                    console.log("-"+element.title)
                    strHTML+= "<li>" + element.title + "</li>"
                });

                strHTML += "</ol>";
                console.log("Lista de Productos de una Tienda HTML : ")
                console.log(strHTML);
                res.write(strHTML);
                res.end();
                      
            })
            .catch((error) => {
                console.log("Hubo un error en la aplicacion");
                console.error(error);
                res.write("Hubo un error en la aplicacion");
                res.end();
               
            });
    }
    else {
        res.write(JSON.stringify({ data: "cualquiercosa" }));
        res.end();
    }
    
}).listen(8080);