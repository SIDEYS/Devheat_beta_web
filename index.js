const express=require("express")
const app=express();
const PORT=process.env.PORT || 3000;
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const ejs = require("ejs");
const path=require("path");
const { Console } = require("console");
app.use(express.json())
app.use( express.static( "public" ) );
app.use(express.urlencoded());

// app.post("/send", (req, res) => { console.log(req.body); 
//   res.redirect('/');
//  });
app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });

app.get('/menu', (req, res) => { res.sendFile(__dirname + '/menu.html'); });

 app.post("/send", async(req,res) => {
    try {
      //  var parsedint = parseInt(req.body);
        console.log(req.body);  
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        const pageHtml = setUpTemplate(req.body);
    
        await page.setContent(pageHtml);
    
        const pdfBuffer=await page.pdf({
            path:"Bill.pdf",
            format: 'A4', landscape: true, timeout: 5 * 60 * 1000 
        });
    
        console.log("done");
          res.redirect('/');

        await page.close();
        await browser.close();
        res.set('Content-Type', 'Bill/pdf');
		res.send(pdfBuffer);
      } catch (e) {
        console.log(e);
      }
})
const setUpTemplate = (data) => {
    const templateHTML = fs.readFileSync(
      path.join(__dirname, "Billtemplate.ejs"),
      "utf8"
    );
    const mainHTML = ejs.render(templateHTML,{
        data
    });
    return mainHTML;
  };

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

